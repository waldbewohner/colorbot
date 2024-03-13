import robot from 'robotjs';
import notifier from 'node-notifier';
import { GlobalKeyboardListener } from 'node-global-key-listener';
import copyToClipboard from './utils/helper/copyToClipboard.js';
import createColorImageAndNotify from './utils/helper/createColorImageAndNotify.js';
import mainLoop from './games/template/index.js';
const v = new GlobalKeyboardListener();

let running = false;

function stopBot(){
  running = false
}


v.addListener(async (e, down) => {
  if (!down) return; 
  if(e.state !== "UP") return
  if (e.name === 'F1') {
    running = true;
    notifier.notify({
      title: 'BOT STARTED',
      message: 'Start MainLoop'
    });

    let screenSize = robot.getScreenSize()
    
    while(running){
      await mainLoop(screenSize, stopBot)
      await new Promise(resolve => setTimeout(resolve, 5));
    }
    

  } else if (e.name === 'F2') {
    running = false;
    notifier.notify({
      title: 'BOT STOPPED',
      message: 'Stop MainLoop'
    });
  } else if (e.name === 'F3') {
    var mouse = robot.getMousePos();

    notifier.notify({
      title: 'Coordiantes',
      message: `X: ${mouse.x} Y: ${mouse.y}`
    });
    console.log(`{x: ${mouse.x}, y: ${mouse.y}},`)
    copyToClipboard(`{x: ${mouse.x}, y: ${mouse.y}}`);
  } else if (e.name === 'F4') {
    const screenSize = robot.getScreenSize()
    const screenshot = robot.screen.capture(0, 0, screenSize.width, screenSize.height);
    var mouse = robot.getMousePos();
    const color = `"${screenshot.colorAt(mouse.x, mouse.y)}"`

    createColorImageAndNotify(color)
    copyToClipboard(color);
    console.log(color)
  } 

    
});



console.log("F1 START | F2 STOP | F3 GET COORDINATES | F4 GET COLOR");
