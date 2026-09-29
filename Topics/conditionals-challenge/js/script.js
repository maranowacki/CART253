/**
 * Conditionals Challenge
 * Mara Nowacki

 */

// PRE NOTES:
// All colors can be changed, all positions and scales/sizes can be changed (NOTE: CIRCLES ALWAYS HAVE THE ORIGIN AT THEIR CENTER)
// Organization is key when it comes to this, so make sure to read the notes and understand what they mean and who they control
// Constrains are used for when you need to make sure something stays between a minimum and maximum value (EX: Line 115)
// All lines up to line 93 are things we learned in previous weeks, very easy functions + drawings
// Constants (CONST) are used for things that do not or will not change, so for example on line 106, we use constants so the puck overlaps over the target, so the target changes color
// 






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
  // TARGET HAS TWO COLORS, PUCK OFF AND PUCK ON
  fills: {
    noOverlap: "#cc3333", // COLOR WHEN PUCK IS NOT OVERLAPPING TARGET (R)
    overlap: "#33cc33" // COLOR WHEN PUCK IS OVERLAPPING TARGET (G)
  },
  fill: "#cc3333" // CURRENT TARGET COLOR
};

/**
 
 */
function setup() {
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the circles
 */
function draw() {
  // DRAWN EVERY FRAME
  background("#ffffff"); // WHITE BACKGROUND

  // MOVE USER CIRCLE TO MOUSE POSITION AS IF MOVES
  moveUser();

  // PUSH PUCK AWAY FROM USER IF THEY OVERLAP
  movePuck();

  // CHECK IF PUCK IS ON TARGET (OVERLAPPING)
  checkTarget();

  // DRAW TARGET FIRST SO EVERYTHING SITS ON TOP
  drawTarget();

  // DRAW CURSOR AFTER PUCK IS DRAWN
  drawUser();
  drawPuck();
}

/**
 */
function moveUser() {
  // USER FOLLOWS MOUSE
  user.x = mouseX;
  user.y = mouseY;
}

/**
 */
function movePuck() {
  // CALCULATE DISTANCE BETWEEN USER AND PUCK ORIGINS
  const d = dist(user.x, user.y, puck.x, puck.y);

  // USER AND PUCK OVERLAP, IF THE TEST RUNS TRUE, PUSH THE PUCK AWAY FROM THE USER
  const overlap = (d < user.size / 2 + puck.size / 2);

  // ONLY PUSH THE USER AWAY IF THEY OVERLAP
  if (overlap) {
    const dx = puck.x - user.x;
    const dy = puck.y - user.y;

    // DIVIDE BY 10 SO THE PUSH ISNT TOO POWERFUL, EASIER TO CONTROL PUCK
    puck.x = puck.x + dx / 10;
    puck.y = puck.y + dy / 10;

  // KEEP PUCK ON CANVAS
  puck.x = constrain(puck.x, puck.size / 2, width - puck.size / 2);
  puck.y = constrain(puck.y, puck.size / 2, height - puck.size / 2);
}

/**
 * CHECKS IF PUCK IS OVERLAPPING ON TARGET AND CHANGES COLOR ACCORDINGLY
 */
function checkTarget() {
  // DISTANCE BETWEEN PUCK CENTERS AND TARGET
  const d = dist(puck.x, puck.y, target.x, target.y);

  // OVERLAP TEST, SAME AS BEFORRE
  const overlap = (d < puck.size / 2 + target.size / 2); 

  if (overlap) {
    // PUCK IS ON TARGET = FILLS GREEN
    target.fill = target.fills.overlap;
  }
  else {
    // PUCK ISNT OVERLAPPING ON TARGET = FILLS RED
    target.fill = target.fills.noOverlap;
  }
}

/**
  // DISPLAY TARGET CIRCLE
 */
function drawTarget() {
  // PUSH + POP MAKE SURE THE TARGETS COLOR DOES NOT EFFECT THE OTHER CIRCLES
  push();
  noStroke();
  // USE WHATEVER COLOR IS CURRENTLY SET FOR THE TARGET (CHANGES DEPENDING ON PUCK PLACEMENT)
  fill(target.fill);
  ellipse(target.x, target.y, target.size);
  pop();
}

/**
  // DISPLAYS USER
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
  // DISPLAYS PUCK  
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();

}
