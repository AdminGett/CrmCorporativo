"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.createComment = exports.getCommentsByWorkload = void 0;
const usercomment_1 = __importDefault(require("../../infrestructure/models/usercomment"));
const getCommentsByWorkload = async (req, res) => {
    const { workloadId } = req.params;
    try {
        const comments = await usercomment_1.default.findAll({
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
const createComment = async (req, res) => {
    const { workload_id, user_id, content } = req.body;
    if (!workload_id || !user_id || !content) {
        res.status(400).json({ ok: false, msg: 'workload_id, user_id y content son obligatorios' });
        return;
    }
    try {
        const newComment = await usercomment_1.default.create({
            workload_id,
            user_id,
            content,
            created_at: new Date(),
            updated_at: new Date()
        });
        res.status(201).json({ ok: true, msg: 'Comentario agregado exitosamente', data: newComment });
    }
    catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
exports.createComment = createComment;
