//Create variables here

var dog,happydog,dogimg;
var foodS,foodStock;
var database;

function preload()
{
  //load images here

  happydog = loadImage("dogImg1.png");
  dogimg = loadImage("dogImg.png");
}


function setup() {
	createCanvas(500, 500);

  dog = createSprite(250,250,50,50);
  dog.addImage(dogimg);
  dog.scale = 0.1;

  database = firebase.database();

  foodStock = database.ref('Food');
  foodStock.on("value",readStock);
  
}


function draw() {  
  
  background(46,139,87);

  if(keyWentDown(UP_ARROW)){

    writeStock(foodS);
    dog.addImage(happydog)
  }

  drawSprites();
  //add styles here

  fill(255,0,0);
  textSize(15);

  text("Food remaining : "+ foodS,200,350);

}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){

  if(x<=0){
    x=0
  }else{
    x=x-1;
  }

  database.ref('/').update({
    Food:x
  })

}

