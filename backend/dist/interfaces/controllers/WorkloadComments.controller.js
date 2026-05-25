"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = exports.filterComments = exports.getCommentsByUser = exports.getCommentsByTask = void 0;
const comments_1 = __importDefault(require("../../infrestructure/models/comments"));
const getCommentsByTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const idTask = parseInt(taskId, 10);
        if (isNaN(idTask)) {
            res.status(400).json({
                message: 'El ID de tarea debe ser válido'
            });
            return;
        }
        const comments = await comments_1.default.findAll({
            where: {
                taskComment: idTask
            },
            order: [['submittedAt', 'DESC']]
        });
        if (comments.length === 0) {
            res.status(404).json({
                message: 'No se encontraron comentarios'
            });
            return;
        }
        res.status(200).json(comments);
    }
    catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({
            message: 'Error al obtener comentarios',
            error: error.message
        });
    }
};
exports.getCommentsByTask = getCommentsByTask;
const getCommentsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const idUsuario = parseInt(userId, 10);
        if (isNaN(idUsuario)) {
            res.status(400).json({
                message: 'El ID de usuario debe ser válido'
            });
            return;
        }
        const comments = await comments_1.default.getByUser(idUsuario);
        if (comments.length === 0) {
            res.status(404).json({
                message: 'No se encontraron comentarios'
            });
            return;
        }
        res.status(200).json(comments);
    }
    catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({
            message: 'Error al obtener comentarios',
            error: error.message
        });
    }
};
exports.getCommentsByUser = getCommentsByUser;
const filterComments = async (req, res) => {
    try {
        const { userId, taskId, search } = req.query;
        const comments = await comments_1.default.filterComments({
            userId: userId
                ? parseInt(userId, 10)
                : undefined,
            taskId: taskId
                ? parseInt(taskId, 10)
                : undefined,
            searchQuery: search
        });
        if (comments.length === 0) {
            res.status(404).json({
                message: 'No se encontraron comentarios'
            });
            return;
        }
        res.status(200).json(comments);
    }
    catch (error) {
        console.error('Error al filtrar comentarios:', error);
        res.status(500).json({
            message: 'Error al filtrar comentarios',
            error: error.message
        });
    }
};
exports.filterComments = filterComments;
const createComment = async (req, res) => {
    try {
        const { userComment, taskComment, commentText } = req.body;
        if (!userComment ||
            !taskComment ||
            !commentText) {
            res.status(400).json({
                message: 'Faltan campos obligatorios'
            });
            return;
        }
        const newComment = await comments_1.default.create({
            userComment,
            taskComment,
            commentText,
            submittedAt: new Date()
        });
        res.status(201).json({
            message: 'Comentario creado correctamente',
            data: newComment
        });
    }
    catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).json({
            message: 'Error al crear comentario',
            error: error.message
        });
    }
};
exports.createComment = createComment;
