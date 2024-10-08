import axios from 'axios';
import { Buffer } from 'buffer';
import path from 'path';
import sharp from 'sharp';

async function processImage(imageUrl) {
  try {
    const response = await axios.get(imageUrl, { responseType: 'arraybuffer' });
    const buffer = Buffer.from(response.data, 'binary');

    const outputFileName = `processed_${Date.now()}_${path.basename(imageUrl)}`;
    const outputPath = path.join('processed_images', outputFileName);

    await sharp(buffer)
      .resize({ width: 800 }) // Resize to max width of 800px
      .jpeg({ quality: 50 }) // Compress by 50%
      .toFile(outputPath);

    return `http://localhost:3000/processed_images/${outputFileName}`;
  } catch (error) {
    console.error('Error processing image:', error);
    throw new Error(`Failed to process image: ${imageUrl}`);
  }
}

export { processImage };
