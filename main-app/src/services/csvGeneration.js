import fs from 'fs';
import path from 'path';
import { stringify } from 'csv-stringify/sync';
import Product from '../models/product';

async function generateOutputCSV(requestId) {
  try {
    const products = await Product.find({ requestId });

    const csvData = products.map(product => ({
      'S. No.': product.serialNumber,
      'Product Name': product.name,
      'Input Image Urls': product.inputImageUrls.join(', '),
      'Output Image Urls': product.outputImageUrls.join(', ')
    }));

    const csvString = stringify(csvData, { header: true });

    const outputFileName = `output_${requestId}.csv`;
    const outputPath = path.join('output_csv', outputFileName);

    await fs.writeFile(outputPath, csvString);

    return `http://localhost:3000/output_csv/${outputFileName}`;
  } catch (error) {
    console.error('Error generating output CSV:', error);
    throw error;
  }
}

export default { generateOutputCSV };