import express from 'express';
import { getComments, createComment, deleteComment, updateComment } from '../controllers/commentController.js';

const router = express.Router();

router.get('/comments', getComments);
router.post('/comments', createComment);
router.delete('/comments/:id', deleteComment);
router.put('/comments/:id', updateComment);

export default router;