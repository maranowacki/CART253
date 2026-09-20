/**
 * Abstract Prototype
 * Mara Nowacki
 * 
 * Abstract flower drawing
 */




// Anchor points so all the lines match up somewhat evenly
const BASE = { x: 386, y: 552 };                      // Main stem and leaves meet here
const MAIN = [252, 236, 330, 285, 376, 420, BASE.x, BASE.y]; // Main stem bezier curve
const FLOWER = { x: 215, y: 192 };                    // Center of the largest main flower

function setup() {
  createCanvas(540, 640);
  noLoop();
}

function draw() {
  background(255);

  // Points on the main stem where side stems join
  const j1 = stemPoint(0.26);   // Heart leaf
  const j2 = stemPoint(0.55);   // Drooping flower branch
  const j3 = stemPoint(0.88);   // Tall leaf

  // Stems
  noFill();
  stroke(0);
  strokeCap(ROUND);

  strokeWeight(10);
  bezier(...MAIN);                                                   // Main stem

  strokeWeight(8);
  bezier(398, 330, 398, 420, j3.x + 8, j3.y - 50, j3.x, j3.y);       // Tall leaf joins main stem
  bezier(j1.x, j1.y, j1.x - 45, j1.y + 30, 210, 342, 162, 331);      // Heart leaf
  bezier(j2.x, j2.y, j2.x - 60, j2.y - 30, 212, 358, 186, 422);      // To drooping flower

  // Stamens
  strokeWeight(5);
  bezier(205, 160, 185, 110, 155, 82, 130, 64);     // top-left
  bezier(225, 160, 242, 105, 268, 70, 288, 42);     // top-right
  bezier(184, 455, 166, 505, 136, 545, 118, 573);   // bottom-left
  bezier(190, 455, 184, 505, 170, 545, 158, 582);   // bottom-right

  noStroke();
  fill(0);

  // Stamen spheres
  circle(130, 64, 26);
  circle(288, 42, 26);
  circle(118, 573, 26);
  circle(158, 582, 26);

  circle(j1.x, j1.y, 12);
  circle(j2.x, j2.y, 12);
  circle(j3.x, j3.y, 12);

  // Leaves
  leaf(398, 46, 398, 352, 30);            // Tall vertical leaf
  leaf(496, 372, BASE.x, BASE.y, 30);     // Right leaf
  leaf(254, 406, BASE.x, BASE.y, 30);     // Middle diagonal leaf
  leaf(220, 596, BASE.x, BASE.y, 26);     // Bottom horizontal leaf

  // Heart leaf
  lobe(120, 300, 92, 60, 0.42);
  lobe(120, 356, 92, 58, -0.38);
  triangle(172, 330, 128, 296, 128, 362);

  // Drooping flower
  lobe(138, 448, 104, 66, 0.32);
  lobe(202, 458, 80, 92, -0.22);
  lobe(184, 434, 50, 60, 0);             

  // Main flower
  const { x: cx, y: cy } = FLOWER;
  circle(cx, cy - 68, 112);     // top petal
  circle(cx - 66, cy, 108);     // left petal
  circle(cx + 70, cy - 2, 110); // right petal
  circle(cx, cy + 66, 112);     // bottom petal
  circle(cx, cy, 110);          // center fill

  // White hearts pointing into the center
  fill(255);
  heart(cx, cy - 29, 22, 0);            // top
  heart(cx, cy + 29, 22, PI);           // bottom
  heart(cx - 29, cy, 22, -HALF_PI);     // left
  heart(cx + 29, cy, 22, HALF_PI);      // right
}

// Point on the main stem at t (0 = flower, 1 = base)
function stemPoint(t) {
  return {
    x: bezierPoint(MAIN[0], MAIN[2], MAIN[4], MAIN[6], t),
    y: bezierPoint(MAIN[1], MAIN[3], MAIN[5], MAIN[7], t)
  };
}

// Tapering leaf
function leaf(x1, y1, x2, y2, w) {
  const dx = x2 - x1, dy = y2 - y1;
  const len = sqrt(dx * dx + dy * dy);
  const nx = -dy / len * w * 1.45, ny = dx / len * w * 1.45;
  beginShape();
  vertex(x1, y1);
  curveTo(x1, y1,
          x1 + dx * 0.3 + nx, y1 + dy * 0.3 + ny,
          x1 + dx * 0.62 + nx, y1 + dy * 0.62 + ny,
          x2, y2);
  curveTo(x2, y2,
          x1 + dx * 0.62 - nx, y1 + dy * 0.62 - ny,
          x1 + dx * 0.3 - nx, y1 + dy * 0.3 - ny,
          x1, y1);
  endShape(CLOSE);
}

// Rounded petal
function lobe(x, y, w, h, angle) {
  push();
  translate(x, y);
  rotate(angle);
  ellipse(0, 0, w, h);
  pop();
}

// Slim hearts
function heart(x, y, s, angle) {
  push();
  translate(x, y);
  rotate(angle);
  scale(0.75, 1.05);
  beginShape();
  vertex(0, -s * 0.3);
  curveTo(0, -s * 0.3, s * 0.45, -s * 1.0, s * 1.15, -s * 0.2, 0, s);
  curveTo(0, s, -s * 1.15, -s * 0.2, -s * 0.45, -s * 1.0, 0, -s * 0.3);
  endShape(CLOSE);
  pop();
}

function curveTo(x0, y0, x1, y1, x2, y2, x3, y3, steps = 24) {
  for (let i = 1; i <= steps; i++) {
    const t = i / steps;
    vertex(bezierPoint(x0, x1, x2, x3, t), bezierPoint(y0, y1, y2, y3, t));
  }
}