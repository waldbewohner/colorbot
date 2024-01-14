import robot from "robotjs"
import rgbToHex from "../helper/rgbToHex.js";

function colorInArea(topLeft, bottomRight, color){
    const areaWidth = bottomRight.x - topLeft.x;
    const areaHeight = bottomRight.y - topLeft.y;
    const screenshot = robot.screen.capture(topLeft.x, topLeft.y, areaWidth, areaHeight);
    const buffer = screenshot.image;
    const width = screenshot.byteWidth / 4; // 4 bytes per pixel (RGBA)
  
    for (let y = 0; y < screenshot.height; y++) {
      for (let x = 0; x < width; x++) {
        const idx = (y * width + x) * 4; // 4 bytes per pixel
  
        const red = buffer[idx + 2];
        const green = buffer[idx + 1];
        const blue = buffer[idx];
  
        // Konvertieren Sie RGB in einen Hex-String und vergleichen Sie
        const hexColor = rgbToHex(red, green, blue);
        if (hexColor === color) {
          return { x, y };
        }
      }
    }
  
    return false
  }

  export default colorInArea