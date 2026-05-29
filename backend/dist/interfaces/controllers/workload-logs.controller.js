"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getLogsByUser = exports.getLogsByAction = exports.getLogsByWorkload = exports.getAllLogs = void 0;
const workload_logs_1 = __importDefault(require("../../infrestructure/models/workload_logs"));
// Obtener todos los logs (con filtros opcionales)
const getAllLogs = async (req, res) => {
    try {
        const { workload_id, limit } = req.query;
        const whereClause = {};
        if (workload_id)
            whereClause.workload_id = workload_id;
        const logs = await workload_logs_1.default.findAll({
            where: whereClause,
            order: [['timestamp', 'DESC']],
            limit: limit ? parseInt(limit) : 100
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
exports.getAllLogs = getAllLogs;
// Obtener logs por workload específico
const getLogsByWorkload = async (req, res) => {
    try {
        const { workloadId } = req.params;
        const logs = await workload_logs_1.default.findAll({
            where: { workload_id: workloadId },
            order: [['timestamp', 'DESC']]
        });
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error al obtener logs', error });
    }
};
exports.getLogsByWorkload = getLogsByWorkload;
// Obtener logs por acción
const getLogsByAction = async (req, res) => {
    try {
        const { action } = req.params;
        const logs = await workload_logs_1.default.findAll({
            where: { action },
            order: [['timestamp', 'DESC']]
        });
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error al obtener logs por acción', error });
    }
};
exports.getLogsByAction = getLogsByAction;
// Obtener logs por usuario
const getLogsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const logs = await workload_logs_1.default.findAll({
            where: { performed_by: userId },
            order: [['timestamp', 'DESC']]
        });
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error al obtener logs por usuario', error });
    }
};
exports.getLogsByUser = getLogsByUser;
