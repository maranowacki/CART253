/**
 * Pop The Balloons
 * Mara Nowacki
 */

"use strict";

let balloonX = 200;
let balloonY = 200;
let balloonSize = 100;
let popped = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);

  // Draw the balloon if it has not been popped
  if (popped == false) {
    fill(0);
    ellipse(balloonX, balloonY, balloonSize, balloonSize);

    // Draw the balloon string
    line(balloonX, balloonY + balloonSize / 2, balloonX, 350);
  }

  // Show a message after the balloon pops
  if (popped == true) {
    fill(0);
    textSize(24);
    textAlign(CENTER);
    text("POP!", 200, 200);
  }
}

function mousePressed() {
  // Check if the mouse is touching the balloon
  if (dist(mouseX, mouseY, balloonX, balloonY) < balloonSize / 2) {
    popped = true;
  }
}