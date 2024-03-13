import colorInSpot from "../../utils/bot/colorInSpot.js"
import mouseClick from "../../utils/bot/mouseClick.js"
import jiggle from "./utils/jiggle.js"

async function mainLoop() {

    //bingominigame
  
    console.time("start")
    if(colorInSpot({x: 964, y: 274}, "ffffff")){
      await mouseClick({x: 780, y: 559})
      await mouseClick({x: 872, y: 559})
      await mouseClick({x: 962, y: 559})
      await mouseClick({x: 780, y: 501})
      await mouseClick({x: 872, y: 501})
      await mouseClick({x: 963, y: 501})
      return;
    }
  
    //chest
    if(colorInSpot({x: 932, y: 748}, "212133")){
      console.log("find claim")
      await mouseClick({x: 932, y: 748})
      return;
    }
  
    //check if blue button is visible
    if(colorInSpot({x: 924, y: 703}, "3e436e")){
      console.log("find claim")
      await mouseClick({x: 924, y: 703})
      return;
    }
    
    //updates
    //update 2 -> 2 is more important
    if(colorInSpot({x: 914, y: 767}, "ff6217")){
      console.log("find update 2")
      await mouseClick({x: 914, y: 767})
      return;
    }
    //update 1
    if(colorInSpot({x: 801, y: 768}, "ff6217")){
      console.log("find update 1")
      await mouseClick({x: 801, y: 768})
      return;
    }
  
    
  
    //throw button
    // only if white is in the middle and the red button in the top right
    if(colorInSpot({x: 881, y: 622}, "ffffff") && colorInSpot({x: 1252, y: 239}, "ff6318")){
      console.log("throw")
      await mouseClick({x: 861, y: 586})
      setTimeout(jiggle, 1000)
      return;
    }
  
    
    console.timeEnd("start")

    await new Promise(resolve => setTimeout(resolve, 100));
  
  }

  export default mainLoop