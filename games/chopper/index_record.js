import colorInSpot from "../../utils/bot/colorInSpot.js"
import robot from "robotjs"
import colorInArea from "../../utils/bot/colorInArea.js"
import bestMovesForLevel from "./utils/bestMovesForLevel.js"
import Jimp from "jimp"
import readImage from "../../utils/bot/readImage.js"
import bufferSnapshotToBase64 from "../../utils/bot/bufferSnapshot.js"

let lastScreenshot;
let lastMoves;
let lastLevelArray;

const scoreAreaTopLeft = {x: 715, y: 289}
const scoreAreaBottomRight ={x: 809, y: 330}

/* 

{x: 741, y: 306},
{x: 748, y: 307},
{x: 753, y: 307},
{x: 760, y: 307},
{x: 765, y: 307},
{x: 772, y: 308},
{x: 780, y: 308},

*/

async function mainLoop(screenSize, stopBot) {

    

    if(colorInSpot({x: 1108, y: 394},
        "f79f36")) {
        console.log("STOP")
        let screenShoot = lastScreenshot
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
        await image.writeAsync(imagePath);
        console.log("levelArray before loose: ", lastLevelArray)
        console.log("lastMoves before loose: ", lastMoves)
        stopBot();
     
    } 
    
    /* some random points of the tree to check if everything resetted
    so that we dont make a screenshot while an animation is in place */
    if(!colorInSpot({x: 976, y: 595}, "824d2b") || !colorInSpot({x: 1008, y: 487},
        "613515") || !colorInSpot({x: 942, y: 780},
            "421d03") || !colorInSpot({x: 992, y: 754},
                "673919") || !colorInSpot({x: 955, y: 271},
                    "572c0e")) {
        console.log("Skip because of no reset")
        return;
    }

    let screenShoot = robot.screen.capture(0,0,screenSize.width, screenSize.height)

    

    const LevelArray = [
        [colorInSpot({x: 839, y: 346},"bea883", screenShoot) === false ? 1 : 0, colorInSpot({x: 1104, y: 347},"bda580", screenShoot) === false ? 1 : 0],
        [colorInSpot({x: 838, y: 454},"ad8f6a", screenShoot) === false ? 1 : 0, colorInSpot({x: 1106, y: 456},"ad8f69", screenShoot) === false ? 1 : 0],
        [colorInSpot({x: 841, y: 562},"9c7552", screenShoot) === false ? 1 : 0, colorInSpot({x: 1102, y: 563},"9d7753", screenShoot) === false ? 1 : 0],
        [colorInSpot({x: 838, y: 669},"8a5d3c", screenShoot) === false ? 1 : 0, colorInSpot({x: 1109, y: 670},"8c603f", screenShoot) === false ? 1 : 0],
        [colorInSpot({x: 836, y: 747}, "ffd0bb", screenShoot) === true ? 2 : 0, colorInSpot({x: 1135, y: 748}, "ffd0bb", screenShoot) === true ? 2 : 0]
    ]


    const moves = bestMovesForLevel(LevelArray)

    if(moves.length <= 1) {
        return;
    }

    async function processMove(move, scoreAreaTopLeft, scoreAreaBottomRight) {
        let hitRegistered = false;
        const maxWaitTime = 200; // Maximum time to wait before retrying a click
        const bufferBeforeHit = await bufferSnapshotToBase64(scoreAreaTopLeft, scoreAreaBottomRight);
    
        while (!hitRegistered) {
            
            const startTime = Date.now();
    
            // Perform the action based on the move
            if (move === "left") {
                robot.moveMouse(841, 662);
            } else if (move === "right") {
                robot.moveMouse(1107, 655); 
            }
            robot.mouseClick("left");
    
            // Wait and check for changes
            while (true) {
                await new Promise(resolve => setTimeout(resolve, 50)); // Short delay to poll changes
    
                const elapsedTime = Date.now() - startTime;
                if (elapsedTime > maxWaitTime) {
                    console.log("Maximum wait time exceeded, attempting click again.");
                    break; // Break the inner loop to retry the move
                }
    
                const bufferAfterHit = await bufferSnapshotToBase64(scoreAreaTopLeft, scoreAreaBottomRight);
                if (bufferBeforeHit !== bufferAfterHit) {
                    //console.log("Hit registered for move: ", move);
                    hitRegistered = true;
                    break; // Exit the loop if a change is detected
                } else {
                    console.log("not registered")
                }
            }
        }
    }
    
    
    
    for (let i = 0; i < moves.length; i++) {
        const move = moves[i];
        await processMove(move, scoreAreaTopLeft, scoreAreaBottomRight);
        
        if (i < moves.length - 1) {
            await new Promise(resolve => setTimeout(resolve, 5));
        }
    }
    await new Promise(resolve => setTimeout(resolve, 100));


    lastMoves = moves;
    lastScreenshot = screenShoot;
    lastLevelArray = LevelArray;

    
  
  }

  export default mainLoop