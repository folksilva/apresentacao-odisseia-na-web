/**
 * Em domínio público, livre para todos os usos
 *
 * Apresentação interativa sobre a história da web para o Encontro de Compartilhamento de Conhencimento
 * da equipe de tecnologia da informação do Sport Club Crointhians Paulista.
 */
var ws = null;
var links = [
    null, null, null, null, null,
    'http://pt.wikipedia.org/wiki/Hist%C3%B3ria_da_World_Wide_Web',
    'http://pt.wikipedia.org/wiki/Hipertexto',
    'http://pt.wikipedia.org/wiki/Tim_Berners-Lee',
    'http://pt.wikipedia.org/wiki/Les_Horribles_Cernettes',
    null,
    'http://pt.wikipedia.org/wiki/W3C',
    'http://pt.wikipedia.org/wiki/Netscape',
    'http://pt.wikipedia.org/wiki/Bolha_da_Internet',
    null,
    'http://pt.wikipedia.org/wiki/Web_2.0',
    'http://pt.wikipedia.org/wiki/Software_como_servi%C3%A7o',
    'http://pt.wikipedia.org/wiki/Computa%C3%A7%C3%A3o_em_nuvem',
    'http://pt.wikipedia.org/wiki/Web_social',
    null,
    'http://pt.wikipedia.org/wiki/Web_sem%C3%A2ntica',
    'http://www.administradores.com.br/noticias/tecnologia/internet-das-coisas-a-nova-revolucao-na-era-da-informacao/84548/',
    'http://sethgodin.typepad.com/seths_blog/2007/01/web4.html',
    null, null
];

/**
 * Conecta ao servidor e envia o nome do telespectador
 */
function connect(name){
    var host = location.host;
    ws = new WebSocket('ws://' + host + '/ws?name=' + name);
    ws.onopen = function(){
        console.log('Websocket opened');
    };

    ws.onmessage = function(e){
        var state = parseInt(e.data);
        moveState(state);
    };

    ws.onclose = function() {
        setTimeout(connect, 1000);
    };
};

/**
 * Move para um estado da apresentação
 * @param state
 */
function moveState(state) {
    switch (state) {
        case 1:
            $('#pre').fadeOut('slow', function(){
               $('#in').fadeIn('slow');
            });
            break;
        case 2:
            $('#in').fadeOut('slow', function(){
               $('#countdown').fadeIn('slow', function () {
                    setTimeout(function(){
                        $('#countdown #log').fadeOut(1*1000, function(){
                            $(this).text('Rota traçada com sucesso!').fadeIn(1*1000, function(){
                                setTimeout(function(){
                                    $('#countdown #log').fadeOut(1*1000, function(){
                                        $(this).text('Propulsores com força total!').fadeIn(1*1000, function(){
                                            setTimeout(function(){
                                                $('#countdown #log').fadeOut(1*1000, function(){
                                                    $(this).text('Estamos no ar!').fadeIn(1*1000);
                                                })
                                            }, 1*1000);
                                        });
                                    })
                                }, 2*1000);
                            });
                        })
                    }, 2*1000);
               });
            });
            break;
        case 3:
            $('#countdown').fadeOut('slow', function(){
               $('#travel').fadeIn('slow');
            });
            break;
        case 4:
            $('#travel').fadeOut('slow', function(){
               $('#window').fadeIn('slow');
            });
            break;
        case 9:
        case 13:
        case 18:
            $('#window .screen-off').fadeIn('slow');
            break;
        case 22:
            $('#window').fadeOut('slow', function(){
               $('#questions').fadeIn('slow');
            });
            break;
        case 23:
            $('#questions').fadeOut('slow', function(){
               $('#end').fadeIn('slow');
            });
            break;
        default:
            var url = links[state];
            $('#window .screen-off').fadeIn('slow', function(){
                $('#content').attr('src', url);
                setTimeout(function(){
                    $('#window .screen-off').fadeOut('slow');
                }, 1*1000);
            });
            break;
    }
}

/**
 * Realiza o embarque do espectador
 */
function embarque() {
    var name = $('#travelerName').val();
    if (name) {
        connect(name);
    }
}

/**
 * Envia uma pergunta do espectador
 */
function perguntar() {
    ws.send('?');
}

$('#stars').fadeIn(3*1000, function() {
    $('#pre').fadeIn('slow');
    //moveState(22);
});
