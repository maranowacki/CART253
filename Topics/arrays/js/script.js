/**
 * Boingo
 * Mara Nowacki
 *
 * Lots of balls that bounce around on the canvas.
 */

// Array of Balls
let balls = [];

/**
 * Create the canvas
 */
function setup() {
  // Create the canvas
  createCanvas(400, 400);
}

/**
 * Creates a random ball
 */
function createBall() {
  // Create a ball object with appropriate properties
  const newBall = {
    // Position and dimensions
    x: 200,
    y: 200,
    size: 20,
    // Colour
    fill: "#000000",
    // Movement
    velocity: {
      x: random(-5, 5),
      y: random(-5, 5)
    }
  };
  return newBall;
}

/**
 * Moves, bounces, and draws every ball in the array
 */
function draw() {
  background("#87ceeb");

  // Go through every ball in the array
  for (let ball of balls) {
    moveBall(ball);
    bounceBall(ball);
    drawBall(ball);
  }
}

/**
 * Adds a new ball to the array each time the mouse is clicked
 */
function mousePressed() {
  const newBall = createBall();
  balls.push(newBall);
}

/**
 * Moves the ball according to its velocity
 */
function moveBall(ball) {
  ball.x += ball.velocity.x;
  ball.y += ball.velocity.y;
}

/**
 * Bounces the ball off the walls
 */
function bounceBall(ball) {
  // Check if the ball has reached the left or right
  const bounceX = (ball.x > width || ball.x < 0);
  // Check if the ball has reached the top or bottom
  const bounceY = (ball.y > height || ball.y < 0);

  // Handle bouncing horizontally
  if (bounceX) {
    ball.velocity.x *= -1;
  }
  // Handle bouncing vertically
  if (bounceY) {
    ball.velocity.y *= -1;
  }
}

/**
 * Draw the ball on the canvas
 */
function drawBall(ball) {
  push();
  noStroke();
  fill(ball.fill);
  ellipse(ball.x, ball.y, ball.size);
  pop();
}