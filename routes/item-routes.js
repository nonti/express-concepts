import express from 'express';
import { APIError, asyncHandler } from '../middleware/errorHandler.js';
const router = express.Router();

const items = [
  { id: 1, name: 'Item 1' },
  { id: 2, name: 'Item 2' },
]

router.get('/items', asyncHandler(async(req, res) => {
  res.json(items)
}))

router.post('/items', asyncHandler(async(req, res) => {
  if(!req.body.name) {
    throw new APIError('Item name is required', 400)
  }

  const newItem = {
    id: items.length + 1,
    name: req.body.name,
  }
  items.push(newItem);
  res.status(201).json(newItem);
}))

export default router;