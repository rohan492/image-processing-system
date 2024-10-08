import request from 'supertest';
import app from '../src/index';
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

describe('Upload API', () => {
  it('should return a request ID when a valid CSV is uploaded', async () => {
    const res = await request(app)
      .post('/api/upload')
      .attach('csv', 'tests/fixtures/valid.csv');
    
    expect(res.statusCode).toBe(202);
    expect(res.body).toHaveProperty('requestId');
  });
});