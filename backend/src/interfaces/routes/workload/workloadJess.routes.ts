import { Router } from 'express';
import { getWorkloadByUser, filterWorkloadTasks, createWorkloadTask } from '../../../interfaces/controllers/workload/componentWorkload.controller';


const router = Router();

router.get( '/user/:userId', getWorkloadByUser );
router.get( '/filter', filterWorkloadTasks );
router.post( '/', createWorkloadTask );


export default router;