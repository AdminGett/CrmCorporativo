import { Router } from 'express';
import { changeState, deleteTask, newTask, updateTask, changePriority, showTasksByUserId, taskById} from '../../controllers/workload/workLoad.controller';

const router = Router();

router.post('/newTask',  newTask);
router.put('/updateTask/:id',  updateTask);
router.delete('/deleteTask/:id',  deleteTask);
router.put('/changeStatus/:id',  changeState);
router.put('/changePriority/:id',  changePriority);
router.get('/getTasks/:userAssignedId',  showTasksByUserId);
router.get('/getTask/:id',  taskById);

export default router;