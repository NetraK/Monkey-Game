var PLAY = 1;
var END = 0;
var gameState = PLAY;

var monkey , monkey_running;
var ground;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var survivalTime;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}



function setup() {
  createCanvas(600,600)
 
  monkey = createSprite(80,315,20,20);
  monkey.addAnimation("moving",monkey_running);
  monkey.scale = 0.1;
  
  
  ground = createSprite(400,350,900,10);
  ground.x = ground.width/2;
  console.log(ground.x);
  
  FoodGroup = createGroup();
  obstacleGroup = createGroup();
  survivalTime = 0;
  
}


function draw() {
  background(255);
  
  stroke("black");
  textSize(20);
  fill("black"); 
  text("Survival Time : "+survivalTime,100,50);
  
  if(gameState === PLAY){
  survivalTime = Math.ceil(frameCount/frameRate());
  
  if(keyDown("space")){
    monkey.velocityY = -14;
  }
  
  monkey.velocityY = monkey.velocityY +1;
  
  monkey.collide(ground);
  
    
  ground.velocityX = -4;
    
  if(ground.x>0){
    ground.x = ground.width/2;
    
    food();
    spawnObstacles();
    
    if(obstacleGroup.isTouching(monkey)){
    obstacleGroup.setVelocityXEach(0);
    FoodGroup.setVelocityXEach(0);
    obstacleGroup.setLifetimeEach(-1);
    FoodGroup.setLifetimeEach(-1);
      
    }
  }
  }
  
  drawSprites();
  
}

function food() {
  if(frameCount%80 === 0){
  banana = createSprite(700,200,20,20);
  banana.velocityX = -6;
  banana.y = Math.round(random(120,200));
  banana.addImage(bananaImage);
  banana.scale = 0.1;
  banana.lifetime = 150;
    
  FoodGroup.add(banana);
    
  }
}

function spawnObstacles() {
  if(frameCount%300 === 0){
  obstacle = createSprite(700,322,20,20);
  obstacle.velocityX = -6;
  obstacle.addImage(obstacleImage);
  obstacle.scale = 0.12;
  obstacle.lifetime = 150;
    
  obstacleGroup.add(obstacle);
  
}
}
  






