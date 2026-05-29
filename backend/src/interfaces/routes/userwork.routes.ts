import { Router } from 'express';
import {
    getUserWorkloads,
    updateWorkloadStatus,
    updateWorkloadDelivery
} from '../controllers/userwork.controller';
import { verifyToken } from '../middlewares/auth'; 

const router = Router();


router.get('/', verifyToken, getUserWorkloads);


router.patch('/:id/status', verifyToken, updateWorkloadStatus);


router.patch('/:id/delivery', verifyToken, updateWorkloadDelivery);

export default router;