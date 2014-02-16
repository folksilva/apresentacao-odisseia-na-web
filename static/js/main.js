/**
 * Em domínio público, livre para todos os usos
 *
 * Apresentação interativa sobre a história da web para o Encontro de Compartilhamento de Conhencimento
 * da equipe de tecnologia da informação do Sport Club Crointhians Paulista.
 */

/**
 * Conecta ao servidor e envia o nome do telespectador
 */
function connect(){
    var host = location.host;
    var name = Math.random() * 100;
    var ws = new WebSocket('ws://' + host + '/ws?name=' + name);
    ws.onopen = function(){
        console.log('Websocket opened');
        $('#st1').fadeIn('slow');
    };

    ws.onmessage = function(e){
        var state = parseInt(e.data);
        moveState(state);
    };

    ws.onclose = function() {
        $(".state").fadeOut('slow');
        setTimeout(connect, 1000);
    };
};

/**
 * Move para um estado da apresentação
 * @param state
 */
function moveState(state) {
    console.log("Entrando no estado nº", state);
}

connect();