import express from 'express';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';
import { parse } from 'csv-parse';
import fs from 'fs';
import Request from '../models/request';
import Product from '../models/product';
import { publishToQueue } from '../services/rabbitmq';

const router = express.Router();
const upload = multer({ dest: 'uploads/' });

router.post('/', upload.single('csv'), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: 'No CSV file uploaded' });
  }

  const requestId = uuidv4();
  
  try {
    const request = new Request({
      requestId,
      status: 'pending',
      filename: req.file.originalname,
    });
    await request.save();

    // Process CSV file asynchronously
    processCSV(req.file.path, requestId);

    res.status(202).json({ requestId });
  } catch (error) {
    console.error('Error processing upload:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

async function processCSV(filePath, requestId) {
  const parser = fs
    .createReadStream(filePath)
    .pipe(parse({ columns: true, trim: true }));

  for await (const record of parser) {
    try {
      const product = new Product({
        requestId,
        serialNumber: record['S. No.'],
        name: record['Product Name'],
        inputImageUrls: record['Input Image Urls'].split(',').map(url => url.trim()),
      });
      await product.save();
    } catch (error) {
      console.error('Error processing CSV record:', error);
      await Request.findOneAndUpdate({ requestId }, { status: 'failed' });
      return;
    }
  }

  await Request.findOneAndUpdate({ requestId }, { status: 'processing' });
  await publishToQueue('image_processing_queue', requestId);
}

export default router;