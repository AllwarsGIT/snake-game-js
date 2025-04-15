

//general
let points = 0;
let gameStart = false;

//movimiento
let movementSpeed = 200;
let lastMoveTime = 0;

//snake
let posX;
let posY;
let bodySize = 20;
let dx = 0;
let dy = 0;
let snake = [];

//apple
let appleSize = 20;
let appleX;
let appleY;


function setup() {
  createCanvas(bodySize * 20 + 0.5, bodySize * 20);
  posX = width/2;
  posY = height/2;
  background(220);
  noStroke();
  randomizeApplePosition();
  snake.push({ x:posX, y:posY });
  snake.push({ x: posX - bodySize, y: posY });  
  snake.push({ x: posX - 2 * bodySize, y: posY });
  //console.log(JSON.stringify(snake));
  console.log("Press D to start");
  console.log("Welcome to my snake!\nMove around with W A S D\nYou can use the edges of the map to appear on the other side.\nBe careful though, when you eat the apples, the snake will move faster and faster, when you collide with your body you will lose!");
  console.log(textoInicioJuego);
}

function draw() {

  if(millis() > movementSpeed + lastMoveTime){
    if(gameStart){
      snakeMovement();
      colisionCuerpo();
    }
    
    lastMoveTime = millis();
  }
  
  background(220);
  //puntuacion
  textPoints();
  
  //apple
  fill(250,50, 50)
  rect(appleX, appleY, appleSize, appleSize);
  //cuadrado inicial

  fill(0,250,120);
  //rect(posX,posY, bodySize ,bodySize);
  
  for(let i = 0;i < snake.length; i++){
    rect(snake[i].x, snake[i].y, bodySize, bodySize);
  }
}

function snakePoints(){
  if (snake[0].x < appleX + bodySize && snake[0].x + bodySize > appleX 
      && snake[0].y < appleY + bodySize && snake[0].y + bodySize > appleY){
    points++;
    growSnake();
    movementSpeed -= (200 * 2) / 100;//incremento del 2% por manzana
    //console.log(movementSpeed);
    // console.log(JSON.stringify(snake));
    randomizeApplePosition();
  }
   
}

function growSnake(){
  snake.push({x: -bodySize,y: -bodySize});
}

function randomizeApplePosition(){
  let gridSize = bodySize;
  appleX = Math.floor(random(width/gridSize)) * gridSize;
  appleY = Math.floor(random(height/gridSize))* gridSize;
  
}

function textPoints(){
  fill(0, 0, 0, 25);
  textSize(height * width /1000);
  textAlign(CENTER, CENTER);
  text(points, height/2, width/2);
  snakePoints();

}

function snakeMovement(){
  for(let i = snake.length - 1 ; i > 0 ; i--){
    snake[i].x = snake[i - 1].x;
    snake[i].y = snake[i - 1].y;
  }  
  
  snake[0].x += dx;
  snake[0].y += dy;

  //teleport en los bordes
  if(snake[0].x >= width){
    snake[0].x = 0
  }
  else if(snake[0].x < 0){
    snake[0].x = width - bodySize;
  }
  if(snake[0].y >= height){
    snake[0].y = 0
  }
  else if(snake[0].y < 0){
    snake[0].y = height - bodySize;
  }
}

function colisionCuerpo(){
  for(let i = 1; i < snake.length; i++){
    if(snake[0].x === snake[i].x && snake[0].y === snake[i].y){
      console.log("You died");
      console.log(textoFinalJuego)
      noLoop(); 
    }
  }
}

function keyPressed(){
  
  if(key === "w" && dy == 0){
    dx = 0;
    dy = -bodySize;
   }
  else if(key === "s" && dy == 0){
    dx = 0;
    dy = bodySize;
  }
  else if(key === "a" && dx == 0){
    dx = -bodySize;
    dy = 0;
  }
  else if(key === "d" && dx == 0){
    dx = bodySize;
    dy = 0
    gameStart = true;
  }
} 

let textoInicioJuego = `⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢀⣀⣀⣀⣀⣀⣀⣀⣀⣀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⣠⣶⣿⣿⣿⣿⣿⣿⣿⣿⣿⡉⠙⣻⣷⣶⣤⣀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⣼⣿⣿⣿⡿⠋⠀⠀⠀⠀⢹⣿⣿⡟⠉⠉⠉⢻⡿⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠰⣿⣿⣿⣿⠀⠀⠀⠀⠀⠀⠀⣿⣿⣇⠀⠀⠀⠈⠇⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⢿⣿⣿⣿⣷⣄⠀⠀⠀⠀⠀⠉⠛⠿⣷⣤⡤⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠈⠻⣿⣿⣿⣿⣿⣶⣦⣤⣤⣀⣀⣀⡀⠉⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠙⠻⢿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣦⡀⠀⠀⠀⠀
⠀⠀⠀⢀⣀⣤⣄⣀⠀⠀⠀⠀⠀⠀⠀⠉⠉⠙⠛⠿⣿⣿⣿⣿⣿⣿⣦⠀⠀⠀
⠀⠀⣰⣿⣿⣿⣿⣿⣷⣤⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⢿⣿⣿⣿⣿⣧⠀⠀
⠀⠀⣿⣿⣿⠁⠀⠈⠙⢿⣿⣦⣄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢻⣿⣿⣿⣿⠀⠀
⠀⠀⢿⣿⣿⣆⠀⠀⠀⠀⠈⠛⠿⣿⣶⣦⡤⠴⠀⠀⠀⠀⠀⣸⣿⣿⣿⡿⠀⠀
⠀⠀⠈⢿⣿⣿⣷⣄⡀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⣰⣿⣿⣿⣿⠃⠀⠀
⠀⠀⠀⠀⠙⢿⣿⣿⣿⣶⣦⣤⣀⣀⡀⠀⠀⠀⣀⣠⣴⣾⣿⣿⣿⡿⠃⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠈⠙⠻⠿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⣿⡿⠟⠋⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠉⠙⠛⠛⠛⠛⠛⠛⠉⠁⠀⠀⠀⠀⠀⠀⠀⠀`;
let textoFinalJuego = `
⠀⠀⠀⠀⣀⠤⠔⠒⠒⠒⠒⠒⠒⠒⠦⢄⠀⠀⠀⠀⠀
⠀⢀⡴⠋⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⠑⢄⠀⠀
⢀⠎⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠈⢣⠀
⢸⠀⡄⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢢⠈⡇
⢸⠀⣇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⡼⠀⡇
⠘⡆⢸⠀⢀⣀⣤⣄⡀⠀⠀⠀⢀⣤⣤⣄⡀⠀⡇⠀⠀
⠀⠘⣾⠀⣿⣿⣿⣿⣿⠀⠀⠀⣿⣿⣿⣿⣿⠀⡇⠀⠀
⠀⠀⣿⠀⠙⢿⣿⠿⠃⢠⢠⡀⠙⠿⣿⠿⠃⠀⡇⠀⠀
⠀⠀⠘⣄⡀⠀⠀⠀⢠⣿⢸⣿⠀⠀⠀⠀⠀⣠⠇⠀⠀
⠀⠀⠀⠀⡏⢷⡄⠀⠘⠟⠈⠿⠁⠀⢠⡞⡹⠁⠀⠀⠀
⠀⠀⠀⠀⢹⠸⠘⢢⢠⠤⠤⡤⡄⢰⢡⠁⡇⠀⠀⠀⠀
⠀⠀⠀⠀⢸⠀⠣⣹⢸⠒⠒⡗⡇⣩⠌⢀⡇⠀⠀⠀⠀
⠀⠀⠀⠀⠈⢧⡀⠀⠉⠉⠉⠉⠁⠀⣀⠜⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠉⠓⠢⠤⠤⠤⠔⠊⠁⠀⠀⠀⠀⠀⠀`;