import { Request, Response } from 'express';
import CommentModel from '../../infrestructure/models/usercomment';

export const getCommentsByWorkload = async (req: Request, res: Response) => {
    const { workloadId } = req.params;
    try {
        const comments = await CommentModel.findAll({
            where: { workload_id: workloadId },
            order: [['created_at', 'DESC']]
        });
        res.status(200).json({ ok: true, data: comments, total: comments.length });
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
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
        const newComment = await CommentModel.create({
            workload_id,
            user_id,
            content,
            created_at: new Date(),
            updated_at: new Date()
        });
        res.status(201).json({ ok: true, msg: 'Comentario agregado exitosamente', data: newComment });
    } catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};