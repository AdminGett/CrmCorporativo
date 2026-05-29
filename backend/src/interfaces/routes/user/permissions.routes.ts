import { Router } from 'express';
<<<<<<< HEAD:backend/src/interfaces/routes/permissions.routes.ts
import { getInfoUser, getUserByIDd, updatePermissions} from '../controllers/permissions.controller';
import { verifyToken } from '../middlewares/auth.middleware';
=======
import { getInfoUser, getUserByIDd, updatePermissions} from '../../controllers/users/permissions.controller';
import { verifyToken } from '../../middlewares/verifyToken';
>>>>>>> origin/Student:backend/src/interfaces/routes/user/permissions.routes.ts

const router = Router();

//
router.put('/:userId', verifyToken,  updatePermissions);
router.get('/getUser/:userId', verifyToken, getInfoUser)
router.get('/getUserById/:userId', verifyToken, getUserByIDd)

export default router;