var PLAY = 1;
var END = 0;
var gameState = PLAY;

var score = 0;


function preload(){
 
  obstacle1 = loadImage("images/frown.png");
  obstacle2 = loadImage("images/lose.png");
  obstacle3 = loadImage("images/sadness.png");
  obstacle4 = loadImage("images/stressful.png");
  obstacle5 = loadImage("images/worries.png");
  
  Faith = loadImage("images/faith.png");
  Happiness = loadImage("images/happyness.png");
  Hope = loadImage("images/hope.png");
  Joyful =loadImage("images/joyful.png");
  Smile =loadImage("images/smile.png");
  
  womanRunning = loadAnimation("images/runningwoman1.png","images/runningwoman2.png","images/runningwoman3.png","images/runningwoman4.png","images/runningwoman5.png","images/runningwoman6.png","images/runningwoman7.png","images/runningwoman8.png");
  womanstop = loadAnimation("images/runningwoman8.png");

  gameOverImg = loadImage("images/gameOver.png");
  restartImg = loadImage("images/restart.png");

}

function setup() {
  createCanvas(600, 200);
  
  woman = createSprite(50,180,20,50);
  woman.scale = 0.6;
  woman.addAnimation("running", womanRunning);
  woman.addAnimation("stop",womanstop);
  
  gameOver = createSprite(300,100);
  gameOver.addImage(gameOverImg);
  
  restart = createSprite(300,140);
  restart.addImage(restartImg);
  
  gameOver.scale = 0.5;
  restart.scale = 0.5;

  gameOver.visible = false;
  restart.visible = false;
  
  invisibleGround = createSprite(300,190,600,10);
  invisibleGround.visible = false;
  
  positivityGroup = new Group();
  obstaclesGroup = new Group();
  
  
}

function draw() {
  //trex.debug = true;
  background(0);
  text("Score: "+ score, 500,50);
  
  if (gameState===PLAY){
    score = score + Math.round(getFrameRate()/60);
  
    if(keyDown("space") && woman.y >= 130) {
      woman.velocityY = -12;
    }
  
    woman.velocityY = woman.velocityY + 0.8
  /*
    if (ground.x < 0){
      ground.x = ground.width/2;
    }
  */
    woman.collide(invisibleGround);
    spawnPositivity();
    spawnObstacles();

    if(positivityGroup.isTouching(woman)){
      positivityGroup.destroyEach();
      score+=50;
    }
  
    if(obstaclesGroup.isTouching(woman)){
        gameState = END;
    }
  }
  else if (gameState === END) {
    gameOver.visible = true;
    restart.visible = true;
    
    //set velcity of each game object to 0
    
    woman.velocityY = 0;
    obstaclesGroup.setVelocityXEach(0);
    positivityGroup.setVelocityXEach(0);
    
    //change the woman animation
    woman.changeAnimation("stop",womanstop);
    
    //set lifetime of the game objects so that they are never destroyed
    obstaclesGroup.setLifetimeEach(-1);
    positivityGroup.setLifetimeEach(-1);
    
    if(mousePressedOver(restart)) {
      reset();
    }
  }
  
  
  drawSprites();
}

function spawnPositivity() {
  //write code here to spawn the pluspoints
  if (frameCount % 240 === 0) {
    var positivity = createSprite(600,120,40,10);
    positivity.y = Math.round(random(50,100));
   
     //generate random obstacles
     var rand = Math.round(random(1,5));
     switch(rand) {
       case 1: positivity.addImage(Faith);
               break;
       case 2: positivity.addImage(Happiness);
               break;
       case 3: positivity.addImage(Hope);
               break;
       case 4: positivity.addImage(Joyful)
               break;
       case 5: positivity.addImage(Smile);
               break;
       default: break;
     }
    positivity.velocityX = -3;
    positivity.scale = 0.3;
     //assign lifetime to the variable
    positivity.lifetime = 200;
    
    //add each cloud to the group
    positivityGroup.add(positivity);
  }
  
}

function spawnObstacles() {
  if(frameCount % 120 === 0) {
    var obstacle = createSprite(600,165,10,40);
    //obstacle.debug = true;
    obstacle.velocityX = -(6 + score/100);
    
    //generate random obstacles
    var rand = Math.round(random(1,5));
    switch(rand) {
      case 1: obstacle.addImage(obstacle1);
              break;
      case 2: obstacle.addImage(obstacle2);
              break;
      case 3: obstacle.addImage(obstacle3);
              break;
      case 4: obstacle.addImage(obstacle4);
              break;
      case 5: obstacle.addImage(obstacle5);
              break;
      default: break;
    }
    
    //assign scale and lifetime to the obstacle           
    obstacle.scale = 0.3;
    obstacle.lifetime = 300;
    //add each obstacle to the group
    obstaclesGroup.add(obstacle);

  }
}

function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  restart.visible = false;
  
  obstaclesGroup.destroyEach();
  positivityGroup.destroyEach();
  
  woman.changeAnimation("running",womanRunning);
  /*
  if(localStorage["HighestScore"]<score){
    localStorage["HighestScore"] = score;
  }
  console.log(localStorage["HighestScore"]);
  */
  score = 0;
  
}