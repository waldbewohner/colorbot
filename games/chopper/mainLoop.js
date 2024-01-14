import colorInSpot from "../../utils/bot/colorInSpot.js"
import robot from "robotjs"
import colorInArea from "../../utils/bot/colorInArea.js"
import bestMovesForLevel from "./utils/bestMovesForLevel.js"
import Jimp from "jimp"


async function mainLoop(screenSize, stopBot) {

    
    

    if(colorInSpot({x: 983, y: 696}, "fba036")) {
        console.log("STOP")
        let screenShoot = robot.screen.capture(0,0,screenSize.width, screenSize.height)
        let width = screenSize.width
        let height = screenSize.height

        // Überprüfen Sie die tatsächliche Breite der Daten im Buffer
        const bufferWidth = screenShoot.byteWidth / 4; // Teilen durch 4 für RGBA

        // Erstellen eines neuen Jimp-Bildes
        const image = new Jimp(width, height);
        for (let j = 0; j < height; j++) {
            for (let i = 0; i < width; i++) {
            const n = (j * bufferWidth + i) * 4;
            const r = screenShoot.image[n + 2];
            const g = screenShoot.image[n + 1];
            const b = screenShoot.image[n];
            const color = Jimp.rgbaToInt(r, g, b, 255);
            image.setPixelColor(color, i, j);
            }
        }

        const imagePath = 'screenshot.png';
        /*  image.greyscale(); // Umwandlung in Graustufen
            image.contrast(0.7); // Erhöhen des Kontrasts */
        await image.writeAsync(imagePath);
        
        stopBot();
    } 

    if(!colorInSpot({x: 976, y: 595}, "824d2b")) {
        console.log("Skip because of no reset")
        return;
        
    }

    let screenShoot = robot.screen.capture(0,0,screenSize.width, screenSize.height)

    

    const LevelArray = [
        [colorInSpot({x: 838, y: 345}, "582c0e", screenShoot) === true ? 1 : 0, colorInSpot({x: 1110, y: 345}, "562b0e", screenShoot) === true ? 1 : 0],
        [colorInSpot({x: 841, y: 449}, "5a2d0e", screenShoot) === true ? 1 : 0, colorInSpot({x: 1106, y: 450}, "693411", screenShoot) === true ? 1 : 0],
        [colorInSpot({x: 836, y: 557}, "572c0d", screenShoot) === true ? 1 : 0, colorInSpot({x: 1109, y: 560}, "653310", screenShoot) === true ? 1 : 0],
        [colorInSpot({x: 844, y: 664}, "4b2406", screenShoot) === true ? 1 : 0, colorInSpot({x: 1090, y: 669}, "522a0d", screenShoot) === true ? 1 : 0],
        [colorInSpot({x: 839, y: 722}, "865837", screenShoot) === false ? 2 : 0, colorInSpot({x: 1120, y: 729}, "845635", screenShoot) === false ? 2 : 0]
    ]
    
    const moves = bestMovesForLevel(LevelArray)

    if(moves.length >= 1) {

        for(let i=0; i < moves.length; i++) {
            let move = moves[i]
            if(move === "left") {
                robot.keyTap("left")
                await new Promise(resolve => setTimeout(resolve, 95));
            } 

            if(move === "right") {
                robot.keyTap("right")
                await new Promise(resolve => setTimeout(resolve, 95));
            }
            
          }

        
    }

   
    await new Promise(resolve => setTimeout(resolve, 5));
    



    
  

  
  }

  export default mainLoop