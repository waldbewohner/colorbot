import robot from "robotjs"
import rgbToHex from "../helper/rgbToHex.js";

function colorInSpot(pos, color, existingScreenshot = null) {
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

  // Konvertieren Sie RGB in einen Hex-String und vergleichen Sie
  const hexColor = rgbToHex(red, green, blue);
  return hexColor === color;
}

  export default colorInSpot