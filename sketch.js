// Hello my dear coders!! Myself Drishti Garg.
// Welcome to my world Of code. Here's the code for the game          "JUMPING JAPAAK". So let's get started.

// At first we will make GameStaes.
// In this I have made four states; u can make as much gamestates     u want. 
var START = 0;
var PLAY = 1;
var END = 2;
var SERVE = 3
var gameState = 0;

// Here are the Global variables 
// for backgrounds(bg)
var bg1, bg2, bg3, bg4;
var bg1Image, bg2Image, bg3Image, bg4Image;

// for monkey
var monkey, monkey_running, monkey_collided;

// for bannanaGroup and ObstacleGroup
var banananImage1, bananaImage2, bananaImage3, bananaImage4;     var obstacleImage1, obstacleImage2;
var bananaGroup, obstacleGroup;

// for gameOver, yes and no,
var gameOverImage, yesImage, noImage;

// for score and survival Time
var score = 0;
var survivalTime = 0;

let font1;
let font2;


function preload(){
  
// now we will load the images
  
  bg1Image = loadImage("bg1.jpg");
  bg2Image = loadImage("bg2.jpg");
  bg3Image = loadImage("bg3.png");
  bg4Image = loadImage("bg4.jpg");
  
  monkey_running  =loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png");
  monkey_collided =loadAnimation("sprite_0.png");
  
  bananaImage1 = loadImage("bananaImage1.png");
  bananaImage2 = loadImage("bananaImage2.png");
  bananaImage3 = loadImage("bananaImage3.png");
  bananaImage4 = loadImage("bananaImage4.png");
  
  obstacleImage1 = loadImage("obstacleImage1.png");
  obstacleImage2 = loadImage("obstacleImage2.png");
  
  gameOverImage = loadImage("GameOver.png");
  yesImage = loadImage("yes.png");
  noImage = loadImage("no.png");
  
 font1 = loadFont("Dagtton.ttf")
 font2 = loadFont("Easter Bird.ttf")
 }



function setup() {
  // Here we have created a canvas
  createCanvas(600,500)

 // creating bg4
  bg4 = createSprite(250,250,600,600);
  bg4.addImage(bg4Image);
  bg4.scale = 1;
  
  // creating bg3
  bg3 = createSprite(250,250,600,600);
  bg3.addImage(bg3Image);
  bg3.scale = 1.5;
  
  // creating bg2
  bg2 = createSprite(250,250,600,600);
  bg2.addImage(bg2Image);
  bg2.scale = 1;
  bg2.velocityX = -(4 + 2*score/2);
  bg2.x=bg2.width/2;
  console.log(bg2.x);
  
  // creating bg1
  bg1 = createSprite(250,250,600,600);
  bg1.addImage(bg1Image);
  bg1.scale = 0.9;

  // creating monkey
  monkey = createSprite(70,310,20,20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collided", monkey_collided);
  monkey.scale = 0.12;
  monkey.debug = true;
  
  // creating invisile groung so that monkey should not fall down
  invisibleGround = createSprite(70,450,600,10);
  invisibleGround.visible = false;
  
  // creating groups
  bananaGroup = new Group();
  obstacleGroup = new Group();
  obstaclesGroup = new Group();
  
  /// assigning score value
  score = 0;
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImage);
  gameOver.scale = 0.8;
  gameOver.visible = false;
  
  yes = createSprite(150,340);
  yes.addImage(yesImage);
  yes.scale = 0.3;
  yes.visible = false;
  
  no = createSprite(450,340);
  no.addImage(noImage);
  no.scale = 0.4;
  no.visible = false;
  
  
}



function draw() {
  
  monkey.collide(invisibleGround);
  
  drawSprites();
  
  if(gameState === START){
    
bg1.visible = true;
bg2.visible = false;
bg3.visible = false;
bg4.visible = false;
monkey.visible= false;
    
stroke("greem")
textSize(35)
fill("Black")
textFont(font2)
text("Press Enter to Play" ,150,150)
    
stroke("greem")
textSize(35)
fill("Black")
textFont(font2)
text("Press Space Key to Jump" ,150,350)
    
if (keyDown("enter") && gameState ===0)
  gameState = PLAY;
    
    } else if (gameState === PLAY){
bg1.visible = false;
bg2.visible = true;
bg3.visible = false;
bg4.visible = false;
monkey.visible= true;
    
if(bananaGroup.isTouching(monkey)){
      score = score + 1;
    bananaGroup.destroyEach();
  }
    
spawnObstacless();
spawnBananas();
spawnObstacles();
    
    
if (bg2.x < 200){
  bg2.x = bg2.width/2;}
    
if(keyDown("space") && monkey.y >= 200 ) {
monkey.velocityY = -12;}
 monkey.velocityY = monkey.velocityY + 0.8
    
survivalTime=Math.ceil(frameCount/frameRate())

if(obstacleGroup.isTouching(monkey) || obstaclesGroup.isTouching(monkey) && gameState === PLAY){
gameState = END;
}
    
    
} else if (gameState === END){
    
bg1.visible = false;
bg2.visible = false;
bg3.visible = true;
bg4.visible = false;
    
gameOver.visible = true;
yes.visible = true;
no.visible = true;
    
monkey.changeAnimation("collided",monkey_collided);
monkey.visible = false;
    
bg2.velocityX = 0
monkey.velocityY = 0;
    
obstacleGroup.visible = false;
bananaGroup.visible = false;
    
  stroke("greem")
textSize(35)
fill("#e5ff00")
textFont(font2)
text("   Play    Again" ,190,275)
    
monkey.velocityY = 0;
  obstacleGroup.setVelocityXEach(0);
  bananaGroup.setVelocityXEach(0);
  obstaclesGroup.setVelocityXEach(0);
    
  if(mousePressedOver(yes) && gameState === END){
    gameState = 0;
    yess();
  }else if(mousePressedOver(no) && gameState === END){
    gameState = 3
    nos();
  }
    
  } else if(gameState === SERVE){
  bg1.visible = false;
  bg2.visible = false;
  bg3.visible = false;
  bg4.visible = true;
      
    gameOver.visible = false;
  yes.visible = false;
  no.visible = false;
      
    SurvivalTime = 0;
      
   
}
  
stroke("greem")
textSize(35)
fill("#f40000")
textFont(font2)
text("Survival Time :" + survivalTime ,50,50)
  
stroke("greem")
textSize(35)
fill("#f40000")
textFont(font2)
text("Score : " + score ,400,50)

  }
function spawnBananas() {
  
if (frameCount % 80 === 0) {
var banana = createSprite(575,120,40,10);
banana.y = Math.round(random(75,400));
banana.velocityX = -3;

var rand = Math.round(random(1,5));
switch(rand) {
case 1: banana.addImage(bananaImage1);
        break;
case 2: banana.addImage(bananaImage2);
        break;
case 3: banana.addImage(bananaImage3);
        break;
case 4: banana.addImage(bananaImage4);
        break;
default: break;
   }
      
banana.lifetime = 200;
banana.scale = 0.1;
banana.depth = monkey.depth;
monkey.depth = monkey.depth + 1;

bananaGroup.add(banana);
    }
  }


function spawnObstacles() {
  if(frameCount % 150 === 0) {
  var obstacle = createSprite(600,425,10,40);
  obstacle.velocityX = -6;
  obstacle.addImage(obstacleImage1);
      
  obstacle.scale = 0.1;
  obstacle.lifetime = 200;
  obstaclesGroup.add(obstacle);
    }
    }


function spawnObstacless() {
  if(frameCount % 280 === 0) {
  var obstacless = createSprite(600,400,10,40);
  obstacless.velocityX = -6;
  obstacless.addImage(obstacleImage2);
      
  obstacless.scale = 0.2;
  obstacless.lifetime = 200;
  obstacleGroup.add(obstacless);
    }
}

function yess(){
    bg1.visible = true;
    bg2.visible = false;
    bg3.visible = false;
    bg4.visible = false;
    monkey.visible= false;
    gameState = 0;
    monkey.changeAnimation("running",monkey_running);
    gameOver.visible = false;
    yes.visible = false;
    no.visible = false;
    bg2.velocityX = -(4 + 10*score/2);
 
    score = 0;
    survivalTime = 0;
    

}


function nos(){
    
    bg3.visible = false;
    bg1.visible = false;
    gameOver.visible = false;
    yes.visible = false;
    no.visible = false;
    bg2.visible = false
    bg4.visible = true;
  
  
}