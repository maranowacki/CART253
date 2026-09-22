/**
 * Beetle w/ Moving Limbs
 * Mara Nowacki :)
 * 
 */



const BG = (255, 255, 255) ;   // BACKGROUND
const INK = 0;    // BLACK BEETLE SILLOUHETTE
const GAP = 4;    // WIDTH OF GAPS BETWEEN LIMBS

function setup() {
  createCanvas(533, 800);
  pixelDensity(2);
  noLoop();
}

function draw() {
  background(BG);
  translate(width / 2, 0);        

  // LEGS + ANTENNAE = SYMMETRIZED 
  for (const side of [1, -1]) {
    push();
    scale(side, 1);
    drawAppendages();
    pop();
  }

  // BODY GOES ON TOP SO GAPS ARE CLEAN
  drawBody();
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

function drawAppendages() {
  fill(INK);

  // ANTENNA
  noStroke();
  taper([-18, 206, -26, 186, -38, 168, -46, 150], 8, 3);
  taper([-41, 170, -37, 162, -34, 156, -30, 150], 4, 1.5);

  // HIND LEG
  noStroke();
  taper([-126, 538, -140, 570, -142, 602, -126, 632], 13, 2);
  taper([-132, 616, -126, 624, -118, 628, -110, 630], 6, 1);
  stroke(BG); strokeWeight(GAP);
  taper([-108, 432, -118, 470, -124, 505, -126, 542], 20, 16);

  // MIDDLE LEG
  noStroke();
  taper([-176, 392, -195, 412, -212, 436, -222, 468], 14, 1.5);
  taper([-208, 442, -206, 450, -204, 456, -200, 463], 6, 1);
  stroke(BG); strokeWeight(GAP);
  taper([-100, 372, -125, 376, -152, 383, -178, 394], 19, 15);

  // FRONT LEG
  stroke(BG); strokeWeight(GAP);
  taper([-132, 286, -140, 256, -134, 222, -120, 192], 17, 12);
  noStroke();
  // teeth along the outer edge
  taper([-138, 262, -144, 259, -150, 256, -157, 252], 7, 1);
  taper([-136, 236, -142, 232, -147, 228, -153, 223], 7, 1);
  taper([-128, 210, -133, 204, -137, 199, -141, 193], 6, 1);
  // claw fanning toward the head
  taper([-122, 196, -110, 182, -96, 176, -74, 177], 9, 1.5);
  taper([-122, 196, -124, 184, -122, 176, -117, 168], 7, 1);
  stroke(BG); strokeWeight(GAP);
  taper([-86, 300, -102, 296, -118, 290, -134, 282], 20, 16);
}

function taper(p, w0, w1, steps = 40) {
  const left = [];
  const right = [];
  for (let i = 0; i <= steps; i++) {
    const t = i / steps;
    const x = cubic(p[0], p[2], p[4], p[6], t);
    const y = cubic(p[1], p[3], p[5], p[7], t);
    const tx = cubicTan(p[0], p[2], p[4], p[6], t);
    const ty = cubicTan(p[1], p[3], p[5], p[7], t);
    const m = Math.hypot(tx, ty) || 1;
    const nx = -ty / m;
    const ny = tx / m;
    const w = lerp(w0, w1, t) / 2;
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
      const t = i / steps;
      vertex(cubic(px, c1x, c2x, x, t), cubic(py, c1y, c2y, y, t));
    }
    px = x;
    py = y;
  }
  endShape(CLOSE);
}

function cubic(a, b, c, d, t) {
  const u = 1 - t;
  return u * u * u * a + 3 * u * u * t * b + 3 * u * t * t * c + t * t * t * d;
}
function cubicTan(a, b, c, d, t) {
  const u = 1 - t;
  return 3 * u * u * (b - a) + 6 * u * t * (c - b) + 3 * t * t * (d - c);
}

