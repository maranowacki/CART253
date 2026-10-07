/**
 * Hi
 * Mara Nowacki
 */

"use strict";


// Settings
const IMAGE_URL = "hi.jpg";   
const SCARE_TIME = 1500;   
// --------------------

let scaring = false;

// Preload the image so it appears instantly
const scareImage = new Image();
scareImage.src = IMAGE_URL;

// Build the black full-screen overlay that holds the image
const overlay = document.createElement("div");
overlay.style.position = "fixed";
overlay.style.top = "0";
overlay.style.left = "0";
overlay.style.width = "100vw";
overlay.style.height = "100vh";
overlay.style.background = "black";
overlay.style.display = "none";
overlay.style.zIndex = "99999";
overlay.style.overflow = "hidden";

scareImage.style.width = "100%";
scareImage.style.height = "100%";
scareImage.style.objectFit = "cover";  
overlay.appendChild(scareImage);

// Wait for the page to exist before adding the overlay
window.addEventListener("load", () => {
  document.body.appendChild(overlay);
});

// The image starts small and lunges at the screen while shaking
function animateImage() {
  scareImage.animate(
    [{ transform: "scale(0.2)" }, { transform: "scale(1.15)" }],
    { duration: 250, easing: "ease-out", fill: "forwards" }
  );
  overlay.animate(
    [
      { transform: "translate(0px, 0px)" },
      { transform: "translate(-12px, 8px)" },
      { transform: "translate(10px, -10px)" },
      { transform: "translate(-8px, -6px)" },
      { transform: "translate(8px, 10px)" }
    ],
    { duration: 80, iterations: Infinity }
  );
}

function jumpscare() {
  if (scaring) return;
  scaring = true;

  overlay.style.display = "block";
  animateImage();

  setTimeout(() => {
    overlay.style.display = "none";
    overlay.getAnimations().forEach(a => a.cancel());
    scaring = false;
  }, SCARE_TIME);
}

// Trigger on any click
document.addEventListener("click", jumpscare);