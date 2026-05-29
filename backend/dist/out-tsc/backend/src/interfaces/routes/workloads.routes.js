import { Router } from 'express';
import { getWorkloads, getWorkloadById, createWorkload, updateWorkload, deleteWorkload } from '../controllers/workloads.controller';
const router = Router();
// Obtener todas las cargas de trabajo (protegido)
router.get('/', getWorkloads);
// Obtener workload por ID (protegido)
router.get('/:id', getWorkloadById);
// Crear nueva carga de trabajo (protegido)
router.post('/', createWorkload);
// Actualizar carga de trabajo (protegido)
router.put('/:id', updateWorkload);
// Eliminar carga de trabajo (protegido)
router.delete('/:id', deleteWorkload);
export default router;
//# sourceMappingURL=workloads.routes.js.map