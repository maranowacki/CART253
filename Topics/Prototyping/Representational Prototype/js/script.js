function setup() {
  createCanvas(740, 740);
  noLoop();
}

function draw() {
  background(255);
  fill(0);

  // Tail
  taperedStroke(
    [[300, 440], [268, 395], [250, 330], [252, 250], [275, 195], [315, 165],
     [350, 175], [378, 215], [388, 275], [378, 330], [350, 358], [320, 355],
     [303, 330], [308, 303], [326, 292], [340, 302], [336, 318]],
    [34, 30, 24, 26, 34, 40, 30, 20, 16, 14, 13, 13, 13, 13, 13, 16, 20]
  );

  // Body
  noStroke();
  beginShape();
  vertex(286, 420);
  vertex(335, 426);
  vertex(395, 420);
  vertex(428, 424);
  vertex(434, 488);
  vertex(292, 492);
  vertex(282, 470);
  endShape(CLOSE);

  // Neck, Head, Ears
  beginShape();
  vertex(398, 424);
  vertex(406, 380);
  vertex(410, 362);
  vertex(416, 338); 
  vertex(430, 356);
  vertex(446, 358);
  vertex(458, 344);
  vertex(462, 358);
  vertex(460, 384);
  vertex(450, 406);
  vertex(436, 430);
  vertex(432, 470);
  endShape(CLOSE);

  // Legs 1
  stroke(0);
  strokeWeight(13);
  strokeCap(ROUND);
  noFill();
  leg([[298, 480], [295, 530], [297, 568], [304, 582], [312, 585]]);
  leg([[324, 482], [322, 530], [326, 566], [333, 580], [342, 584]]);
  leg([[395, 482], [393, 530], [395, 566], [400, 576], [406, 578]]);
  leg([[420, 482], [418, 530], [420, 566], [425, 576], [432, 578]]);
}

function crPoint(a, b, c, d, t) {
  const t2 = t * t, t3 = t2 * t;
  return 0.5 * ((2 * b) + (-a + c) * t + (2 * a - 5 * b + 4 * c - d) * t2 + (-a + 3 * b - 3 * c + d) * t3);
}

function sampleCurve(pts, step = 1.5) {
  const out = [];
  const n = pts.length;
  for (let i = 0; i < n - 1; i++) {
    const p0 = pts[max(i - 1, 0)];
    const p1 = pts[i];
    const p2 = pts[i + 1];
    const p3 = pts[min(i + 2, n - 1)];
    const k = max(2, ceil(dist(p1[0], p1[1], p2[0], p2[1]) / step));
    for (let j = 0; j < k; j++) {
      const t = j / k;
      out.push([
        crPoint(p0[0], p1[0], p2[0], p3[0], t),
        crPoint(p0[1], p1[1], p2[1], p3[1], t)
      ]);
    }
  }
  out.push(pts[n - 1]);
  return out;
}


function taperedStroke(pts, widths) {
  const s = sampleCurve(pts);
  const segs = pts.length - 1;
  noStroke();
  for (let i = 0; i < s.length; i++) {
    const t = (i / (s.length - 1)) * segs;
    const k = min(floor(t), segs - 1);
    const w = lerp(widths[k], widths[k + 1], t - k);
    circle(s[i][0], s[i][1], w);
  }
}

// Leg 2
function leg(pts) {
  const s = sampleCurve(pts);
  beginShape();
  for (const [x, y] of s) vertex(x, y);
  endShape();
}

