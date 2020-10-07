var Engine = Matter.Engine,
  World = Matter.World,
  Events = Matter.Events,
  Bodies = Matter.Bodies;
 
var particle;
var plinkos = [];
var divisions = [];

var divisionHeight=300;
var score = 0;
var turn = 0;
var state = "start";

function setup() {

  createCanvas(800, 800);
  engine = Engine.create();
  world = engine.world;
  ground = new Ground(width/2,height,width,20);


   for (var k = 0; k <=width; k = k + 80) {

     divisions.push(new Divisions(k, height-divisionHeight/2, 10, divisionHeight));
   }

    for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,75));
    }

    for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,175));
    }

     for (var j = 75; j <=width; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,275));
    }

     for (var j = 50; j <=width-10; j=j+50) 
    {
    
       plinkos.push(new Plinko(j,375));
    }
}

function draw() {
  background("black");
  Engine.update(engine);
 
 ground.display();
  
   for (var i = 0; i < plinkos.length; i++) {
     
     plinkos[i].display();
   }

   for (var k = 0; k < divisions.length; k++) {
     
     divisions[k].display();
   }

  if(particle!=null){

    var pos = particle.body.position;
    particle.display();

     if (pos.y>760){

        if (pos.x<330){

          score = score+500;
          particle = null;

          if (turn>=5){

            state = "end";
          }
        }
        if (pos.x>330&&pos.x<570){

          score = score+100;
          particle = null;

          if (turn>=5){

            state = "end";
          }
        }
        if (pos.x>570){

          score = score+200;
          particle = null;

          if (turn>=5){

            state = "end";
          }
        }
     }
  }

   fill("white");
   textSize(20);

  text("500",20,530);
  text("500",100,530);
  text("500",180,530);
  text("500",260,530);

  text("100",340,530);
  text("100",420,530);
  text("100",500,530);

  text("200",580,530);
  text("200",660,530);
  text("200",740,530);

  text("Score: "+score,20,30);

if (state==="end") {
  
  push()
  fill("grey")
  textSize(75);
  text("GameOver",200,350);
  pop();
}

}

function mousePressed() {
  
  if (state!="end") {
    
    turn++
    particle = new Particle(mouseX, 10, 10, 10);
  }
}