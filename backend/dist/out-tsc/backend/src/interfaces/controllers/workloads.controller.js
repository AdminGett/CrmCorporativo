import { validationResult } from 'express-validator';
import Workload from '../../infrestructure/models/workloads';
import WorkloadLog from '../../infrestructure/models/workload_logs';
import User from '../../infrestructure/models/users';
// Obtener todas las cargas de trabajo
export const getWorkloads = async (req, res) => {
    try {
        const { status, priority, assigned_to, created_by } = req.query;
        const whereClause = {};
        if (status)
            whereClause.status = status;
        if (priority)
            whereClause.priority = priority;
        if (assigned_to)
            whereClause.assigned_to = assigned_to;
        if (created_by)
            whereClause.created_by = created_by;
        const workloads = await Workload.findAll({
            where: whereClause,
            include: [
                { model: User, as: 'assignee', attributes: ['userId', 'nombre', 'paterno'] },
                { model: User, as: 'creator', attributes: ['userId', 'nombre', 'paterno'] }
            ],
            order: [['created_at', 'DESC']]
        });
        res.status(200).json(workloads);
    }
    catch (error) {
        console.error('Error al obtener workloads:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
// Obtener workload por ID
export const getWorkloadById = async (req, res) => {
    try {
        const { id } = req.params;
        const workload = await Workload.findByPk(id, {
            include: [
                { model: User, as: 'assignee', attributes: ['userId', 'nombre', 'paterno'] },
                { model: User, as: 'creator', attributes: ['userId', 'nombre', 'paterno'] }
            ]
        });
        if (!workload) {
            res.status(404).json({ msg: 'Workload no encontrado' });
            return;
        }
        res.status(200).json(workload);
    }
    catch (error) {
        console.error('Error al obtener workload:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
// Crear nueva carga de trabajo
export const createWorkload = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { title, description, priority, assigned_to, due_date, created_by } = req.body;
    if (!title || !created_by) {
        res.status(400).json({ msg: 'Título y creador son obligatorios' });
        return;
    }
    try {
        const newWorkload = await Workload.create({
            title,
            description: description || null,
            status: 'PENDING',
            priority: priority || 'MEDIUM',
            assigned_to: assigned_to || null,
            created_by,
            due_date: due_date || null
        });
        // Crear log de creación
        await WorkloadLog.create({
            workload_id: newWorkload.id,
            action: 'CREATE',
            old_value: null,
            new_value: newWorkload.toJSON(),
            performed_by: created_by
        });
        res.status(201).json({
            msg: 'Workload creado exitosamente',
            workload: newWorkload
        });
    }
    catch (error) {
        console.error('Error al crear workload:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
// Actualizar carga de trabajo
export const updateWorkload = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { id } = req.params;
    const { title, description, status, priority, assigned_to, due_date, performed_by } = req.body;
    try {
        const workload = await Workload.findByPk(id);
        if (!workload) {
            res.status(404).json({ msg: 'Workload no encontrado' });
            return;
        }
        const oldValues = workload.toJSON();
        const updateData = {};
        if (title)
            updateData.title = title;
        if (description !== undefined)
            updateData.description = description;
        let isStatusChange = false;
        if (status && status !== workload.status) {
            updateData.status = status;
            isStatusChange = true;
            // Crear log específico para cambio de estado
            await WorkloadLog.create({
                workload_id: id,
                action: 'STATUS_CHANGE',
                old_value: { status: oldValues.status },
                new_value: { status: status },
                performed_by: performed_by || oldValues.created_by
            });
        }
        if (priority)
            updateData.priority = priority;
        if (assigned_to !== undefined)
            updateData.assigned_to = assigned_to;
        if (due_date)
            updateData.due_date = due_date;
        updateData.updated_at = new Date();
        await workload.update(updateData);
        // Crear log de actualización general si no fue STATUS_CHANGE
        if (!isStatusChange) {
            await WorkloadLog.create({
                workload_id: id,
                action: 'UPDATE',
                old_value: oldValues,
                new_value: workload.toJSON(),
                performed_by: performed_by || oldValues.created_by
            });
        }
        res.status(200).json({
            msg: 'Workload actualizado exitosamente',
            workload
        });
    }
    catch (error) {
        console.error('Error al actualizar workload:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
// Eliminar carga de trabajo
export const deleteWorkload = async (req, res) => {
    const { id } = req.params;
    const { performed_by } = req.body;
    try {
        const workload = await Workload.findByPk(id);
        if (!workload) {
            res.status(404).json({ msg: 'Workload no encontrado' });
            return;
        }
        const oldValues = workload.toJSON();
        // Crear log de eliminación
        await WorkloadLog.create({
            workload_id: id,
            action: 'DELETE',
            old_value: oldValues,
            new_value: null,
            performed_by: performed_by || oldValues.created_by
        });
        // Eliminar workload
        await workload.destroy();
        res.status(200).json({ msg: 'Workload eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar workload:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
//# sourceMappingURL=workloads.controller.js.map