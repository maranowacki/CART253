/**
 * Weird Prototype
 * Mara Nowacki
 * 
 * Unsettling beetle drawing
 */





function setup() {
  createCanvas(500, 560);
  noLoop();
}

function draw() {
  background(255);
  translate(width / 2, 0);

  drawHalf();
  push();
  scale(-1, 1);
  drawHalf();
  pop();

  drawHead();
  drawBody();
}

// Symmetrical Parts
function drawHalf() {
  drawMandible();
  drawLimbs();
}

function drawMandible() {
  fill(0);
  noStroke();
  // Mandible
  smoothShape([
    [-20, 140], [-95, 150], [-118, 95], [-112, 45], [-88, 18], [-52, 10],
    [-40, 20], [-56, 32],
    [-46, 44], [-64, 54], [-52, 70], [-68, 80], [-58, 98], [-62, 118]
  ]);
}

function smoothShape(pts, steps = 10) {
  const n = pts.length;
  beginShape();
  for (let i = 0; i < n; i++) {
    const p0 = pts[(i - 1 + n) % n];
    const p1 = pts[i];
    const p2 = pts[(i + 1) % n];
    const p3 = pts[(i + 2) % n];
    for (let s = 0; s < steps; s++) {
      const t = s / steps, t2 = t * t, t3 = t2 * t;
      const x = 0.5 * (2 * p1[0] + (-p0[0] + p2[0]) * t +
        (2 * p0[0] - 5 * p1[0] + 4 * p2[0] - p3[0]) * t2 +
        (-p0[0] + 3 * p1[0] - 3 * p2[0] + p3[0]) * t3);
      const y = 0.5 * (2 * p1[1] + (-p0[1] + p2[1]) * t +
        (2 * p0[1] - 5 * p1[1] + 4 * p2[1] - p3[1]) * t2 +
        (-p0[1] + 3 * p1[1] - 3 * p2[1] + p3[1]) * t3);
      vertex(x, y);
    }
  }
  endShape(CLOSE);
}

function drawLimbs() {
  stroke(0);
  noFill();
  strokeCap(ROUND);
  strokeJoin(ROUND);

  // Arm
  strokeWeight(17);
  beginShape();
  vertex(-80, 290);
  vertex(-160, 272);
  vertex(-182, 222);
  endShape();

  // Hand
  noStroke();
  fill(0);
  circle(-188, 214, 22);
  stroke(0);
  strokeWeight(7);
  line(-190, 214, -222, 214);
  line(-190, 212, -216, 196);
  line(-190, 210, -202, 188);
  line(-188, 210, -184, 190);
  noFill();

  // Middle leg
  strokeWeight(15);
  beginShape();
  vertex(-90, 340);
  vertex(-124, 376);
  vertex(-120, 412);
  vertex(-104, 416);
  endShape();

  // Bottom leg
  strokeWeight(17);
  beginShape();
  vertex(-50, 415);
  vertex(-70, 482);
  vertex(-74, 522);
  vertex(-96, 526);
  endShape();
}

// Head
function drawHead() {
  noStroke();
  rectMode(CENTER);

  fill(0);
  rect(0, 195, 250, 152, 58);

  // Eyes
  for (const x of [-80, 80]) {
    fill(255);
    circle(x, 193, 50);
    fill(0);
    circle(x, 193, 34);
  }

  // Nose and Mouth
  fill(255);
  rect(0, 188, 28, 12, 6);
  rect(0, 222, 38, 10, 5);
}

// Body
function drawBody() {
  noStroke();
  rectMode(CENTER);

  fill(0);
  rect(0, 350, 190, 150, 40, 40, 65, 65);

  // Stripes
  fill(255);
  for (const y of [322, 356, 390]) {
    rect(0, y, 74, 13, 6.5);
  }
}