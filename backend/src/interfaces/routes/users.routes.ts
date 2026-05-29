import { Router } from 'express';
import { getAllUsers, updateUserStatus } from '../controllers/get-users.controller';

const router = Router();

router.get('/', getAllUsers);
router.put('/:id', updateUserStatus);

export default router;