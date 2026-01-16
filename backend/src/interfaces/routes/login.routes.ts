import { Router } from 'express';
import { loginUser } from '../controllers/login.controller';
import { validateLogin } from '../middlewares/validateUser';

const router = Router();

router.post('/login', validateLogin, loginUser);
export default router;