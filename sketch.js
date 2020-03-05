
let numBalls = Math.random(70, 100)*100;
let spring = 0.07;
let gravity = 0.03;
let friction = -1;
let balls = [];

function setup() {
  createCanvas(1450, 500);
  for (let i = 0; i < numBalls; i++) {
    balls[i] = new Ball(
      random(width),
      random(height),
      random(30, 70),
      i,
      balls
    );
  }
  //saveCanvas('myCanvas', 'png');
}

function mousePressed(){
  for (let i = 0; i < 1; i++){
    balls[i] = new Ball(
      mouseX,
      mouseY,
      random(30,70),
      i,
      balls);
  }
}

function draw2(){
  for (let i = 0; i < 5000; i=i+20) {
      fill(255, random(100,255), random(0,100));
      triangle(50+i, 50+i, 200-i, (2*i), 50+(2*i), 100+i);
      triangle(100+i, 50+(2*i), (2*i), 200-i, 50+i, 50+i);
  }
}

function draw3(){
  background(50);
  noFill();
  stroke(255);
  strokeWeight(8);
  ellipse(mouseX, mouseY, 45, 45);
}

function keyPressed(){
  if(keyCode == ENTER){
    background(0);
    draw2();
  }
  let i = 0
  if(keyCode == TAB){
    background(0);
    background(50);
    noFill();
    stroke(255);
    strokeWeight(8);
    ellipse(mouseX, mouseY, 45, 45);
    if(mousePressed){}
  }
}

function draw() {
  background(255);
  
  fill(random(0,100), random(100,255), 255);
  balls.forEach(ball => {
    ball.collide();
    ball.move();
    ball.display();
  });
    

}

class Ball {
  constructor(xin, yin, din, idin, oin) {
    this.x = xin;
    this.y = yin;
    this.vx = 0;
    this.vy = 0;
    this.diameter = din;
    this.id = idin;
    this.others = oin;
    //this.col = color(,255,100);
    this.history = [];
  }

  collide() {
    for (let i = this.id + 1; i < numBalls; i++) {
      // console.log(others[i]);
      let dx = this.others[i].x - this.x;
      let dy = this.others[i].y - this.y;
      let distance = sqrt(dx * dx + dy * dy);
      let minDist = this.others[i].diameter / 2 + this.diameter / 2;
      //   console.log(distance);
      //console.log(minDist);
      if (distance < minDist) {
        //console.log("2");
        let angle = atan2(dy, dx);
        let targetX = this.x + cos(angle) * minDist;
        let targetY = this.y + sin(angle) * minDist;
        let ax = (targetX - this.others[i].x) * spring;
        let ay = (targetY - this.others[i].y) * spring;
        this.vx -= ax;
        this.vy -= ay;
        this.others[i].vx += ax;
        this.others[i].vy += ay;
      }
    }
  }

  move() {
    this.vy += gravity;
    this.x += this.vx;
    this.y += this.vy;
    if (this.x + this.diameter / 2 > width) {
      this.x = width - this.diameter / 2;
      this.vx *= friction;
    } else if (this.x - this.diameter / 2 < 0) {
      this.x = this.diameter / 2;
      this.vx *= friction;
    }
    if (this.y + this.diameter / 2 > height) {
      this.y = height - this.diameter / 2;
      this.vy *= friction;
    } else if (this.y - this.diameter / 2 < 0) {
      this.y = this.diameter / 2;
      this.vy *= friction;
    }
    //println(this.history.length);
  }

  display() {
    //fill(random(0,255), random(0,255), random(0,255));
    mousePressed();
    keyPressed();
    ellipse(this.x, this.y, this.diameter, this.diameter);
  }


}

//add in trails for the balls
//add in 
