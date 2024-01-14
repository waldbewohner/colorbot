import colorInSpot from "../../utils/bot/colorInSpot.js"
import colorInArea from "../../utils/bot/colorInArea.js"
import mouseClick from "../../utils/bot/mouseClick.js"
import robot from "robotjs"

let loops = 0;
let lastMouseClick = {x: 0, y: 0}
let lastMouseClickActive = false;

async function mainLoop() {


    if(loops >= 30) {

        let upgrades = colorInArea({x: 638, y: 711}, {x: 1111, y: 900}, "be4a39")

        if(upgrades) {
            robot.moveMouseSmooth(638 + upgrades.x,711 + upgrades.y, 0.3)
            robot.mouseClick("left")

        }

        //if update is open
        if(colorInSpot({x: 968, y: 916}, "1b94cd")) {
            console.log("update was open")
            let updateWeaponColor = colorInArea({x: 704, y: 763},
                {x: 923, y: 826},
                "32cd32")

                if(updateWeaponColor) {
                    robot.moveMouseSmooth(870,905, 0.3)
                    robot.mouseClick("left")
                } else {
                   robot.moveMouseSmooth(664,906, 0.3)
                    robot.mouseClick("left")
                }
        } else {
            console.log("update was closed")
        }

        //achevement X
        if(colorInSpot({x: 937, y: 784}, "666666")) {
            robot.moveMouse(937,784)
                    robot.mouseClick("left")
        } 

        //achevement X
        let rocks = colorInArea({x: 638, y: 711}, {x: 978, y: 805}, "ffc59e")

        if(rocks) {
            await robot.moveMouseSmooth(638 + rocks.x,711 + rocks.y, 0.3)
        }

        //unstuck
        let redCircle = colorInArea({x: 641, y: 423},{x: 953, y: 713}, "ff0000")
        if(redCircle) {
            //robot.moveMouse(638,711)
        }
        

        loops = 0;
    }

     

    
   
    let circle = colorInArea({x: 641, y: 423},{x: 953, y: 713}, "d3d3d3")

    if(circle) {
        robot.moveMouse(641 + circle.x,423 + circle.y)
    } else {
        if(lastMouseClickActive) {
            robot.moveMouse(500, 500)
            return
        }
    }

    let mousePos = robot.getMousePos()
        let redMouseArea = colorInArea({x: mousePos.x - 1, y: mousePos.y - 1},{x: mousePos.x + 1, y: mousePos.y + 1}, "ff0000")
        if(redMouseArea) {
            if(lastMouseClick.x !== mousePos.x && lastMouseClick.y !== mousePos.y){
                robot.mouseClick();
                lastMouseClick = mousePos;
                await new Promise(resolve => setTimeout(resolve, 10));
                lastMouseClickActive = false
                console.log("try new click")
            } else {
                lastMouseClickActive = true
                console.log("double click is not allowed")
            }
            
        }

    
        //loops++

  
  }


  export default mainLoop