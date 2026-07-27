"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createWorkloadTask = exports.filterWorkloadTasks = exports.getWorkloadByUser = void 0;
const workloadJess_1 = __importDefault(require("../../infrestructure/models/workload/workloadJess"));
const getWorkloadByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const idUsuario = parseInt(userId, 10);
        if (isNaN(idUsuario)) {
            res.status(400).json({
                message: 'El ID de usuario debe ser válido'
            });
            return;
        }
        const tasks = await workloadJess_1.default.getAllByUser(idUsuario);
        if (!tasks || tasks.length === 0) {
            res.status(404).json({
                message: 'No se encontraron tareas'
            });
            return;
        }
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error('Error al obtener tareas:', error);
        res.status(500).json({
            message: 'Error al obtener la carga de trabajo',
            error: error.message
        });
    }
};
exports.getWorkloadByUser = getWorkloadByUser;
const filterWorkloadTasks = async (req, res) => {
    try {
        const { userId, status, priority, search } = req.query;
        const tasks = await workloadJess_1.default.filterTasks({
            userId: userId
                ? parseInt(userId, 10)
                : undefined,
            status: status,
            priority: priority,
            searchQuery: search
        });
        if (!tasks || tasks.length === 0) {
            res.status(404).json({
                message: 'No se encontraron tareas con esos filtros'
            });
            return;
        }
        res.status(200).json(tasks);
    }
    catch (error) {
        console.error('Error al filtrar tareas:', error);
        res.status(500).json({
            message: 'Error al filtrar tareas',
            error: error.message
        });
    }
};
exports.filterWorkloadTasks = filterWorkloadTasks;
const createWorkloadTask = async (req, res) => {
    try {
        const { userAssignedId, title, descriptionTask, dateDue, statusTask, priority } = req.body;
        // Validar campos obligatorios
        if (!userAssignedId ||
            !title ||
            !descriptionTask ||
            !dateDue ||
            !statusTask ||
            !priority) {
            res.status(400).json({
                message: 'Faltan campos obligatorios'
            });
            return;
        }
        // Crear nueva tarea
        const newTask = await workloadJess_1.default.create({
            userAssignedId,
            title,
            descriptionTask,
            dateDue: new Date(dateDue),
            statusTask,
            priority,
            submintedAt: new Date()
        });
        res.status(201).json({
            message: 'Tarea creada correctamente',
            data: newTask
        });
    }
    catch (error) {
        console.error('Error al crear tarea:', error);
        res.status(500).json({
            message: 'Error al crear tarea',
            error: error.message
        });
    }
};
exports.createWorkloadTask = createWorkloadTask;
