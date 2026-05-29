import { Router } from 'express';
import { createUserWork, getMyWorkloads, updateWorkloadStatus } from '../controllers/userwork.controller';
const router = Router();
router.post('/', createUserWork);
router.get('/my', getMyWorkloads);
router.patch('/:id/status', updateWorkloadStatus);
export default router;
//# sourceMappingURL=userwork.routes.js.map