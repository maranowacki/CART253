/**
 * Interactive - Grow a Weird Plant
 * Mara Nowacki :)
 * 
 */

let water = 0;
let plantSize = 0.35;
let plantColor;
let stage = 0;

let potX;
let potTop;

let trapX = [-95, 90, 0];
let trapY = [-200, -260, -330];
let trapAngle = [-0.5, 0.45, 0];
let trapSize = [110, 120, 100];

function setup() {
  createCanvas(600, 800);
  potX = width / 2;
  potTop = 560;
  plantColor = color(0);
  textFont("Georgia");
}

function draw() {
  background(255);

  drawPlant();
  drawPot();
  drawInfo();
}

function mousePressed() {
  waterPlant();
}

function waterPlant() {
  water++;
  plantSize = min(1, 0.35 + water * 0.045);
  changeStage();
}

function changeStage() {
  if (water >= 16) {
    stage = 2;
  } else if (water >= 6) {
    stage = 1;
  } else {
    stage = 0;
  }

  plantColor = color(0);
}

function drawPlant() {
  let t = frameCount;

  push();
  translate(potX, potTop);
  scale(plantSize);

  drawLeaf(-1, 110);
  drawLeaf(1, 110);

  if (stage === 0) {
    drawStem(0, 0, 0, -50, 5, -90, 0, -130, 9);
    push();
    translate(0, -130);
    drawTrap(55, 0.15 + 0.1 * sin(t * 0.05));
    pop();
    pop();
    return;
  }

  let count = stage === 1 ? 2 : 3;

  for (let i = 0; i < count; i++) {
    let sway = stage === 2 ? sin(t * 0.04 + i * 2) * 14 : sin(t * 0.02 + i) * 3;
    let tx = trapX[i] + sway;
    let ty = trapY[i];

    drawStem(0, 0, 0, ty * 0.5, tx * 0.8, ty * 0.7, tx, ty, 10);

    push();
    translate(tx, ty);
    let wobble = stage === 2 ? sin(t * 0.05 + i) * 0.12 : 0;
    rotate(trapAngle[i] + wobble);

    let open = 1;
    if (stage === 2) open = 0.15 + 0.85 * abs(sin(t * 0.04 + i * 1.3));

    drawTrap(trapSize[i], open);
    pop();
  }

  pop();
}

function drawStem(x1, y1, cx1, cy1, cx2, cy2, x2, y2, thick) {
  fill(plantColor);
  noStroke();

  beginShape();
  for (let k = 0; k <= 20; k++) {
    let u = k / 20;
    let x = bezierPoint(x1, cx1, cx2, x2, u);
    let y = bezierPoint(y1, cy1, cy2, y2, u);
    let tx = bezierTangent(x1, cx1, cx2, x2, u);
    let ty = bezierTangent(y1, cy1, cy2, y2, u);
    let d = sqrt(tx * tx + ty * ty) || 1;
    vertex(x - (ty / d) * thick / 2, y + (tx / d) * thick / 2);
  }
  for (let k = 20; k >= 0; k--) {
    let u = k / 20;
    let x = bezierPoint(x1, cx1, cx2, x2, u);
    let y = bezierPoint(y1, cy1, cy2, y2, u);
    let tx = bezierTangent(x1, cx1, cx2, x2, u);
    let ty = bezierTangent(y1, cy1, cy2, y2, u);
    let d = sqrt(tx * tx + ty * ty) || 1;
    vertex(x + (ty / d) * thick / 2, y - (tx / d) * thick / 2);
  }
  endShape(CLOSE);
}

function drawLeaf(side, len) {
  push();
  translate(0, -30);
  rotate(side * 1.1);

  fill(plantColor);
  noStroke();
  beginShape();
  for (let k = 0; k <= 16; k++) {
    let u = k / 16;
    vertex(sin(u * PI) * len * 0.22, -u * len);
  }
  for (let k = 16; k >= 0; k--) {
    let u = k / 16;
    vertex(-sin(u * PI) * len * 0.22, -u * len);
  }
  endShape(CLOSE);

  pop();
}

function drawTrap(s, open) {
  let w = s;
  let h = s * 0.7;

  push();
  translate(0, -h / 2);

  fill(plantColor);
  noStroke();
  arc(0, 0, w, h, 0, PI, CHORD);
  drawSpikes(w, h, 1);

  push();
  translate(-w / 2, 0);
  rotate(-open * 0.9);
  translate(w / 2, 0);

  fill(plantColor);
  noStroke();
  arc(0, 0, w, h * 0.9, PI, TWO_PI, CHORD);
  drawSpikes(w, h * 0.9, -1);
  pop();

  pop();
}

function drawSpikes(w, h, dir) {
  fill(plantColor);
  noStroke();

  let n = 14;
  let spikeLen = w * 0.2;
  if (stage === 2) spikeLen = w * 0.26;

  for (let k = 0; k <= n; k++) {
    let a = map(k, 0, n, 0.08, PI - 0.08);
    let px = cos(a) * (w / 2);
    let py = dir * sin(a) * (h / 2);

    let nx = cos(a) / (w / 2);
    let ny = (dir * sin(a)) / (h / 2);
    let d = sqrt(nx * nx + ny * ny);
    nx /= d;
    ny /= d;

    let b = w * 0.035;
    let L = spikeLen;
    if (stage === 2) L += sin(frameCount * 0.1 + k) * 4;

    triangle(px - ny * b, py + nx * b, px + ny * b, py - nx * b, px + nx * L, py + ny * L);
  }
}

function drawPot() {
  let bowlY = potTop + 120;

  fill(0);
  noStroke();
  ellipse(potX, bowlY, 230, 200);
  rect(potX - 135, potTop - 10, 270, 62, 14);

  stroke(255);
  strokeWeight(3);
  line(potX - 112, potTop + 54, potX + 112, potTop + 54);

  noFill();
  strokeWeight(5);
  arc(potX, bowlY, 180, 150, PI * 0.6, PI * 0.85);
  noStroke();
  fill(255);
  ellipse(potX - 88, bowlY + 5, 6, 6);
}

function drawInfo() {
  let x = potX + 150;
  let y = potTop - 30 + sin(frameCount * 0.05) * 3;

  noStroke();
  fill(0);
  rect(x, y, 100, 34, 17);
  triangle(x + 10, y + 10, x + 10, y + 24, x - 8, y + 26);

  fill(255);
  textSize(15);
  textAlign(CENTER, CENTER);
  text("Grow Me!", x + 50, y + 17);
}