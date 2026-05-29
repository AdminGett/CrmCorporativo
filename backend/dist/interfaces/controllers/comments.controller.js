"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteComment = exports.updateComment = exports.createComment = exports.getRecentComments = exports.getCommentsByWorkload = void 0;
const comments_1 = __importDefault(require("../../infrestructure/models/comments"));
const workloads_1 = __importDefault(require("../../infrestructure/models/workloads"));
// Sin import de User — no se necesita con includes quitados
const getCommentsByWorkload = async (req, res) => {
    const { workloadId } = req.params;
    try {
        const comments = await comments_1.default.findAll({
            where: { workload_id: workloadId },
            order: [['created_at', 'DESC']]
        });
        res.status(200).json({ ok: true, data: comments, total: comments.length });
    }
    catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
exports.getCommentsByWorkload = getCommentsByWorkload;
const getRecentComments = async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        const comments = await comments_1.default.findAll({
            limit: Number(limit),
            order: [['created_at', 'DESC']]
        });
        res.status(200).json({ ok: true, data: comments });
    }
    catch (error) {
        console.error('Error al obtener comentarios recientes:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
exports.getRecentComments = getRecentComments;
const createComment = async (req, res) => {
    const { workload_id, user_id, content } = req.body;
    if (!workload_id || !user_id || !content) {
        res.status(400).json({ ok: false, msg: 'workload_id, user_id y content son obligatorios' });
        return;
    }
    try {
        const workload = await workloads_1.default.findByPk(workload_id);
        if (!workload) {
            res.status(404).json({ ok: false, msg: 'Workload no encontrado' });
            return;
        }
        const newComment = await comments_1.default.create({ workload_id, user_id, content });
        res.status(201).json({ ok: true, msg: 'Comentario agregado exitosamente', data: newComment });
    }
    catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
exports.createComment = createComment;
const updateComment = async (req, res) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
        res.status(400).json({ ok: false, msg: 'El contenido es obligatorio' });
        return;
    }
    try {
        const comment = await comments_1.default.findByPk(id);
        if (!comment) {
            res.status(404).json({ ok: false, msg: 'Comentario no encontrado' });
            return;
        }
        await comment.update({ content, updated_at: new Date() });
        res.status(200).json({ ok: true, msg: 'Comentario actualizado', data: comment });
    }
    catch (error) {
        console.error('Error al actualizar comentario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
exports.updateComment = updateComment;
const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await comments_1.default.findByPk(id);
        if (!comment) {
            res.status(404).json({ ok: false, msg: 'Comentario no encontrado' });
            return;
        }
        await comment.destroy();
        res.status(200).json({ ok: true, msg: 'Comentario eliminado' });
    }
    catch (error) {
        console.error('Error al eliminar comentario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
exports.deleteComment = deleteComment;
