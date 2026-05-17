import { Router } from 'express';
import { loginUser } from '../../controllers/auth/login.controller';
import { validateLogin } from '../../middlewares/validateUser';

const router = Router();

// Se define la ruta para el inicio de sesión de un usuario, que utiliza el middleware de validación para 
// asegurarse de que los datos de entrada son válidos antes de llamar al controlador que 
// maneja el proceso de autenticación y generación del token JWT
router.post('/login', validateLogin, loginUser);
export default router;