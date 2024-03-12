import robot from "robotjs"

function bufferSnapshotToBase64(topLeft, bottomRight){
  const areaWidth = bottomRight.x - topLeft.x;
  const areaHeight = bottomRight.y - topLeft.y;
  const screenshot = robot.screen.capture(topLeft.x, topLeft.y, areaWidth, areaHeight);
  const buffer = screenshot.image;
  // Convert the buffer to a base64 string
  const base64String = Buffer.from(buffer).toString('base64');
  return base64String;
  }

  export default bufferSnapshotToBase64