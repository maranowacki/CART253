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
// Goal starts at this x position
let goalX = 520;
// eyeOpen = true + eyeClosed = false
let eyeOpen = false;
// eyeTimer counts frames (it goes up by 1 every time draw() runs)
let eyeTimer = 0;
// Moving is true when player is pressing a key
let moving = false;
// gameOver becomes true if the player moves while the eye is open
let gameOver = false;
// gameWon becomes true if the player reaches the goal
let gameWon = false;

function setup() {
  createCanvas(600, 400);
}

function draw() {
  // EYE TIMER
  // Timer counts until the game ends
  if (gameOver == false && gameWon == false) {
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
  // The background gets darker when the eye is open
  if (eyeOpen == true) {
    background(190);
  } else {
    background(240);
  }
  // DRAW GOAL
  stroke(0);
  fill(200);
  rect(goalX, 0, 80, 400);
  fill(0);
  textSize(20);
  text("GOAL", 535, 205);
  // DRAW EYE
  if (eyeOpen == true) {
    // OPEN EYE
    fill(255);
    ellipse(300, 125, 260, 130);
    // Gray ring + black pupil
    fill(130);
    ellipse(325, 137, 120, 110);
    fill(0);
    ellipse(325, 130, 100, 100);
    // Warning
    textSize(40);
    text("DON'T MOVE!", 170, 280);
  } else {
    // CLOSED EYE
    fill(150);
    ellipse(300, 125, 260, 130);
  }
  // Heavy black eyelid + pointed corner
  fill(0);
  ellipse(297, 95, 270, 80);
  triangle(410, 95, 455, 138, 400, 130);
  // PLAYER MOVEMENT
  moving = false;
  // Player can only move if the game is not over
  if (gameOver == false && gameWon == false) {
    // Left (A)
    if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
      moving = true;
      // Only moves when the eye is closed
      if (eyeOpen == false) { playerX = playerX - playerSpeed; }
    }
    // Right (D)
    if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
      moving = true;
      if (eyeOpen == false) { playerX = playerX + playerSpeed; }
    }
    // Up (W)
    if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
      moving = true;
      if (eyeOpen == false) { playerY = playerY - playerSpeed; }
    }
    // Down (S)
    if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
      moving = true;
      if (eyeOpen == false) { playerY = playerY + playerSpeed; }
    }
  }
  // WIN AND LOSE
  // Moving while the eye is open means game over
  if (moving == true && eyeOpen == true) {
    gameOver = true;
  }
  // Reaching the goal means you win
  if (playerX > goalX) {
    gameWon = true;
  }
  // RESTART (press R)
  if (keyIsDown(82)) {
    playerX = 30; playerY = 350;
    eyeOpen = false; eyeTimer = 0;
    gameOver = false; gameWon = false;
  }
  // KEEP PLAYER INSIDE CANVAS
  if (playerX < 0) { playerX = 0; }
  if (playerX > width - playerSize) { playerX = width - playerSize; }
  if (playerY < 0) { playerY = 0; }
  if (playerY > height - playerSize) { playerY = height - playerSize; }
  // DRAW PLAYER
  stroke(0);
  fill(20);
  rect(playerX, playerY, playerSize, playerSize);
  stroke(255);
  fill(255);
  ellipse(playerX + 6, playerY + 8, 5, 5);
  ellipse(playerX + 14, playerY + 8, 5, 5);
  // END SCREEN
  if (gameOver == true || gameWon == true) {
    stroke(255);
    fill(0);
    rect(100, 200, 400, 140);
    fill(255);
    textSize(40);
    if (gameOver == true) {
      text("GAME OVER", 200, 250);
      textSize(20);
      text("THE EYE SAW YOU", 215, 285);
    } else {
      text("YOU ESCAPED!", 170, 260);
    }
    textSize(20);
    text("PRESS R TO RESTART", 200, 320);
  }
}