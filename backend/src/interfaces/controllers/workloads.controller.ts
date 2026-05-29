import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Workload from '../../infrestructure/models/workloads';
import WorkloadLog from '../../infrestructure/models/workload_logs';
import Comment from '../../infrestructure/models/comments';

// Crear un nuevo workload
export const createWorkload = async (req: Request, res: Response) => {
    const { title, description, priority, assigned_to, due_date, created_by } = req.body;

    try {
        const workload = await Workload.create({
            title,
            description,
            priority: priority || 'MEDIUM',
            status: 'PENDING',
            assigned_to: assigned_to || null,
            created_by,
            due_date: due_date || null
        });

        // Crear log de creación
        await WorkloadLog.create({
            workload_id: workload.id,
            action: 'CREATE',
            old_value: null,
            new_value: workload.toJSON(),
            performed_by: created_by
        });

        res.status(201).json({
            msg: 'Workload creado exitosamente',
            workload
        });
    } catch (error) {
        console.error('Error al crear workload:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

// Obtener todos los workloads con filtros opcionales
export const getWorkloads = async (req: Request, res: Response) => {
    const { status, priority, assigned_to } = req.query;

    try {
        const where: any = {};

        if (status) where.status = status;
        if (priority) where.priority = priority;
        if (assigned_to) where.assigned_to = assigned_to;

        const workloads = await Workload.findAll({
            where,
            order: [['created_at', 'DESC']]
        });

        res.status(200).json(workloads);
    } catch (error) {
        console.error('Error al obtener workloads:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

// Obtener un workload por ID
export const getWorkloadById = async (req: Request, res: Response) => {
    const { id } = req.params;

    try {
        const workload = await Workload.findByPk(id);

        if (!workload) {
            res.status(404).json({ msg: 'Workload no encontrado' });
            return;
        }

        res.status(200).json(workload);
    } catch (error) {
        console.error('Error al obtener workload:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

// Actualizar un workload
export const updateWorkload = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { title, description, status, priority, assigned_to, due_date, performed_by } = req.body;

    try {
        const workload = await Workload.findByPk(id);

        if (!workload) {
            res.status(404).json({ msg: 'Workload no encontrado' });
            return;
        }

        const oldValues = workload.toJSON();

        // Actualizar campos
        if (title !== undefined) workload.title = title;
        if (description !== undefined) workload.description = description;
        if (status !== undefined) workload.status = status;
        if (priority !== undefined) workload.priority = priority;
        if (assigned_to !== undefined) workload.assigned_to = assigned_to;
        if (due_date !== undefined) workload.due_date = due_date;

        await workload.save();

        const newValues = workload.toJSON();

        // Crear log de actualización
        await WorkloadLog.create({
            workload_id: id,
            action: 'UPDATE',
            old_value: oldValues,
            new_value: newValues,
            performed_by: performed_by || oldValues.created_by
        });

        res.status(200).json({
            msg: 'Workload actualizado exitosamente',
            workload
        });
    } catch (error) {
        console.error('Error al actualizar workload:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

// Eliminar un workload
export const deleteWorkload = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { performed_by } = req.body;

    try {
        const workload = await Workload.findByPk(id);

        if (!workload) {
            res.status(404).json({ msg: 'Workload no encontrado' });
            return;
        }

        const oldValues = workload.toJSON();

        // Primero eliminar logs y comentarios asociados
        await WorkloadLog.destroy({ where: { workload_id: id } });
        await Comment.destroy({ where: { workload_id: id } });

        // Luego eliminar el workload
        await workload.destroy();

        res.status(200).json({ msg: 'Workload eliminado exitosamente' });
    } catch (error) {
        console.error('Error al eliminar workload:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

// Obtener logs de un workload específico
export const getWorkloadLogs = async (req: Request, res: Response) => {
    const { workload_id } = req.query;

    try {
        const where: any = {};
        if (workload_id) where.workload_id = workload_id;

        const logs = await WorkloadLog.findAll({
            where,
            order: [['timestamp', 'DESC']],
            limit: 50
        });

        res.status(200).json(logs);
    } catch (error) {
        console.error('Error al obtener logs:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};