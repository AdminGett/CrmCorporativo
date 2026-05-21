import { Router } from 'express';
import { deleteUser, getAllUsers, search} from '../../controllers/users/delete.controller';
import { verifyAdmin } from '../../middlewares/verifyAdmin';

const router = Router();

// Se definen las rutas para la gestión de usuarios, incluyendo la ruta para eliminar un usuario específico, obtener todos los usuarios activos y buscar usuarios por nombre, todas protegidas por el middleware de verificación de administrador para asegurar que solo los usuarios con permisos adecuados puedan acceder a estas funcionalidades
router.delete('/:userId', verifyAdmin, deleteUser);
router.get('/', verifyAdmin, getAllUsers);
router.get('/search', verifyAdmin, search);


export default router;