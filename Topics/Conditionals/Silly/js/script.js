/**
 * Silly Project
 * Mara Nowacki
 */

"use strict";

let scared = false;
let picture = document.createElement("img");

// Sets up the page with the hamster picture
function setUpPage() {
  document.body.style.margin = "0";
  document.body.style.background = "black";

  picture.src = "hamster.jpg";
  picture.style.display = "block";
  picture.style.width = "100vw";
  picture.style.height = "100vh";
  picture.style.objectFit = "cover";
  document.body.appendChild(picture);
}

// Switches between the hamster and the scary image
function jumpscare() {
  if (scared == false) {
    picture.src = "hi.jpeg";
    scared = true;
  } else {
    picture.src = "hamster.jpg";
    scared = false;
  }
}
