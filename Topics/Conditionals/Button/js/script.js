/**
 * Press the Button
 * Mara Nowacki
 */

"use strict";

let buttonX = 200;
let buttonY = 200;
let buttonSize = 80;
let pushed = false;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(240);

  // Check if the button is clicked
  if (mouseIsPressed && dist(mouseX, mouseY, buttonX, buttonY) < buttonSize / 2) {
    pushed = true;
  }

  // Draw the button
  if (pushed == false) {
    fill(100);
    ellipse(buttonX, buttonY, buttonSize, buttonSize);
  }

  // Change the button after it is pushed
  if (pushed == true) {
    fill(20);
    ellipse(buttonX, buttonY, buttonSize - 20, buttonSize - 20);

    fill(0);
    textSize(24);
    textAlign(CENTER);
    text("PUSHED!", 200, 300);
  }
}