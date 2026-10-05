/**
 * DON'T BLINK..
 * Mara Nowacki
 */

"use strict";

// VARIABLES
let playerX = 30;
let playerY = 350;
let playerSize = 20;
let playerSpeed = 3;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // BACKGROUND
  background(240);

  // DRAW GOAL
  stroke(0);
  fill(200);
  rect(520, 0, 80, 400);
  fill(0);
  textSize(20);
  text("GOAL", 535, 205);

  // DRAW EYE
  stroke(0);
  fill(20);
  arc(300, 55, 300, 60, PI, TWO_PI);

  // EYELASHES
  line(220, 60, 200, 30);
  line(300, 50, 300, 20);
  line(380, 60, 400, 30);

  // EYE WHITE
  fill(255);
  ellipse(300, 120, 260, 140);

  // VEINS
  stroke(150);
  line(180, 120, 240, 110);
  line(420, 120, 360, 110);
  line(200, 150, 250, 135);

  // IRIS AND PUPIL
  stroke(0);
  fill(100);
  ellipse(300, 120, 90, 90);
  fill(0);
  ellipse(300, 120, 40, 40);

  // WHITE SHINE
  stroke(255);
  fill(255);
  ellipse(288, 108, 12, 12);

  // PLAYER MOVEMENT
  // Left Arrow / A
  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    playerX = playerX - playerSpeed;
  }
  // Right Arrow / d
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    playerX = playerX + playerSpeed;
  }
  // Up Arrow / W
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    playerY = playerY - playerSpeed;
  }
  // Down Arrow / S
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    playerY = playerY + playerSpeed;
  }

  // KEEP PLAYER INSIDE CANVAS
  if (playerX < 0) {
    playerX = 0;
  }
  if (playerX > width - playerSize) {
    playerX = width - playerSize;
  }
  if (playerY < 0) {
    playerY = 0;
  }
  if (playerY > height - playerSize) {
    playerY = height - playerSize;
  }

  // DRAW PLAYER
  stroke(0);
  fill(20);
  rect(playerX, playerY, playerSize, playerSize);
  // tiny white eyes
  stroke(255);
  fill(255);
  ellipse(playerX + 6, playerY + 8, 5, 5);
  ellipse(playerX + 14, playerY + 8, 5, 5);
}