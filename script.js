//variaveis de configuracao
let canvas = document.getElementById("draw");
let ctx = canvas.getContext("2d");
let anima;

//variaveis da bolinha
let xBolinha = 50;
let yBolinha = 50;
let velXBolinha = 3;
let velYBolinha = 3;
let raio = 20;

//variaveis das raquetes
let xRaq1 = 30;
let yRaq1 = 250;
let xRaq2 = 570;
let yRaq2 = 250;
const lRaq = 10;
const hRaq = 100;
let cima, baixo = false;
let velRaqt = 2;

//variáveis placar
let lPlaca = 70;
let hPlacar = 30;
let ptPg1 = 0;
let ptPg2 = 0;

function desenhar() {
    desenhaBolinha();
    movimentoBolinha();
    desenhaRaquetes();
    verificaTeclado();
    movimentoRaquete();
    movimentoRaquete2();
    desenhaPlaca();
    pontos();

    anima = requestAnimationFrame(desenhar)
}

function desenhaBolinha() {
    ctx.clearRect(0, 0, 600, 400,)
    ctx.fillStyle = '#fff';
    ctx.arc(xBolinha, yBolinha, raio, 0, Math.PI * 2, true);
    ctx.fill();
    ctx.beginPath();
}

function movimentoBolinha() {
    xBolinha += velXBolinha;
    yBolinha += velYBolinha;
    if (xBolinha > 600 - raio || xBolinha < 0 + raio) {
        velXBolinha *= -1
    }
    if (yBolinha > 400 - raio || yBolinha < 0 + raio) {
        velYBolinha *= -1
    }
    if (xBolinha + raio > xRaq2 && velXBolinha > 0) {
        if (yBolinha > yRaq2 && yBolinha < yRaq2 + 100) {
            velXBolinha *= -1;
        }
    }
    if ((xBolinha - raio < xRaq1 && velXBolinha < 0)) {
        if (yBolinha > yRaq1 && yBolinha < yRaq1 + 100) {
            velXBolinha *= -1;
        }
    }
}

function desenhaRaquetes() {
    ctx.rect(xRaq1, yRaq1, lRaq, hRaq);
    ctx.fill();
    ctx.beginPath();

    ctx.rect(xRaq2, yRaq2, lRaq, 100);
    ctx.fill();
    ctx.beginPath();
}

function verificaTeclado() {
    window.addEventListener("keydown", (event) => {
        if (event.keyCode == 38) {
            cima = true;
        }
        if (event.keyCode == 40) {
            baixo = true;
        }
    })
    window.addEventListener("keyup", (event) => {
        if (event.keyCode == 38) {
            cima = false;
        }
        if (event.keyCode == 40) {
            baixo = false;
        }
    })
}

function movimentoRaquete() {
    if (cima == true) {
        yRaq1 -= velRaqt;
    }
    if (baixo == true) {
        yRaq1 += velRaqt;
    }
}

function movimentoRaquete2() {
    if (yBolinha < yRaq2) {
        yRaq2 -= velRaqt;
    } else {
        yRaq2 += velRaqt;
    }
}

function movimentoRaquete2() {
    if (velXBolinha > 0) {
        if (velYBolinha < 0) {
            if (yBolinha < (yRaq2 + hRaq / 2)) {
                yRaq2 -= velRaqt * 1.2;
            }
        } else {
            if (yBolinha > (yRaq2 + hRaq / 2)) {
                yRaq2 += velRaqt * 1.2;
            }
        }
    }else {
        if (xBolinha < 300) {

            if (velYBolinha < 0) {
                if (yBolinha < (yRaq2 + hRaq / 2)) {
                    yRaq2 -= velRaqt * 1.2;
                }
            } else {
                if (yBolinha > (yRaq2 + hRaq / 2)) {
                    yRaq2 += velRaqt * 1.2;
                }
            }
        }
    }
}

function desenhaPlaca() {
    ctx.rect(190, 10, lPlaca, hPlacar);
    ctx.rect(340, 10, lPlaca, hPlacar);
    ctx.fill();
    ctx.beginPath();
    ctx.font = "20pt Arial";
    ctx.fillStyle = '#000';
    ctx.textBaseline = "middle";
    ctx.textAlign = "center";
    ctx.fillText(ptPg1,(190 + lPlaca/2),28);
    ctx.fillText(ptPg2,(340 + lPlaca/2),28);
}

function pontos() {
    if(velXBolinha < 0){
        if(xBolinha - raio <= 1){
            ptPg2 += 1;
        }
    }
    if(velXBolinha > 0 && xBolinha + raio > 597){
        ptPg1 += 1;
    }
}