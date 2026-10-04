/**
 * Steal The Giant's Heart
 * Mara Nowacki :)

"use strict";


// VARIABLES :

// Canvas
const canvasW = 800;
const canvasH = 500;

// Floor
const floorY = 400;

// Giant Position
let giantX = 450;
let giantY = 330;

// Making the Giant breathe
let breath = 0;
let breathSpeed = 0.15;
let breathingIn = true; // true = belly getting bigger

// Player Position
// The player starts on the floor on the left side, away from the giant
let playerX = 40;
let playerY = floorY - 12;

// How fast the player moves each frame
const playerSpeed = 3;


function setup() {
  createCanvas(canvasW, canvasH);
}


function draw() {

  // Background

  background(55, 45, 70);


  // Stone Block Decoration
  stroke(40, 32, 52);
  strokeWeight(3);
  noFill();
  rect(40, 60, 120, 60);
  rect(160, 60, 120, 60);
  rect(100, 120, 120, 60);
  rect(560, 80, 120, 60);
  rect(620, 140, 120, 60);


  // Window w/ Moon

  noStroke();
  fill(25, 25, 50);
  rect(360, 50, 90, 120, 45, 45, 0, 0); // rounded top
  fill(240, 235, 200);
  ellipse(420, 90, 30, 30);


  // Floor

  fill(95, 75, 55);
  rect(0, floorY, canvasW, canvasH - floorY);


  // Breathing
  // Breathing In = Going Up, Breathing Out = Going Down

  if (breathingIn) {
    breath = breath + breathSpeed;
  } else {
    breath = breath - breathSpeed;
  }

  
  if (breath > 8) {
    breathingIn = false;
  } else if (breath < 0) {
    breathingIn = true;
  }


  // Giant's Legs

  fill(70, 90, 60);
  rect(giantX + 110, giantY + 5, 200, 55, 20);


  // Giant's Feet   

  fill(60, 45, 35);
  ellipse(giantX + 320, giantY + 20, 45, 80);


  // Giant's Body

  fill(120, 80, 60);
  ellipse(giantX, giantY + 10, 300, 130 + breath);


  // Giant's Belt

  fill(50, 35, 25);
  rect(giantX + 60, giantY - 45, 25, 110);


  // Giant's Resting Arm

  fill(200, 160, 130);
  rect(giantX - 80, giantY - 55 - breath / 2, 170, 35, 15);


  // Giant's Head

  fill(210, 170, 140);
  ellipse(giantX - 200, giantY - 5, 120, 110);


  // Giant's Beard

  fill(110, 70, 40);
  arc(giantX - 170, giantY + 10, 70, 90, -HALF_PI, HALF_PI);


  // Closed Eyes (Sleeping)

  noFill();
  stroke(40);
  strokeWeight(3);
  arc(giantX - 225, giantY - 25, 22, 12, 0, PI);
  arc(giantX - 190, giantY - 25, 22, 12, 0, PI);


  // Snoring Mouth- the mouth opens a little more when the breath is bigger :)

  noStroke();
  fill(80, 30, 30);
  ellipse(giantX - 205, giantY + 15, 16, 8 + breath);


  // Zzz... These move up and down with the giant's breath

  fill(230);
  textSize(18);
  text("z", giantX - 170, giantY - 75 - breath);
  textSize(26);
  text("Z", giantX - 150, giantY - 100 - breath);
  textSize(34);
  text("Z", giantX - 125, giantY - 130 - breath);


  // Player Movement (WASD or Arrow Keys)

  if (keyIsDown(LEFT_ARROW) || keyIsDown(65)) {
    playerX = playerX - playerSpeed;
  }
  if (keyIsDown(RIGHT_ARROW) || keyIsDown(68)) {
    playerX = playerX + playerSpeed;
  }
  if (keyIsDown(UP_ARROW) || keyIsDown(87)) {
    playerY = playerY - playerSpeed;
  }
  if (keyIsDown(DOWN_ARROW) || keyIsDown(83)) {
    playerY = playerY + playerSpeed;
  }


  // Keep the Player on Screen

  if (playerX < 8) {
    playerX = 8;
  }
  if (playerX > canvasW - 8) {
    playerX = canvasW - 8;
  }
  if (playerY < 16) {
    playerY = 16;
  }
  // Stops player from sinking into the floor
  if (playerY > floorY - 12) {
    playerY = floorY - 12;
  }


  // DRAW THE PLAYER

  noStroke();

  // Cloak
  fill(35, 30, 45);
  triangle(playerX - 8, playerY + 12, playerX + 8, playerY + 12, playerX, playerY - 8);

  // Face
  fill(230, 200, 170);
  ellipse(playerX, playerY - 8, 14, 14);

  // Hood
  fill(35, 30, 45);
  arc(playerX, playerY - 9, 16, 16, PI, TWO_PI);

  // Eyes
  fill(20);
  ellipse(playerX - 3, playerY - 6, 2, 2);
  ellipse(playerX + 3, playerY - 6, 2, 2);


  // Title

  fill(240, 220, 160);
  textSize(28);
  text("Steal the Giant's Heart", 20, 40);

}