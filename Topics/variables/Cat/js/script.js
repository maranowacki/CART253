/**
 * Cat Tail
 * Mara Nowacki :)
 * 
 */

function setup() {
  createCanvas(490, 640);
  noLoop();
}

function draw() {
  background(255);
  noStroke();
  fill(0);

  taperedPath([
    [262, 604], [200, 602], [130, 594], [70, 582],
    [34, 562], [40, 538], [90, 524], [160, 520],
    [230, 522], [300, 528], [365, 534], [398, 546],
    [382, 556], [330, 556], [285, 550]
  ], 5, 9);

  blob([
    // ears
    [197, 46], [216, 58], [229, 26],
    // back of head and neck (right side)
    [262, 42], [295, 68], [318, 108], [332, 170],
    [326, 240], [308, 310], [292, 380], [282, 450],
    [278, 510], [276, 548],
    // base
    [220, 552], [160, 548],
    // chest and front of neck (left side)
    [156, 495], [165, 440], [190, 390], [228, 330],
    [262, 265], [282, 212], [288, 178],
    // chin and face
    [262, 176], [232, 174], [210, 164], [199, 148],
    [203, 128], [200, 100], [206, 76]
  ]);
}


function blob(pts) {
  beginShape();
  let n = pts.length;
  for (let i = 0; i < n; i++) {
    let p0 = pts[(i - 1 + n) % n], p1 = pts[i];
    let p2 = pts[(i + 1) % n], p3 = pts[(i + 2) % n];
    for (let t = 0; t < 1; t += 0.1) {
      vertex(crPoint(p0[0], p1[0], p2[0], p3[0], t),
             crPoint(p0[1], p1[1], p2[1], p3[1], t));
    }
  }
  endShape(CLOSE);
}


function taperedPath(pts, rStart, rEnd) {
  let p = [pts[0], ...pts, pts[pts.length - 1]];
  let samples = [];
  for (let i = 0; i < p.length - 3; i++) {
    for (let t = 0; t < 1; t += 0.02) {
      samples.push([
        crPoint(p[i][0], p[i + 1][0], p[i + 2][0], p[i + 3][0], t),
        crPoint(p[i][1], p[i + 1][1], p[i + 2][1], p[i + 3][1], t)
      ]);
    }
  }
  for (let i = 0; i < samples.length; i++) {
    let u = i / (samples.length - 1);
    let r = lerp(rStart, rEnd, min(u * 4, 1)); 
    circle(samples[i][0], samples[i][1], r * 2);
  }
}


function crPoint(p0, p1, p2, p3, t) {
  let t2 = t * t;
  let t3 = t2 * t;
  return 0.5 * (
    2 * p1 +
    (-p0 + p2) * t +
    (2 * p0 - 5 * p1 + 4 * p2 - p3) * t2 +
    (-p0 + 3 * p1 - 3 * p2 + p3) * t3
  );
}