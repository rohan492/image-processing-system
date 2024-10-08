import mongoose from "mongoose"

const productSchema = new mongoose.Schema({
  requestId: { type: String, required: true },
  serialNumber: { type: String, required: true },
  name: { type: String, required: true },
  inputImageUrls: [{ type: String }],
  outputImageUrls: [{ type: String }]
});

export default mongoose.model('Product', productSchema);