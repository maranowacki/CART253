/**
 * Squish The Bug
 * Mara Nowacki
 */

"use strict";

// Body curve control points
const p0x = 110;
const p0y = 108;
const p1x = 250;
const p1y = 220;
const p2x = 430;
const p2y = 120;
const p3x = 615;
const p3y = 232;

const BUG_SCALE = 0.5; // 0.5 = half as wide and tall, so about 1/4 the area

// Center of the original bug, used to center it on the canvas
const BUG_CENTER_X = 364;
const BUG_CENTER_Y = 173;

let crushed = false; // becomes true once the bug is clicked

function setup() {
  createCanvas(750, 450);
  noLoop();
}

function draw() {
  background(255);

  // Only draw the bug if it hasn't been crushed yet
  if (!crushed) {
    push();
    // Center the bug on the canvas, then shrink it
    translate(width / 2, height / 2);
    scale(BUG_SCALE);
    translate(-BUG_CENTER_X, -BUG_CENTER_Y);

    drawAntennae();
    drawLegs();
    drawBody();
    drawTailLegs();
    pop();
  }
}

// Clicki g

function mousePressed() {
  if (!crushed && isOnBug(mouseX, mouseY)) {
    crushed = true;
    redraw(); // noLoop() is on, so ask p5 to draw one more frame
  }
}

// Checks whether a point on the canvas is on the bug (or close to it)
function isOnBug(px, py) {
  const x = (px - width / 2) / BUG_SCALE + BUG_CENTER_X;
  const y = (py - height / 2) / BUG_SCALE + BUG_CENTER_Y;

  // Check a few spots along the body
  if (nearSpine(x, y, 0) || nearSpine(x, y, 0.1) || nearSpine(x, y, 0.2) ||
      nearSpine(x, y, 0.3) || nearSpine(x, y, 0.4) || nearSpine(x, y, 0.5) ||
      nearSpine(x, y, 0.6) || nearSpine(x, y, 0.7) || nearSpine(x, y, 0.8) ||
      nearSpine(x, y, 0.9) || nearSpine(x, y, 1)) {
    return true;
  }
  return false;
}

function nearSpine(x, y, t) {
  const margin = 20; 
  return dist(x, y, spineX(t), spineY(t)) < bodyRadius(t) + margin;
}

// Spine
function spineX(t) {
  return bezierPoint(p0x, p1x, p2x, p3x, t);
}

function spineY(t) {
  return bezierPoint(p0y, p1y, p2y, p3y, t);
}

// Direction the body points at t (x part, length 1)
function dirX(t) {
  const tx = bezierTangent(p0x, p1x, p2x, p3x, t);
  const ty = bezierTangent(p0y, p1y, p2y, p3y, t);
  return tx / sqrt(tx * tx + ty * ty);
}

// Direction the body points at t (y part, length 1)
function dirY(t) {
  const tx = bezierTangent(p0x, p1x, p2x, p3x, t);
  const ty = bezierTangent(p0y, p1y, p2y, p3y, t);
  return ty / sqrt(tx * tx + ty * ty);
}

// Angle of the body at t
function bodyAngle(t) {
  return atan2(dirY(t), dirX(t));
}

// Body is thicker in the middle, narrower at both ends
function bodyRadius(t) {
  return 9 + 10 * sin(PI * constrain(t, 0, 1));
}

// Body
function drawBody() {
  // Thick line along the spine so there are no gaps between segments
  noFill();
  stroke(0);
  strokeWeight(18);
  bezier(p0x, p0y, p1x, p1y, p2x, p2y, p3x, p3y);

  // Body segments
  noStroke();
  fill(0);
  bodySegment(0);
  bodySegment(0.05);
  bodySegment(0.1);
  bodySegment(0.15);
  bodySegment(0.2);
  bodySegment(0.25);
  bodySegment(0.3);
  bodySegment(0.35);
  bodySegment(0.4);
  bodySegment(0.45);
  bodySegment(0.5);
  bodySegment(0.55);
  bodySegment(0.6);
  bodySegment(0.65);
  bodySegment(0.7);
  bodySegment(0.75);
  bodySegment(0.8);
  bodySegment(0.85);
  bodySegment(0.9);
  bodySegment(0.95);
  bodySegment(1);

  // Head
  push();
  translate(spineX(0), spineY(0));
  rotate(bodyAngle(0));
  ellipse(-2, 0, 34, 28);
  pop();

  // Tail end
  push();
  translate(spineX(1), spineY(1));
  rotate(bodyAngle(1));
  ellipse(0, 0, 26, 20);
  pop();
}

// One oval body segment
function bodySegment(t) {
  const r = bodyRadius(t);
  push();
  translate(spineX(t), spineY(t));
  rotate(bodyAngle(t));
  ellipse(0, 0, r * 2.2, r * 2);
  pop();
}

// Legs
function drawLegs() {
  noStroke();
  fill(0);
  legPair(0);
  legPair(1);
  legPair(2);
  legPair(3);
  legPair(4);
  legPair(5);
  legPair(6);
  legPair(7);
  legPair(8);
  legPair(9);
  legPair(10);
  legPair(11);
  legPair(12);
  legPair(13);
  legPair(14);
  legPair(15);
  legPair(16);
  legPair(17);
  legPair(18);
  legPair(19);
  legPair(20);
  legPair(21);
}

// One leg on each side of the body
function legPair(i) {
  const t = 0.09 + (i / 21) * 0.86;
  // Legs are longest in the middle of the body
  const len = 26 + 8 * sin(PI * t) + random(-2, 2);
  leg(t, 1, len);
  leg(t, -1, len);
}

// One tapered, slightly curved leg
function leg(t, side, len) {
  const tx = dirX(t);
  const ty = dirY(t);
  // Normal: points straight out from the side of the body
  const nx = -ty;
  const ny = tx;

  const offset = bodyRadius(t) * 0.7;
  const bx = spineX(t) + nx * offset * side;
  const by = spineY(t) + ny * offset * side;

  // Tip: out along the normal, swept a little toward the tail
  const tipX = bx + nx * side * len + tx * len * 0.25;
  const tipY = by + ny * side * len + ty * len * 0.25;

  // Mid control point makes the leg bow outward
  const mx = bx + nx * side * len * 0.55 - tx * len * 0.12;
  const my = by + ny * side * len * 0.55 - ty * len * 0.12;

  const w = 3.2;

  // Back edge of the leg
  const ax = bx - tx * w;
  const ay = by - ty * w;
  const acx = mx - tx * w * 0.5;
  const acy = my - ty * w * 0.5;

  // Front edge of the leg
  const bx2 = bx + tx * w;
  const by2 = by + ty * w;
  const bcx = mx + tx * w * 0.5;
  const bcy = my + ty * w * 0.5;

  beginShape();
  vertex(ax, ay);
  vertex(bend(ax, acx, tipX, 0.25), bend(ay, acy, tipY, 0.25));
  vertex(bend(ax, acx, tipX, 0.5), bend(ay, acy, tipY, 0.5));
  vertex(bend(ax, acx, tipX, 0.75), bend(ay, acy, tipY, 0.75));
  vertex(tipX, tipY);
  vertex(bend(tipX, bcx, bx2, 0.25), bend(tipY, bcy, by2, 0.25));
  vertex(bend(tipX, bcx, bx2, 0.5), bend(tipY, bcy, by2, 0.5));
  vertex(bend(tipX, bcx, bx2, 0.75), bend(tipY, bcy, by2, 0.75));
  vertex(bx2, by2);
  endShape(CLOSE);
}

// A point on a curved line from start to end, pulled toward control
function bend(start, control, end, t) {
  const u = 1 - t;
  return u * u * start + 2 * u * t * control + t * t * end;
}

// Antennae and tail legs

function drawAntennae() {
  noFill();
  stroke(0);
  strokeCap(ROUND);

  // Long antenna sweeping up and right
  strokeWeight(2.5);
  bezier(104, 98, 120, 70, 140, 50, 168, 26);

  // Long antenna sweeping out to the left
  bezier(100, 104, 70, 105, 45, 125, 27, 150);
}

function drawTailLegs() {
  noFill();
  stroke(0);
  strokeCap(ROUND);

  // Two long trailing legs at the back
  strokeWeight(4);
  bezier(615, 240, 635, 250, 665, 262, 700, 274);
  strokeWeight(3.5);
  bezier(612, 245, 625, 275, 640, 298, 658, 320);
}