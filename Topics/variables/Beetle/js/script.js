/**
 * Swirling Cat
 * Mara Nowacki :)
 * 
 */





const W = 500, H = 620;
const cx = 250, cy = 320, R = 210;

const SPIN_SPEED = 1.2;   // degrees per frame (negative = spin the other way)
let spin = 0;             // current swirl angle in degrees

const keys = [
  [0, 50], [40, 56], [90, 78], [150, 112], [185, 118],
  [215, 72], [240, 40], [265, 22], [300, 16], [322, 14]
];

function setup() {
  createCanvas(W, H);
}

function thickness(s) {
  for (let i = 0; i < keys.length - 1; i++) {
    const [s0, w0] = keys[i], [s1, w1] = keys[i + 1];
    if (s <= s1) {
      let t = (s - s0) / (s1 - s0);
      t = t * t * (3 - 2 * t);
      return lerp(w0, w1, t);
    }
  }
  return keys[keys.length - 1][1];
}

// rotate a local offset (lx, ly) by angle ang (radians) around origin (ox, oy)
function local(ox, oy, ang, lx, ly) {
  const c = cos(ang), s = sin(ang);
  return { x: ox + lx * c - ly * s, y: oy + lx * s + ly * c };
}

// take an unrotated canvas point and swirl it around the ring center
function world(x, y) {
  return local(cx, cy, radians(spin), x - cx, y - cy);
}

// ellipse rotated by ang, drawn from vertices
function rEllipse(x, y, w, h, ang) {
  beginShape();
  for (let t = 0; t < TWO_PI; t += 0.1) {
    const p = local(x, y, ang, (w / 2) * cos(t), (h / 2) * sin(t));
    vertex(p.x, p.y);
  }
  endShape(CLOSE);
}

// triangle whose points are local to (ox, oy) rotated by ang
function rTri(ox, oy, ang, x1, y1, x2, y2, x3, y3) {
  const a = local(ox, oy, ang, x1, y1);
  const b = local(ox, oy, ang, x2, y2);
  const c = local(ox, oy, ang, x3, y3);
  triangle(a.x, a.y, b.x, b.y, c.x, c.y);
}

function bodyPoint(s) {
  const a = radians(-60 - s + spin);
  const w = thickness(s);
  const r = R - w / 2;
  return { x: cx + r * cos(a), y: cy + r * sin(a), w, a };
}

function draw() {
  background(255);
  noStroke();
  fill(0);

  spin += SPIN_SPEED;

  // body + tail along the ring
  const S_END = 322;
  for (let s = -4; s <= S_END; s += 0.5) {
    const p = bodyPoint(s);
    circle(p.x, p.y, p.w);
  }

  // tail curl: a shrinking spiral continuing in the same direction
  const end = bodyPoint(S_END);
  const inward = createVector(cx - end.x, cy - end.y).normalize();
  const r0 = 30;
  const c = createVector(end.x + inward.x * r0, end.y + inward.y * r0);
  const phi0 = atan2(end.y - c.y, end.x - c.x);
  const sway = 0.06 * sin(frameCount * 0.03);   // tiny, lazy tail twitch
  for (let u = 0; u <= 1; u += 0.004) {
    const phi = phi0 - u * TWO_PI * (1.25 + sway);
    const r = r0 * (1 - 0.82 * u);
    circle(c.x + r * cos(phi), c.y + r * sin(phi), lerp(14, 9, u));
  }

  const sp = radians(spin);

  // front leg + paw
  const sx = cx + 150 * cos(radians(-112));
  const sy = cy + 150 * sin(radians(-112));
  const legA = world(sx - 4, sy - 4);
  const legB = world(sx + 18, sy + 40);
  stroke(0);
  strokeWeight(30);
  strokeCap(ROUND);
  line(legA.x, legA.y, legB.x, legB.y);
  noStroke();
  const frontPaw = world(sx + 28, sy + 48);
  rEllipse(frontPaw.x, frontPaw.y, 44, 36, sp);

  // back paw
  const backPaw = world(cx + 72, cy + 150);
  rEllipse(backPaw.x, backPaw.y, 44, 30, sp);

  drawHead(sp);
}

function drawHead(sp) {
  const h = world(cx + 108, cy - 132);
  const ha = sp + radians(14);

  fill(0);
  rEllipse(h.x, h.y, 118, 92, ha);
  // ears
  rTri(h.x, h.y, ha, -56, -8, -46, -68, -10, -40);
  rTri(h.x, h.y, ha, 14, -42, 54, -62, 56, -4);

  drawEye(h.x, h.y, ha, -20, 2, -18);
  drawEye(h.x, h.y, ha, 24, 10, 12);
}

function drawEye(hx, hy, ha, x, y, angle) {
  const e = local(hx, hy, ha, x, y);
  const ea = ha + radians(angle);
  fill(255);
  rEllipse(e.x, e.y, 22, 13, ea);
  fill(0);
  const p = local(e.x, e.y, ea, 3, 1);
  rEllipse(p.x, p.y, 4, 11, ea);
}