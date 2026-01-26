import { Router } from 'express';
import { getInfoUser, updateUser} from '../controllers/update.controller';
import { verifyAdmin } from '../middlewares/adminAuth';

const router = Router();

router.put('/update/:userId', verifyAdmin,  updateUser);
router.get('/update/getUser/:userId', verifyAdmin, getInfoUser)

export default router;