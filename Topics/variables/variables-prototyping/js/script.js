/**
 * Beetle w/ Moving Limbs
 * Mara Nowacki :)
 * 
 */



const BG = 255;          // BACKGROUND
const INK = 0;            // BLACK BEETLE SILHOUETTE
const GAP = 4;             // WIDTH OF GAPS BETWEEN LIMBS

let t = 0;                 // CLOCK
const speed = 0.06;        // SPEED
const legAmp = 10;         // HOW FAR THE PARTS SWAY
const antAmp = 5;          
const bodyAmp = 3;         // BODY MOVEMENT

function setup() {
  createCanvas(533, 800);
  pixelDensity(2);
}

function draw() {
  background(BG);
  t += speed;

  push();
  translate(width / 2, sin(t) * bodyAmp);

  // LEGS + ANTENNAE = SYMMETRIZED
  for (const side of [1, -1]) {
    push();
    scale(side, 1);
    drawAppendages(side);
    pop();
  }

  // BODY GOES ON TOP SO GAPS ARE CLEAN
  drawBody();
  pop();
}

// ---------------------------------------------------------------- body
function drawBody() {
  fill(INK);
  stroke(BG);
  strokeWeight(GAP + 2);
  strokeJoin(ROUND);

  // HEAD
  beginShape();
  for (let i = 0; i <= 48; i++) {
    const a = PI + (PI * i) / 48;
    vertex(42 * Math.cos(a), 244 + 45 * Math.sin(a));
  }
  endShape(CLOSE);

  // BODY
  pathShape([0, 250], [
    [70, 250, 100, 262, 100, 300],
    [100, 330, 92, 345, 70, 350],
    [40, 355, -40, 355, -70, 350],
    [-92, 345, -100, 330, -100, 300],
    [-100, 262, -70, 250, 0, 250],
  ]);

  // WING COVERS
  pathShape([0, 356], [
    [-50, 355, -95, 356, -108, 365],
    [-116, 372, -114, 420, -110, 450],
    [-104, 500, -60, 536, 0, 551],
    [60, 536, 104, 500, 110, 450],
    [114, 420, 116, 372, 108, 365],
    [95, 356, 50, 355, 0, 356],
  ]);

  // CENTER
  strokeWeight(GAP + 3);
  strokeCap(SQUARE);
  line(0, 384, 0, 560);

  // TRIANGLE BETWEEN WINGS
  strokeWeight(GAP + 2);
  triangle(-24, 359, 24, 359, 0, 386);
}

function drawAppendages(side) {
  fill(INK);

  const phase = side > 0 ? 0 : PI;

  // CURRENT POSITION
  const frontSwing = sin(t + phase) * legAmp;
  const midSwing = sin(t + phase + PI) * legAmp;
  const hindSwing = sin(t + phase) * legAmp;
  const antSway = sin(t * 0.5 + phase) * antAmp;

  // ANTENNA
  noStroke();
  taper([-18, 206, -26, 186, -38, 168, -46 + antSway, 150], 8, 3);
  taper([-41 + antSway, 170, -37 + antSway, 162, -34 + antSway, 156, -30 + antSway, 150], 4, 1.5);

  // HIND LEG
  noStroke();
  taper([-126, 538, -140, 570, -142, 602, -126 + hindSwing, 632], 13, 2);
  taper([-132 + hindSwing, 616, -126 + hindSwing, 624, -118 + hindSwing, 628, -110 + hindSwing, 630], 6, 1);
  stroke(BG); strokeWeight(GAP);
  taper([-108, 432, -118, 470, -124, 505, -126, 542], 20, 16);

  // MIDDLE LEG
  noStroke();
  taper([-176, 392, -195, 412, -212, 436, -222 + midSwing, 468], 14, 1.5);
  taper([-208 + midSwing, 442, -206 + midSwing, 450, -204 + midSwing, 456, -200 + midSwing, 463], 6, 1);
  stroke(BG); strokeWeight(GAP);
  taper([-100, 372, -125, 376, -152, 383, -178, 394], 19, 15);

  // FRONT LEG
  stroke(BG); strokeWeight(GAP);
  taper([-132, 286, -140, 256, -134, 222, -120 + frontSwing, 192], 17, 12);
  noStroke();
  // OUTER EDGE OF LEGS
  taper([-138, 262, -144, 259, -150, 256, -157, 252], 7, 1);
  taper([-136, 236, -142, 232, -147, 228, -153, 223], 7, 1);
  taper([-128, 210, -133, 204, -137, 199, -141, 193], 6, 1);
  // CLAW MOVING
  taper([-122 + frontSwing, 196, -110 + frontSwing, 182, -96 + frontSwing, 176, -74 + frontSwing, 177], 9, 1.5);
  taper([-122 + frontSwing, 196, -124 + frontSwing, 184, -122 + frontSwing, 176, -117 + frontSwing, 168], 7, 1);
  stroke(BG); strokeWeight(GAP);
  taper([-86, 300, -102, 296, -118, 290, -134, 282], 20, 16);
}

function taper(p, w0, w1, steps = 40) {
  const left = [];
  const right = [];
  for (let i = 0; i <= steps; i++) {
    const tt = i / steps;
    const x = cubic(p[0], p[2], p[4], p[6], tt);
    const y = cubic(p[1], p[3], p[5], p[7], tt);
    const tx = cubicTan(p[0], p[2], p[4], p[6], tt);
    const ty = cubicTan(p[1], p[3], p[5], p[7], tt);
    const m = Math.hypot(tx, ty) || 1;
    const nx = -ty / m;
    const ny = tx / m;
    const w = lerp(w0, w1, tt) / 2;
    left.push([x + nx * w, y + ny * w]);
    right.push([x - nx * w, y - ny * w]);
  }
  beginShape();
  for (const v of left) vertex(v[0], v[1]);
  for (let i = right.length - 1; i >= 0; i--) vertex(right[i][0], right[i][1]);
  endShape(CLOSE);
}

function pathShape(start, segs, steps = 30) {
  let [px, py] = start;
  beginShape();
  vertex(px, py);
  for (const [c1x, c1y, c2x, c2y, x, y] of segs) {
    for (let i = 1; i <= steps; i++) {
      const tt = i / steps;
      vertex(cubic(px, c1x, c2x, x, tt), cubic(py, c1y, c2y, y, tt));
    }
    px = x;
    py = y;
  }
  endShape(CLOSE);
}

function cubic(a, b, c, d, tt) {
  const u = 1 - tt;
  return u * u * u * a + 3 * u * u * tt * b + 3 * u * tt * tt * c + tt * tt * tt * d;
}
function cubicTan(a, b, c, d, tt) {
  const u = 1 - tt;
  return 3 * u * u * (b - a) + 6 * u * tt * (c - b) + 3 * tt * tt * (d - c);
}