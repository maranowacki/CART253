/**
 * Swirling Cat
 * Mara Nowacki :)
 * 
 */





const W = 500, H = 620;
const cx = 250, cy = 320, R = 210;   


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


function bodyPoint(s) {
  const a = radians(-60 - s);          
  const w = thickness(s);
  const r = R - w / 2;                    
  return { x: cx + r * cos(a), y: cy + r * sin(a), w, a };
}

function draw() {
  background(255);
  noStroke();
  fill(0);

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

 
  const shoulder = { x: cx + 150 * cos(radians(-112)), y: cy + 150 * sin(radians(-112)) };
  stroke(0);
  strokeWeight(30);
  strokeCap(ROUND);
  line(shoulder.x - 4, shoulder.y - 4, shoulder.x + 18, shoulder.y + 40);
  noStroke();
  ellipse(shoulder.x + 28, shoulder.y + 48, 44, 36);


  ellipse(cx + 72, cy + 150, 44, 30);

  drawHead();
}

function drawHead() {
  push();
  translate(cx + 108, cy - 132);
  rotate(radians(14));

  fill(0);
  ellipse(0, 0, 118, 92);
  // ears
  triangle(-56, -8, -46, -68, -10, -40);
  triangle(14, -42, 54, -62, 56, -4);

  drawEye(-20, 2, -18);
  drawEye(24, 10, 12);
  pop();
}

function drawEye(x, y, angle) {
  push();
  translate(x, y);
  rotate(radians(angle));
  fill(255);
  ellipse(0, 0, 22, 13);
  fill(0);
  ellipse(3, 1, 4, 11);                   
  pop();
}