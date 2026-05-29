"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getWorkloadLogs = exports.deleteWorkload = exports.updateWorkload = exports.getWorkloadById = exports.getWorkloads = exports.createWorkload = void 0;
const workloads_1 = __importDefault(require("../../infrestructure/models/workloads"));
const workload_logs_1 = __importDefault(require("../../infrestructure/models/workload_logs"));
const comments_1 = __importDefault(require("../../infrestructure/models/comments"));
// Crear un nuevo workload
const createWorkload = async (req, res) => {
    const { title, description, priority, assigned_to, due_date, created_by } = req.body;
    try {
        const workload = await workloads_1.default.create({
            title,
            description,
            priority: priority || 'MEDIUM',
            status: 'PENDING',
            assigned_to: assigned_to || null,
            created_by,
            due_date: due_date || null
        });
        // Crear log de creación
        await workload_logs_1.default.create({
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
    }
    catch (error) {
        console.error('Error al crear workload:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.createWorkload = createWorkload;
// Obtener todos los workloads con filtros opcionales
const getWorkloads = async (req, res) => {
    const { status, priority, assigned_to } = req.query;
    try {
        const where = {};
        if (status)
            where.status = status;
        if (priority)
            where.priority = priority;
        if (assigned_to)
            where.assigned_to = assigned_to;
        const workloads = await workloads_1.default.findAll({
            where,
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
exports.getWorkloads = getWorkloads;
// Obtener un workload por ID
const getWorkloadById = async (req, res) => {
    const { id } = req.params;
    try {
        const workload = await workloads_1.default.findByPk(id);
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
exports.getWorkloadById = getWorkloadById;
// Actualizar un workload
const updateWorkload = async (req, res) => {
    const { id } = req.params;
    const { title, description, status, priority, assigned_to, due_date, performed_by } = req.body;
    try {
        const workload = await workloads_1.default.findByPk(id);
        if (!workload) {
            res.status(404).json({ msg: 'Workload no encontrado' });
            return;
        }
        const oldValues = workload.toJSON();
        // Actualizar campos
        if (title !== undefined)
            workload.title = title;
        if (description !== undefined)
            workload.description = description;
        if (status !== undefined)
            workload.status = status;
        if (priority !== undefined)
            workload.priority = priority;
        if (assigned_to !== undefined)
            workload.assigned_to = assigned_to;
        if (due_date !== undefined)
            workload.due_date = due_date;
        await workload.save();
        const newValues = workload.toJSON();
        // Crear log de actualización
        await workload_logs_1.default.create({
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
    }
    catch (error) {
        console.error('Error al actualizar workload:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.updateWorkload = updateWorkload;
// Eliminar un workload
const deleteWorkload = async (req, res) => {
    const { id } = req.params;
    const { performed_by } = req.body;
    try {
        const workload = await workloads_1.default.findByPk(id);
        if (!workload) {
            res.status(404).json({ msg: 'Workload no encontrado' });
            return;
        }
        const oldValues = workload.toJSON();
        // Primero eliminar logs y comentarios asociados
        await workload_logs_1.default.destroy({ where: { workload_id: id } });
        await comments_1.default.destroy({ where: { workload_id: id } });
        // Luego eliminar el workload
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
exports.deleteWorkload = deleteWorkload;
// Obtener logs de un workload específico
const getWorkloadLogs = async (req, res) => {
    const { workload_id } = req.query;
    try {
        const where = {};
        if (workload_id)
            where.workload_id = workload_id;
        const logs = await workload_logs_1.default.findAll({
            where,
            order: [['timestamp', 'DESC']],
            limit: 50
        });
        res.status(200).json(logs);
    }
    catch (error) {
        console.error('Error al obtener logs:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.getWorkloadLogs = getWorkloadLogs;
