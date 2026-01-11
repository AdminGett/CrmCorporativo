import { Router } from 'express';
import { loginUser } from '../controllers/login.controller';
//import { validateLogin, validateUserInput } from '../middlewares/validateUser';

const router = Router();

//router.post('/login', validateLogin, loginUser);
router.post('/login', loginUser);

export default router;