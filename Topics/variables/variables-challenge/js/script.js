/**
 * Mr. Furious
 * Mara Nowacki
 *
 * A guy who becomes visibly furious!
 */

"use strict";

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    r: 255,
    g: 225,
    b: 225
  }
};

// The sky, which darkens over time
let sky = {
  r: 160,
  g: 180,
  b: 200
};

/**
 * Create the canvas
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  // Gradually darken the sky toward black
  sky.r = constrain(sky.r - 1, 0, 255);
  sky.g = constrain(sky.g - 1, 0, 255);
  sky.b = constrain(sky.b - 1, 0, 255);

  background(sky.r, sky.g, sky.b);

  // Gradually redden Mr. Furious over time
  mrFurious.fill.g = constrain(mrFurious.fill.g - 2, 0, 255);
  mrFurious.fill.b = constrain(mrFurious.fill.b - 2, 0, 255);

  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();
}