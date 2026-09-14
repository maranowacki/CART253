/**
 * Lagoon
 * Mara Nowacki
 * 
 * Cute simple Lagoon drawing using p5 :3
 */

"use strict";

/**
 * I create the canvas once the program starts! It loads all the p5 data for my drawing!
*/
let cursorImage;

function preload() {
  cursorImage = loadImage('Cursor.png');
}

function setup() {
  createCanvas(800, 600);
  noCursor();
}


/**
 * I run the draw command over and over until the landscape is beautifully drawn!
*/
function draw() {
  background(55, 75, 125);

  fill(255, 190, 210);
  noStroke();
  circle(600, 90, 100);

  fill(190, 175, 225);
  circle(710, 140, 70);

  fill(255);
  circle(100, 70, 3);
  circle(180, 120, 4);
  circle(280, 60, 3);
  circle(350, 150, 4);
  circle(450, 80, 3);
  circle(520, 170, 3);
  circle(760, 70, 4);

  fill(130, 125, 175);
  circle(50, 180, 120);
  circle(150, 170, 130);
  circle(250, 210, 120);
  circle(730, 210, 150);
  circle(800, 160, 130);

  fill(65, 105, 105);
  triangle(0, 300, 90, 90, 180, 300);
  triangle(100, 300, 190, 120, 280, 300);
  triangle(220, 300, 320, 100, 420, 300);
  triangle(350, 300, 450, 130, 550, 300);
  triangle(500, 300, 600, 110, 700, 300);
  triangle(650, 300, 740, 130, 830, 300);

  fill(105, 105, 145);
  beginShape();
  vertex(0, 280);
  vertex(100, 220);
  vertex(180, 260);
  vertex(260, 200);
  vertex(340, 250);
  vertex(430, 210);
  vertex(520, 250);
  vertex(620, 200);
  vertex(720, 260);
  vertex(800, 220);
  vertex(800, 430);
  vertex(0, 430);
  endShape(CLOSE);

  fill(235, 145, 190);
  rect(340, 250, 70, 220);
  rect(410, 270, 60, 200);
  rect(470, 250, 80, 220);

  fill(250, 185, 215);
  rect(350, 250, 20, 220);
  rect(430, 270, 18, 200);
  rect(490, 250, 20, 220);

  fill(115, 160, 175);
  beginShape();
  vertex(0, 400);
  vertex(150, 370);
  vertex(300, 410);
  vertex(430, 390);
  vertex(580, 410);
  vertex(700, 370);
  vertex(800, 400);
  vertex(800, 600);
  vertex(0, 600);
  endShape(CLOSE);

  fill(125, 175, 145);
  ellipse(130, 510, 150, 45);
  ellipse(680, 520, 160, 50);
  ellipse(300, 570, 130, 40);

  fill(245, 180, 210);
  ellipse(430, 500, 100, 20);
  ellipse(450, 540, 130, 20);
  ellipse(470, 580, 150, 20);

  fill(230, 150, 80);
  ellipse(550, 500, 45, 25);
  triangle(530, 500, 510, 485, 510, 515);

  ellipse(650, 550, 55, 30);
  triangle(625, 550, 605, 530, 605, 570);

  ellipse(300, 520, 50, 28);
  triangle(278, 520, 260, 500, 260, 540);

  ellipse(400, 555, 35, 20);
  triangle(385, 555, 370, 540, 370, 570);

  fill(255, 150, 190);
  circle(100, 530, 25);
  circle(170, 570, 20);
  circle(700, 480, 22);
  circle(760, 550, 25);
  circle(580, 570, 20);

  fill(80, 60, 60);
  rect(40, 360, 15, 150);
  rect(10, 350, 80, 15);
  rect(55, 365, 45, 10);

  fill(255, 230, 170);
  rect(55, 385, 35, 50);

  fill(120, 75, 65);
  rect(650, 280, 120, 110);

  fill(170, 90, 100);
  triangle(630, 280, 710, 210, 790, 280);

  fill(255, 235, 170);
  rect(690, 315, 25, 30);
  rect(740, 300, 25, 30);

  fill(90, 65, 60);
  rect(720, 345, 30, 45);

  fill(90, 65, 60);
  rect(630, 365, 140, 10);
  rect(650, 350, 10, 45);
  rect(750, 350, 10, 45);

  fill(255, 190, 205);
  circle(210, 410, 20);

  fill(40, 35, 45);
  ellipse(210, 460, 45, 90);

  fill(255, 205, 180);
  circle(210, 420, 30);

  stroke(40, 35, 45);
  strokeWeight(6);
  line(195, 470, 185, 505);
  line(225, 470, 235, 505);

  stroke(255, 190, 210);
  strokeWeight(5);
  arc(210, 405, 40, 25, PI, TWO_PI);

  stroke(255, 220, 225);
  strokeWeight(3);
  noFill();
  arc(300, 120, 40, 20, PI, TWO_PI);
  arc(340, 120, 40, 20, PI, TWO_PI);

  arc(470, 180, 35, 18, PI, TWO_PI);
  arc(505, 180, 35, 18, PI, TWO_PI);

  arc(650, 210, 30, 15, PI, TWO_PI);
  arc(680, 210, 30, 15, PI, TWO_PI);

  noStroke();

  fill(255, 220, 225);
  circle(600, 250, 5);
  circle(620, 300, 4);
  circle(530, 330, 5);

  image(cursorImage, mouseX, mouseY, 32, 32);
}
