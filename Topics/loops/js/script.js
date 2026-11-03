/**
 * Loops Challenge
 * Mara Nowacki
 * 
 * A series of lines across the canvas
 */

"use strict";

/**
 * Creates the canvas
 */
function setup() {
    createCanvas(500, 500);
}

/**
 * Draws a gradient background, then vertical and horizontal lines
 * with gradually lightening colour
 */
function draw() {
    // Step 4: Gradient background made of lines (one pixel apart)
    for (let y = 0; y <= height; y++) {
        // Fade from pink at the top to light blue at the bottom
        let red = map(y, 0, height, 255, 150);
        let blue = map(y, 0, height, 200, 255);
        stroke(red, 180, blue);
        line(0, y, width, y);
    }

    // Step 2: Vertical lines using a while-loop
    let x = 0;
    let shade = 0;
    while (x <= width) {
        stroke(shade);
        line(x, 0, x, height);
        x = x + 50;
        shade = shade + 25;
    }

    // Step 3: Horizontal lines from the left to the right
    let y = 0;
    shade = 0;
    while (y <= height) {
        stroke(shade);
        line(0, y, width, y);
        y = y + 50;
        shade = shade + 25;
    }
}