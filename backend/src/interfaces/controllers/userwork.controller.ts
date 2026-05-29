import { Request, Response } from 'express';
import Workload from '../../infrestructure/models/userwork';
import { AuthRequest } from '../middlewares/auth'; // ← importas AuthRequest

export const getUserWorkloads = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId; // ← así, no (req as any).userId

        const workloads = await Workload.findAll({
            where: { assigned_to: userId },
            order: [['due_date', 'ASC']]
        });

        return res.status(200).json(workloads);
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Error al obtener las tareas' });
    }
};

export const updateWorkloadStatus = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        const { status } = req.body;

        const allowed = ['PENDING', 'IN_PROGRESS', 'DONE'];
        if (!allowed.includes(status)) {
            return res.status(400).json({ msg: 'Estado inválido' });
        }

        const workload = await Workload.findOne({
            where: { id, assigned_to: userId }
        });

        if (!workload) {
            return res.status(404).json({ msg: 'Tarea no encontrada o sin permiso' });
        }

        await workload.update({ status });
        return res.status(200).json({ msg: 'Estado actualizado', workload });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Error al actualizar' });
    }
};

export const updateWorkloadDelivery = async (req: AuthRequest, res: Response) => {
    try {
        const userId = req.user?.userId;
        const { id } = req.params;
        const { description } = req.body;

        const workload = await Workload.findOne({
            where: { id, assigned_to: userId }
        });

        if (!workload) {
            return res.status(404).json({ msg: 'Tarea no encontrada o sin permiso' });
        }

        await workload.update({ description });
        return res.status(200).json({ msg: 'Entrega actualizada', workload });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Error al actualizar' });
    }
};