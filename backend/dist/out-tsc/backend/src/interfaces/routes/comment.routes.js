import { Router } from 'express';
import { getCommentsByWorkload, getRecentComments, createComment, updateComment, deleteComment } from '../controllers/comments.controller';
const router = Router();
router.get('/workload/:workloadId', getCommentsByWorkload);
router.get('/recent', getRecentComments);
router.post('/', createComment);
router.put('/:id', updateComment);
router.delete('/:id', deleteComment);
export default router;
//# sourceMappingURL=comment.routes.js.map