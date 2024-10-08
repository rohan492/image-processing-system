import axios from 'axios';
import config from '../config';

async function sendWebhook(requestId, status, outputCsvUrl) {
  try {
    await axios.post(config.webhookUrl, {
      requestId,
      status,
      outputCsvUrl,
      timestamp: new Date().toISOString()
    });
    console.log(`Webhook sent for request ${requestId}`);
  } catch (error) {
    console.error('Error sending webhook:', error);
  }
}

export default { sendWebhook };