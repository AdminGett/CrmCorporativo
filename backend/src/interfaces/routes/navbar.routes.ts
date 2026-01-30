import { Router } from 'express';
import { getUserName } from '../controllers/navbar.controller';
import { verifyToken } from '../middlewares/auth';

const router = Router();

router.get('/:userId', verifyToken,  getUserName);

export default router;