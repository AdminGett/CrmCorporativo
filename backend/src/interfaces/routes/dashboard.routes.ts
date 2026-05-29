import { Router } from 'express';
import { getDashboardStats } from '../controllers/dashboard.controller';
import { verifyAdmin } from '../middlewares/adminAuth';

const router = Router();

router.get('/stats', getDashboardStats);

export default router;