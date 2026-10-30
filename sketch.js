let Slime = [
  [0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 1, 1, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 1, 1, 2, 2, 2, 2, 2, 2, 1, 1, 0, 0, 0, 0],
  [0, 0, 0, 1, 2, 2, 3, 3, 5, 5, 5, 5, 2, 2, 1, 0, 0, 0],
  [0, 0, 1, 2, 5, 3, 3, 5, 6, 1, 5, 5, 6, 1, 2, 1, 0, 0],
  [0, 1, 2, 5, 3, 3, 5, 5, 1, 1, 5, 5, 1, 1, 5, 2, 1, 0],
  [0, 1, 2, 5, 5, 5, 5, 5, 11, 5, 5, 5, 5, 5, 5, 2, 1, 0],
  [1, 2, 5, 3, 5, 5, 5, 5, 11, 10, 7, 7, 9, 5, 5, 5, 2, 1],
  [1, 2, 5, 5, 5, 5, 5, 5, 11, 8, 9, 9, 8, 5, 5, 5, 2, 1],
  [1, 2, 5, 5, 5, 5, 4, 4, 4, 4, 4, 4, 5, 5, 5, 5, 2, 1],
  [0, 1, 2, 5, 4, 4, 4, 4, 4, 4, 4, 4, 4, 4, 5, 2, 1, 0],
  [0, 0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0, 0],
];
//18 pixels breed
//11 pixels hoog

let Dot = [
  [0, 1, 1, 0],
  [1, 1, 1, 1],
  [1, 1, 1, 1],
  [0, 1, 1, 0],
]

let livingRoomPic;
let bedroomPic;
let bathroomPic;
let kitchenPic;
let gardenPic;

let living = 1;
let bed = 2;
let bath = 3;
let kitchen = 4;
let garden = 5;

let room = living;

let slimeX = 265;
let slimeY = 425;
let slimeSpeed = 10;

let health = 100;
let healthMultiplier = 0;


let energy = 100;
let energyMultiplier = 0.02;


let hunger = 100;
let hungerMultiplier = 0.015;


let thirst = 100;
let thirstMultiplier = 0.02;

let sleep = false;


let squareSize = 15;
let dotSize = 3;

let guiMenu = false;
let guiX = 10;
let guiY = [10, 70, 130, 190];
let guiW = 150;
let guiH = 50;

let emotionY = [30, 90, 150, 210];

let barW = [120, 120, 120, 120];
let maxBarSize = 120;

let guiTimer = 0;
let guiTimerStart = false;

let fridgeMenuOpen = false;



function saveScore() {
}

function setup() {
  createCanvas(800, 800);

  //---LOADING IMAGES---//
  livingRoomPic = loadImage("50882026-2fa5-43d7-9265-6e454fcb9df5.png");
  bedroomPic = loadImage("80629767-17ac-48e0-8b49-006023047b96.png");
  bathroomPic = loadImage("c5ddbdcc-fc03-42bb-b3d8-93b2fffe373a.png");
  kitchenPic = loadImage("f3161a7a-6a2c-421c-949d-e33c57e60261.png");
  gardenPic = loadImage("29213378-bf14-4e28-b14e-18fbf6e3a24a.png");

  bottomFence = loadImage("Screenshot 2026-10-16 122713.png");

  //---FRIDGE MENU---//
  baguette = loadImage("OIP__2_-removebg-preview.png");
  pizza = loadImage("download__1_-removebg-preview.png")
  water = loadImage("download__2_-removebg-preview.png")
  cola = loadImage("OIP__3_-removebg-preview.png")

  loadStats()
}

function loadStats() {

  let loadedStats = JSON.parse(getItem("stats"));
  let loadedPositionJSON = getItem("positionSlime") ;
  let loadedPositionSlime = JSON.parse( loadedPositionJSON );
  
  if (loadedStats != null) {
    if (loadedStats.health != null) {
      health = loadedStats.health;
    }

    if (loadedStats.energy != null) {
      energy = loadedStats.energy;
    }

    if (loadedStats.energy != null) {
      hunger = loadedStats.hunger;
    }

    if (loadedStats.energy != null) {
      thirst = loadedStats.thirst;
    }
  }


  if (loadedPositionSlime != null) {
    slimeX = loadedPositionSlime.slimeX;
    slimeY = loadedPositionSlime.slimeY;
    room = loadedPositionSlime.room;
  }

}

function draw() {
  RoomSwitch();
  statsMeter();
  Movement();
  drawSlime(slimeX, slimeY);
  fridge();
  sleeping();
  GUI();
  HoverMode();
  Hitboxes();
  Minimap();

  saveStats();
}

function saveStats() {

  let stats = {}
  stats.health = health;
  stats.energy = energy;
  stats.hunger = hunger;
  stats.thirst = thirst;

  let positionSlime = {}
  positionSlime.slimeX = slimeX;
  positionSlime.slimeY = slimeY;
  positionSlime.room = room;

  storeItem("stats", JSON.stringify(stats))
  storeItem("positionSlime", JSON.stringify(positionSlime))
}

function GUI() {
  //---STATS_DISPLAY---//
  
  if (guiMenu == false) {
    fill('#55391f');
    textSize(30);
    text('Press [M] for stats', 120, 70);

    fill(150, 150, 150);
    strokeWeight(1);
    stroke(0);
    square(10, 10, 100, 15);

    fill(255);
    noStroke();
    rect(30, 55, 55, 10, 3);
    triangle(75, 60, 100, 60, 60, 80);
    triangle(75, 60, 100, 60, 60, 40);
  }

  if (guiMenu == true) {
    fill(150, 150, 150);
    strokeWeight(1);
    stroke(0);
    square(190, 10, 100, 15);

    fill(255);
    noStroke();
    rect(215, 55, 55, 10, 3);
    triangle(225, 60, 200, 60, 240, 80);
    triangle(225, 60, 200, 60, 240, 40);

    for (i = 0; i < 4; i++) {
      fill(122, 122, 122, 200);
      strokeWeight(1);
      stroke(0);
      rect(guiX, guiY[i], guiW, guiH, 5);
    }

    let emotionText = ['health', 'energy', 'hunger', 'thirst'];
    for (i = 0; i < 4; i++) {
      noStroke();
      fill(0);
      textSize(12);
      text(emotionText[i], 20, emotionY[i]);
    }

    let emotion = [health, energy, hunger, thirst];
    for (i = 0; i < 4; i++) {
      noStroke();
      fill(0);
      text(Number(emotion[i].toFixed(0)), 130, emotionY[i]);
    }

    let barY = [40, 100, 160, 220];
    for (i = 0; i < 4; i++) {
      fill('#494949');
      strokeWeight(2);
      stroke(0);
      rect(25, barY[i], 120, 10, 15);
    }

    let colorBar = ['red', 'yellow', '#704635', '#3ba6ee'];
    for (i = 0; i < 4; i++) {
      noStroke();
      fill(colorBar[i])
      rect(25, barY[i], barW[i], 10, 15);
    }

    if (barW <= 0) {
      barW = 0
    }
  }

  if (guiTimerStart == true) {
    guiTimer = guiTimer + 1;
  }
}

function Minimap() {
  noStroke(0);
  if (fridgeMenuOpen == false) {

    const roomSize = 50;
    const dotWidth = dotSize * Dot[0].length;
    let roomX;
    let roomY;

    fill(0, 0, 0);
    rect(690, 10, roomSize, 150);
    rect(640, 60, 150, roomSize);

    if (room == living) {
      roomX = 690;
      roomY = 60;
    } else if (room == bed) {
      roomX = 640;
      roomY = 60;
    } else if (room == bath) {
      roomX = 690;
      roomY = 10;
    } else if (room == kitchen) {
      roomX = 740;
      roomY = 60;
    } else {
      roomX = 690;
      roomY = 110;
    }

    const positionX = constrain((slimeX + 135) / 800, 0, 1);
    const positionY = constrain((slimeY + 82.5) / 800, 0, 1);
    const dotTravel = roomSize - dotWidth;
    drawDot(roomX + positionX * dotTravel, roomY + positionY * dotTravel);
  }
}

function statsMeter() {
  //---HAPPINESS MULITPLIER CALCULATIONS---//
  if (hunger >= 50 && thirst >= 50 && energy >= 50) {
    health = health + 0.025;
  }
  else if (hunger < 20 && thirst < 25 && energy < 30) {
    health = health - 0.025;
  }

  //---TEXT STATSMETER---//
  health = constrain(health, 0, 100);
  barW[0] = maxBarSize / 100 * health;

  if (sleep == false) {
    energy = energy - energyMultiplier;
  }
  energy = constrain(energy, 0, 100);
  barW[1] = maxBarSize / 100 * energy;

  hunger = hunger - hungerMultiplier;
  hunger = constrain(hunger, 0, 100);
  barW[2] = maxBarSize / 100 * hunger;

  thirst = thirst - thirstMultiplier;
  thirst = constrain(thirst, 0, 100);
  barW[3] = maxBarSize / 100 * thirst;
}

function fridge() {
  if (fridgeMenuOpen == true) {
    fridgeMenu();
  }
}

function fridgeMenu() {
  fill('#6d6d6d');
  rect(150, 50, 500, 700, 15);

  fill('#4b4b4b');
  strokeWeight(1);
  stroke(0);
  rect(575, 50, 75, 700, 10);

  strokeWeight(1);
  stroke(0);
  fill('#e03e3e');
  square(575, 50, 75, 5);

  stroke(255);
  strokeWeight(10);
  line(590, 65, 635, 110);
  line(590, 110, 635, 65);


  let fridgeMenuY = [110, 260, 410, 560];
  for (i = 0; i < 4; i++) {
    fill(150);
    strokeWeight(1);
    stroke(0);
    rect(200, fridgeMenuY[i], 350, 125, 10);
  }

  let fridgeMenuFoodY = [110, 260];
  for (i = 0; i < 2; i++) {
    fill('#6d4c1b');
    rect(200, fridgeMenuFoodY[i], 150, 125, 10);
  }

  let fridgeMenuDrinkY = [410, 560];
  for (i = 0; i < 2; i++) {
    fill('#57b7d4');
    rect(200, fridgeMenuDrinkY[i], 150, 125, 10);
  }

  let foodPic = [baguette, pizza, water, cola];
  let foodY = [100, 250, 410, 565];
  let foodSize = [150, 150, 125, 125];
  let foodX = [200, 200, 215, 215];
  for (i = 0; i < 4; i++) {
    image(foodPic[i], foodX[i], foodY[i], foodSize[i], foodSize[i]);
  }

  let foodStatY = [150, 300];
  let energyStatFoodY = [210, 360];
  let drinkStatY = [450, 600];
  let energyStatDrinkY = [510, 660];
  let addedHungerText = ['+ 25 Hunger', '+ 40 Hunger'];
  let addedEnergyFoodText = ['+ 15 Energy', '+ 25 Energy'];
  let addedThirstText = ['+ 35 Thirst', '+ 20 Thirst'];
  let addedEnergyDrinkText = ['+ 10 Energy', '+ 25 Energy'];
  for (i = 0; i < 2; i++) {
    fill('#6d4c1b');
    textSize(30);
    text(addedHungerText[i], 360, foodStatY[i]);
    fill('#eccb5d');
    text(addedEnergyFoodText[i], 360, energyStatFoodY[i]);
  }

  for (i = 0; i < 2; i++) {
    fill('#57b7d4');
    textSize(30);
    text(addedThirstText[i], 360, drinkStatY[i]);
    fill('#eccb5d');
    text(addedEnergyDrinkText[i], 360, energyStatDrinkY[i]);
  }
}

function sleeping() {
  if (sleep == true) {
    fill(0, 0, 0, 175);
    square(0, 0, 800);

    energy = energy + 0.1;

    slimeX = 325;
    slimeY = 365;

    fill('#ffffff');
    textSize(55);
    text('Press [E] to wake up', 150, 390);
  }
}

function mouseClicked() {
  if (guiMenu == false) {
    if (mouseX > 10 && mouseX < 110 && mouseY > 10 && mouseY < 110) {
      guiMenu = true;
    }
  }

  if (guiMenu == true) {
    if (mouseX > 190 && mouseX < 290 && mouseY > 10 && mouseY < 110) {
      guiMenu = false;
    }
  }

  if (mouseX > 575 && mouseX < 650 && mouseY > 50 && mouseY < 125) {
    fridgeMenuOpen = false;
  }

  if (fridgeMenuOpen == true) {
    if (mouseX > 200 && mouseX < 350 && mouseY > 110 && mouseY < 235) {
      hunger = hunger + 25;
      energy = energy + 15;
    }

    if (mouseX > 200 && mouseX < 350 && mouseY > 260 && mouseY < 385) {
      hunger = hunger + 40;
      energy = energy + 25;
    }

    if (mouseX > 200 && mouseX < 350 && mouseY > 410 && mouseY < 535) {
      thirst = thirst + 35;
      energy = energy + 10;
    }

    if (mouseX > 200 && mouseX < 350 && mouseY > 560 && mouseY < 685) {
      thirst = thirst + 20;
      energy = energy + 25;
    }
  }
}

function HoverMode() {

  if (guiMenu == false) {
    if (mouseX > 10 && mouseX < 110 && mouseY > 10 && mouseY < 110) {
      fill(0, 0, 0, 50);
      square(10, 10, 100, 15);
    }
  }

  if (guiMenu == true) {
    if (mouseX > 190 && mouseX < 290 && mouseY > 10 && mouseY < 110) {
      fill(0, 0, 0, 50)
      square(190, 10, 100, 15);
    }
  }


  if (fridgeMenuOpen == true) {
    if (mouseX > 575 && mouseX < 650 && mouseY > 50 && mouseY < 125) {
      fill(0, 0, 0, 50);
      square(575, 50, 75, 5);
    }

    let foodY1 = [110, 260, 410, 560];
    let foodY2 = [235, 385, 535, 685];
    let fridgeMenuY = [110, 260, 410, 560];
    for (i = 0; i < 4; i++) {
      if (mouseX > 200 && mouseX < 350 && mouseY > foodY1[i] && mouseY < foodY2[i]) {
        fill(0, 0, 0, 50);
        rect(200, fridgeMenuY[i], 150, 125, 10);
      }
    }
  }
}

function Movement() {

  if (fridgeMenuOpen == true || sleep == true) {
    return;
  }

  //arrow up
  if (keyIsDown(38)) {
    slimeY = slimeY - slimeSpeed;
  }

  //arrow left
  if (keyIsDown(37)) {
    slimeX = slimeX - slimeSpeed;
  }

  //arrow right
  if (keyIsDown(39)) {
    slimeX = slimeX + slimeSpeed;
  }

  //arrow down
  if (keyIsDown(40)) {
    slimeY = slimeY + slimeSpeed;
  }


  //W
  if (keyIsDown(87)) {
    slimeY = slimeY - slimeSpeed;
  }

  //A  
  if (keyIsDown(65)) {
    slimeX = slimeX - slimeSpeed;
  }

  //D
  if (keyIsDown(68)) {
    slimeX = slimeX + slimeSpeed;
  }

  //S
  if (keyIsDown(83)) {
    slimeY = slimeY + slimeSpeed;
  }

}

function Hitboxes() {
  if (room == garden) {
    image(bottomFence, 0, 710, 800, 100);

    if (slimeY > 545) {
      slimeY = 545;
    }
  }
  if (fridgeMenuOpen == false) {
    if (slimeX > -50 && slimeX < 150 && slimeY > 150 && slimeY < 475 && room == kitchen) {
      fill('#8d6341');
      strokeWeight(2.5);
      stroke(0);
      textSize(50);
      text('[ E ]', 105, 410);
    }
  }

  if (sleep == false) {
    if (slimeX > 180 && slimeX < 530 && slimeY > 290 && slimeY < 550 && room == bed) {
      fill('#8d6341');
      strokeWeight(2.5);
      stroke(0);
      textSize(50);
      text('[ E ]', 410, 500);
    }
  }
}

function RoomSwitch() {
  if (room == living) {
    image(livingRoomPic, 0, 0, 800, 800);

    //go to right (kitchen)
    if (slimeX > 800) {
      room = kitchen;
      slimeX = -270;
    }

    //go to left (bed)
    if (slimeX < -270) {
      room = bed;
      slimeX = 800;
    }

    //go to up (bath)
    if (slimeY < -165) {
      room = bath;
      slimeY = 800;
    }

    //go to down (garden)
    if (slimeY > 800) {
      room = garden;
      slimeY = -165;
    }
  }

  if (room == kitchen) {
    image(kitchenPic, 0, 0, 800, 800);

    //border up
    if (slimeY < 0) {
      slimeY = 0;
    }

    //border down
    if (slimeY > 635) {
      slimeY = 635;
    }

    //border right
    if (slimeX > 530) {
      slimeX = 530;
    }

    //go to left (living)
    if (slimeX < -270) {
      room = living;
      slimeX = 800;
    }
  }

  if (room == bed) {
    image(bedroomPic, 0, 0, 800, 800);

    //border up
    if (slimeY < 0) {
      slimeY = 0;
    }

    //border down
    if (slimeY > 635) {
      slimeY = 635;
    }

    //border left
    if (slimeX < 0) {
      slimeX = 0;
    }

    //go to right (living)
    if (slimeX > 800) {
      room = living;
      slimeX = -270;
    }
  }

  if (room == bath) {
    image(bathroomPic, 0, 0, 800, 800);

    //border up
    if (slimeY < 0) {
      slimeY = 0;
    }

    //border right
    if (slimeX > 530) {
      slimeX = 530;
    }

    //border left
    if (slimeX < 0) {
      slimeX = 0;
    }

    //go to down (living)
    if (slimeY > 800) {
      room = living;
      slimeY = -165;
    }
  }

  if (room == garden) {
    image(gardenPic, 0, 0, 800, 800);

    //border down
    if (slimeY > 635) {
      slimeY = 635;
    }

    //border right
    if (slimeX > 530) {
      slimeX = 530;
    }

    //border left
    if (slimeX < 0) {
      slimeX = 0;
    }

    //go to up (living)
    if (slimeY < -165) {
      room = living;
      slimeY = 800;
    }
  }
}

function keyPressed() {
  if (key === "m") {
    guiMenu = !guiMenu;
  }

  if (key === "e" && slimeX > -50 && slimeX < 150 && slimeY > 150 && slimeY < 475 && room == kitchen) {
    fridgeMenuOpen = !fridgeMenuOpen;
  }

  if (key === 'e' && slimeX > 180 && slimeX < 530 && slimeY > 290 && slimeY < 550 && room == bed) {
    sleep = !sleep;
  }
}

function drawSlime(positieX, offSetY) {
  noStroke();
  let offSetX = 0;
  for (let y = 0; y < Slime.length; y++) {
    for (let x = 0; x < Slime[y].length; x++) {

      //achtergrond kleur (doorzichtig)
      if (Slime[y][x] == 0) {
        fill(255, 255, 255, 0);
      }

      //zwart (outline)
      if (Slime[y][x] == 1) {
        fill('#000000');
      }

      if (Slime[y][x] == 2) {
        fill('#8ddb5b');
      }

      if (Slime[y][x] == 3) {
        fill('#d0fe70');
      }

      if (Slime[y][x] == 4) {
        fill('#3da46f');
      }

      if (Slime[y][x] == 5) {
        fill('#67c165');
      }

      if (Slime[y][x] == 6) {
        fill('#ffffff');
      }

      if (health > 70) {
        if (Slime[y][x] == 9) {
          fill('#000000');
        }
        if (Slime[y][x] == 7) {
          fill('#67c165');
        }
        if (Slime[y][x] == 8) {
          fill('#67c165');
        }
      }

      if (health <= 70) {
        if (Slime[y][x] == 7) {
          fill('#000000');
        }
        if (Slime[y][x] == 9) {
          fill('#67c165');
        }
      }

      if (health <= 30) {
        if (Slime[y][x] == 8) {
          fill('#000000');
        }
        if (Slime[y][x] == 11) {
          fill('#396996');
        }
        if (Slime[y][x] == 10) {
          fill('#67c165');
        }
      }

      if (health > 30) {
        if (Slime[y][x] == 10) {
          fill('#000000');
        }
        if (Slime[y][x] == 11) {
          fill('#67c165');
        }
      }

      square(offSetX + (x * squareSize) + positieX, offSetY + (y * squareSize), squareSize);
    }
  }
}

function drawDot(positieX, offSetY) {
  noStroke();
  let offSetX = 0;
  for (let y = 0; y < Dot.length; y++) {
    for (let x = 0; x < Dot[y].length; x++) {

      //achtergrond kleur (doorzichtig)
      if (Dot[y][x] == 0) {
        fill(255, 255, 255, 0);
      }

      if (Dot[y][x] == 1) {
        fill('#8ddb5b');
      }

      square(offSetX + (x * dotSize) + positieX, offSetY + (y * dotSize), dotSize);
    }
  }
}