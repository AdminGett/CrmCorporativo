import { Router } from 'express';
import { getInfoUser, getUserByIDd, updatePermissions} from '../controllers/permissions.controller';
import { verifyToken } from '../middlewares/auth.middleware';

const router = Router();

//
router.put('/:userId', verifyToken,  updatePermissions);
router.get('/getUser/:userId', verifyToken, getInfoUser)
router.get('/getUserById/:userId', verifyToken, getUserByIDd)

export default router;