"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getCommentsByUserId = exports.getCommentsByTaskId = exports.deleteComment = exports.updateComment = exports.newComment = void 0;
const comments_1 = __importDefault(require("../../../infrestructure/models/workload/comments"));
const express_validator_1 = require("express-validator");
// Controladores para la gestión de comentarios relacionados con las cargas de trabajo
const newComment = async (req, res) => {
    // Validar los datos de entrada utilizando express-validator
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    // Se extraen los campos necesarios del cuerpo de la solicitud, que son requeridos para el proceso de registro de un nuevo usuario
    const { userComment, taskComment, commentText, submitedAt } = req.body;
    // Validar campos obligatorios
    if (!userComment ||
        !taskComment ||
        !commentText ||
        !submitedAt) {
        res.status(400).json({ msg: "Todos los campos son obligatorios" });
        return;
    }
    try {
        // Crear el comentario
        const createComment = await comments_1.default.create({
            userComment,
            taskComment,
            commentText,
            submitedAt
        });
        res.status(201).json({
            msg: `Comentario creado exitosamente`,
        });
    }
    catch (error) {
        console.error('Error al registrar comentario:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.newComment = newComment;
// Controlador para actualizar un comentario existente, permitiendo modificar el texto del comentario y actualizando la fecha de actualización
const updateComment = async (req, res) => {
    const { id } = req.params;
    const { commentText } = req.body;
    try {
        // Se busca el comentario por su ID utilizando Sequelize, 
        // y si no se encuentra, se devuelve un error 404 indicando que ha ocurrido un error. 
        // Si el comentario existe, se crea un objeto updateData que contiene los nuevos datos del comentario, y 
        // se actualiza el registro del comentario en la base de datos utilizando Sequelize. Finalmente, 
        // se devuelve una respuesta indicando que el comentario ha sido actualizado correctamente junto con los datos actualizados del comentario
        const task = await comments_1.default.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Ha  ocurrido un error' });
            return;
        }
        // Se crea un objeto updateData que contiene los nuevos datos del usuario, y si se proporciona una nueva contraseña, se hashea antes de agregarla al objeto updateData. Luego, se actualiza el registro del usuario en la base de datos utilizando Sequelize y se devuelve una respuesta indicando que el usuario ha sido actualizado correctamente
        const updateData = {
            commentText,
        };
        await task.update(updateData);
        res.json({ message: 'Se ha actualizado correctamente', task });
        return;
    }
    catch (error) {
        console.error('Error al actualizar:', error);
        res.status(500).json({ message: 'Error al actualizar' });
        return;
    }
};
exports.updateComment = updateComment;
// Controlador para eliminar un comentario existente, buscando el comentario por su ID y eliminándolo de la base de datos 
// utilizando Sequelize. Si el comentario no se encuentra, se devuelve un error 404 indicando que ha ocurrido un error, 
// y si la eliminación es exitosa, se devuelve una respuesta indicando que el comentario ha sido eliminado correctamente
const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const task = await comments_1.default.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Ha ocurrido un error' });
            return;
        }
        await task.destroy();
        res.json({ message: 'Comentario eliminado' });
        return;
    }
    catch (error) {
        console.error('Error al eliminar comentario:', error);
        res.status(500).json({ message: 'Error al eliminar comentario' });
        return;
    }
};
exports.deleteComment = deleteComment;
// Controlador para obtener todos los comentarios relacionados con una tarea específica, 
// buscando los comentarios por el ID de la tarea y ordenándolos por fecha de envío en orden descendente. 
// Si no se encuentran comentarios para la tarea, se devuelve un error 404 indicando que no hay comentarios para esta tarea
// , y si la consulta es exitosa, se devuelve una respuesta con los comentarios encontrados
const getCommentsByTaskId = async (req, res) => {
    const { taskComment } = req.params;
    try {
        const comments = await comments_1.default.findAll({
            where: { taskComment },
            order: [['submitedAt', 'DESC']] // ← más recientes primero
        });
        if (!comments.length) {
            res.status(404).json({ message: 'No hay comentarios para esta tarea' });
            return;
        }
        res.json(comments);
        return;
    }
    catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ message: 'Error al obtener comentarios' });
        return;
    }
};
exports.getCommentsByTaskId = getCommentsByTaskId;
const getCommentsByUserId = async (req, res) => {
    const { userComment } = req.params;
    try {
        const comments = await comments_1.default.findAll({
            where: { userComment },
            order: [['submitedAt', 'DESC']] // ← más recientes primero
        });
        if (!comments.length) {
            res.status(404).json({ message: 'No hay comentarios para este usuario' });
            return;
        }
        res.json(comments);
        return;
    }
    catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ message: 'Error al obtener comentarios' });
        return;
    }
};
exports.getCommentsByUserId = getCommentsByUserId;
