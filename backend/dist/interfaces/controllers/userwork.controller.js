"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateWorkloadDelivery = exports.updateWorkloadStatus = exports.getUserWorkloads = void 0;
const userwork_1 = __importDefault(require("../../infrestructure/models/userwork"));
const getUserWorkloads = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId; // ← así, no (req as any).userId
        const workloads = await userwork_1.default.findAll({
            where: { assigned_to: userId },
            order: [['due_date', 'ASC']]
        });
        return res.status(200).json(workloads);
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Error al obtener las tareas' });
    }
};
exports.getUserWorkloads = getUserWorkloads;
const updateWorkloadStatus = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const { id } = req.params;
        const { status } = req.body;
        const allowed = ['PENDING', 'IN_PROGRESS', 'DONE'];
        if (!allowed.includes(status)) {
            return res.status(400).json({ msg: 'Estado inválido' });
        }
        const workload = await userwork_1.default.findOne({
            where: { id, assigned_to: userId }
        });
        if (!workload) {
            return res.status(404).json({ msg: 'Tarea no encontrada o sin permiso' });
        }
        await workload.update({ status });
        return res.status(200).json({ msg: 'Estado actualizado', workload });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Error al actualizar' });
    }
};
exports.updateWorkloadStatus = updateWorkloadStatus;
const updateWorkloadDelivery = async (req, res) => {
    var _a;
    try {
        const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a.userId;
        const { id } = req.params;
        const { description } = req.body;
        const workload = await userwork_1.default.findOne({
            where: { id, assigned_to: userId }
        });
        if (!workload) {
            return res.status(404).json({ msg: 'Tarea no encontrada o sin permiso' });
        }
        await workload.update({ description });
        return res.status(200).json({ msg: 'Entrega actualizada', workload });
    }
    catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Error al actualizar' });
    }
};
exports.updateWorkloadDelivery = updateWorkloadDelivery;
