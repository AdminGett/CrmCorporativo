import { Router } from 'express';
import { newTask } from '../controllers/workLoad.controller';
const router = Router();
router.post('/newTask', newTask);
export default router;
//# sourceMappingURL=workload.routes.js.map