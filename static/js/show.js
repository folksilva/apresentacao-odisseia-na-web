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
    },
    'VIEWER_QUESTION': function(d) {
        $('#st22 #pessoa').hide();
        console.log('Pergunta de ' + d.name + '!');
        $('#st22 #pessoa').text(d.name.toUpperCase()).fadeIn(3*1000, function() {
            setTimeout(function() {
                $('#st22 #pessoa').fadeOut(3*1000);
            }, 5*1000);
        });
    }
};

function voidfn (){}
function state1() {
    setTimeout(function(){$('#st1').fadeIn('slow');}, 1000);
}
function state2() {
    var n = 10;
    var countdown = function(){
        $('#contagem').fadeOut(500, function(){
            if (n === 0) { return; }
            n --;
            $('#contagem').text(n).fadeIn(500, countdown);
            if (n === 0){
                nextState();
            }
        });
    };
    $('#contagem').text(n).fadeIn(500, countdown);
}
function state3() {
    var opening = $('#opening')[0];
    opening.play();
    $('#stars').fadeOut(8*1000, function(){
        $("#st3 .sun, #st3 .earth, #st3 .moon").addClass('animated');
        $('#st3 #opening-scene').fadeIn(7*1000, function(){
           setTimeout(function(){
               $('#st3 .frase1').fadeIn(5*1000, function(){
                    setTimeout(function(){
                        $('#st3 .frase1').fadeOut(5*1000, function(){
                            setTimeout(function(){
                                $('#st3 .frase2').fadeIn(5*1000, function(){
                                    setTimeout(function(){
                                        $('#st3 .frase2').fadeOut(5*1000, function(){
                                            setTimeout(function(){
                                                $('#st3 .titulo').fadeIn(5*1000, function(){
                                                    setTimeout(function(){
                                                        $('#st3 .titulo').fadeOut(6*1000, function(){
                                                            setTimeout(function(){
                                                                $('#st3 #opening-scene').fadeOut(9*1000, function(){
                                                                    nextState();
                                                                });
                                                            }, 6*1000);
                                                        });
                                                    }, 11*1000);
                                                });
                                            }, 12*1000);
                                        });
                                    }, 2*1000);
                                });
                            }, 5*1000);
                        });
                    }, 3*1000);
               });
           }, 10*1000);
       });
    });
}

function state4 (){
    $('#st4 h1').fadeIn(3*1000, function(){
        setTimeout(function(){
            $('#st4 h1').fadeOut(2*1000, function(){
                nextState();
            });
        }, 5 * 1000);
    });
}

function state5 () {
    setTimeout(function(){
        $('#st5 #p1').fadeIn('slow', function(){
            setTimeout(function(){
                $('#st5 #p2').fadeIn('slow', function(){
                    setTimeout(function(){
                        $('#st5 #p3').fadeIn('slow');
                    }, 5 * 1000);
                });
            }, 3 * 1000);
        });
    }, 1000);
}

function state6 () {
    setTimeout(function(){
        $('#st6 #memex').fadeIn('slow', function(){
            setTimeout(function(){
                $('#st6 #hypertexto').fadeIn('slow');
            }, 8*1000);
        });
    }, 1000);
}

function state7 () {
    setTimeout(function(){
        $('#st7 h2, #st7 img').fadeIn('slow', function(){
            setTimeout(function(){$('#st7 #p1').fadeIn('slow');}, 1 * 1000);
            setTimeout(function(){$('#st7 #p2').fadeIn('slow');}, 5 * 1000);
            setTimeout(function(){$('#st7 #p3').fadeIn('slow');}, 10 * 1000);
            setTimeout(function(){$('#st7 #p4').fadeIn('slow');}, 18 * 1000);
            setTimeout(function(){$('#st7 #p5').fadeIn('slow');}, 20 * 1000);
        });
    }, 1000);
}
function state9 () {
     $('#st9 h1').fadeIn(3*1000, function(){
        setTimeout(function(){
            $('#st9 h1').fadeOut(2*1000, function(){
                nextState();
            });
        }, 5 * 1000);
    });
}
function state10 () {
    $('#st10 h1').fadeIn(2*1000, function(){
        setTimeout(function() {
            $('#st10 #p1').addClass('on');
            setTimeout(function() {
                $('#st10 #p2').addClass('on');
                setTimeout(function(){$('#st10').addClass('on');}, 3*1000);
                setTimeout(function(){$('#st10 #p3').addClass('on');}, 6*1000);
            }, 8*1000);
        }, 2*1000);
    });
}
function state11 () {
    $('#st11 h3').fadeIn(2*1000, function(){
       setTimeout(function(){
           $('#st11 #p1').fadeIn('slow', function(){
               setTimeout(function(){
                   $('#st11').css('-webkit-animation', 'netscape-in 3s linear');
                   $('#st11 #p2').fadeIn('slow', function(){
                       $('#st11').addClass('on');
                       setTimeout(function(){
                           $('#st11 #p3').fadeIn('slow', function(){
                               setTimeout(function(){
                                   $('#st11 #p4').fadeIn('slow', function(){
                                       $('#st11').removeClass('on');
                                       $('#st11').css('-webkit-animation', 'netscape-out 1s linear');
                                       setTimeout(function(){
                                           $('#st11').addClass('browsers');
                                           $('#st11').css('-webkit-animation', 'netscape-in 1s linear');
                                           setTimeout(function(){
                                               $('#st11').addClass('on');
                                               setTimeout(function() {
                                                   $('#st11').css('background-image', 'url(static/img/browsers2.png)');
                                               }, 4*1000)
                                           }, 1*1000);
                                       }, 1*1000);
                                   });
                               }, 3 * 1000);
                           });
                       }, 3 * 1000);
                   });
               }, 3 * 1000);
           });
       }, 2 * 1000);
    });
}
function state12 () {
    $('#st12 h1').fadeIn(2*1000, function(){
        setTimeout(function() {
            $('#st12 #p1').addClass('on');
            setTimeout(function() {
                $('#st12 #p2').addClass('on');
                setTimeout(function(){$('#st12 #p3').addClass('on');}, 4*1000);
            }, 6*1000);
        }, 2*1000);
    });
}

function state13 () {
    $('#st13 h1').fadeIn(3*1000, function(){
        setTimeout(function(){
            $('#st13 h1').fadeOut(2*1000, function(){
                nextState();
            });
        }, 5 * 1000);
    });
}
function state14 () {
    $('#st14 h1').fadeIn(3*1000, function () {
       setTimeout(function(){
           $('#st14').addClass('on');
           $('#st14 #p1').fadeIn(2*1000, function(){
                setTimeout(function() {
                    $('#st14 #p2').fadeIn(2*1000, function(){
                        setTimeout(function() {
                            $('#st14 #p3').fadeIn(2*1000, function(){
                                setTimeout(function() {
                                    $('#st14 .quote').fadeIn(1*1000);
                                }, 2*1000);
                           });
                        }, 2*1000);
                   });
                }, 2*1000);
           });
       })
    });
}
function state15 () {
    $('#st15 h1').fadeIn(3*1000, function () {
       setTimeout(function(){
           $('#st15 #p1').addClass('on');
           setTimeout(function(){
               $('#st15 #p2').addClass('on');
               setTimeout(function(){
                   $('#st15 #p3').addClass('on');
                   setTimeout(function(){
                       $('#st15 #p4').addClass('on');
                       setTimeout(function(){
                           $('#st15').addClass('on');
                       }, 600);
                   }, 4*1000);
               }, 3*1000);
           }, 3*1000);
       }, 1*1000);
    });
}
function state16 () {
    $('#st16 h1').fadeIn(3*1000, function () {
       setTimeout(function() {
           $('#st16 #p1').addClass('on');
           setTimeout(function() {
               $('#st16 #p2').addClass('on');
               setTimeout(function() {
                   $('#st16 #p3').addClass('on');
                   setTimeout(function() {
                       $('#st16 #p4').addClass('on');
                       setTimeout(function() {
                           $('#st16 #p5').addClass('on');
                       }, 5*1000);
                   }, 3*1000);
               }, 5*1000);
           }, 3*1000);
       }, 1*1000);
    });
}
function state17 () {
    $('#st17 h1').fadeIn(3*1000, function () {
        setTimeout(function () {
            $('#st17 #p1').fadeIn(1*1000, function () {
                setTimeout(function () {
                    $('#st17 #p2').fadeIn(1*1000, function () {
                        setTimeout(function () {
                            $('#st17 #p3').fadeIn(1*1000, function () {
                                setTimeout(function () {
                                    $('#st17 #p4').fadeIn(1*1000, function () {
                                        setTimeout(function () {
                                            $('#st17 .networks').fadeIn(3*1000);
                                        }, 6*1000);
                                    });
                                }, 3*1000);
                            });
                        }, 3*1000);
                    });
                }, 3*1000);
            });
        }, 1*1000);
    });
}

function state18 () {
    $('#st18 h1').fadeIn(3*1000, function(){
        $('#st18 h1 div').fadeIn(2*1000, function(){
            setTimeout(function(){
                $('#st18 h1').fadeOut(2*1000, function(){
                    nextState();
                });
            }, 5 * 1000);
        });
    });
}
function state19 () {
    $('#st19 h3').fadeIn(3*1000, function () {
        setTimeout(function () {
            $('#st19 #p1').fadeIn(1*1000, function () {
                setTimeout(function () {
                    $('#st19 #p2').fadeIn(1*1000, function () {
                        setTimeout(function () {
                            $('#st19 #p3').fadeIn(1*1000, function () {
                                setTimeout(function () {
                                    $('#st19 #p4').fadeIn(1*1000, function () {
                                        setTimeout(function(){
                                            $('#st19').addClass('on');
                                        }, 4*1000);
                                    });
                                }, 3*1000);
                            });
                        }, 3*1000);
                    });
                }, 3*1000);
            });
        }, 1*1000);
    });
}
function state20 () {
    $('#st20 h1').fadeIn(3*1000, function () {
        setTimeout(function () {
            $('#st20 #p1').fadeIn(1*1000, function () {
                setTimeout(function () {
                    $('#st20 #p2').fadeIn(1*1000, function () {
                        setTimeout(function () {
                            $('#st20 #p3').fadeIn(1*1000, function () {
                                setTimeout(function () {
                                    $('#st20 #p4').fadeIn(1*1000);
                                }, 5*1000);
                            });
                        }, 3*1000);
                    });
                }, 3*1000);
            });
        }, 1*1000);
    });
}
function state21 () {
    $('#st21 h1').fadeIn(3*1000, function () {
        setTimeout(function () {
            $('#st21 #p1').fadeIn(1*1000, function () {
                setTimeout(function () {
                    $('#st21 #p2').fadeIn(1*1000, function () {
                        setTimeout(function () {
                            $('#st21 .terminator').addClass('on');
                            $('#st21 #p3').fadeIn(1*1000);
                        }, 3*1000);
                    });
                }, 3*1000);
            });
        }, 1*1000);
    });
}

function state22 () {
    $('#stars').fadeIn(6*1000, function () {
        $('#st22 h1').fadeIn(3*1000);
    });
}

/**
 * Lista de estados com ações a serem executadas
 * @type {[]}
 */
var states = [null, state1, state2, state3,
    state4, state5, state6, state7, voidfn,
    state9, state10, state11, state12,
    state13, state14, state15, state16, state17,
    state18, state19, state20, state21,
    state22, voidfn];
function runState(){
    ws.send(state);
    $('#st' + state).fadeIn('slow', function(){
        states[state]();
    });
}
function nextState() {
    if (state < states.length-1) {
        $('#st' + state).fadeOut('slow', function(){
            state ++;
            runState()
        });
    }
}

function prevState() {
    if (state > 0) {

        $('#st' + state).fadeOut('slow', function(){
            state --;
            runState();
        });
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
        $('.state').fadeOut('slow');
        setTimeout(bootstrap, 1000);
    };
}
/**
 * Inicializa todas as funções da apresentação
 */
function startup(){
    $('#stars').fadeIn(1700, function(){
        state = 1;
        runState();
    });
    $(document).bind('keydown', function(e){
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