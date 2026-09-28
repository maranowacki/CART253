/**
 * Blinking Cat Ear Girl
 * Mara Nowacki
 * 
 */


// Colors
let ink = 0;
let paper = 255;

// Eye positions and sizes
let leftEyeX = 206;
let rightEyeX = 392;
let eyeY = 372;
let leftEyeW = 94;
let leftEyeH = 42;
let rightEyeW = 82;
let rightEyeH = 38;

// Blink settings
let blinkEvery = 50;   
let blinkLength = 8;  
let eyeOpen = 1;     
function setup() {
  createCanvas(600, 600);
  strokeJoin(ROUND);
  strokeCap(ROUND);
}

function draw() {
  background(paper);

  // ----- Blink -----
  if (frameCount % blinkEvery < blinkLength) {
    eyeOpen = 0.08;
  } else {
    eyeOpen = 1;
  }

  // ----- Hair -----
  fill(ink);
  noStroke();
  beginShape();
  vertex(72, 502);
  vertex(88, 440);
  vertex(90, 360);
  vertex(98, 260);
  vertex(112, 170);
  vertex(125, 105);
  vertex(150, 72);
  vertex(185, 58);
  vertex(210, 60);
  vertex(240, 78);
  vertex(270, 108);
  vertex(300, 112);
  vertex(335, 104);
  vertex(380, 90);
  vertex(440, 82);
  vertex(485, 95);
  vertex(500, 125);
  vertex(502, 190);
  vertex(498, 260);
  vertex(505, 340);
  vertex(508, 420);
  vertex(512, 470);
  vertex(508, 492);
  vertex(488, 480);
  vertex(478, 470);
  vertex(470, 482);
  vertex(452, 470);
  vertex(440, 420);
  vertex(160, 420);
  vertex(145, 470);
  vertex(128, 488);
  vertex(112, 478);
  vertex(100, 500);
  endShape(CLOSE);


  fill(paper);
  triangle(166, 146, 182, 122, 208, 130);
  triangle(430, 148, 454, 136, 468, 174);

  stroke(ink);
  strokeWeight(6);
  fill(paper);
  arc(92, 368, 62, 66, 0.95, 5.35, OPEN);
  arc(488, 370, 62, 66, -2.2, 2.2, OPEN);

  strokeWeight(5);
  line(86, 360, 100, 374);
  line(86, 374, 100, 360);
  line(482, 362, 496, 376);
  line(482, 376, 496, 362);

  strokeWeight(6);
  fill(paper);
  beginShape();
  vertex(135, 272);
  vertex(165, 268);
  vertex(174, 240);
  vertex(184, 262);
  vertex(255, 262);
  vertex(270, 226);
  vertex(282, 258);
  vertex(334, 260);
  vertex(343, 240);
  vertex(352, 268);
  vertex(445, 272);
  vertex(449, 320);
  vertex(449, 370);
  vertex(443, 410);
  vertex(428, 438);
  vertex(405, 452);
  vertex(370, 466);
  vertex(330, 472);
  vertex(290, 472);
  vertex(250, 468);
  vertex(215, 462);
  vertex(190, 450);
  vertex(165, 432);
  vertex(145, 405);
  vertex(136, 370);
  vertex(134, 320);
  endShape(CLOSE);

  noStroke();
  fill(ink);
  circle(245, 308, 20);
  circle(345, 308, 20);

  
  noStroke();
  fill(paper);
  ellipse(leftEyeX, eyeY, leftEyeW, leftEyeH * eyeOpen);
  fill(ink);
  ellipse(leftEyeX + 22, eyeY, 36, leftEyeH * 0.8 * eyeOpen);
  noFill();
  stroke(ink);
  strokeWeight(6);
  ellipse(leftEyeX, eyeY, leftEyeW, leftEyeH * eyeOpen);

  noStroke();
  fill(paper);
  ellipse(rightEyeX, eyeY, rightEyeW, rightEyeH * eyeOpen);
  fill(ink);
  ellipse(rightEyeX + 16, eyeY, 34, rightEyeH * 0.8 * eyeOpen);
  noFill();
  stroke(ink);
  strokeWeight(6);
  ellipse(rightEyeX, eyeY, rightEyeW, rightEyeH * eyeOpen);

  strokeWeight(5);
  line(180, 389, 180, 405);
  line(200, 393, 200, 411);
  line(220, 391, 220, 403);
  line(370, 388, 370, 400);
  line(388, 391, 388, 407);
  line(404, 390, 404, 400);

  noStroke();
  fill(ink);
  circle(180, 405, 8);
  circle(200, 411, 8);
  circle(220, 403, 8);
  circle(370, 400, 8);
  circle(388, 407, 8);
  circle(404, 400, 8);


  noFill();
  stroke(ink);
  strokeWeight(6);
  beginShape();
  vertex(266, 440);
  vertex(280, 440);
  vertex(290, 432);
  vertex(300, 440);
  vertex(316, 440);
  vertex(330, 436);
  endShape();
}