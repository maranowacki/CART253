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
  // How angry he is: 0 = calm, 1 = absolutely livid
  rage: 0,
  // How much rage builds each frame
  rageRate: 0.004,
  // How far (in pixels) he shakes at maximum rage
  maxShake: 8,
  // Colours at the two extremes of his rage
  calmFill: { r: 255, g: 225, b: 225 },
  furiousFill: { r: 255, g: 0, b: 0 }
};

// The sky, which darkens as Mr. Furious gets angrier
let sky = {
  calm: { r: 160, g: 180, b: 200 },
  furious: { r: 0, g: 0, b: 0 }
};

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
  // Build up his rage, capped at 1
  mrFurious.rage = constrain(mrFurious.rage + mrFurious.rageRate, 0, 1);

  // Sky: blend from calm to dark based on his rage
  let skyR = lerp(sky.calm.r, sky.furious.r, mrFurious.rage);
  let skyG = lerp(sky.calm.g, sky.furious.g, mrFurious.rage);
  let skyB = lerp(sky.calm.b, sky.furious.b, mrFurious.rage);
  background(skyR, skyG, skyB);

  // Colour: blend from calm to furious based on rage
  let r = lerp(mrFurious.calmFill.r, mrFurious.furiousFill.r, mrFurious.rage);
  let g = lerp(mrFurious.calmFill.g, mrFurious.furiousFill.g, mrFurious.rage);
  let b = lerp(mrFurious.calmFill.b, mrFurious.furiousFill.b, mrFurious.rage);

  // Shaking: the angrier he is, the more he trembles
  let shake = map(mrFurious.rage, 0, 1, 0, mrFurious.maxShake);
  let shakeX = mrFurious.x + random(-shake, shake);
  let shakeY = mrFurious.y + random(-shake, shake);

  // Draw Mr. Furious as a coloured circle
  push();
  noStroke();
  fill(r, g, b);
  ellipse(shakeX, shakeY, mrFurious.size);
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
    bird.x - bird.size, bird.y + bird.size / 2,
    bird.x - bird.size, bird.y - bird.size / 2
  );
  pop();
}