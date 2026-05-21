"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteTask = exports.changePriority = exports.changeState = exports.updateTask = exports.newTask = void 0;
const workload_1 = __importDefault(require("../../../infrestructure/models/workload/workload"));
const express_validator_1 = require("express-validator");
const newTask = async (req, res) => {
    // Validar los datos de entrada utilizando express-validator
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    // Se extraen los campos necesarios del cuerpo de la solicitud, que son requeridos para el proceso de registro de un nuevo usuario
    const { userAssignedId, title, descriptionTask, dateDue, submintedAt, statusTask, priority, } = req.body;
    // Validar campos obligatorios
    if (!userAssignedId ||
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
            userAssignedId,
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
// Controlador para actualizar una tarea existente, permitiendo modificar los campos de la tarea y actualizando la fecha de actualización
const updateTask = async (req, res) => {
    const { id } = req.params;
    const { title, descriptionTask, dateDue, submintedAt, statusTask, priority } = req.body;
    try {
        const task = await workload_1.default.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }
        // Se crea un objeto updateData que contiene los nuevos datos del usuario, y si se proporciona una nueva contraseña, se hashea antes de agregarla al objeto updateData. Luego, se actualiza el registro del usuario en la base de datos utilizando Sequelize y se devuelve una respuesta indicando que el usuario ha sido actualizado correctamente
        const updateData = {
            title,
            descriptionTask,
            dateDue,
            submintedAt,
            statusTask,
            priority
        };
        await task.update(updateData);
        res.json({ message: 'Tarea actualizada', task });
        return;
    }
    catch (error) {
        console.error('Error al actualizar Tarea:', error);
        res.status(500).json({ message: 'Error al actualizar Tarea' });
        return;
    }
};
exports.updateTask = updateTask;
// Controlador para cambiar el estado de una tarea existente, buscando la tarea por su ID y actualizando el campo 
// statusTask en la base de datos utilizando Sequelize. Si la tarea no se encuentra, se devuelve un error 404 indicando que ha ocurrido un error,
//  y si la actualización es exitosa, se devuelve una respuesta indicando que el estado de la tarea ha sido actualizado correctamente 
// junto con los datos actualizados de la tarea
const changeState = async (req, res) => {
    const { id } = req.params;
    const { statusTask } = req.body;
    try {
        const task = await workload_1.default.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }
        await task.update({ statusTask });
        res.json({ message: 'Estado de tarea actualizado', task });
        return;
    }
    catch (error) {
        console.error('Error al actualizar estado de tarea:', error);
        res.status(500).json({ message: 'Error al actualizar estado de tarea' });
        return;
    }
};
exports.changeState = changeState;
// Controlador para cambiar la prioridad de una tarea existente, buscando la tarea por su ID y actualizando el campo
const changePriority = async (req, res) => {
    const { id } = req.params;
    const { priority } = req.body;
    try {
        const task = await workload_1.default.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }
        await task.update({ priority });
        res.json({ message: 'Prioridad de tarea actualizada', task });
        return;
    }
    catch (error) {
        console.error('Error al actualizar prioridad de tarea:', error);
        res.status(500).json({ message: 'Error al actualizar prioridad de tarea' });
        return;
    }
};
exports.changePriority = changePriority;
// Controlador para eliminar una tarea existente, buscando la tarea por su ID y eliminándola de la base de datos utilizando Sequelize. 
// Si la tarea no se encuentra, se devuelve un error 404 indicando que ha ocurrido un error, y si la eliminación es exitosa, 
// se devuelve una respuesta indicando que la tarea ha sido eliminada correctamente
const deleteTask = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await workload_1.default.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }
        await task.destroy();
        res.json({ message: 'Tarea eliminada' });
        return;
    }
    catch (error) {
        console.error('Error al eliminar tarea:', error);
        res.status(500).json({ message: 'Error al eliminar tarea' });
        return;
    }
};
exports.deleteTask = deleteTask;
