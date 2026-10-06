/**
 * Events
 * Mara Nowacki
 */

"use strict";

// This keeps track of the player's score, starts at zero
let score = 0;

// This keeps track of whether the game is over
let gameOver = false;

/**
 * Creates the game canvas
 */
function setup() {

  createCanvas(400, 400);
}

/**
 * Runs repeatedly while the game is playing.
 */
function draw() {


  background("#87ceeb");

  // Check if the game is NOT over
  if (!gameOver) {

    // Increase the score by a small amount, happens every frame
    score += 0.05;
  }

  // Show the score and game over message
  displayUI();
}

/**
 * Displays the game's text and score
 */
function displayUI() {

  // Check if the game is over
  if (gameOver) {

    // Save the current text settings
    push();

    // Make the text large
    textSize(48);

    // Make the text bold
    textStyle(BOLD);

    // Center the text :)
    textAlign(CENTER, CENTER);

    // Display the "You lose!" message.
    // width / 2 = center of the canvas.
    // height / 3 = one-third down the canvas.
    text("You lose!", width / 2, height / 3);

    // Restore the previous text settings
    pop();
  }

  // Always display the player's score
  displayScore();
}

/**
 * Displays the current score
 */
function displayScore() {

  // Save the current text settings
  push();

  // Make the score text large
  textSize(48);

  // Make the score bold
  textStyle(BOLD);

  // Center the score
  textAlign(CENTER, CENTER);

  // Display the score
  text(floor(score), width / 2, height / 2);

  // Restore the previous text settings
  pop();
}

/**
 * Ends the game
 */
function lose() {

  // Prevents points from being gained after game is over
  gameOver = true;
}

/**
 * Runs when the player presses a keyboard key.
 */
function keyPressed() {

  // Any key press causes the player to lose
  lose();
}

/**
 * Runs when the player releases a keyboard key
 */
function keyReleased() {

  // Any key release causes the player to lose
  lose();
}

/**
 * Runs when the mouse moves
 */
function mouseMoved() {

  // Moving the mouse causes the player to lose
  lose();
}

/**
 * Runs when the mouse button is pressed
 */
function mousePressed() {

  // Clicking the mouse causes the player to lose
  lose();
}

/**
 * Runs when the mouse wheel is used
 */
function mouseWheel() {

  // Scrolling the mouse causes the player to lose.
  lose();
}