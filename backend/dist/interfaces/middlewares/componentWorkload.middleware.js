"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = exports.getCommentsByTask = void 0;
const workloadComments_1 = __importDefault(require("../../infrestructure/models/workloadComments"));
// 1. OBTENER COMENTARIOS POR TAREA
const getCommentsByTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const comments = await workloadComments_1.default.findAll({
            where: { taskComment: taskId },
            order: [['submittedAt', 'DESC']]
        });
        // Enviamos la lista completa tal cual viene de la base de datos
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios de la tarea', error: error.message });
    }
};
exports.getCommentsByTask = getCommentsByTask;
// 2. CREAR UN NUEVO COMENTARIO
const createComment = async (req, res) => {
    try {
        const { userComment, taskComment, commentText } = req.body;
        const newComment = await workloadComments_1.default.create({
            userComment,
            taskComment,
            commentText,
            submittedAt: new Date()
        });
        // Devolvemos el nuevo comentario completo creado por Sequelize
        res.status(201).json({ message: 'Comentario creado con éxito', data: newComment });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el comentario', error: error.message });
    }
};
exports.createComment = createComment;
