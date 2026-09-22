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

// How fast things change each frame — shared by sky and Mr. Furious
let changeRate = 1;

// A bird that flies left to right
let bird = {
  x: -20,
  y: 80,
  size: 20,
  speed: 3
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
  sky.r = constrain(sky.r - changeRate, 0, 255);
  sky.g = constrain(sky.g - changeRate, 0, 255);
  sky.b = constrain(sky.b - changeRate, 0, 255);

  background(sky.r, sky.g, sky.b);

  // Gradually redden Mr. Furious over time
  mrFurious.fill.g = constrain(mrFurious.fill.g - changeRate, 0, 255);
  mrFurious.fill.b = constrain(mrFurious.fill.b - changeRate, 0, 255);

  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(mrFurious.fill.r, mrFurious.fill.g, mrFurious.fill.b);
  ellipse(mrFurious.x, mrFurious.y, mrFurious.size);
  pop();

  // Move the bird to the right, and loop it back once it's off-screen
  bird.x = bird.x + bird.speed;
  if (bird.x > width + bird.size) {
    bird.x = -bird.size;
  }

  // Draw the bird as a simple triangle
  push();
  noStroke();
  fill(40, 40, 40);
  triangle(
    bird.x, bird.y,
    bird.x - bird.size, bird.y + bird.size / 50,
    bird.x - bird.size, bird.y - bird.size / 50
  );
  pop();
}