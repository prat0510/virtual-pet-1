//Create variables here
var dog,dogImg,dogHappy;
var database;
var food,foodStock;

function preload(){
  dogImg = loadImage("images/dogImg.png");
  dogHappy = loadImage("images/dogImg1.png");
}

function setup() {
  database = firebase.database();
	createCanvas(500,500);
  
  dog = createSprite(250,250,10,10);
  dog.addImage(dogImg);
  dog.scale = 0.20;

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
}
function draw() {  

  background(46,139,87);

  if(keyWentDown(UP_ARROW)) {
    writeStock(food);
    dog.addImage(dogHappy);
  }
  drawSprites();
  //add styles here
  textSize(20);
  fill(225,0,0);
  stroke("black");
  text("Food Remaining:" + food,150,170);
  text("press up arrow to feed",150,140);
}

function readStock(data) {
  food = data.val();
}

function writeStock(x) {
  if(x<=0) {
    x = 0;
  }
  else{
    x = x-1;
  }
  database.ref('/').update({
    Food:x
  })
}