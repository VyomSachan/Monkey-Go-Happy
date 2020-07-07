//Global Variables
var monkey_anim, banana_img, stone_img, background_img, back, ground_img, invisibleGround, monkey, stoneGroup, foodGroup, score;

function preload(){
  monkey_anim = loadAnimation("Monkey_01.png", "Monkey_02.png", "Monkey_03.png", "Monkey_04.png", "Monkey_05.png", "Monkey_06.png", "Monkey_07.png", "Monkey_08.png", "Monkey_09.png", "Monkey_10.png");
  
  background_img = loadImage("jungle resized2.jpg");
  stone_img = loadImage("stone.png");
  banana_img = loadImage("Banana.png");
  ground_img = loadImage("ground resized.jpg");
}

function setup(){
  createCanvas(600,300);
  
  invisibleGround = createSprite(width/2, 400, 20, 20);
  invisibleGround.addImage(ground_img);
  invisibleGround.visible = false;
  
  back = createSprite(width/2, 150, 20, 20);
  back.addImage(background_img);
  back.velocityX = -3;
  
  monkey = createSprite(60, 20, 20,20);
  monkey.addAnimation("player", monkey_anim);
  monkey.scale = 0.1;
  
  stoneGroup = new Group();
  foodGroup = new Group();
  
  score = 0;
  
  //monkey.debug = true;
}

function draw(){
 background(255);
  
  if(back.x < 180){
     back.x = width/2;
  }
  
  if(invisibleGround.x < 0){
     invisibleGround.x = width/2;
  }
  
  if(monkey.isTouching(foodGroup)){
    foodGroup.destroyEach();
    score = score + 2;
  }
  
  if(monkey.isTouching(stoneGroup)){
    stoneGroup.destroyEach();
    score = 0;    
    monkey.scale = 0.1;
  }
  
  monkey.velocityY = monkey.velocityY + 1.5;
  
  if(keyDown("space") && monkey.y >= 220){
    monkey.velocityY = -24; 
  }
  
  stoneGroup.setColliderEach("circle",-10,0,120);
  
  monkey.collide(invisibleGround);
  
    switch(score){
        case 10: monkey.scale = 0.13;
        break;
        
        case 20: monkey.scale = 0.16;
        break;
        
        case 30: monkey.scale = 0.19;
        break;
        
        case 40: monkey.scale = 0.22;
        break;
        
        case 50: monkey.scale = 0.25;
        break;
        
        case 60: monkey.scale = 0.28;
        break;
        
        case 70: monkey.scale = 0.31;
        break;
        
        case 80: monkey.scale = 0.34;
        break;
        
        case 90: monkey.scale = 0.37;
        break;
        
        case 100: monkey.scale = 0.40;
        break;

        default: break;
    }
  
  obstacles(); 
  bananas();
  
  drawSprites();
  
  textSize(20);
  textAlign(CENTER);
  fill("white");
  text("Score : "+ score, width/2, 30);
}

function obstacles(){
  if(frameCount % 300 == 0){
    var stone = createSprite(width + 10,240,20,20);
    stone.addImage(stone_img);
    stone.velocityX = -7;
    stone.scale = 0.18;
    stone.lifetime = -Math.round(width/stone.velocityX);
    //stone.debug = true;
    stoneGroup.add(stone);
  }
}

function bananas(){
  if(frameCount % 80 == 0){
    var banana = createSprite(width + 10,random(10,160));
    banana.addImage(banana_img);
    banana.scale = 0.05;
    banana.velocityX = -7;
    banana.lifetime = -Math.round(width/banana.velocityX);
    foodGroup.add(banana);
  }
}