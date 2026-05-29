import { Router } from 'express';
import { getCommentsByWorkload, createComment } from '../controllers/usercomment.controller';

const router = Router();

router.get('/workload/:workloadId', getCommentsByWorkload);
router.post('/', createComment);

export default router;