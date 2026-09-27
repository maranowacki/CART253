/**
 * Mr. Furious
 * Mara, Alice, Nico
 *
 * A guy who becomes visibly furious! Notes for assisting classmates as well :)
 */

"use strict";

// Mr. Furious variable, creates his "group" aka variable 
let mrFurious = {
  // Position and size of Mr. Furious
  x: 200,
  y: 200,
  size: 100,
  // Anger Scale, determined by a named variable, starting value
  rage: 0,
  // Rage rate shows how quickly he angers, matches up with the other values so the sky changes equally as he angers.
  rageRate: 0.004,
  // How many pixels Mr. Furious shakes at max
  maxShake: 8,
  // Mr. Furious colors at both extremes, calm and furious 
  calmFill: { r: 255, g: 225, b: 225 }, // Random Pink
  furiousFill: { r: 255, g: 0, b: 0 } // BRIGHT Red
};

// The sky, colors based on when he is calm and furious. Sets both extremes.
let sky = {
  calm: { r: 160, g: 180, b: 200 }, // Random Sky Blue
  furious: { r: 0, g: 0, b: 0 } // BLACK..
};

// The Bird, original position + size and rate of speed
let bird = {
  x: -20,
  y: 80,
  size: 20, 
  speed: 3 // How fast it moves across the screen
};

/**
 * Create the canvas (DUH.)
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Draw (and update) Mr. Furious
 */
function draw() {
  // Build up his rage, capping it at 1 so it ends at the same time as the sky change. LOTS OF MATH..
  mrFurious.rage = constrain(mrFurious.rage + mrFurious.rageRate, 0, 1);

  // Sky: Based on Rage (The sky changes color to get darker based on anger) Lerp changes color gradually based on the extremes.
  let skyR = lerp(sky.calm.r, sky.furious.r, mrFurious.rage); // Changes red value gradually
  let skyG = lerp(sky.calm.g, sky.furious.g, mrFurious.rage); // Changes green value gradually
  let skyB = lerp(sky.calm.b, sky.furious.b, mrFurious.rage); // Changes blue value gradually
  background(skyR, skyG, skyB);

  // Color: Blends the sky as he becomss more furious
  let r = lerp(mrFurious.calmFill.r, mrFurious.furiousFill.r, mrFurious.rage); // Lets the color gradually change to the colors between the original and black
  let g = lerp(mrFurious.calmFill.g, mrFurious.furiousFill.g, mrFurious.rage);
  let b = lerp(mrFurious.calmFill.b, mrFurious.furiousFill.b, mrFurious.rage);

  // Shaking: Makes him randomly shake on each axis with a limit so he doesn't fly off the canvas ._.
  let shake = map(mrFurious.rage, 0, 1, 0, mrFurious.maxShake);
  let shakeX = mrFurious.x + random(-shake, shake);
  let shakeY = mrFurious.y + random(-shake, shake);

  // Draw Mr. Furious as a coloured circle 
  push();
  noStroke();
  fill(r, g, b);
  ellipse(shakeX, shakeY, mrFurious.size);
  pop();

  // Looping Bird, comes back around even after Mr. Furious is done changing the weather to make him BEYOND furious C:
  bird.x = bird.x + bird.speed;
  if (bird.x > width + bird.size) {
    bird.x = -bird.size;
  }

  // Draw the bird as a simple triangle, smaller size = bigger bird (WEIRD!)
  push();
  noStroke();
  fill(40, 40, 40);
  triangle( // Simple bird.. for now
    bird.x, bird.y,
    bird.x - bird.size, bird.y + bird.size / 2, 
    bird.x - bird.size, bird.y - bird.size / 2
  );
  pop();
}