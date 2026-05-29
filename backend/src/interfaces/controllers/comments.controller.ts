import { Request, Response } from 'express';
import Comment from '../../infrestructure/models/comments';
import Workload from '../../infrestructure/models/workloads';
// Sin import de User — no se necesita con includes quitados

export const getCommentsByWorkload = async (req: Request, res: Response) => {
    const { workloadId } = req.params;
    try {
        const comments = await Comment.findAll({
            where: { workload_id: workloadId },
            order: [['created_at', 'DESC']]
        });
        res.status(200).json({ ok: true, data: comments, total: comments.length });
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};

export const getRecentComments = async (req: Request, res: Response) => {
    try {
        const { limit = 10 } = req.query;
        const comments = await Comment.findAll({
            limit: Number(limit),
            order: [['created_at', 'DESC']]
        });
        res.status(200).json({ ok: true, data: comments });
    } catch (error) {
        console.error('Error al obtener comentarios recientes:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};

export const createComment = async (req: Request, res: Response) => {
    const { workload_id, user_id, content } = req.body;
    if (!workload_id || !user_id || !content) {
        res.status(400).json({ ok: false, msg: 'workload_id, user_id y content son obligatorios' });
        return;
    }
    try {
        const workload = await Workload.findByPk(workload_id);
        if (!workload) {
            res.status(404).json({ ok: false, msg: 'Workload no encontrado' });
            return;
        }
        const newComment = await Comment.create({ workload_id, user_id, content });
        res.status(201).json({ ok: true, msg: 'Comentario agregado exitosamente', data: newComment });
    } catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};

export const updateComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { content } = req.body;
    if (!content) {
        res.status(400).json({ ok: false, msg: 'El contenido es obligatorio' });
        return;
    }
    try {
        const comment = await Comment.findByPk(id);
        if (!comment) {
            res.status(404).json({ ok: false, msg: 'Comentario no encontrado' });
            return;
        }
        await comment.update({ content, updated_at: new Date() });
        res.status(200).json({ ok: true, msg: 'Comentario actualizado', data: comment });
    } catch (error) {
        console.error('Error al actualizar comentario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};

export const deleteComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByPk(id);
        if (!comment) {
            res.status(404).json({ ok: false, msg: 'Comentario no encontrado' });
            return;
        }
        await comment.destroy();
        res.status(200).json({ ok: true, msg: 'Comentario eliminado' });
    } catch (error) {
        console.error('Error al eliminar comentario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};