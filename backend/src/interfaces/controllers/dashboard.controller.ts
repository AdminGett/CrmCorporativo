import { Request, Response } from 'express';
import User from '../../infrestructure/models/users';
import Workload from '../../infrestructure/models/workloads';

export const getDashboardStats = async (req: Request, res: Response) => {
    try {
  
        res.status(200).json({
            ok: true
            
        });
    } catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};