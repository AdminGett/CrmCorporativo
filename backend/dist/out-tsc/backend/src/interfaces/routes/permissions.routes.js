import { Router } from 'express';
import { getInfoUser, updatePermissions } from '../controllers/permissions.controller';
import { verifyToken } from '../middlewares/auth';
const router = Router();
router.put('/permissions/:userId', verifyToken, updatePermissions);
router.get('/permissions/getUser/:userId', verifyToken, getInfoUser);
export default router;
//# sourceMappingURL=permissions.routes.js.map