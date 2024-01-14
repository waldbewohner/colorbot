import robot from 'robotjs';

function mouseClick(pos) {
    return new Promise((resolve) => {
      robot.moveMouse(pos.x, pos.y);
      robot.mouseToggle("down");
  
      setTimeout(function() {
        robot.mouseToggle("up");
      }, 150);
  
      setTimeout(function() {
        resolve(); // Die Promise wird nach dem Ablauf des Timeouts aufgelöst
      }, 550);
    });
  }

  export default mouseClick

