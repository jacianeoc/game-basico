//isso aqui é para saber o tamanho da tela para 
//que quando pegar um lugar aleatorio nas apare
//cer a barra de rolagem, só que tem que ter um
//evento para que quando o usuario alterar o ta
//manho da tela ele não quebrar o jogo :)
var widthWin = 0;
var heigthWin = 0;
var lifes = 1;
var time = 20;

var criaMosquitoTempo = 1500;
// colocando o nivel de dificudade em uma variavel
//(ela foi pega em window.location.href = 'game.html?' + nivel;)
//porque é uma forma de passar paramentros com o href
var level = window.location.search
level = level.replace('?','');

if (level === 'facil') {
    criaMosquitoTempo = 1500;
    time = 20;
} else if (level === 'normal'){
    criaMosquitoTempo = 1000;
    time = 15;
}else if (level === 'dificil'){
    criaMosquitoTempo = 750;
    time = 10; 
}
function ajustGame() {
    widthWin = window.innerWidth
    heigthWin = window.innerHeight
    console.log(widthWin, heigthWin);
    
}
/*
temos que associar esse function a um evento 
on resize  
*/
ajustGame()

var cronometro = setInterval(function() {
    if (time > 0) {
        time-=1;
        document.getElementById('cronometro').innerHTML = time;    
    }else if (time <= 0) {
        clearInterval(cronometro);
        clearInterval(criaMosca);
        window.location.href = "win.html";
    }
    
}, 1000);
/*tentando fazer sem ser no body, apenas tentando mesmo porque nao deu*/
//document.querySelector("body").addEventListener("onresize", ajustGame );

//jogando o bicho em lugares aleatorios, colocando em uma função por conta
//do dom 
function randomPosition(params) {
    
    //remover o mosquito caso exista anteriomente
    if (document.getElementById('fly')) {
        document.getElementById('fly').remove();
            if (lifes >= 3) {
                window.location.href = "end_game.html";
            } else {
                document.getElementById('v' + lifes).src = "imagens/coracao_vazio.png";
                lifes++;    
            }
    }

    var positionX = (Math.floor(Math.random() * widthWin)) - 110 ;//0 a ate o widthWin
    var positionY = (Math.floor(Math.random() * heigthWin)) - 110;
    
    if(positionX < 0){
        positionX = 0;
    }
    if(positionY < 0){
        positionY = 0;
    }

    // criando os elementos html  com o dom
    var fly = document.createElement('img');
    fly.src = 'imagens/mosca.png';
    fly.className = sizeFly() + ' ' + lado();
    fly.style.left = positionX + 'px';
    fly.style.top = positionY + 'px';
    fly.style.position = 'absolute';
    fly.id = 'fly';
    fly.onclick = function (){
        this.remove();
    }

    document.body.appendChild(fly);
}

function sizeFly() {
    var classe = Math.floor(Math.random() * 3);
    switch (classe) {
        case 0:
            return 'fly1';
            
        case 1:
            return 'fly2';
            
        case 2:
            return 'fly3';

        default:
            throw 'algo de errado nao esta certo' 
    }
}

//deixando ele mais dinamico mesmo, só alterando o lado
function lado() {
    var classe = Math.floor(Math.random() * 2);
    switch (classe) {
        case 0:
            return 'ladoA';
            
        case 1:
            return 'ladoB';

        default:
            throw 'algo de errado nao esta certo'
    }
}
