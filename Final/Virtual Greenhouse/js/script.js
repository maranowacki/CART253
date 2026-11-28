// Global Variables

// Size of the game; all positions in this file use this 1280 x 720 layout
const GAME_WIDTH = 1280;
const GAME_HEIGHT = 720;

// How much the game is scaled and shifted to fit and center in the window
let gameScale = 1;
let gameOffsetX = 0;
let gameOffsetY = 0;

// Color palette sampled from the reference illustration, as [red, green, blue]
const COLORS = {
  olive: [124, 135, 52],
  oliveDark: [78, 88, 34],
  sage: [176, 186, 120],
  grass: [172, 190, 70],
  mustard: [234, 191, 86],
  cream: [250, 238, 211],
  golden: [200, 153, 53],
  goldenDark: [150, 104, 40],
  softWhite: [253, 251, 244],
  dimmer: [78, 88, 34, 140] // see-through olive that darkens the greenhouse behind menus
};

// Font and text sizes
const FONT_NAME = "Georgia";
const TEXT_SIZE_TITLE = 28;
const TEXT_SIZE_BUTTON = 20;
const TEXT_SIZE_BODY = 17;

// Thickness of the cream outlines
const OUTLINE_WEIGHT = 4;

// Loaded images; an image stays null if its file is missing
let images = {
  background: null,
  plants: {}
};

// File names of the plant images in assets/plants/mature/
const PLANT_FILE_NAMES = ["monstera", "snake_plant", "pothos", "sunflower", "cactus", "peace_lily", "fern", "succulent"];

// Largest size a plant can be drawn in each area; floor plants are bigger because the floor is closer to the viewer
const PLANT_SIZES = {
  shelf: { width: 100, height: 110 },
  table: { width: 100, height: 110 },
  floor: { width: 120, height: 130 }
};

// Current screen: "greenhouse", "shop", "collection" or "inventory"
let currentScreen = "greenhouse";

// Area on the left where the greenhouse painting is drawn
const scene = { x: 0, y: 0, width: 964, height: GAME_HEIGHT };

// Area on the right for the sidebar
const sidebar = { x: 964, y: 0, width: GAME_WIDTH - 964, height: GAME_HEIGHT };

// Size and spacing of the sidebar buttons
const NAV_BUTTON_WIDTH = 236;
const NAV_BUTTON_HEIGHT = 54;
const NAV_BUTTON_GAP = 16;
const NAV_FIRST_BUTTON_Y = 150;

// Sidebar buttons and the screen each one opens; x and y are set in setupNavButtons()
let navButtons = [
  { label: "Greenhouse", screen: "greenhouse" },
  { label: "Shop", screen: "shop" },
  { label: "Collection", screen: "collection" },
  { label: "Inventory", screen: "inventory" }
];

// Index of the button under the mouse, or -1 for none
let hoveredNavButton = -1;

// Position and size of the panel used by the Shop, Collection and Inventory screens
const menuPanel = { x: 102, y: 110, width: 760, height: 500 };

// Size of the dashed pot outline drawn on each empty spot
const SPOT_WIDTH = 76;
const SPOT_HEIGHT = 72;

// Places where plants can go; x is the center and y is where the bottom of the pot sits
let placementSpots = [
  { id: "upper-shelf-1", area: "shelf", x: 246, y: 338 },
  { id: "upper-shelf-2", area: "shelf", x: 360, y: 338 },
  { id: "lower-shelf-1", area: "shelf", x: 240, y: 474 },
  { id: "lower-shelf-2", area: "shelf", x: 360, y: 474 },
  { id: "table-1", area: "table", x: 631, y: 435 },
  { id: "table-2", area: "table", x: 746, y: 435 },
  { id: "floor-1", area: "floor", x: 505, y: 547 },
  { id: "floor-2", area: "floor", x: 367, y: 639 },
  { id: "floor-3", area: "floor", x: 772, y: 694 }
];


// Asset Loading

// Loads one image and returns it, or returns null and prints a message if the file is missing
async function loadImageOrNull(path) {
  try {
    return await loadImage(path);
  } catch (error) {
    console.log("Missing asset: " + path);
    return null;
  }
}

// Loads the background and every plant image
async function loadAssets() {
  images.background = await loadImageOrNull("assets/backgrounds/greenhouse.png");

  for (let i = 0; i < PLANT_FILE_NAMES.length; i++) {
    let name = PLANT_FILE_NAMES[i];
    images.plants[name] = await loadImageOrNull("assets/plants/mature/" + name + ".png");
  }
}


// 'Game' Setup

// Creates a window-sized canvas, sets the font, loads the images, and sets up scaling and buttons
async function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(FONT_NAME);

  await loadAssets();

  updateGameScale();
  setupNavButtons();
}

// Calculates the scale and offset that fit the game in the window without stretching
function updateGameScale() {
  gameScale = min(width / GAME_WIDTH, height / GAME_HEIGHT);
  gameOffsetX = (width - GAME_WIDTH * gameScale) / 2;
  gameOffsetY = (height - GAME_HEIGHT * gameScale) / 2;
}

// Resizes the canvas and recalculates the scale when the window changes size
function windowResized() {
  resizeCanvas(windowWidth, windowHeight);
  updateGameScale();
}

// Centers each button in the sidebar and stacks them from top to bottom
function setupNavButtons() {
  for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].x = sidebar.x + (sidebar.width - NAV_BUTTON_WIDTH) / 2;
    navButtons[i].y = NAV_FIRST_BUTTON_Y + i * (NAV_BUTTON_HEIGHT + NAV_BUTTON_GAP);
  }
}


// Draw Function

// Redraws the whole game every frame: greenhouse, open menu, then sidebar on top
function draw() {
  background(COLORS.oliveDark);

  push();
  translate(gameOffsetX, gameOffsetY);
  scale(gameScale);

  drawGreenhouse();
  drawCurrentScreen();
  drawSidebar();

  pop();
}

// Draws the menu for the current screen; the greenhouse needs nothing extra
function drawCurrentScreen() {
  if (currentScreen === "shop") {
    drawShop();
  } else if (currentScreen === "collection") {
    drawCollection();
  } else if (currentScreen === "inventory") {
    drawInventory();
  }
}


// ===== 5. GREENHOUSE RENDERING =====

// Draws the greenhouse background (or a missing-image box) and the plant spots
function drawGreenhouse() {
  if (images.background) {
    drawImageFitted(images.background, scene.x, scene.y, scene.width, scene.height);
  } else {
    drawMissingAsset("assets/backgrounds/greenhouse.png", scene.x, scene.y, scene.width, scene.height);
  }

  drawPlacementSpots();
}

// Draws an outline for every placement spot
function drawPlacementSpots() {
  for (let i = 0; i < placementSpots.length; i++) {
    drawSpotOutline(placementSpots[i]);
  }
}

// Draws a dashed pot outline (a rim and a narrower body) at one spot
function drawSpotOutline(spot) {
  let left = spot.x - SPOT_WIDTH / 2;
  let top = spot.y - SPOT_HEIGHT;
  let rimHeight = SPOT_HEIGHT * 0.3;
  let bodyTop = top + rimHeight;

  // Turns on dashed lines: 9 pixels drawn, 7 pixels skipped
  drawingContext.setLineDash([9, 7]);

  noFill();
  stroke(COLORS.softWhite);
  strokeWeight(3);

  // Pot rim
  rect(left, top, SPOT_WIDTH, rimHeight, 10);

  // Pot body, narrower at the bottom
  quad(
    left + 5, bodyTop,
    left + SPOT_WIDTH - 5, bodyTop,
    left + SPOT_WIDTH - 12, spot.y,
    left + 12, spot.y
  );

  // Turns dashed lines back off
  drawingContext.setLineDash([]);
}


// Random Image Stuff

// Returns the largest width and height an image can have inside a box while keeping its shape
function fitImageSize(img, maxWidth, maxHeight) {
  let ratio = min(maxWidth / img.width, maxHeight / img.height);

  return {
    width: img.width * ratio,
    height: img.height * ratio
  };
}

// Draws an image as large as it fits inside a box, centered in it
function drawImageFitted(img, x, y, maxWidth, maxHeight) {
  let size = fitImageSize(img, maxWidth, maxHeight);
  let drawX = x + (maxWidth - size.width) / 2;
  let drawY = y + (maxHeight - size.height) / 2;

  image(img, drawX, drawY, size.width, size.height);
}

// Draws an image with its bottom center at (centerX, baseY), so a pot stands on that point
function drawImageGrounded(img, centerX, baseY, maxWidth, maxHeight) {
  let size = fitImageSize(img, maxWidth, maxHeight);

  image(img, centerX - size.width / 2, baseY - size.height, size.width, size.height);
}

// Draws a cream box labeled with the name of a missing image file
function drawMissingAsset(fileName, x, y, w, h) {
  stroke(COLORS.golden);
  strokeWeight(OUTLINE_WEIGHT);
  fill(COLORS.cream);
  rect(x, y, w, h);

  noStroke();
  fill(COLORS.oliveDark);
  textAlign(CENTER, CENTER);
  textSize(TEXT_SIZE_BODY);
  text("Missing image:\n" + fileName, x + w / 2, y + h / 2);
}

// Plant drawing functions go here in Stage 3


// Interface Stuff

// Draws the sidebar background, the title and the buttons
function drawSidebar() {
  noStroke();
  fill(COLORS.softWhite);
  rect(sidebar.x, sidebar.y, sidebar.width, sidebar.height);

  stroke(COLORS.cream);
  strokeWeight(OUTLINE_WEIGHT * 2);
  line(sidebar.x, sidebar.y, sidebar.x, sidebar.y + sidebar.height);

  noStroke();
  fill(COLORS.oliveDark);
  textSize(TEXT_SIZE_TITLE);
  textAlign(CENTER, CENTER);
  text("Virtual\nGreenhouse", sidebar.x + sidebar.width / 2, 72);

  for (let i = 0; i < navButtons.length; i++) {
    let isActive = navButtons[i].screen === currentScreen;
    let isHovered = i === hoveredNavButton;
    drawButton(navButtons[i], isActive, isHovered);
  }
}

// Draws one button: yellow if active, bright green if hovered, soft green otherwise
function drawButton(button, isActive, isHovered) {
  if (isActive) {
    fill(COLORS.mustard);
  } else if (isHovered) {
    fill(COLORS.grass);
  } else {
    fill(COLORS.sage);
  }

  stroke(COLORS.cream);
  strokeWeight(OUTLINE_WEIGHT);
  rect(button.x, button.y, NAV_BUTTON_WIDTH, NAV_BUTTON_HEIGHT, 27);

  noStroke();
  fill(COLORS.oliveDark);
  textSize(TEXT_SIZE_BUTTON);
  textAlign(CENTER, CENTER);
  text(button.label, button.x + NAV_BUTTON_WIDTH / 2, button.y + NAV_BUTTON_HEIGHT / 2);
}

// Darkens the greenhouse and draws a panel with a title and a message
function drawMenuPanel(title, message) {
  noStroke();
  fill(COLORS.dimmer);
  rect(scene.x, scene.y, scene.width, scene.height);

  stroke(COLORS.cream);
  strokeWeight(OUTLINE_WEIGHT * 2);
  fill(COLORS.softWhite);
  rect(menuPanel.x, menuPanel.y, menuPanel.width, menuPanel.height, 24);

  noStroke();
  fill(COLORS.oliveDark);
  textAlign(CENTER, CENTER);
  textSize(TEXT_SIZE_TITLE);
  text(title, menuPanel.x + menuPanel.width / 2, menuPanel.y + 56);

  fill(COLORS.olive);
  textSize(TEXT_SIZE_BODY);
  text(message, menuPanel.x + menuPanel.width / 2, menuPanel.y + menuPanel.height / 2);
}

// Shows the Shop panel
function drawShop() {
  drawMenuPanel("Plant Shop", "The shop is currently in progress");
}

// Shows the Collection panel
function drawCollection() {
  drawMenuPanel("Collection", "Your plant collection is currently in progress");
}

// Shows the Inventory panel
function drawInventory() {
  drawMenuPanel("Inventory", "Tools and items are currently in progress");
}


// User Interactions

// Converts the mouse's x position into game coordinates
function getGameMouseX() {
  return (mouseX - gameOffsetX) / gameScale;
}

// Converts the mouse's y position into game coordinates
function getGameMouseY() {
  return (mouseY - gameOffsetY) / gameScale;
}

// Returns true if the mouse is inside the given rectangle
function isMouseInside(x, y, w, h) {
  let gameMouseX = getGameMouseX();
  let gameMouseY = getGameMouseY();

  return gameMouseX >= x && gameMouseX <= x + w && gameMouseY >= y && gameMouseY <= y + h;
}

// Switches to a button's screen when that button is clicked
function mousePressed() {
  for (let i = 0; i < navButtons.length; i++) {
    let button = navButtons[i];

    if (isMouseInside(button.x, button.y, NAV_BUTTON_WIDTH, NAV_BUTTON_HEIGHT)) {
      currentScreen = button.screen;
      return;
    }
  }
}

// Records which button the mouse is over when the mouse moves
function mouseMoved() {
  hoveredNavButton = -1;

  for (let i = 0; i < navButtons.length; i++) {
    let button = navButtons[i];

    if (isMouseInside(button.x, button.y, NAV_BUTTON_WIDTH, NAV_BUTTON_HEIGHT)) {
      hoveredNavButton = i;
    }
  }
}