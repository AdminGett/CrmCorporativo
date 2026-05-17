import { Router } from 'express';
import { deleteComment, getCommentsByTaskId, newComment, updateComment } from '../../controllers/workload/comments.controller';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router.post('/newComment',  newComment, verifyToken);
router.put('/updateComment/:id',  updateComment, verifyToken);
router.delete('/deleteComment/:id',  deleteComment, verifyToken);
router.get('/getComments/:taskComment',  getCommentsByTaskId, verifyToken);

export default router;