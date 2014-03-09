#!/usr/bin/env python
# -*- coding: utf-8 -*-
#
# Em domínio público, livre para todos os usos
#
# Apresentação interativa sobre a história da web para o Encontro de Compartilhamento de Conhencimento
# da equipe de tecnologia da informação do Sport Club Crointhians Paulista.
import json
import os
import socket, struct, fcntl
import tornado
import tornado.web
import tornado.websocket

from tornado.options import define, parse_command_line, options

define('port', default=8080, help='executar na porta indicada', type=int)
sock = socket.socket(socket.AF_INET, socket.SOCK_STREAM)
sockfd = sock.fileno()
SIOCGIFADDR = 0x8915

PRESENTER = None
VIEWERS = []
STATE = 0


def get_ip(iface = 'eth0'):
    """Obtém o IP da interface de rede"""
    ifreq = struct.pack('16sH14s', iface.encode('utf-8'), socket.AF_INET, b'\x00'*14)
    try:
        res = fcntl.ioctl(sockfd, SIOCGIFADDR, ifreq)
    except:
        return None
    ip = struct.unpack('16sH2x4s8x', res)[2]
    return socket.inet_ntoa(ip)


def jsonify(**kwargs):
    return json.dumps(kwargs)


class Control(tornado.websocket.WebSocketHandler):
    """Websocket para o apresentador"""
    def open(self):
        global PRESENTER, STATE
        PRESENTER = self
        STATE = 1

    def on_message(self, message):
        global STATE
        STATE = int(message)
        for viewer in VIEWERS:
            viewer.write_message("%s" % STATE)

    def on_close(self):
        global PRESENTER, STATE
        PRESENTER = None
        STATE = 0


class Socket(tornado.websocket.WebSocketHandler):
    """Websocket para o apresentador"""
    is_viewer = True
    viewer_name = None
    def open(self):
        if PRESENTER:
            self.viewer_name = self.get_query_argument('name')
            VIEWERS.append(self)
            self.write_message("%s" % STATE)
            PRESENTER.write_message(jsonify(evt='VIEWER_OPENED', name=self.viewer_name))

    def on_message(self, message):
        print(self.viewer_name, message)
        PRESENTER.write_message(jsonify(evt='VIEWER_QUESTION', name=self.viewer_name))

    def on_close(self):
        if self in VIEWERS:
            VIEWERS.remove(self)
            PRESENTER.write_message(jsonify(evt='VIEWER_CLOSED', name=self.viewer_name))


class Presenter(tornado.web.RequestHandler):
    """Exibe a página de apresentação"""
    def get(self):
        eth0 = get_ip('eth0')
        wlan0 = get_ip('wlan0')
        ip = eth0 if eth0 else wlan0
        self.render('show.html', ip=ip, port=options.port)


class Viewer(tornado.web.RequestHandler):
    """Exibe a página de acompanhamento do visualizador"""
    def get(self):
        self.render('index.html')


def main():
    """Junta tudo e bota pra rodar!"""
    parse_command_line()
    app = tornado.web.Application(
        [
            (r"/", Viewer),
            (r"/show", Presenter),
            (r"/ws", Socket),
            (r"/ctrl", Control)
        ],
        cookie_secret='Apresentacao2014UmaOdisseiaNaWeb',
        template_path=os.path.join(os.path.dirname(__file__), 'templates'),
        static_path=os.path.join(os.path.dirname(__file__), 'static'),
        xsrf_cookies=True,
        debug=True
    )
    app.listen(options.port)
    tornado.ioloop.IOLoop.instance().start()

if __name__ == '__main__':
    main()

