/**
 * DON'T BLINK..
 * Mara Nowacki
 */

"use strict";

// VARIABLES
// Player position + size
let playerX = 30;
let playerY = 350;
let playerSize = 20;
let playerSpeed = 3;

// eyeOpen = true + eyeClosed = false
let eyeOpen = false;
// eyeTimer counts frames (it goes up by 1 every time draw() runs)
let eyeTimer = 0;

// Moving is true when player is pressing a key
let moving = false;
// gameOver becomes true if the player moves while the eye is open
let gameOver = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // EYE TIMER
  // Timer counts until game is over
  if (gameOver == false) {
    eyeTimer = eyeTimer + 1;
  }
  // Eye is closed for 3 seconds, then opens
  if (eyeOpen == false && eyeTimer > 180) {
    eyeOpen = true;
    eyeTimer = 0;
  } else if (eyeOpen == true && eyeTimer > 120) {
    // Eye is open for 2 seconds, then closes
    eyeOpen = false;
    eyeTimer = 0;
  }

  // BACKGROUND
  // the background gets darker when the eye is open
  if (eyeOpen == true) {
    background(190);
  } else {
    background(240);
  }

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

  // Eyelashes
  line(220, 60, 200, 30);
  line(300, 50, 300, 20);
  line(380, 60, 400, 30);

  if (eyeOpen == true) {
    // OPEN EYE
    fill(255);
    ellipse(300, 120, 260, 140);

    // Veins
    stroke(150);
    line(180, 120, 240, 110);
    line(420, 120, 360, 110);
    line(200, 150, 250, 135);

    // Iris + Pupil
    stroke(0);
    fill(100);
    ellipse(300, 120, 90, 90);
    fill(0);
    ellipse(300, 120, 40, 40);

    // White Shine
    stroke(255);
    fill(255);
    ellipse(288, 108, 12, 12);

    // Warning
    stroke(0);
    fill(0);
    textSize(40);
    text("DON'T MOVE!", 170, 280);
  } else {
    // CLOSED EYE
    stroke(0);
    fill(60);
    ellipse(300, 120, 260, 140);
    fill(0);
    arc(300, 110, 220, 60, 0, PI);
  }

  // PLAYER MOVEMENT
  moving = false;

  // Player can only move if the game is not over
  if (gameOver == false) {
    // Left (A)
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      moving = true;
      // Only moves when the eye is closed
      if (eyeOpen == false) {
        playerX = playerX - playerSpeed;
      }
    }
    // Right (D)
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      moving = true;
      if (eyeOpen == false) {
        playerX = playerX + playerSpeed;
      }
    }
    // Up (W)
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      moving = true;
      if (eyeOpen == false) {
        playerY = playerY - playerSpeed;
      }
    }
    // Down (S)
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      moving = true;
      if (eyeOpen == false) {
        playerY = playerY + playerSpeed;
      }
    }
  }

  // GAME OVER CONDITION
  if (moving == true && eyeOpen == true) {
    gameOver = true;
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
  stroke(255);
  fill(255);
  ellipse(playerX + 6, playerY + 8, 5, 5);
  ellipse(playerX + 14, playerY + 8, 5, 5);

  // GAME OVER SCREEN
  if (gameOver == true) {
    stroke(0);
    fill(0);
    rect(150, 150, 300, 100);
    stroke(255);
    fill(255);
    textSize(40);
    text("GAME OVER", 200, 212);
  }
}