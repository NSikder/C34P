//Create variables here
var dog2, happyDog, database, foodS, foodStock;


function preload()
{
  //load images here
  dog2 = loadImage("images/dogImg1.png")
  happyDog = loadImage("images/dogImg.png")
}

function setup() {
  database = firebase.database();
	createCanvas(500, 500);
  
  foodStock = database.ref("Food");
  foodStock.on("value",readStock);

  dog = createSprite(250,250,10,10);
  dog.addImage(dog2);
  dog.scale = 1/4;
}


function draw() {  
  background(46, 139, 87);
  if(keyWentDown(UP_ARROW)){
    writeStock(foodS);
    if(foodS>0){
    dog.addImage(happyDog);
    }
  }
  if(keyWentUp(UP_ARROW)){
    //writeStock(foodS);
    dog.addImage(dog2);
  }

  textSize(24);
  fill(255,255,255);
  text("Food Remaining: "+foodS,150,150);
  textSize(20)
  text("Press the Up Arrow to Feed the Dog Milk",75,50)
  drawSprites();
  //add styles here

}

function readStock(data){
  foodS=data.val();
}
function writeStock(x){

  if(x<=0){
    x=0;
  }else{
    x=x-1;
  }

  database.ref("/").update({
    Food:x
  })
}
