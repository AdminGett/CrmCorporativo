import { Router } from 'express';
import { refreshTokenFunction } from '../../controllers/auth/refreshToken.controller';

const router = Router();

router.post('/refresh', refreshTokenFunction);
export default router;