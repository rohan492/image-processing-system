import express from 'express';
import Request from '../models/request';

const router = express.Router();

router.get('/:requestId', async (req, res) => {
  const { requestId } = req.params;

  try {
    const request = await Request.findOne({ requestId });

    if (!request) {
      return res.status(404).json({ error: 'Request not found' });
    }

    res.json({
      requestId: request.requestId,
      status: request.status,
      progress: request.progress,
      createdAt: request.createdAt,
      updatedAt: request.updatedAt
    });
  } catch (error) {
    console.error('Error fetching request status:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default router;