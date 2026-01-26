import { Router } from 'express';
import { deleteUser, getAllUsers, getUserByName} from '../controllers/delete.controller';
import { verifyAdmin } from '../middlewares/adminAuth';

const router = Router();

router.delete('/:userId', verifyAdmin, deleteUser);
router.get('/', verifyAdmin, getAllUsers);
router.get('/search', verifyAdmin, getUserByName);


export default router;