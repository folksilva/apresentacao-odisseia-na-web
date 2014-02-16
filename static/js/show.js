/**
 * Em domínio público, livre para todos os usos
 *
 * Apresentação interativa sobre a história da web para o Encontro de Compartilhamento de Conhencimento
 * da equipe de tecnologia da informação do Sport Club Crointhians Paulista.
 */

/**
 * Conexão via Websocket com o servidor
 * @type {WebSocket}
 */
var ws;
/**
 * Estado da apresentação (Maior que 0 está em execução)
 * @type {number}
 */
var state = 0;
/**
 * Contagem de visualizadores conectados
 * @type {number}
 */
var viewersCount = 0;
/**
 * Lista de métodos para os eventos do WebSocket
 * @type {*}
 */
var handlers = {
    'VIEWER_OPENED': function(d) {
        console.log('Bem vindo ' + d.name);
        viewersCount++;
        if (state === 1 && viewersCount < 9) {
            $('#trp'+viewersCount).addClass('on');
            if (viewersCount === 8) {
                $('#startMessage').text('Pronto para partir');
            }
        }
    },
    'VIEWER_CLOSED': function(d) {
        console.log('Vai tão cedo ' + d.name + '?');
        if (state === 1) {
            $('#trp'+viewersCount).removeClass('on');
        }
        if (viewersCount > 0) {
            viewersCount--;
        }
        if (viewersCount < 8) {
            $('#startMessage').text('Aguardando embarque da tripulação');
        }
    }
};

function nextState() {
    state ++;
    ws.send(state);
}

function prevState() {
    if (state > 0) {
        state --;
        ws.send(state);
    }
}
function bootstrap(){

    ws = new WebSocket('ws://localhost:8080/ctrl');

    ws.onopen = function(){
        startup();
    };

    ws.onmessage = function(e){
        var message = JSON.parse(e.data);
        var data = {};
        for (var k in message) {
            if (k !== 'evt') {
                data[k] = message[k];
            }
        }
        handlers[message.evt](data);
    };

    ws.onclose = function() {
        $(document).unbind('keydown');
        state = 0;
        viewersCount = 0;
        $(".state").fadeOut('slow');
        setTimeout(bootstrap, 1000);
    };
}
/**
 * Inicializa todas as funções da apresentação
 */
function startup(){
    state = 1;
    $("#st1").fadeIn('slow');
    $(document).bind('keydown', function(e){
        console.log(e.keyCode);
        var key = e.keyCode;
        if (key === 32 || key === 39 || key === 40) {
            // Mover para o próximo slide
            nextState();
        }
        if (key === 37 || key === 38) {
            // Mover para o slide anterior
            prevState();
        }
    });
}

bootstrap();