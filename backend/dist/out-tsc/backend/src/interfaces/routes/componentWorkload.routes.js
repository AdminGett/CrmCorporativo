import { Router } from 'express';
import { getCommentsByTask, createComment } from '../controllers/workloadComments.controller';
import { getWorkloadByUser, createWorkloadTask } from '../controllers/componentWorkload.controller';
const router = Router();
router.get('/component-workload/user/:userId', getWorkloadByUser);
router.post('/component-workload', createWorkloadTask);
router.get('/component-workload/comments/task/:taskId', getCommentsByTask);
router.post('/component-workload/comments', createComment);
export default router;
//# sourceMappingURL=componentWorkload.routes.js.map