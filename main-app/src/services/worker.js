import { consumeFromQueue } from './rabbitmq';
import Request from '../models/request';
import Product from '../models/product';
import { processImage } from './imageProcessing';
import { generateOutputCSV } from './csvGeneration';
import { sendWebhook } from './webhook';

const QUEUE_NAME = 'image_processing_queue';

async function startWorker() {
  try {
    await consumeFromQueue(QUEUE_NAME, processRequest);
    console.log('Worker is waiting for messages');
  } catch (error) {
    console.error('Error starting worker:', error);
  }
}

async function processRequest(requestId) {
  const request = await Request.findOne({ requestId });
  if (!request) {
    throw new Error('Request not found');
  }

  const products = await Product.find({ requestId });

  let processedCount = 0;
  const totalImages = products.reduce((sum, product) => sum + product.inputImageUrls.length, 0);

  for (const product of products) {
    const outputImageUrls = [];
    for (const imageUrl of product.inputImageUrls) {
      const outputImageUrl = await processImage(imageUrl);
      outputImageUrls.push(outputImageUrl);
      processedCount++;
      await updateProgress(requestId, (processedCount / totalImages) * 100);
    }
    product.outputImageUrls = outputImageUrls;
    await product.save();
  }

  const outputCsvUrl = await generateOutputCSV(requestId);
  await Request.findOneAndUpdate({ requestId }, { 
    status: 'completed', 
    outputCsvUrl 
  });

  await sendWebhook(requestId, 'completed', outputCsvUrl);
}

async function updateProgress(requestId, progress) {
  await Request.findOneAndUpdate({ requestId }, { progress });
}

export default { startWorker };