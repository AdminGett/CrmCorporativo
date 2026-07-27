import { Router } from 'express';
// 1. Importaciones del controlador de eliminación/búsqueda (delete.controller)
import { deleteUser, getAllUsers  } from '../controllers/users/delete.controller';
import { search } from '../controllers/users/delete.controller';
// 2. Importaciones del controlador de actualización/detalles (update.controller)
import { updateUser, getInfoUser } from '../controllers/users/update.controller';

const router: Router = Router();

// --- RUTAS DE BÚSQUEDA GENERAL ---
// Obtener todos los usuarios activos
router.get('/', getAllUsers);

// Buscar usuarios activos por nombre parcial (?search=Juan)
router.get('/search', search);


// --- RUTAS DE UN USUARIO ESPECÍFICO ---
// Mantenemos ':userId' para que coincida con el req.params.userId de tus controladores

// Obtener los detalles de un usuario por ID
router.get('/:userId', getInfoUser);

// Actualizar los datos de un usuario por ID
router.put('/:userId', updateUser);

// Eliminación lógica (desactivar usuario) por ID
router.delete('/:userId', deleteUser);

export default router;