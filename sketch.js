//gamestates
var PLAY = 1;
var END = 0;
var gameState = PLAY;

//creating all the sprites and group
var bananaImage, obstacleImage, backImage, player_running, invisibleGround, gameover;
var count = 0;
var counter = 0;
var obstacleGroup;
var fruitGroup

function preload(){
  //loading all the image and animation
  backImage = loadImage("jungle.png")
  
  player_running = loadAnimation("Monkey_01.png","Monkey_02.png","Monkey_03.png","Monkey_04.png","Monkey_05.png","Monkey_06.png","Monkey_07.png","Monkey_08.png","Monkey_09.png","Monkey_10.png");
  
  bananaImage = loadImage("Banana.png");
  obstacleImage = loadImage("stone.png");
  
  gameover = loadImage("gameover.png");
  
}
  
function setup() {
  //canvs size
  createCanvas(400, 400);
  
  //creating ground, invisible ground, game over, player and groups
  ground = createSprite(200,200,20,20);
  ground.addImage("ground", backImage);
  ground.x = ground.width/2;
  ground.velocityX = -2;
  
  invisibleGround = createSprite(200,370,400,10);
  invisibleGround.visible = false;
  
  gameOver = createSprite(200,200,20,20);
  gameOver.addImage("over", gameover);
  gameOver.visible = false;
  gameOver.scale = 0.5;
  
  player = createSprite(70,340,20,20);
  player.addAnimation("running", player_running);
  player.scale = 0.2;
  
  fruitGroup = new Group();
  obstacleGroup = new Group();
}

function draw() {
  //background
  background(220);
  
  if (gameState === PLAY) {
    //ground movement
     if (ground.x < 0){
        ground.x = ground.width/2;
     } 
    
    //score
    count = count + Math.round(getFrameRate()/60);
    
    //points
    if(fruitGroup.isTouching(player)){
      fruitGroup.destroyEach();
      
    }
    
    switch(count){
      case 10: player.scale = 0.12;
        break;
      case 20: player.scale = 0.14;
        break;
      case 30: player.scale = 0.16;
        break;
      case 40: player.scale = 0.18;
        break;
      default: break;    
    }
    
    fruit();
    obstacle();
    
    //decrease the size and gameover
    if(obstacleGroup.isTouching(player)){
      
      switch(counter){
      case 1: gameState = END;
      break;
      default: player.scale = 0.2;
      counter++;
      break;
          
      }
    }
    
  }
  
  if (gameState === END) {
    
    gameOver.visible = true;
    
    ground.velocityX = 0;
    
    fruitGroup.setVelocityXEach(0);
    obstacleGroup.setVelocityXEach(0);
    
    fruitGroup.setLifetimeEach(-1);
    obstacleGroup.setLifetimeEach(-1);
    
  }
     
  drawSprites();
  stroke("white");
  textSize("20");
  fill("white");
  text("Score: " + count, 340, 50);
}

function fruit(){
if (frameCount % 80 === 0) {
  
    //creating banana
    var banana = createSprite(200,200,10,10);
    banana.y = Math.round(random(120,180));
    
    banana.addAnimation("bananaImage");
    banana.scale = 0.05;
    
    //velocity and lifetime
    banana.velocityX = -3;
    banana.lifetime = 134;
    
    //group
    fruitGroup.add(banana);
  }
}

function obstacle(){
  
if (World.frameCount % 300 === 0) {
  
    //creating obstacle
    var obstacle = createSprite(300,350,20,20);
    
    obstacle.addAnimation("obstacleImage");
    obstacle.scale = 0.15; 
    
    //lifetime and velocity
    obstacle.velocityX = -6;
    obstacle.lifetime = 67;
    
    //collider
    obstacle.setCollider("rectangle",0,0,20,20);
     
    //group
    obstacleGroup.add(obstacle);
  }
}