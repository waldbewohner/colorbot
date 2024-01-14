import colorInSpot from "../../utils/bot/colorInSpot.js"
import robot from "robotjs"
import colorInArea from "../../utils/bot/colorInArea.js"
import bestMovesForLevel from "./utils/bestMovesForLevel.js"
import Jimp from "jimp"

function isPlayerHere(pos, existingScreenshot = null) {
    let screenshot, buffer;
  
    // Verwenden Sie den vorhandenen Screenshot, wenn einer übergeben wurde
    if (existingScreenshot) {
        screenshot = existingScreenshot;
        // Berechnen der Position im Buffer für den gegebenen Punkt
        const idx = (pos.y * screenshot.byteWidth) + (pos.x * 4);
        buffer = [screenshot.image[idx + 0], screenshot.image[idx + 1], screenshot.image[idx + 2]];
    } else {
        // Andernfalls machen Sie einen neuen Screenshot eines einzelnen Pixels
        screenshot = robot.screen.capture(pos.x, pos.y, 1, 1);
        buffer = screenshot.image;
    }
    
    const blue = buffer[0];   // Blauwert des Pixels
    const green = buffer[1];  // Grünwert des Pixels
    const red = buffer[2];    // Rotwert des Pixels

    if(red >= 180 && green >= 180 && red >= 180) {
        return true
    } else {
        return false
    }
  
  }




async function mainLoop(screenSize, stopBot) {

    
    

    let screenShoot = robot.screen.capture(0,0,screenSize.width, screenSize.height)

    if(!colorInSpot({x: 976, y: 595}, "824d2b")) {
        console.log("Skip because of no reset")
        return;
        
    }

    
    
      let playerLeft = isPlayerHere({x: 845, y: 788}, screenShoot)
        let playerRight = isPlayerHere({x: 1131, y: 790}, screenShoot)

    

    const LevelArray = [
        [colorInSpot({x: 838, y: 345}, "582c0e", screenShoot) === true ? 1 : 0, colorInSpot({x: 1110, y: 345}, "562b0e", screenShoot) === true ? 1 : 0],
        [colorInSpot({x: 841, y: 449}, "5a2d0e", screenShoot) === true ? 1 : 0, colorInSpot({x: 1106, y: 450}, "693411", screenShoot) === true ? 1 : 0],
        [colorInSpot({x: 836, y: 557}, "572c0d", screenShoot) === true ? 1 : 0, colorInSpot({x: 1109, y: 560}, "653310", screenShoot) === true ? 1 : 0],
        [colorInSpot({x: 844, y: 664}, "4b2406", screenShoot) === true ? 1 : 0, colorInSpot({x: 1090, y: 669}, "522a0d", screenShoot) === true ? 1 : 0],
        [playerLeft ? 2 : 0, playerRight ? 2 : 0]
    ]
    
    const moves = bestMovesForLevel(LevelArray)

    if(moves.length >= 1) {

        for(let i=0; i < moves.length; i++) {
            let move = moves[i]
            if(move === "left") {
                robot.keyTap("left")
                await new Promise(resolve => setTimeout(resolve, 105));
            } 

            if(move === "right") {
                robot.keyTap("right")
                await new Promise(resolve => setTimeout(resolve, 105));
            }
            
          }

        
    }

   
    await new Promise(resolve => setTimeout(resolve, 30));
    if(colorInSpot({x: 927, y: 691}, "f79f36")) {
        console.log("STOP")
        console.log(LevelArray)
        console.log(moves)
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
    } else {
        console.log("goon")
    }



    
  

  
  }

  export default mainLoop