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
  dimmer: [78, 88, 34, 140], // see-through olive that darkens the greenhouse behind menus
  highlight: [250, 238, 211, 170] // see-through cream that fills an empty spot under the mouse
};

// Font and text sizes
const FONT_NAME = "Georgia";
const TEXT_SIZE_TITLE = 28;
const TEXT_SIZE_BUTTON = 20;
const TEXT_SIZE_BODY = 17;
const TEXT_SIZE_SMALL = 15;

// Thickness of the cream outlines
const OUTLINE_WEIGHT = 4;

// Loaded images; an image stays null if its file is missing
let images = {
  background: null,
  plants: {},
  tools: {}
};

// Every kind of plant in the game; "key" is also the image file name in assets/plants/mature/
const plantDatabase = [
  { key: "monstera", name: "Monstera", type: "Tropical", wateringNeed: "Medium", cost: 40,
    description: "A tropical plant with big split leaves. Likes bright, indirect light and drying out a little between waterings." },
  { key: "snake_plant", name: "Snake Plant", type: "Succulent", wateringNeed: "Low", cost: 30,
    description: "Tall, stiff leaves with yellow edges. Very hard to kill and happy to go weeks without water." },
  { key: "pothos", name: "Pothos", type: "Vine", wateringNeed: "Medium", cost: 25,
    description: "A trailing vine with heart-shaped leaves. Grows fast and droops a little when it's thirsty." },
  { key: "sunflower", name: "Sunflower", type: "Flower", wateringNeed: "High", cost: 20,
    description: "A cheerful flower that turns toward the sun. Needs lots of light and regular watering." },
  { key: "cactus", name: "Cactus", type: "Cactus", wateringNeed: "Low", cost: 15,
    description: "A spiky desert plant that stores water in its stem. Needs very little water and plenty of sun." },
  { key: "peace_lily", name: "Peace Lily", type: "Flowering", wateringNeed: "High", cost: 35,
    description: "Glossy leaves and white flowers. Its leaves droop when it needs water and perk up soon after." },
  { key: "fern", name: "Fern", type: "Fern", wateringNeed: "High", cost: 25,
    description: "Soft, feathery fronds that love humidity. Keep the soil slightly damp and out of harsh sun." },
  { key: "succulent", name: "Succulent", type: "Succulent", wateringNeed: "Low", cost: 15,
    description: "A small plant with thick, fleshy leaves that hold water. Water it only when the soil is dry." }
];

// The gardening tools; "key" is also the image file name in assets/tools/
let gardeningTools = [
  { key: "watering_can", name: "Watering Can", description: "Fills a plant's water level back up to 100%." },
  { key: "spray_bottle", name: "Spray Bottle", description: "Mists a plant for a small health boost. Plants that need lots of water get a bigger boost." },
  { key: "shovel", name: "Shovel", description: "Digs a plant up and puts it back in your collection." },
  { key: "fertilizer", name: "Fertilizer", description: "Helps a young plant grow faster. Fully grown plants don't need it." }
];

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

// Sidebar buttons and the screen each one opens; position and size are set in setupNavButtons()
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

// The plants the player owns; each one is an object made by addPlantToCollection()
let ownedPlants = [];

// Number given to the next plant added, so every owned plant has its own id
let nextPlantId = 1;

// The collection holds one plant per spot in the greenhouse
const MAX_OWNED_PLANTS = placementSpots.length;

// Plants the player owns when the game starts
const STARTER_PLANTS = ["pothos", "snake_plant", "succulent"];

// Index of the selected plant in ownedPlants, or -1 for none
let selectedPlantIndex = -1;

// Index of the plant card under the mouse, or -1 for none
let hoveredCardIndex = -1;

// Layout of the plant cards on the Collection screen
const collectionGrid = { x: 132, y: 196, columns: 3 };
const CARD_WIDTH = 110;
const CARD_HEIGHT = 120;
const CARD_GAP = 12;

// Area on the right of the Collection screen that shows the selected plant
const detailsArea = { x: 530, y: 196, width: 302 };

// Button that takes the selected plant to the greenhouse to place or move it; its label is set in drawPlantDetails()
let placeButton = { label: "Place", x: 530, y: 552, width: 140, height: 40 };

// Button that removes the selected plant from the collection
let removeButton = { label: "Remove", x: 692, y: 552, width: 140, height: 40 };

// True when the mouse is over the Place or Remove button
let isPlaceHovered = false;
let isRemoveHovered = false;

// Index of the greenhouse spot under the mouse, or -1 for none
let hoveredSpotIndex = -1;

// Health and water level of a newly added plant (a little thirsty when it arrives)
const NEW_PLANT_HEALTH = 80;
const NEW_PLANT_WATER = 50;

// Health the spray bottle adds, and the bigger amount for plants that need lots of water
const MIST_HEALTH_BOOST = 5;
const MIST_HEALTH_BOOST_HIGH = 10;

// Key of the tool in use, or "" for none
let selectedTool = "";

// Index of the tool button under the mouse, or -1 for none
let hoveredToolIndex = -1;

// Size and layout of the tool buttons in the sidebar; positions are set in setupToolButtons()
const TOOL_BUTTON_WIDTH = 108;
const TOOL_BUTTON_HEIGHT = 112;
const TOOL_BUTTON_GAP = 12;
const TOOL_COLUMNS = 2;
const TOOLS_TITLE_Y = 448;
const TOOL_FIRST_BUTTON_Y = 472;

// Size of the tool picture that follows the mouse while a tool is in use
const TOOL_CURSOR_SIZE = 50;

// Short message shown over a plant after using a tool; startTime is -1 when nothing is showing
let feedback = { message: "", x: 0, y: 0, startTime: -1 };

// How long a feedback message stays on screen, in milliseconds
const FEEDBACK_DURATION = 1200;


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

// Loads the background, the image for every plant in the database and the image for every tool
async function loadAssets() {
  images.background = await loadImageOrNull("assets/backgrounds/greenhouse.png");

  for (let i = 0; i < plantDatabase.length; i++) {
    let key = plantDatabase[i].key;
    images.plants[key] = await loadImageOrNull("assets/plants/mature/" + key + ".png");
  }

  for (let i = 0; i < gardeningTools.length; i++) {
    let key = gardeningTools[i].key;
    images.tools[key] = await loadImageOrNull("assets/tools/" + key + ".png");
  }
}


// 'Game' Setup

// Creates a window-sized canvas, sets the font, loads the images, and sets up scaling, buttons and starter plants
async function setup() {
  createCanvas(windowWidth, windowHeight);
  textFont(FONT_NAME);

  await loadAssets();

  updateGameScale();
  setupNavButtons();
  setupToolButtons();
  giveStarterPlants();
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

// Sets the size of each button, centers it in the sidebar and stacks them from top to bottom
function setupNavButtons() {
  for (let i = 0; i < navButtons.length; i++) {
    navButtons[i].width = NAV_BUTTON_WIDTH;
    navButtons[i].height = NAV_BUTTON_HEIGHT;
    navButtons[i].x = sidebar.x + (sidebar.width - NAV_BUTTON_WIDTH) / 2;
    navButtons[i].y = NAV_FIRST_BUTTON_Y + i * (NAV_BUTTON_HEIGHT + NAV_BUTTON_GAP);
  }
}

// Places the tool buttons in a grid in the sidebar, under the menu buttons
function setupToolButtons() {
  let gridWidth = TOOL_COLUMNS * TOOL_BUTTON_WIDTH + (TOOL_COLUMNS - 1) * TOOL_BUTTON_GAP;
  let startX = sidebar.x + (sidebar.width - gridWidth) / 2;

  for (let i = 0; i < gardeningTools.length; i++) {
    let column = i % TOOL_COLUMNS;
    let row = floor(i / TOOL_COLUMNS);

    gardeningTools[i].x = startX + column * (TOOL_BUTTON_WIDTH + TOOL_BUTTON_GAP);
    gardeningTools[i].y = TOOL_FIRST_BUTTON_Y + row * (TOOL_BUTTON_HEIGHT + TOOL_BUTTON_GAP);
  }
}

// Adds each starter plant to the collection
function giveStarterPlants() {
  for (let i = 0; i < STARTER_PLANTS.length; i++) {
    addPlantToCollection(STARTER_PLANTS[i]);
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


// Greenhouse Rendering

// Draws the greenhouse background (or a missing-image box), the empty spots and the placed plants
function drawGreenhouse() {
  if (images.background) {
    drawImageFitted(images.background, scene.x, scene.y, scene.width, scene.height);
  } else {
    drawMissingAsset("assets/backgrounds/greenhouse.png", scene.x, scene.y, scene.width, scene.height);
  }

  drawPlacementSpots();
  drawPlacedPlants();

  if (currentScreen !== "greenhouse") {
    return;
  }

  if (selectedPlantIndex !== -1) {
    // Moving or placing a plant: label the plant and explain what to do
    drawPlantLabel(selectedPlantIndex);
    drawPlacementHint();
  } else if (selectedTool !== "") {
    // Using a tool: label the plant under the mouse so you can see its health and water
    if (hoveredSpotIndex !== -1) {
      let hoveredPlant = getPlantAtSpot(placementSpots[hoveredSpotIndex].id);
      if (hoveredPlant !== -1) {
        drawPlantLabel(hoveredPlant);
      }
    }
    drawToolHint();
  }

  if (selectedTool !== "") {
    drawToolCursor();
  }

  drawFeedback();
}

// Draws an outline on every empty spot; the lines get thicker while a plant is selected so you can see where it can go
function drawPlacementSpots() {
  let isPlacing = currentScreen === "greenhouse" && selectedPlantIndex !== -1;

  for (let i = 0; i < placementSpots.length; i++) {
    let spot = placementSpots[i];

    if (getPlantAtSpot(spot.id) === -1) {
      let isHovered = isPlacing && i === hoveredSpotIndex;
      drawSpotOutline(spot, isPlacing, isHovered);
    }
  }
}

// Draws every placed plant on its spot, with a light patch under it when selected (yellow rim) or hovered (green rim)
function drawPlacedPlants() {
  for (let i = 0; i < placementSpots.length; i++) {
    let spot = placementSpots[i];
    let plantIndex = getPlantAtSpot(spot.id);

    if (plantIndex !== -1) {
      let size = PLANT_SIZES[spot.area];

      fill(COLORS.softWhite);
      strokeWeight(OUTLINE_WEIGHT);
      if (plantIndex === selectedPlantIndex) {
        stroke(COLORS.mustard);
        ellipse(spot.x, spot.y - 4, size.width * 0.9, 24);
      } else if (currentScreen === "greenhouse" && i === hoveredSpotIndex) {
        stroke(COLORS.grass);
        ellipse(spot.x, spot.y - 4, size.width * 0.9, 24);
      }

      drawPlant(ownedPlants[plantIndex], spot.x, spot.y, size.width, size.height);
    }
  }
}

// Draws a small label with the name, health and water level above a plant, if it's placed
function drawPlantLabel(plantIndex) {
  let plant = ownedPlants[plantIndex];
  let spot = getSpotById(plant.spotId);

  if (spot === null) {
    return;
  }

  let data = getPlantData(plant.plantKey);
  let size = PLANT_SIZES[spot.area];
  let labelWidth = 180;
  let labelHeight = 46;
  let labelX = spot.x - labelWidth / 2;
  let labelY = spot.y - size.height - labelHeight - 6;

  stroke(COLORS.cream);
  strokeWeight(OUTLINE_WEIGHT);
  fill(COLORS.softWhite);
  rect(labelX, labelY, labelWidth, labelHeight, 12);

  noStroke();
  fill(COLORS.oliveDark);
  textAlign(CENTER, CENTER);
  textSize(TEXT_SIZE_SMALL);
  text(data.name, spot.x, labelY + 15);
  fill(COLORS.olive);
  text("Health " + plant.health + "%  |  Water " + plant.waterLevel + "%", spot.x, labelY + 32);
}

// Draws the instruction at the top of the greenhouse while a plant is selected
function drawPlacementHint() {
  let data = getPlantData(ownedPlants[selectedPlantIndex].plantKey);
  let message = "Click an empty spot to move the " + data.name + ". Press escape to cancel.";

  if (ownedPlants[selectedPlantIndex].spotId === null) {
    message = "Click an empty spot to place the " + data.name + ". Press escape to cancel.";
  }

  drawHint(message);
}

// Draws the instruction at the top of the greenhouse while a tool is in use
function drawToolHint() {
  let tool = getToolData(selectedTool);
  drawHint(tool.name + ": click a plant to use it. Click the tool again or press escape to put it away.");
}

// Draws a message in a rounded box at the top of the greenhouse
function drawHint(message) {
  textSize(TEXT_SIZE_SMALL);
  let hintWidth = textWidth(message) + 40;
  let hintX = scene.x + (scene.width - hintWidth) / 2;

  stroke(COLORS.cream);
  strokeWeight(OUTLINE_WEIGHT);
  fill(COLORS.softWhite);
  rect(hintX, 16, hintWidth, 40, 20);

  noStroke();
  fill(COLORS.oliveDark);
  textAlign(CENTER, CENTER);
  text(message, scene.x + scene.width / 2, 36);
}

// Draws the feedback message, rising a little, until FEEDBACK_DURATION has passed
function drawFeedback() {
  if (feedback.startTime === -1) {
    return;
  }

  let elapsed = millis() - feedback.startTime;
  if (elapsed > FEEDBACK_DURATION) {
    feedback.startTime = -1;
    return;
  }

  let y = feedback.y - 20 * (elapsed / FEEDBACK_DURATION);

  textSize(TEXT_SIZE_BODY);
  let boxWidth = textWidth(feedback.message) + 32;

  stroke(COLORS.mustard);
  strokeWeight(OUTLINE_WEIGHT);
  fill(COLORS.softWhite);
  rect(feedback.x - boxWidth / 2, y - 18, boxWidth, 36, 18);

  noStroke();
  fill(COLORS.oliveDark);
  textAlign(CENTER, CENTER);
  text(feedback.message, feedback.x, y);
}

// Draws the picture of the tool in use next to the mouse, while the mouse is over the greenhouse
function drawToolCursor() {
  let gameMouseX = getGameMouseX();
  let gameMouseY = getGameMouseY();
  let img = images.tools[selectedTool];

  if (img && gameMouseX < scene.x + scene.width) {
    drawImageFitted(img, gameMouseX + 8, gameMouseY - TOOL_CURSOR_SIZE, TOOL_CURSOR_SIZE, TOOL_CURSOR_SIZE);
  }
}

// Draws a dashed pot outline (a rim and a narrower body) at one spot; thicker while placing, filled in when hovered
function drawSpotOutline(spot, isHighlighted, isHovered) {
  let left = spot.x - SPOT_WIDTH / 2;
  let top = spot.y - SPOT_HEIGHT;
  let rimHeight = SPOT_HEIGHT * 0.3;
  let bodyTop = top + rimHeight;

  // Turns on dashed lines: 9 pixels drawn, 7 pixels skipped
  drawingContext.setLineDash([9, 7]);

  if (isHovered) {
    fill(COLORS.highlight);
  } else {
    noFill();
  }

  stroke(COLORS.softWhite);
  if (isHighlighted) {
    strokeWeight(5);
  } else {
    strokeWeight(3);
  }

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

// Draws an owned plant standing at (centerX, baseY), or a missing-image box if its picture didn't load
function drawPlant(plant, centerX, baseY, maxWidth, maxHeight) {
  let img = images.plants[plant.plantKey];

  if (img) {
    drawImageGrounded(img, centerX, baseY, maxWidth, maxHeight);
  } else {
    drawMissingAsset(plant.plantKey + ".png", centerX - maxWidth / 2, baseY - maxHeight, maxWidth, maxHeight);
  }
}


// Plant Collection

// Returns the database entry for a plant key, or null if there isn't one
function getPlantData(plantKey) {
  for (let i = 0; i < plantDatabase.length; i++) {
    if (plantDatabase[i].key === plantKey) {
      return plantDatabase[i];
    }
  }

  return null;
}

// Adds a new plant to the collection; returns false if the collection is full
function addPlantToCollection(plantKey) {
  if (ownedPlants.length >= MAX_OWNED_PLANTS) {
    return false;
  }

  ownedPlants.push({
    id: nextPlantId,
    plantKey: plantKey,
    growthStage: "Mature",
    health: NEW_PLANT_HEALTH,
    waterLevel: NEW_PLANT_WATER,
    isFertilized: false,
    spotId: null,
    pot: "Original"
  });

  nextPlantId = nextPlantId + 1;
  return true;
}

// Removes the plant at an index in ownedPlants and clears the selection
function removePlantFromCollection(index) {
  ownedPlants.splice(index, 1);
  selectedPlantIndex = -1;
}

// Returns the index in ownedPlants of the plant standing on a spot, or -1 if the spot is empty
function getPlantAtSpot(spotId) {
  for (let i = 0; i < ownedPlants.length; i++) {
    if (ownedPlants[i].spotId === spotId) {
      return i;
    }
  }

  return -1;
}

// Returns the spot with a given id, or null if there isn't one (for example when a plant isn't placed)
function getSpotById(spotId) {
  for (let i = 0; i < placementSpots.length; i++) {
    if (placementSpots[i].id === spotId) {
      return placementSpots[i];
    }
  }

  return null;
}

// Puts a plant on a spot; returns false if another plant is already there
function placePlant(plantIndex, spotId) {
  if (getPlantAtSpot(spotId) !== -1) {
    return false;
  }

  ownedPlants[plantIndex].spotId = spotId;
  return true;
}

// Returns the top-left corner of the card in a given slot of the collection grid
function getCardPosition(index) {
  let column = index % collectionGrid.columns;
  let row = floor(index / collectionGrid.columns);

  return {
    x: collectionGrid.x + column * (CARD_WIDTH + CARD_GAP),
    y: collectionGrid.y + row * (CARD_HEIGHT + CARD_GAP)
  };
}


// Plant Care

// Returns the details of a tool from its key, or null if there isn't one
function getToolData(toolKey) {
  for (let i = 0; i < gardeningTools.length; i++) {
    if (gardeningTools[i].key === toolKey) {
      return gardeningTools[i];
    }
  }

  return null;
}

// Picks up a tool, or puts it away if it's already in use; switches to the greenhouse so it can be used
function selectTool(toolKey) {
  if (selectedTool === toolKey) {
    selectedTool = "";
  } else {
    selectedTool = toolKey;
    selectedPlantIndex = -1;
    currentScreen = "greenhouse";
  }
}

// Uses the selected tool on a placed plant and shows what happened above it
function useTool(toolKey, plantIndex) {
  let plant = ownedPlants[plantIndex];
  let spot = getSpotById(plant.spotId);
  let size = PLANT_SIZES[spot.area];
  let message = "";

  if (toolKey === "watering_can") {
    message = waterPlant(plant);
  } else if (toolKey === "spray_bottle") {
    message = mistPlant(plant);
  } else if (toolKey === "shovel") {
    message = digUpPlant(plant);
  } else if (toolKey === "fertilizer") {
    message = fertilizePlant(plant);
  }

  showFeedback(message, spot.x, spot.y - size.height / 2);
}

// Fills the plant's water level to 100%, unless it's already full
function waterPlant(plant) {
  if (plant.waterLevel >= 100) {
    return "Already watered";
  }

  plant.waterLevel = 100;
  return "Watered!";
}

// Adds health to the plant, more for plants that need lots of water, up to 100%
function mistPlant(plant) {
  if (plant.health >= 100) {
    return "Already healthy";
  }

  let data = getPlantData(plant.plantKey);
  let boost = MIST_HEALTH_BOOST;
  if (data.wateringNeed === "High") {
    boost = MIST_HEALTH_BOOST_HIGH;
  }

  let oldHealth = plant.health;
  plant.health = min(100, plant.health + boost);
  return "Health +" + (plant.health - oldHealth) + "%";
}

// Takes the plant out of the greenhouse; it stays in the collection
function digUpPlant(plant) {
  plant.spotId = null;
  return "Back in your collection";
}

// Marks a young plant as fertilized so it grows faster; fully grown plants don't need it
function fertilizePlant(plant) {
  if (plant.growthStage === "Mature") {
    return "Already fully grown";
  }

  if (plant.isFertilized) {
    return "Already fertilized";
  }

  plant.isFertilized = true;
  return "Fertilized!";
}

// Starts showing a feedback message centered at (x, y)
function showFeedback(message, x, y) {
  feedback.message = message;
  feedback.x = x;
  feedback.y = y;
  feedback.startTime = millis();
}


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

  noStroke();
  fill(COLORS.oliveDark);
  textSize(TEXT_SIZE_BUTTON);
  textAlign(CENTER, CENTER);
  text("Tools", sidebar.x + sidebar.width / 2, TOOLS_TITLE_Y);

  for (let i = 0; i < gardeningTools.length; i++) {
    drawToolButton(i);
  }
}

// Draws one tool button with its picture and name, outlined in yellow if in use or green if hovered
function drawToolButton(index) {
  let tool = gardeningTools[index];

  if (tool.key === selectedTool) {
    stroke(COLORS.mustard);
  } else if (index === hoveredToolIndex) {
    stroke(COLORS.grass);
  } else {
    stroke(COLORS.cream);
  }

  strokeWeight(OUTLINE_WEIGHT);
  fill(COLORS.cream);
  rect(tool.x, tool.y, TOOL_BUTTON_WIDTH, TOOL_BUTTON_HEIGHT, 14);

  let img = images.tools[tool.key];
  if (img) {
    drawImageFitted(img, tool.x + 14, tool.y + 10, TOOL_BUTTON_WIDTH - 28, 70);
  }

  noStroke();
  fill(COLORS.oliveDark);
  textAlign(CENTER, CENTER);
  textSize(TEXT_SIZE_SMALL);
  text(tool.name, tool.x + TOOL_BUTTON_WIDTH / 2, tool.y + 96);
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
  rect(button.x, button.y, button.width, button.height, button.height / 2);

  noStroke();
  fill(COLORS.oliveDark);
  textSize(TEXT_SIZE_BUTTON);
  textAlign(CENTER, CENTER);
  text(button.label, button.x + button.width / 2, button.y + button.height / 2);
}

// Darkens the greenhouse and draws a panel with a title, plus a message if one is given
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

  if (message !== "") {
    fill(COLORS.olive);
    textSize(TEXT_SIZE_BODY);
    text(message, menuPanel.x + menuPanel.width / 2, menuPanel.y + menuPanel.height / 2);
  }
}

// Shows the Shop panel
function drawShop() {
  drawMenuPanel("Plant Shop", "The shop is currently in progress");
}

// Shows the Collection panel: plant cards on the left and the selected plant's details on the right
function drawCollection() {
  drawMenuPanel("Collection (" + ownedPlants.length + "/" + MAX_OWNED_PLANTS + ")", "");

  // A card for each owned plant
  for (let i = 0; i < ownedPlants.length; i++) {
    drawPlantCard(i);
  }

  // A dashed outline for each empty slot
  for (let i = ownedPlants.length; i < MAX_OWNED_PLANTS; i++) {
    drawEmptyCard(i);
  }

  // Line between the cards and the details
  stroke(COLORS.cream);
  strokeWeight(OUTLINE_WEIGHT);
  line(detailsArea.x - 22, detailsArea.y, detailsArea.x - 22, detailsArea.y + 384);

  drawPlantDetails();
}

// Draws the card for the owned plant at an index, outlined in yellow if selected or green if hovered
function drawPlantCard(index) {
  let plant = ownedPlants[index];
  let data = getPlantData(plant.plantKey);
  let position = getCardPosition(index);

  if (index === selectedPlantIndex) {
    stroke(COLORS.mustard);
  } else if (index === hoveredCardIndex) {
    stroke(COLORS.grass);
  } else {
    stroke(COLORS.cream);
  }

  strokeWeight(OUTLINE_WEIGHT);
  fill(COLORS.cream);
  rect(position.x, position.y, CARD_WIDTH, CARD_HEIGHT, 14);

  drawPlant(plant, position.x + CARD_WIDTH / 2, position.y + 90, CARD_WIDTH - 20, 80);

  noStroke();
  fill(COLORS.oliveDark);
  textAlign(CENTER, CENTER);
  textSize(TEXT_SIZE_SMALL);
  text(data.name, position.x + CARD_WIDTH / 2, position.y + 105);
}

// Draws a dashed outline for an empty slot in the collection
function drawEmptyCard(index) {
  let position = getCardPosition(index);

  drawingContext.setLineDash([9, 7]);
  noFill();
  stroke(COLORS.cream);
  strokeWeight(3);
  rect(position.x, position.y, CARD_WIDTH, CARD_HEIGHT, 14);
  drawingContext.setLineDash([]);
}

// Draws the selected plant's picture, information and buttons, or a hint if nothing is selected
function drawPlantDetails() {
  let centerX = detailsArea.x + detailsArea.width / 2;

  if (selectedPlantIndex === -1) {
    noStroke();
    fill(COLORS.olive);
    textAlign(CENTER, CENTER);
    textSize(TEXT_SIZE_BODY);
    text("Click a plant to see its details", centerX, detailsArea.y + 190);
    return;
  }

  let plant = ownedPlants[selectedPlantIndex];
  let data = getPlantData(plant.plantKey);

  drawPlant(plant, centerX, detailsArea.y + 134, 150, 125);

  // Name and type
  noStroke();
  fill(COLORS.oliveDark);
  textAlign(CENTER, CENTER);
  textSize(TEXT_SIZE_TITLE);
  text(data.name, centerX, detailsArea.y + 162);

  fill(COLORS.olive);
  textSize(TEXT_SIZE_SMALL);
  text(data.type, centerX, detailsArea.y + 190);

  // Description, wrapped inside a box; push() and pop() keep the line spacing from affecting other text
  push();
  fill(COLORS.oliveDark);
  textAlign(LEFT, TOP);
  textLeading(20);
  text(data.description, detailsArea.x, detailsArea.y + 208, detailsArea.width, 66);
  pop();

  // Plant information
  let location = "Not placed yet";
  if (plant.spotId !== null) {
    location = plant.spotId;
  }

  fill(COLORS.oliveDark);
  textAlign(LEFT, TOP);
  text("Water: " + plant.waterLevel + "% (needs " + data.wateringNeed + ")", detailsArea.x, detailsArea.y + 266);
  text("Growth: " + plant.growthStage, detailsArea.x, detailsArea.y + 286);
  text("Health: " + plant.health + "%", detailsArea.x, detailsArea.y + 306);
  text("Location: " + location, detailsArea.x, detailsArea.y + 326);

  // The first button says "Place" for a plant in storage and "Move" for one already in the greenhouse
  if (plant.spotId === null) {
    placeButton.label = "Place";
  } else {
    placeButton.label = "Move";
  }

  drawButton(placeButton, false, isPlaceHovered);
  drawButton(removeButton, false, isRemoveHovered);
}

// Shows the Inventory panel: each tool's picture, name and what it does
function drawInventory() {
  drawMenuPanel("Inventory", "");

  for (let i = 0; i < gardeningTools.length; i++) {
    let tool = gardeningTools[i];
    let rowY = menuPanel.y + 100 + i * 95;
    let img = images.tools[tool.key];

    if (img) {
      drawImageFitted(img, menuPanel.x + 50, rowY, 70, 70);
    }

    noStroke();
    fill(COLORS.oliveDark);
    textAlign(LEFT, CENTER);
    textSize(TEXT_SIZE_BUTTON);
    text(tool.name, menuPanel.x + 145, rowY + 18);

    fill(COLORS.olive);
    textSize(TEXT_SIZE_SMALL);
    text(tool.description, menuPanel.x + 145, rowY + 48);
  }

  fill(COLORS.olive);
  textAlign(CENTER, CENTER);
  text("Click a tool in the sidebar to use it in the greenhouse.", menuPanel.x + menuPanel.width / 2, menuPanel.y + menuPanel.height - 28);
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

// Returns the area a plant takes up on a spot, used to check whether the mouse is over that spot
function getSpotBox(spot) {
  let size = PLANT_SIZES[spot.area];

  return {
    x: spot.x - size.width / 2,
    y: spot.y - size.height,
    width: size.width,
    height: size.height
  };
}

// Returns the index of the greenhouse spot under the mouse, or -1 if the mouse isn't over one
function getSpotIndexUnderMouse() {
  for (let i = 0; i < placementSpots.length; i++) {
    let box = getSpotBox(placementSpots[i]);

    if (isMouseInside(box.x, box.y, box.width, box.height)) {
      return i;
    }
  }

  return -1;
}

// Handles clicks on the sidebar buttons, then on whichever screen is open
function mousePressed() {
  for (let i = 0; i < navButtons.length; i++) {
    let button = navButtons[i];

    if (isMouseInside(button.x, button.y, button.width, button.height)) {
      currentScreen = button.screen;
      return;
    }
  }

  for (let i = 0; i < gardeningTools.length; i++) {
    let tool = gardeningTools[i];

    if (isMouseInside(tool.x, tool.y, TOOL_BUTTON_WIDTH, TOOL_BUTTON_HEIGHT)) {
      selectTool(tool.key);
      return;
    }
  }

  if (currentScreen === "collection") {
    handleCollectionClick();
  } else if (currentScreen === "greenhouse") {
    handleGreenhouseClick();
  }
}

// Selects a clicked plant card, sends the selected plant to the greenhouse with Place/Move, or removes it with Remove
function handleCollectionClick() {
  for (let i = 0; i < ownedPlants.length; i++) {
    let position = getCardPosition(i);

    if (isMouseInside(position.x, position.y, CARD_WIDTH, CARD_HEIGHT)) {
      selectedPlantIndex = i;
      return;
    }
  }

  if (selectedPlantIndex === -1) {
    return;
  }

  if (isMouseInside(placeButton.x, placeButton.y, placeButton.width, placeButton.height)) {
    selectedTool = "";
    currentScreen = "greenhouse";
  } else if (isMouseInside(removeButton.x, removeButton.y, removeButton.width, removeButton.height)) {
    removePlantFromCollection(selectedPlantIndex);
  }
}

// Uses the tool on a clicked plant; otherwise selects a clicked plant, puts the selected plant on a clicked empty spot, or clears the selection
function handleGreenhouseClick() {
  let spotIndex = getSpotIndexUnderMouse();

  // While a tool is in use, clicks only use the tool on plants
  if (selectedTool !== "") {
    if (spotIndex !== -1) {
      let toolTarget = getPlantAtSpot(placementSpots[spotIndex].id);
      if (toolTarget !== -1) {
        useTool(selectedTool, toolTarget);
      }
    }
    return;
  }

  // Clicking anywhere that isn't a spot clears the selection
  if (spotIndex === -1) {
    selectedPlantIndex = -1;
    return;
  }

  let spot = placementSpots[spotIndex];
  let plantIndex = getPlantAtSpot(spot.id);

  if (plantIndex !== -1) {
    // Clicking a plant selects it, or clears the selection if it was already selected
    if (plantIndex === selectedPlantIndex) {
      selectedPlantIndex = -1;
    } else {
      selectedPlantIndex = plantIndex;
    }
  } else if (selectedPlantIndex !== -1) {
    // Clicking an empty spot while a plant is selected puts the plant there
    placePlant(selectedPlantIndex, spot.id);
    selectedPlantIndex = -1;
  }
}

// Records which button, tool, plant card or spot the mouse is over when the mouse moves
function mouseMoved() {
  hoveredNavButton = -1;
  hoveredToolIndex = -1;
  hoveredCardIndex = -1;
  hoveredSpotIndex = -1;
  isPlaceHovered = false;
  isRemoveHovered = false;

  for (let i = 0; i < navButtons.length; i++) {
    let button = navButtons[i];

    if (isMouseInside(button.x, button.y, button.width, button.height)) {
      hoveredNavButton = i;
    }
  }

  for (let i = 0; i < gardeningTools.length; i++) {
    let tool = gardeningTools[i];

    if (isMouseInside(tool.x, tool.y, TOOL_BUTTON_WIDTH, TOOL_BUTTON_HEIGHT)) {
      hoveredToolIndex = i;
    }
  }

  if (currentScreen === "collection") {
    for (let i = 0; i < ownedPlants.length; i++) {
      let position = getCardPosition(i);

      if (isMouseInside(position.x, position.y, CARD_WIDTH, CARD_HEIGHT)) {
        hoveredCardIndex = i;
      }
    }

    if (selectedPlantIndex !== -1) {
      isPlaceHovered = isMouseInside(placeButton.x, placeButton.y, placeButton.width, placeButton.height);
      isRemoveHovered = isMouseInside(removeButton.x, removeButton.y, removeButton.width, removeButton.height);
    }
  } else if (currentScreen === "greenhouse") {
    hoveredSpotIndex = getSpotIndexUnderMouse();
  }
}

// Escape clears the selected plant and puts away the tool; on the Collection screen, the left and right arrow keys move the selection between plants
function keyPressed() {
  if (key === "Escape") {
    selectedPlantIndex = -1;
    selectedTool = "";
    return;
  }

  if (currentScreen !== "collection" || ownedPlants.length === 0) {
    return;
  }

  if (key === "ArrowRight") {
    selectedPlantIndex = (selectedPlantIndex + 1) % ownedPlants.length;
  } else if (key === "ArrowLeft") {
    if (selectedPlantIndex <= 0) {
      selectedPlantIndex = ownedPlants.length - 1;
    } else {
      selectedPlantIndex = selectedPlantIndex - 1;
    }
  }
}