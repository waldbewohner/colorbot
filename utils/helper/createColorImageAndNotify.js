

import path from "path"
import { fileURLToPath } from 'url';
import Jimp from "jimp"
import notifier from 'node-notifier';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

async function createColorImageAndNotify(hexColor) {
    const width = 100;
    const height = 100;
    const image = new Jimp(width, height, hexColor);
  
    const filePath = path.join(__dirname, 'color_square.png');
    await image.writeAsync(filePath);
  
    notifier.notify({
      title: 'Color',
      message: hexColor,
      contentImage: filePath,
      icon: filePath
    });
  }

  export default createColorImageAndNotify