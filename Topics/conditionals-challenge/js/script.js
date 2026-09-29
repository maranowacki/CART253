/**
 * Conditionals Challenge
 * Mara Nowacki

 */
/**
 * Conditionals Challenge
 * Mara Nowacki
 */

// PRE NOTES:
// All colors can be changed. All positions and sizes can be changed.
// NOTE: Circles always have their origin at their center.
// Organization is key, so make sure to read the notes and understand
// what they mean and what they control.
// Constraints are used when you need to make sure something stays
// between a minimum and maximum value (EX: line 115).
// All lines up to line 93 are things we learned in previous weeks:
// very easy functions + drawings.
// Constants (CONST) are used for things that do not or will not change.
// For example, we use constants when checking if the puck overlaps
// the target, so the target changes color.

"use strict";

// PUCK = RED CIRCLE WE PUSH AROUND WITH THE USER
const puck = {
  x: 200,
  y: 200,
  size: 100,
  fill: "#ff0000"
};

// USER
const user = {
  x: undefined,
  y: undefined,
  size: 75,
  fill: "#000000"
};

// TARGET
const target = {
  x: 320,
  y: 80,
  size: 120, // MAKE THE PUCK SMALLER SO IT CAN FIT IN THE TARGET :)
  
  // TARGET HAS TWO COLORS: PUCK OFF AND PUCK ON
  fills: {
    noOverlap: "#cc3333", // COLOR WHEN PUCK IS NOT OVERLAPPING TARGET (RED)
    overlap: "#33cc33"    // COLOR WHEN PUCK IS OVERLAPPING TARGET (GREEN)
  },
  
  fill: "#cc3333" // CURRENT TARGET COLOR
};

/**
 * Creates the canvas.
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, and draw the circles.
 */
function draw() {
  // DRAWN EVERY FRAME
  background("#ffffff"); // WHITE BACKGROUND

  // MOVE USER CIRCLE TO MOUSE POSITION
  moveUser();

  // PUSH PUCK AWAY FROM USER IF THEY OVERLAP
  movePuck();

  // CHECK IF PUCK IS ON TARGET (OVERLAPPING)
  checkTarget();

  // DRAW TARGET FIRST SO EVERYTHING SITS ON TOP
  drawTarget();

  // DRAW USER AND PUCK
  drawUser();
  drawPuck();
}

/**
 * Moves the user circle to the mouse position.
 */
function moveUser() {
  // USER FOLLOWS MOUSE
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * Moves the puck away from the user when they overlap.
 */
function movePuck() {
  // CALCULATE DISTANCE BETWEEN USER AND PUCK CENTERS
  const d = dist(user.x, user.y, puck.x, puck.y);

  // USER AND PUCK OVERLAP IF THIS TEST IS TRUE
  const overlap = (d < user.size / 2 + puck.size / 2);

  // ONLY PUSH THE PUCK AWAY IF THEY OVERLAP
  if (overlap) {
    const dx = puck.x - user.x;
    const dy = puck.y - user.y;

    // DIVIDE BY 10 SO THE PUSH ISN'T TOO POWERFUL
    puck.x = puck.x + dx / 10;
    puck.y = puck.y + dy / 10;
  }

  // KEEP PUCK ON CANVAS
  puck.x = constrain(puck.x, puck.size / 2, width - puck.size / 2);
  puck.y = constrain(puck.y, puck.size / 2, height - puck.size / 2);
}

/**
 * Checks if the puck is overlapping the target and changes its color.
 */
function checkTarget() {
  // DISTANCE BETWEEN PUCK CENTER AND TARGET CENTER
  const d = dist(puck.x, puck.y, target.x, target.y);

  // OVERLAP TEST
  const overlap = (d < puck.size / 2 + target.size / 2);

  if (overlap) {
    // PUCK IS ON TARGET = TARGET TURNS GREEN
    target.fill = target.fills.overlap;
  }
  else {
    // PUCK IS NOT OVERLAPPING TARGET = TARGET STAYS RED
    target.fill = target.fills.noOverlap;
  }
}

/**
 * Displays the target circle.
 */
function drawTarget() {
  // PUSH + POP MAKE SURE THE TARGET'S COLOR
  // DOES NOT AFFECT THE OTHER CIRCLES
  push();
  noStroke();
  fill(target.fill);
  ellipse(target.x, target.y, target.size);
  pop();
}

/**
 * Displays the user circle.
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * Displays the puck.
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}