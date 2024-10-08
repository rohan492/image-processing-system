import express from'express';
import mongoose from'mongoose';
import config from'./config';
import uploadRouter from'./routes/upload';
import statusRouter from'./routes/status';
import errorHandler from'./middleware/errorHandler';
import { startWorker } from './services/worker';

const app = express();

mongoose.connect(config.mongodbUri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB'))
.catch(err => console.error('MongoDB connection error:', err));

app.use(express.json());
app.use('/api/upload', uploadRouter);
app.use('/api/status', statusRouter);

// Serve processed images and output CSVs
app.use('/processed_images', express.static('processed_images'));
app.use('/output_csv', express.static('output_csv'));

app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on port ${config.port}`);
  startWorker();
});

process.on('unhandledRejection', (reason, promise) => {
  console.error('Unhandled Rejection at:', promise, 'reason:', reason);
});