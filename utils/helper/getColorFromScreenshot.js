import Jimp from "jimp"
import robot from "robotjs"
import rgbToHex from "../helper/rgbToHex.js";

async function getColorsFromScreenshot() {

    const screenshot = robot.screen.capture(848, 653, 35, 30);

    const buffer = screenshot.image;
    
    const colorCounts = {};

    // Durchgehen jedes Pixels im Screenshot
    for (let i = 0; i < buffer.length; i += 4) {
        // Beachten Sie, dass robotjs BGR (nicht RGB) verwendet
        const hexColor = rgbToHex(buffer[i + 2], buffer[i + 1], buffer[i]);
        
        if (colorCounts[hexColor]) {
            colorCounts[hexColor]++;
        } else {
            colorCounts[hexColor] = 1;
        }
    }

    // Sortieren der Farben nach Häufigkeit
    const sortedColors = Object.entries(colorCounts).sort((a, b) => a[1] - b[1]);


    return sortedColors;
  }

  export default getColorsFromScreenshot