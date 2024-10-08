import express from 'express';
import bodyParser from 'body-parser';

const app = express();
const PORT = 3001;

// Use body-parser to parse JSON bodies
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  console.log('Received webhook:', req.body);
  
  // Process the webhook data as needed
  const { requestId, status, outputCsvUrl } = req.body;
  
  console.log(`Request ${requestId} completed with status ${status}`);
  console.log(`Output CSV: ${outputCsvUrl}`);

  // Send a response
  res.status(200).send('Webhook received successfully');
});

app.listen(PORT, () => {
  console.log(`Webhook receiver listening on port ${PORT}`);
});