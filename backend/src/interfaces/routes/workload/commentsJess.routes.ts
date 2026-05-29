import { Router } from 'express';
import { getCommentsByTask, getCommentsByUser, filterComments, createComment } from '../../controllers/workload/workloadComments.controller';


const router = Router();

router.get( '/task/:taskId', getCommentsByTask );
router.get( '/user/:userId', getCommentsByUser );
router.get( '/filter', filterComments );
router.post( '/', createComment );


export default router;