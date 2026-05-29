
import { Router } from 'express';
import {
  getAllLogs,
  getLogsByWorkload,
  getLogsByAction,
  getLogsByUser
} from '../controllers/workload-logs.controller';

const router = Router();

router.get('/', getAllLogs);
router.get('/workload/:workloadId', getLogsByWorkload);
router.get('/action/:action', getLogsByAction);
router.get('/user/:userId', getLogsByUser);

export default router;