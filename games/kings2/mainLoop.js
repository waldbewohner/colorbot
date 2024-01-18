
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

async function sellStuffInsideOfItemSlot(){

    for (let i = 0; i < 10; i++) {

     //click on first slot
     robot.moveMouse(863, 763)
     robot.mouseClick("left")
     await new Promise(resolve => setTimeout(resolve, 1000));

     //check if there is a item (Verkaufen button)
     if(colorInSpot({x: 1188, y: 648},
        "8c6dde")){

             //for green arrow as a sign for an
             // update
             const isUpgrade = colorInArea({x: 852, y: 360},
                 {x: 1140, y: 407},"63d219")

             if(isUpgrade) {
                 console.log("isUpgrade")
                 robot.moveMouse(879, 653)
                 await new Promise(resolve => setTimeout(resolve, 200));
                 robot.mouseClick("left")
             } else {
                 console.log("is not an Upgrade")
                 robot.moveMouse(1182, 636)
                 await new Promise(resolve => setTimeout(resolve, 200));
                 robot.mouseClick("left")
                 await new Promise(resolve => setTimeout(resolve, 1000));
                 //if legendary we have to confirm
                 if(colorInSpot({x: 953, y: 550},
                     "9475de")){
                         robot.moveMouse(953, 550)
                         await new Promise(resolve => setTimeout(resolve, 200));
                         robot.mouseClick("left")
                         await new Promise(resolve => setTimeout(resolve, 500));
                         
                 }
             }

     } else {
         break;
     }
    }
    // close window
    robot.moveMouse(952, 149)
    robot.mouseClick("left")

}

async function mainLoop(screenSize, stopBot) {

    //if in home menu
    if(colorInSpot({x: 839, y: 987},
        "ff9309")){

            if(rounds >= 7){
                //open inventory
                robot.moveMouse(841, 985)
                await new Promise(resolve => setTimeout(resolve, 250));
                robot.mouseClick("left")
                await new Promise(resolve => setTimeout(resolve, 2000));

                //is inventory open?
                if(colorInSpot({x: 1027, y: 811},
                    "5cc4ff")){

                        //open hand slot
                        robot.moveMouse(741, 520)
                        await new Promise(resolve => setTimeout(resolve, 250));
                        robot.mouseClick("left")
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await sellStuffInsideOfItemSlot()

                        //boots
                        robot.moveMouse(745, 635)
                        await new Promise(resolve => setTimeout(resolve, 250));
                        robot.mouseClick("left")
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await sellStuffInsideOfItemSlot()

                        //head
                        robot.moveMouse(1173, 412)
                        await new Promise(resolve => setTimeout(resolve, 250));
                        robot.mouseClick("left")
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await sellStuffInsideOfItemSlot()

                        //chest
                        robot.moveMouse(1178, 518)
                        await new Promise(resolve => setTimeout(resolve, 250));
                        robot.mouseClick("left")
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await sellStuffInsideOfItemSlot()

                        //shield
                        robot.moveMouse(1176, 625)
                        await new Promise(resolve => setTimeout(resolve, 250));
                        robot.mouseClick("left")
                        await new Promise(resolve => setTimeout(resolve, 1000));
                        await sellStuffInsideOfItemSlot()

                }

                console.log("sold all items")
                rounds = 0;
            }
            
            await new Promise(resolve => setTimeout(resolve, 1000));
           //click on Map
           robot.moveMouse(734, 986)
           await new Promise(resolve => setTimeout(resolve, 250));
            robot.mouseClick("left")
            await new Promise(resolve => setTimeout(resolve, 250));
            //click dungeon
            robot.moveMouse(972, 393)
            await new Promise(resolve => setTimeout(resolve, 250));
            robot.mouseClick("left")
            await new Promise(resolve => setTimeout(resolve, 250));
            //choose mission
            robot.moveMouse(1158, 548)
            await new Promise(resolve => setTimeout(resolve, 250));
            robot.mouseClick("left")
            await new Promise(resolve => setTimeout(resolve, 250));
            await new Promise(resolve => setTimeout(resolve, 2000));
 
            //bestätigen ohne Schlüssel
            robot.moveMouse(837, 697)
            await new Promise(resolve => setTimeout(resolve, 250));
            robot.mouseClick("left")
            await new Promise(resolve => setTimeout(resolve, 2000));

            //Bestätigen - gilde auswählen
            robot.mouseClick("left")
            await new Promise(resolve => setTimeout(resolve, 250));

            

            console.log("next run")
            rounds++;
            await new Promise(resolve => setTimeout(resolve, 1000));
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


