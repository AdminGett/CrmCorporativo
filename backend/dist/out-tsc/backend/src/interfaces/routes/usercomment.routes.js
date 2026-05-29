import { Router } from 'express';
import { getCommentsByWorkload, createComment } from '../controllers/usercomment.controller';
const router = Router();
router.get('/:workloadId/comments', getCommentsByWorkload);
router.post('/:workloadId/comments', createComment);
export default router;
//# sourceMappingURL=usercomment.routes.js.map