

import robot from "robotjs"
import Tesseract from "tesseract.js";
import Jimp from "jimp";

async function readImage(topLeft, bottomRight) {
 
  try {
    const width = bottomRight.x - topLeft.x;
    const height = bottomRight.y - topLeft.y;
    console.time("image")
    const screenshot = robot.screen.capture(topLeft.x, topLeft.y, width, height);
    console.timeEnd("image")
    
  // Überprüfen Sie die tatsächliche Breite der Daten im Buffer
  const bufferWidth = screenshot.byteWidth / 4; // Teilen durch 4 für RGBA

  // Erstellen eines neuen Jimp-Bildes
  const image = new Jimp(width, height);
  for (let j = 0; j < height; j++) {
    for (let i = 0; i < width; i++) {
      const n = (j * bufferWidth + i) * 4;
      const r = screenshot.image[n + 2];
      const g = screenshot.image[n + 1];
      const b = screenshot.image[n];
      const color = Jimp.rgbaToInt(r, g, b, 255);
      image.setPixelColor(color, i, j);
    }
  }

  const imagePath = 'screenshot.png';
   image.greyscale(); // Umwandlung in Graustufen
    image.contrast(0.7); // Erhöhen des Kontrasts 
  await image.writeAsync(imagePath);

  // Verwenden Sie Tesseract, um Text zu erkennen
  
    const result = await Tesseract.recognize(imagePath, 'eng', {oem: 1});
    return result.data.text
  } catch (error) {
    console.error('Fehler bei der Texterkennung:', error);
    return ""
  }
}

export default readImage
