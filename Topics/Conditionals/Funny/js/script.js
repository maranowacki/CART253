/**
 * Hi
 * Mara Nowacki
 */

"use strict";

let normalBg;
let scareImg;
let showJumpscare = false;

function preload() {

  normalBg = loadImage('Hamster sunshine and rainbows.jpg'); // Safe normal image
  scareImg = loadImage('Hi.jpeg'); // Scary image/gif
}

function setup() {
  createCanvas(800, 600);
}

function draw() {
  if (showJumpscare) {
    // Display the jumpscare image to fill the canvas
    image(scareImg, 0, 0, width, height);
  } else {
    // Display the normal background
    image(normalBg, 0, 0, width, height);
    
    // Instruction text
    fill(255);
    textSize(24);
    textAlign(CENTER, CENTER);
    text('Click anywhere or press any key...', width / 2, height - 50);
  }
}

// Trigger the jumpscare on mouse click
function mousePressed() {
  showJumpscare = true;
}

// Alternatively, trigger on key press
function keyPressed() {
  showJumpscare = true;
}
