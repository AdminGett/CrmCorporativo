import { Router } from 'express';
import { getInfoUser, updateUser} from '../controllers/update.controller';
import { verifyAdmin } from '../middlewares/adminAuth';

const router = Router();

// Se definen las rutas para actualizar la información de un usuario específico y obtener la información de un usuario, ambas protegidas por el middleware de verificación de administrador para asegurar que solo los usuarios con permisos adecuados puedan acceder a estas funcionalidades, llamando a los controladores correspondientes que manejan la lógica para realizar las actualizaciones y recuperar la información del usuario
router.put('/update/:userId', verifyAdmin,  updateUser);
router.get('/update/getUser/:userId', verifyAdmin, getInfoUser)

export default router;