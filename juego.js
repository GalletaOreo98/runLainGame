document.addEventListener('keydown', function(evento){
    if(evento.keyCode == 32){
        if (!personaje.saltando) {
            saltar();
            jumpSound.play();
        }
    }
});

    document.addEventListener('touchstart', function(event){
        if(personaje.vivo){
            if (!personaje.saltando) {
                saltar();
                jumpSound.play();
            }
        }
        
});

function tapOrClick() {
    if(!personaje.vivo){
        personaje.vivo=true;
        dataBaseObstaculo.x = w+100;
        nivel.puntuacion=0;
        nivel.velocidad=7;
        deadSound.isPlayed=false;
        document.getElementById("botonEnviar").disabled = true;
    }
 }

var imgPersonaje, imgEdificio, imgObstaculo, imgSuelo, imgSuelo1, imgSuelo2, imgGameOver, imgPersonajeR1, imgPersonajeR2, imgPersonajeDead, imgPersonajeSaltando, imgreplayboton;

function cargarImagenes() {
    imgPersonaje = new Image();
    imgEdificio = new Image();
    imgObstaculo = new Image();
    imgSuelo = new Image();
    imgSuelo1 = new Image();
    imgSuelo2 = new Image();
    imgGameOver = new Image();
    imgPersonajeR2 = new Image();
    imgPersonajeDead = new Image();
    imgPersonajeSaltando = new Image();
    imgPersonajeR1 = new Image();
    imgreplayboton = new Image();

    imgPersonaje.src = '/data/personajeRun1.png';
    imgEdificio.src = '/data/fondo.PNG';
    imgObstaculo.src = '/data/obstaculo1.png';
    imgSuelo.src = '/data/land1.png';
    imgSuelo1.src = '/data/land2.png';
    imgSuelo2.src = '/data/land3.png';
    imgGameOver.src = '/data/gameoverText.png';
    imgPersonajeDead.src= '/data/personajeDead.png';
    imgPersonajeSaltando.src='/data/personajeSaltando.png';
    imgPersonajeR1.src='/data/personajeRun1.png';
    imgPersonajeR2.src='/data/personajeRun2.png';
    imgreplayboton.src='/data/replayButton.png';
}

var w=700;
var h=300;
var SUELO=218;

var personaje = {
    width: 40,
    height: 84,
    y: SUELO-10,
    x: 100,
    vy: 0,
    gravedad: 1,
    salto: 15,
    saltando: false,
    vivo: true
};
var nivel = {
    velocidad: 7,
    puntuacion: 0
}
var dataBaseObstaculo = {
    width: 35,
    height: 49,
    x: w+100,
    y: SUELO+25
}

var jumpSound = new Howl({
    src: ['/data/jump.wav'],
    volume: 1.0,
});

var deadSound = new Howl({
    src: ['/data/dead.wav'],
    volume: 1.0,
    isPlayed: false
});

var scoreUpSound = new Howl({
    src: ['/data/scoreup.wav'],
    volume: 1.0
});

var arraySuelo = [
    {
    x: 0,
    y: SUELO
},
    {
    x: 195,
    y: SUELO
},
    {
    x: 195*2,
    y: SUELO
},
    {
    x: 195*3,
    y: SUELO
},
    {
    x: 195*4,
    y: SUELO
},
    {
    x: 195*5,
    y: SUELO
}

];

var arrayEdificios = [
    {
    x: 0,
    y: SUELO
},
    {
    x: 195,
    y: SUELO
},
    {
    x: 195+46,
    y: SUELO
},
    {
    x: 195+147,
    y: SUELO
},
    {
    x: 40,
    y: SUELO
}

];
var canvas;
var ctx;

function inicializar() {
    canvas = document.getElementById('canvas');
    ctx = canvas.getContext('2d');
    cargarImagenes();   
}

function borrarCanvas() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

function dibujarFondo(){
    var grd = ctx.createLinearGradient(0,0,0,h);
    grd.addColorStop(0,"#b01fac");
    grd.addColorStop(1,"#23255e"); 

    ctx.fillStyle = grd;
    ctx.fillRect(0,0,w,h);
}

function dibujarPersonaje() {
    if (isCollision(
        {x: personaje.x, y: personaje.y, width: personaje.width, height: personaje.height},
        {x: dataBaseObstaculo.x, y: dataBaseObstaculo.y, width: dataBaseObstaculo.width, height: dataBaseObstaculo.height}
    )) {
        imgPersonaje=imgPersonajeDead;
        ctx.drawImage(imgPersonaje, 0 , 0, 40, 84, personaje.x, personaje.y, 40, 84);imgGameOver
        ctx.drawImage(imgGameOver, 0 , 0, 218, 22, w/2 - 218/2, h/2 - 22/2, 218, 22);imgreplayboton
        ctx.drawImage(imgreplayboton, 0 , 0, 34, 30, w/2 - 34/2, h/2 - 30/2 + 40, 34, 30);
        personaje.vivo=false;
        if(!deadSound.isPlayed){
            deadSound.play();
            document.getElementById("puntuacion").value = nivel.puntuacion;
            deadSound.isPlayed=true;
            document.getElementById("botonEnviar").disabled = false;
        }
    }else{
        ctx.drawImage(imgPersonaje, 0 , 0, 40, 84, personaje.x, personaje.y, 40, 84);
        /*ctx.fillRect(personaje.x, personaje.y, personaje.width, personaje.height);
        ctx.clearRect(personaje.x, personaje.y, personaje.width, personaje.height);
        ctx.strokeRect(personaje.x, personaje.y, personaje.width, personaje.height);*/
    }
}

function dibujarObstaculo() {
    ctx.drawImage(imgObstaculo, 0, 0, 35, 49, dataBaseObstaculo.x, dataBaseObstaculo.y, 35, 49);
    /*ctx.fillRect(dataBaseObstaculo.x, dataBaseObstaculo.y, dataBaseObstaculo.width, dataBaseObstaculo.height);
    ctx.clearRect(dataBaseObstaculo.x, dataBaseObstaculo.y, dataBaseObstaculo.width, dataBaseObstaculo.height);
    ctx.strokeRect(dataBaseObstaculo.x, dataBaseObstaculo.y, dataBaseObstaculo.width, dataBaseObstaculo.height);*/
}

function actualizarDataBaseObstaculo() {
    if(dataBaseObstaculo.x < -100){
        dataBaseObstaculo.x = w+100;
        nivel.puntuacion += 20;
        if (nivel.puntuacion%100==0) {
            scoreUpSound.play();
        }
    }else{
        dataBaseObstaculo.x -= nivel.velocidad;
    }
}

function isCollision(rect1, rect2) {
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        return true;
     }
}
function dibujarSuelo() {
    for(let i=0; i<6;i++){
        ctx.drawImage(imgSuelo, 0, 0, 201, 82, arraySuelo[i].x, arraySuelo[i].y, 201, 82);
    } 
}

function actualizarSuelo() {
    for(let i=0; i<6;i++){
        if(arraySuelo[i].x - nivel.velocidad < -201){
            arraySuelo[i].x = w;
        }else{
            arraySuelo[i].x -= nivel.velocidad;
        }
    }
}

function dibujarEdificios() {
    for(let i=0; i<5;i++){
        ctx.drawImage(imgEdificio, 0, 0, 80, 160, arrayEdificios[i].x, arrayEdificios[i].y, 80, 160);
    } 
}

function actualizarEdificios() {
    for(let i=0; i<5;i++){
        if(arrayEdificios[i].x - nivel.velocidad < -80){
            //Math.random() * (max - min) + min;
            arrayEdificios[i].y = Math.random() * (220 - 110) + 110;
            arrayEdificios[i].x = w+Math.random() * (80 - 0) + 0;
        }else{
            arrayEdificios[i].x -= nivel.velocidad-3;
        }
    }
}

function saltar() {
    personaje.saltando=true;
    personaje.vy = personaje.salto;
}

function gravedad() {
    if (personaje.saltando) {
        if (personaje.y - personaje.vy - personaje.gravedad > SUELO) {
            personaje.saltando=false;
            personaje.vy=0;
            personaje.y=SUELO-10;
        }else{
            personaje.vy -= personaje.gravedad;
            personaje.y -= personaje.vy;
        }

    }
}

var nFrame=0;
    
function animacion() {
    if(!personaje.saltando){
    if (nFrame==25) {
        imgPersonaje=imgPersonajeR2;
    }

    if (nFrame==50) {
        nFrame=0;
        imgPersonaje=imgPersonajeR1;
    }
    }else{
        imgPersonaje = imgPersonajeSaltando;
        nFrame=20;
    }  
}

function aumentarDificultad() {
    nivel.velocidad += 0.001;
}

function pintarTextos() {
ctx.fillStyle="white"; //color de relleno
ctx.font="bold 15px arial"; //estilo de texto
ctx.fillText("Score: " + nivel.puntuacion ,10,20); //texto con método fill
ctx.fillText("Yottabytes: " + Number.parseFloat(nivel.velocidad-7).toFixed(2), 10, 40);
}

//Principal bucle
var fps = 55;
setInterval(function () {
    principal();
}, 1000/fps);



function principal() {
    if (personaje.vivo) {
    borrarCanvas();
    dibujarFondo();
    dibujarEdificios();
    gravedad();
    dibujarSuelo();
    dibujarObstaculo();
    dibujarPersonaje();
    actualizarDataBaseObstaculo();
    actualizarSuelo();
    actualizarEdificios();
    animacion();
    pintarTextos();
    aumentarDificultad();
    nFrame++;
    }else{
        dibujarPersonaje();
    }
    
}