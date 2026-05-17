import { Router } from 'express';
import { registerUser } from '../../controllers/users/register.controller';
import { validateCreateUser } from '../../middlewares/validateUser';

const router = Router();
// Se define la ruta para el registro de un nuevo usuario, que utiliza el middleware de validación para asegurarse de que los datos de entrada son válidos antes de llamar al controlador que maneja la lógica para crear un nuevo usuario en el sistema
router.post('/register', validateCreateUser,registerUser);
export default router;