import { Router } from 'express';
import { deleteComment, getCommentsByTaskId, getCommentsByUserId, newComment, updateComment } from '../../controllers/workload/comments.controller';
import { verifyToken } from '../../middlewares/verifyToken';

const router = Router();

router.post('/newComment',  newComment, verifyToken);
router.put('/updateComment/:id',  updateComment, verifyToken);
router.delete('/deleteComment/:id',  deleteComment, verifyToken);
router.get('/getComments/:taskComment',  getCommentsByTaskId, verifyToken);
router.get('/getCommentsByUserId/:userComment',  getCommentsByUserId, verifyToken);

export default router;