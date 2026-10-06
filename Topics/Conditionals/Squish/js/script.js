/**
 * Squish The Bug
 * Mara Nowacki
 */

"use strict";

// Body
const P0 = [110, 108];
const P1 = [250, 220];
const P2 = [430, 120];
const P3 = [615, 232];

const SEGMENTS = 22;
const BUG_SCALE = 0.5; // 0.5 = half as wide and tall, so about 1/4 the area

function setup() {
  createCanvas(750, 450);
  noLoop();
}

function draw() {
  background(255);
  fill(0);
  stroke(0);

  push();
  // Center the bug on the canvas, then shrink it
  translate(width / 2, height / 2);
  scale(BUG_SCALE);
  translate(-364, -173); // center of the original bug's bounding box

  drawAntennae();
  drawLegs();
  drawBody();
  drawTailLegs();
  pop();
}

function spine(t) {
  const x = bezierPoint(P0[0], P1[0], P2[0], P3[0], t);
  const y = bezierPoint(P0[1], P1[1], P2[1], P3[1], t);
  let tx = bezierTangent(P0[0], P1[0], P2[0], P3[0], t);
  let ty = bezierTangent(P0[1], P1[1], P2[1], P3[1], t);
  const m = sqrt(tx * tx + ty * ty);
  tx /= m;
  ty /= m;
  return { x, y, tx, ty, nx: -ty, ny: tx };
}

// Body is thicker in the middle, narrower at both ends
function bodyRadius(t) {
  return 9 + 10 * sin(PI * constrain(t, 0, 1));
}

function drawBody() {
  noStroke();
  fill(0);

  // Body segments, drawn as overlapping ellipses along the spine
  for (let i = 0; i <= 120; i++) {
    const t = i / 120;
    const s = spine(t);
    const r = bodyRadius(t);
    push();
    translate(s.x, s.y);
    rotate(atan2(s.ty, s.tx));
    ellipse(0, 0, r * 1.7, r * 2);
    pop();
  }

  // Head
  const h = spine(0);
  push();
  translate(h.x, h.y);
  rotate(atan2(h.ty, h.tx));
  ellipse(-2, 0, 34, 28);
  pop();

  // Tail end
  const e = spine(1);
  push();
  translate(e.x, e.y);
  rotate(atan2(e.ty, e.tx));
  ellipse(0, 0, 26, 20);
  pop();
}

function drawLegs() {
  noStroke();
  fill(0);
  for (let i = 0; i < SEGMENTS; i++) {
    const t = 0.09 + (i / (SEGMENTS - 1)) * 0.86;
    const s = spine(t);
    const r = bodyRadius(t);
    // Legs are longest in the middle of the body
    const len = 26 + 8 * sin(PI * t) + random(-2, 2);
    leg(s, r * 0.7, +1, len);
    leg(s, r * 0.7, -1, len);
  }
}

// One tapered, slightly curved leg. side = +1 or -1 (which side of the body)
function leg(s, offset, side, len) {
  const bx = s.x + s.nx * offset * side;
  const by = s.y + s.ny * offset * side;

  // Tip: out along the normal, swept a little toward the tail
  const tipX = bx + s.nx * side * len + s.tx * len * 0.25;
  const tipY = by + s.ny * side * len + s.ty * len * 0.25;

  // Mid control point makes the leg bow outward
  const mx = bx + s.nx * side * len * 0.55 - s.tx * len * 0.12;
  const my = by + s.ny * side * len * 0.55 - s.ty * len * 0.12;

  const w = 3.2;
  beginShape();
  vertex(bx - s.tx * w, by - s.ty * w);
  quadCurve(bx - s.tx * w, by - s.ty * w,
            mx - s.tx * w * 0.5, my - s.ty * w * 0.5,
            tipX, tipY);
  quadCurve(tipX, tipY,
            mx + s.tx * w * 0.5, my + s.ty * w * 0.5,
            bx + s.tx * w, by + s.ty * w);
  endShape(CLOSE);
}

function quadCurve(x0, y0, cx, cy, x1, y1) {
  const steps = 8;
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    const u = 1 - t;
    vertex(
      u * u * x0 + 2 * u * t * cx + t * t * x1,
      u * u * y0 + 2 * u * t * cy + t * t * y1
    );
  }
}

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