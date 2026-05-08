"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.newTask = void 0;
const workload_1 = __importDefault(require("../../infrestructure/models/workload"));
const express_validator_1 = require("express-validator");
const newTask = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    // Se extraen los campos necesarios del cuerpo de la solicitud, que son requeridos para el proceso de registro de un nuevo usuario
    const { id, userAssignedId, adminId, title, descriptionTask, dateDue, submintedAt, statusTask, priority, } = req.body;
    // Validar campos obligatorios
    if (!id ||
        !userAssignedId ||
        !adminId ||
        !title ||
        !descriptionTask ||
        !dateDue ||
        !submintedAt ||
        !statusTask ||
        !priority) {
        res.status(400).json({ msg: "Todos los campos son obligatorios" });
        return;
    }
    try {
        // Crear el usuario
        const createTask = await workload_1.default.create({
            id,
            userAssignedId,
            adminId,
            title,
            descriptionTask,
            dateDue,
            submintedAt,
            statusTask,
            priority
        });
        res.status(201).json({
            msg: `Tarea ${title} creada exitosamente`,
        });
    }
    catch (error) {
        console.error('Error al registrar tarea:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.newTask = newTask;
