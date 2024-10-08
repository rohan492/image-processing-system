import { generateOutputCSV } from '../src/services/csvGeneration';
import Product from '../src/models/product';
import fs from 'fs';
import path from 'path';
import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

beforeAll(async () => {
  await mongoose.connect(process.env.MONGODB_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
});

afterAll(async () => {
  await mongoose.connection.close();
});

describe('CSV Generation Service', () => {
  it('should generate a CSV file and return its URL', async () => {
    const requestId = 'test-request-id';
    
    // Create test products
    await Product.create([
      {
        requestId,
        serialNumber: '1',
        name: 'Test Product 1',
        inputImageUrls: ['https://unsplash.com/photos/a-woman-standing-in-a-stable-with-a-horse-XV-m0Sf6X-Y'],
        outputImageUrls: ['https://unsplash.com/photos/a-woman-standing-in-a-stable-with-a-horse-XV-m0Sf6X-Y']
      },
      {
        requestId,
        serialNumber: '2',
        name: 'Test Product 2',
        inputImageUrls: ['https://unsplash.com/photos/two-white-pumpkins-sitting-next-to-each-other-W7rz2Qff-wQ'],
        outputImageUrls: ['https://unsplash.com/photos/two-white-pumpkins-sitting-next-to-each-other-W7rz2Qff-wQ']
      }
    ]);

    const result = await generateOutputCSV(requestId);
    
    expect(result).toMatch(/^http:\/\/localhost:3000\/output_csv\/.+\.csv$/);
    
    // Check if the file was actually created
    const fileName = path.basename(result);
    const filePath = path.join('output_csv', fileName);
    const fileExists = await fs.access(filePath).then(() => true).catch(() => false);
    expect(fileExists).toBe(true);
  });
});