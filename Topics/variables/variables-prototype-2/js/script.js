/**
 * Blinking Cat Ear Girl
 * Mara Nowacki
 * 
 */


const INK = 0, PAPER = 255;

function setup() {
  const s = Math.min(windowWidth, windowHeight, 600);
  createCanvas(s, s);
  noLoop();
}

function windowResized() {
  const s = Math.min(windowWidth, windowHeight, 600);
  resizeCanvas(s, s);
  redraw();
}

function draw() {
  background(PAPER);
  scale(width / 600);
  strokeJoin(ROUND);
  strokeCap(ROUND);

  drawHair();
  drawEar(92, 368, false);
  drawEar(488, 370, true);
  drawFace();
  drawBrows();
  drawLeftEye();
  drawRightEye();
  drawMouth();
}


function bez(a, b, c, d, t) {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
}


function bezierPts(p0, c1, c2, p3, steps = 24) {
  const pts = [];
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    pts.push([bez(p0[0], c1[0], c2[0], p3[0], t), bez(p0[1], c1[1], c2[1], p3[1], t)]);
  }
  return pts;
}

function splinePts(pts, steps = 12) {
  const out = [];
  for (let i = 1; i < pts.length - 2; i++) {
    const [p0, p1, p2, p3] = [pts[i - 1], pts[i], pts[i + 1], pts[i + 2]];
    for (let s = 0; s <= steps; s++) {
      const t = s / steps, t2 = t * t, t3 = t2 * t;
      const f = (a, b, c, d) =>
        0.5 * (2 * b + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
      out.push([f(p0[0], p1[0], p2[0], p3[0]), f(p0[1], p1[1], p2[1], p3[1])]);
    }
  }
  return out;
}

function shapeFrom(pts, closed = true) {
  beginShape();
  for (const [x, y] of pts) vertex(x, y);
  closed ? endShape(CLOSE) : endShape();
}



function drawHair() {
  fill(INK); noStroke();
  shapeFrom([
    [72, 502], [88, 440], [90, 360], [98, 260], [112, 170], [125, 105], [150, 72],
    [185, 58], [210, 60], [240, 78],               // left ear
    [270, 108], [300, 112], [335, 104],            // dip between ears
    [380, 90], [440, 82], [485, 95], [500, 125],   // right ear
    [502, 190], [498, 260], [505, 340], [508, 420], [512, 470], [508, 492],
    [488, 480], [478, 470], [470, 482], [452, 470], [440, 420],
    [160, 420], [145, 470], [128, 488], [112, 478], [100, 500]
  ]);

  fill(PAPER);
  shapeFrom([[166, 146], [180, 124], [208, 130], [190, 138]]);
  shapeFrom([[430, 148], [452, 136], [466, 150], [468, 174], [455, 165]]);
}


function drawEar(x, y, flip) {
  push();
  translate(x, y);
  if (flip) scale(-1, 1);
  stroke(INK); strokeWeight(6); fill(PAPER);
  arc(0, 0, 62, 66, HALF_PI * 0.6, TWO_PI - HALF_PI * 0.6, OPEN);
  strokeWeight(5);   // little X earring mark
  line(-6, -8, 8, 6);
  line(-6, 6, 8, -8);
  pop();
}



function drawFace() {
  const pts = [
  
    [135, 272],
    [165, 268], [174, 240], [184, 262],
    [255, 262], [270, 226], [282, 258],
    [334, 260], [343, 240], [352, 268],
    [445, 272],

    ...bezierPts([445, 272], [452, 340], [450, 420], [405, 452]),
    ...bezierPts([405, 452], [360, 478], [250, 478], [200, 458]),
    ...bezierPts([200, 458], [140, 432], [130, 360], [135, 272])
  ];
  fill(PAPER); stroke(INK); strokeWeight(6);
  shapeFrom(pts);
}

function drawBrows() {
  fill(INK); noStroke();
  circle(245, 308, 20);
  circle(345, 308, 20);
}


function almondPts(cx, cy, w, h) {
  const L = [cx - w / 2, cy], R = [cx + w / 2, cy];
  return [
    L,
    ...bezierPts(L, [cx - w * 0.22, cy - h * 0.72], [cx + w * 0.22, cy - h * 0.72], R),
    ...bezierPts(R, [cx + w * 0.22, cy + h * 0.46], [cx - w * 0.22, cy + h * 0.46], L)
  ];
}

function drawEye(cx, cy, w, h, pupilX, pupilD, tears) {
  const pts = almondPts(cx, cy, w, h);

  // White of the eye
  noStroke(); fill(PAPER);
  shapeFrom(pts);

  const ctx = drawingContext;
  ctx.save();
  ctx.beginPath();
  ctx.moveTo(pts[0][0], pts[0][1]);
  for (const [x, y] of pts) ctx.lineTo(x, y);
  ctx.closePath();
  ctx.clip();
  fill(INK);
  circle(pupilX, cy - h * 0.05, pupilD);
  ctx.restore();

  noFill(); stroke(INK); strokeWeight(6);
  shapeFrom(pts);

  // Tears hang from exact points on the lower lid
  for (const [t, len] of tears) {
    const x = bez(cx + w / 2, cx + w * 0.22, cx - w * 0.22, cx - w / 2, t);
    const y = bez(cy, cy + h * 0.46, cy + h * 0.46, cy, t);
    stroke(INK); strokeWeight(5);
    line(x, y, x, y + len);
    noStroke(); fill(INK);
    circle(x, y + len, 8);
  }
}


function drawLeftEye() {
  drawEye(206, 372, 94, 48, 234, 50, [[0.55, 14], [0.7, 18], [0.84, 12]]);
}

function drawRightEye() {
  drawEye(392, 372, 82,