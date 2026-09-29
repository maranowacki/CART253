/**
 * Conditionals Challenge
 * Mara Nowacki

 */


"use strict";

// puck = red circle that can be pushed by the user's cursor circle
const puck = {
  x: 200, // starting x position (centre of the canvas)
  y: 200, // starting y position (centre of the canvas)
  size: 100, // diameter of the puck
  fill: "#ff0000" // red
};

// the user's cursor circle
const user = {
  x: undefined, // will be mouseX
  y: undefined, // will be mouseY
  size: 75, // diameter of the user circle
  fill: "#000000" // black
};

// target = circle we want to push the red puck/circle into
const target = {
  x: 320, // placed in the top right so the puck must be moved quite a bit to reach it
  y: 80,
  size: 120, // bigger than the puck so it can fit inside
  // target has two colors (puck in, puck out) as well as a current color (starts as puck out)
  fills: {
    noOverlap: "#cc3333", // colour when the puck is NOT on the target (red)
    overlap: "#33cc33" // colour when the puck IS on the target (green)
  },
  fill: "#cc3333" // the colour currently being used
};

/**
 * Create the canvas
 */
function setup() {
  // A 400 x 400 pixel canvas
  createCanvas(400, 400);
}

/**
 * Move the user circle, check for overlap, draw the circles
 */
function draw() {
  // drawn every frame for a 'live' effect
  background("#aaaaaa");

  // move user's cursor circle to the mouse position
  moveUser();

  // idk how to explain this part..
  movePuck();

  // check if the puck is on the target, change it accordingly
  checkTarget();

  // draw target FIRST so it appears behind both the user's cursor circle and the puck
  drawTarget();

  // draw user's cursor circle and puck on top AFTER target has been drawn
  drawUser();
  drawPuck();
}

/**
 * Sets the user position to the mouse position
 */
function moveUser() {
  // user's cursor circle follows mouse :)
  user.x = mouseX;
  user.y = mouseY;
}

/**
 * push the puck away from the user's cursor circle if they overlap (the user is touching the puck)
 */
function movePuck() {
  // calculate difference between origins of user's cursor circle and puck circle
  const d = dist(user.x, user.y, puck.x, puck.y);

  // two circles overlap when the distance between their centers is less than the sum of their radius = size / 2
  const overlap = (d < user.size / 2 + puck.size / 2);

  // only push the puck if the circles make contact/are touching
  if (overlap) {
    // move puck based on x and y distance from the user
    // puck.x - user.x is positive if the puck is to the RIGHT of the user
    // so the puck gets pushed right. If it's negative, it gets pushed left
    const dx = puck.x - user.x;
    // y: positive means the puck is BELOW the user, so push down
    const dy = puck.y - user.y;

    // Divide by 10 so the push isn't too powerful (otherwise puck would fly away off the canvas)
    puck.x = puck.x + dx / 10;
    puck.y = puck.y + dy / 10;
  }
  // no overlap = puck stays where it is
}

/**
 * STEP 4: Checks if the puck overlaps the target and changes the target colour
 */
function checkTarget() {
  // Distance between the centres of the puck and the target
  const d = dist(puck.x, puck.y, target.x, target.y);

  // Same overlap test as before: distance less than the sum of the radii
  const overlap = (d < puck.size / 2 + target.size / 2);

  if (overlap) {
    // The puck is on the target, so show the "success" colour (green)
    target.fill = target.fills.overlap;
  }
  else {
    // The puck is not on the target, so show the "no overlap" colour (red)
    target.fill = target.fills.noOverlap;
  }
}

/**
 * display the target 
 */
function drawTarget() {
  // push + pop allow these style settings to not bleed onto other objects
  push();
  noStroke();
  // use whatever colour 'checkTarget' decided on this frame
  fill(target.fill);
  ellipse(target.x, target.y, target.size);
  pop();
}

/**
 * displays the user's cursor circle
 */
function drawUser() {
  push();
  noStroke();
  fill(user.fill);
  ellipse(user.x, user.y, user.size);
  pop();
}

/**
 * displays the puck circle
 */
function drawPuck() {
  push();
  noStroke();
  fill(puck.fill);
  ellipse(puck.x, puck.y, puck.size);
  pop();
}