import request from 'supertest';
import app from '../src/index';
import mongoose from 'mongoose';
import Request from '../src/models/request';
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

describe('Status API', () => {
  it('should return the status of a request', async () => {
    const testRequest = new Request({
      requestId: 'test-request-id',
      status: 'processing',
      progress: 50
    });
    await testRequest.save();

    const res = await request(app)
      .get('/api/status/test-request-id');
    
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty('status', 'processing');
    expect(res.body).toHaveProperty('progress', 50);
  });
});