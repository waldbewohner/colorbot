
import colorInSpot from "../../utils/bot/colorInSpot.js"
import robot from "robotjs"
import colorInArea from "../../utils/bot/colorInArea.js"
import Jimp from "jimp"
import readImage from "../../utils/bot/readImage.js"

let botStart = new Date;
let roundStart = new Date();
let rounds = 0;

async function mainLoop(screenSize, stopBot) {


    //if update is open click right one
    if(colorInSpot({x: 1718, y: 101}, "f2c157")) {
        robot.moveMouse(1680, 181)
        robot.mouseClick("left")
    }

    //close if second place
    if(colorInSpot({x: 1856, y: 139}, "ff0000")){
            console.log("we are second place, we should leave")
            robot.keyTap("escape")

            await robot.moveMouseSmooth(1679, 706,1)
            await robot.mouseClick("left")
                
        }

    //if play gain button is there click on it
    if(colorInSpot({x: 1498, y: 806}, "039cfa")) {
        let currentDate = new Date;

        console.log("round lasted: ", ((currentDate - roundStart) / 1000))
        console.log("total Bot runtime in Seconds: ",  ((currentDate - botStart) / 1000))
        console.log("----------------------------------")
        roundStart = new Date()
        rounds++;
       
        robot.moveMouse(1498, 806)
        robot.mouseClick("left")
    }

    //if we won we can close the hunt:
    if(colorInSpot({x: 1761, y: 629}, "ffbc28")) {
    
        robot.moveMouse(1761, 629)
        robot.mouseClick("left")
    }



   
    await new Promise(resolve => setTimeout(resolve, 2000));
 
  
  }

  export default mainLoop


