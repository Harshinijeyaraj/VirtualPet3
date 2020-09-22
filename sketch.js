//Create variables here

var dog,happydog,foodsupply;
var database;

var bedroom,deadDog,garden,lazydog,livingRoom,running;
var runningLeft,vaccination,bathroom;


function preload()
{
  //load images here
  happydog.addImage("happydog.png");
  dog.addImage("Dog.png");
  foodsupply.addImage("Milk.png");
  bedroom.addImage("Bed Room.png");
  deadDog.addImage("deadDog.png");
  garden.addImage("Garden.png");
  lazydog.addImage("Lazy.png");
  livingRoom.addImage("Living Room.png");
  running.addImage("running.png");
  runningLeft.addImage("runningLeft.png");
  vaccination.addImage("Vaccination.png");
  bathroom.addImage("Wash Room.png");
}

function setup() {
  database = firebase.database();
  createCanvas(500,500);
  dog = createSprite(250,250,20,20);
 

  var dogposition = database.ref('dog/position');
  dogposition.on("value",readposition,showError);

  readState = database.ref('gameState');
  readState.on("value",function(data){
    gameState = data.val();
  });

  happydog.visibility = false;

  var readGameState;
  var changeGameState;

  bedroom();
  garden();
  bathroom();
	
  
}

function draw(){
  background("lightblue");
  if(position!==undefined)

  bedroom(){
  background(bedroom,550,500);
  }

  garden(){
    background(garden,550,500);
  }

  bathroom(){
    background(WashRoom,550,500);
  }
  
  currenttime=hour();
  if(currenttime==(lastFed+1)){
    update("Playing");
    foodObj.garden();
  } 
  else if(currenttime==(lastFed+2)){
    update("Sleeping");
    foodObj.bedroom();
  }
  else if(currenttime>(lastFed+2)&&currenttime<=(lastFed+4)){
    update("Bathing");
    foodObj.washroom();
  }
  else{
    update("Hungry");
    foodObj.display();
  }
  
  

  if(keyDown(UP_ARROW)){
     foodsupply = foodsupply - 1; 
  }
   if(keyDown(DOWN_ARROW)){
     foodsupply = foodsupply + 10;
      
  }

  if(foodsupply = foodsupply - 1){
    happydog.visibility = true;
  }

  //happydog should not be visible the whole time.

  else{
    happydog.visibility = false;
  }


  if(currenttime = lastFed+1){
    garden();
  }

  if(currenttime = lastFed+2){
    bedroom();
  }

  if(currenttime = lastFed+3){
    bathroom();
  }
  //alert the owner that there is no more food

  if(foodsupply = 0){
    background("red")
  }

  else{
    background("lightblue")
  }
  
  drawSprites();
}

function writePosition (x,y){
  
  database.ref('dog/position').set({
      'x':position.x + x,
      'y':position.y + y
  })
  

}

function readposition(data){
  position = data.val();
  dog.x = position.x,
  dog.y = position.y
}

function showError(){
  console.log("something went wrong");
}

function update(state){
database.ref('/').update({
  gameState:state
});
}

