
import robot from "robotjs"

function jiggle(){
    const times = 10
    robot.moveMouse(874,696)
    robot.mouseToggle("down")
    for (let index = 0; index < times; index++) {
      robot.moveMouseSmooth(1079, 696, 0.2)
      robot.moveMouseSmooth(652, 696, 0.2)
    }
    robot.mouseToggle("up")
  }

  export default jiggle