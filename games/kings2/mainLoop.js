
import colorInSpot from "../../utils/bot/colorInSpot.js"
import robot from "robotjs"
import colorInArea from "../../utils/bot/colorInArea.js"
import Jimp from "jimp"
import readImage from "../../utils/bot/readImage.js"

let botStart = new Date;
let roundStart = new Date();
let rounds = 0;

// win 10 gaming Monitor, Bluestacks, fullscreen, menü rechts weggeklappt
// tabbar noch sichtbar

async function mainLoop(screenSize, stopBot) {

    //if in home menu
    if(colorInSpot({x: 1069, y: 981},
        "217dce")){
           
            //choose mission
            robot.moveMouse(1161, 494)
            robot.mouseClick("left")

            await new Promise(resolve => setTimeout(resolve, 2000));
 
            //bestätigen ohne Schlüssel
            robot.moveMouse(948, 676)
            robot.mouseClick("left")
    }

    // if in fight
    if(colorInSpot({x: 700, y: 842},"4aebff")){
        //if bos available
        if(colorInSpot({x: 958, y: 163},"ffd400") || colorInSpot({x: 958, y: 163},"ffd200") ){
            robot.moveMouse(958, 163)
            robot.mouseClick("left")
        }

          

               // atk 1    
             robot.moveMouse(756, 948)
             robot.mouseClick("left")
                       
            await new Promise(resolve => setTimeout(resolve, 1000));
                    // atk2
            //robot.moveMouse(889, 943)
           // robot.mouseClick("left")
             //await new Promise(resolve => setTimeout(resolve, 500));
                  // atk 3
            robot.moveMouse(1018, 943)
            robot.mouseClick("left")
           

            

           



        return;
    }

     // verwerfen wenn keine schlösser für Kiste
   if(colorInSpot({x: 871, y: 826},
    "8c6dde")){
        robot.moveMouse(871,826)
        robot.mouseClick("left")
   }

    if(colorInSpot({x: 1043, y: 825},"ffa600") ){
        robot.moveMouse(1043, 825)
        robot.mouseClick("left")
        return;
    }

    const FingerIsHere = colorInArea({x: 683, y: 43},
        {x: 1228, y: 1024},"adacc2")

        //old finger: eef3ff

    if(FingerIsHere) {
        robot.moveMouse(620 + FingerIsHere.x, 100 + FingerIsHere.y)
        robot.mouseClick("left")
        return;
    }

   

    //we died
    if(colorInSpot({x: 956, y: 894},
        "846dde")){
            robot.moveMouse(956, 894)
            robot.mouseClick("left")
            return;
    }

    // non active area 

    // beitreten 
   if(colorInSpot({x: 986, y: 720},
    "ffa600")){
        robot.moveMouse(986,720)
        robot.mouseClick("left")
   }

   // beitreten 
   if(colorInSpot({x: 967, y: 696},
    "ffa600")){
        robot.moveMouse(967,696)
        robot.mouseClick("left")
   }

   // weiterlesen 
   if(colorInSpot({x: 967, y: 756},
    "ffa200")){
        robot.moveMouse(967,756)
        robot.mouseClick("left")
   }

   // einlösen 
   if(colorInSpot({x: 1123, y: 618},
    "ffa200")){
        robot.moveMouse(1123,618)
        robot.mouseClick("left")
        robot.moveMouse(736, 223)
        robot.mouseClick("left")
   }

   
  

    //nothing else to do
    robot.moveMouse(950, 142)
    robot.mouseClick("left")
   
    await new Promise(resolve => setTimeout(resolve, 2000));
 
  
  }

  export default mainLoop


