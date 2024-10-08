import mongoose from "mongoose"

const requestSchema = new mongoose.Schema({
  requestId: { type: String, required: true, unique: true },
  status: { type: String, enum: ['pending', 'processing', 'completed', 'failed'], default: 'pending' },
  progress: { type: Number, default: 0 },
  outputCsvUrl: { type: String },
  createdAt: { type: Date, default: Date.now },
  updatedAt: { type: Date, default: Date.now }
});

export default mongoose.model('Request', requestSchema);