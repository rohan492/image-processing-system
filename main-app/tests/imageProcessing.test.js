import { processImage } from '../src/services/imageProcessing';
import fs from 'fs';
import path from 'path';

jest.mock('axios');

describe('Image Processing Service', () => {
  it('should process an image and return a new URL', async () => {
    const testImageUrl = 'https://unsplash.com/photos/a-woman-standing-in-a-stable-with-a-horse-XV-m0Sf6X-Y';
    const result = await processImage(testImageUrl);
    
    expect(result).toMatch(/^http:\/\/localhost:3000\/processed_images\/.+\.jpg$/);
    
    // Check if the file was actually created
    const fileName = path.basename(result);
    const filePath = path.join('processed_images', fileName);
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    expect(fileExists).toBe(true);
  });
});