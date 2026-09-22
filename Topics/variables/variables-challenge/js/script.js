/**
 * Mr. Furious
 * Mara Nowacki
 *
 * A guy who becomes visibly furious!
 */

"use strict";

// Our friend Mr. Furious
let mrFurious = {
  // Position and size
  x: 200,
  y: 200,
  size: 100,
  // Colour
  fill: {
    mrFurious.fill.r = constrain(mrFurious.fill.r + 1, 0, 255);
    mrFurious.fill.g = constrain(mrFurious.fill.g - 2, 0, 255);
    mrFurious.fill.b = constrain(mrFurious.fill.b - 2, 0, 255);
  }
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
  background(160, 180, 200);
  
  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();