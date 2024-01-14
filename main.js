const robot = require('robotjs');
const notifier = require('node-notifier');
const path = require('path');
const { GlobalKeyboardListener } = require('node-global-key-listener');
const mouseClick = require("./utils/bot/mouseClick")

const v = new GlobalKeyboardListener();

let running = false;
let resetCounter = 3;





function findWhiteCircle() {
  console.time("make screenshot")
  const screenshot = robot.screen.capture(680, 400, 250, 330);
  console.timeEnd("make screenshot");

  const buffer = screenshot.image;
  const width = screenshot.byteWidth / 4; // 4 bytes per pixel (RGBA)

  console.time("searchPixel");
  for (let y = 0; y < screenshot.height; y++) {
    for (let x = 0; x < width; x++) {
      const idx = (y * width + x) * 4; // 4 bytes per pixel

      const red = buffer[idx];
      const green = buffer[idx + 1];
      const blue = buffer[idx + 2];

      // Konvertieren Sie RGB in einen Hex-String und vergleichen Sie
      const hexColor = rgbToHex(red, green, blue);
      if (hexColor === 'f3f3f3') {
        console.timeEnd("searchPixel");
        return { x, y };
      }
    }
  }
  console.timeEnd("searchPixel");
  resetCounter++;
  return null;
}

function rgbToHex(r, g, b) {
  return [r, g, b].map(x => {
    const hex = x.toString(16);
    return hex.length === 1 ? '0' + hex : hex;
  }).join('');
}


v.addListener(async (e, down) => {
  if (!down) return; 
  if(e.state !== "UP") return
  if (e.name === 'F1') {
    running = true;
    notifier.notify({
      title: 'Bildsuche',
      message: 'Skript gestartet'
    });
    
    while(running){
      
      if(resetCounter >= 3) {
        var mousePos = robot.getMousePos();
        robot.moveMouse(mousePos.x + 50, mousePos.y)
        resetCounter = 0;
      }

    const circleCoords = findWhiteCircle();
    if (circleCoords) {

      robot.moveMouse(680 + circleCoords.x, 400 + circleCoords.y + 5)

      setTimeout(function(){
        if(!findWhiteCircle()) {
          robot.mouseClick("left")
        }
    }, 50);

      
    }
    await new Promise(resolve => setTimeout(resolve, 100));
    }

  } else if (e.name === 'F2') {
    running = false;
    notifier.notify({
      title: 'Bildsuche',
      message: 'Skript gestoppt'
    });
  } else if (e.name === 'F3') {
    var mouse = robot.getMousePos();

    notifier.notify({
      title: 'F3 Pressed',
      message: `X: ${mouse.x} Y: ${mouse.y}`
    });
  }
});



console.log("F1 START | F2 STOP | F3 GET COORDS | F4 FIND CIRCLE");
