import Comment from '../../infrestructure/models/comments';
import User from '../../infrestructure/models/users';
import Workload from '../../infrestructure/models/workloads';
// Obtener comentarios por workload
export const getCommentsByWorkload = async (req, res) => {
    const { workloadId } = req.params;
    try {
        const comments = await Comment.findAll({
            where: { workload_id: workloadId },
            include: [
                { model: User, as: 'author', attributes: ['id', 'name', 'email', 'role'] }
            ],
            order: [['created_at', 'DESC']]
        });
        res.status(200).json({
            ok: true,
            data: comments,
            total: comments.length
        });
    }
    catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
// Obtener comentarios recientes (globales)
export const getRecentComments = async (req, res) => {
    try {
        const { limit = 10 } = req.query;
        const comments = await Comment.findAll({
            limit: Number(limit),
            include: [
                { model: User, as: 'author', attributes: ['id', 'name', 'email', 'role'] },
                { model: Workload, attributes: ['id', 'title'] }
            ],
            order: [['created_at', 'DESC']]
        });
        res.status(200).json({
            ok: true,
            data: comments
        });
    }
    catch (error) {
        console.error('Error al obtener comentarios recientes:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
// Crear comentario
export const createComment = async (req, res) => {
    const { workload_id, user_id, content } = req.body;
    if (!workload_id || !user_id || !content) {
        res.status(400).json({ ok: false, msg: 'workload_id, user_id y content son obligatorios' });
        return;
    }
    try {
        // Verificar que exista el workload
        const workload = await Workload.findByPk(workload_id);
        if (!workload) {
            res.status(404).json({ ok: false, msg: 'Workload no encontrado' });
            return;
        }
        const newComment = await Comment.create({
            workload_id,
            user_id,
            content
        });
        const commentWithUser = await Comment.findByPk(newComment.id, {
            include: [{ model: User, as: 'author', attributes: ['id', 'name', 'email'] }]
        });
        res.status(201).json({
            ok: true,
            msg: 'Comentario agregado exitosamente',
            data: commentWithUser
        });
    }
    catch (error) {
        console.error('Error al crear comentario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
// Actualizar comentario
export const updateComment = async (req, res) => {
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
        await comment.update({
            content,
            updated_at: new Date()
        });
        res.status(200).json({
            ok: true,
            msg: 'Comentario actualizado exitosamente',
            data: comment
        });
    }
    catch (error) {
        console.error('Error al actualizar comentario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
// Eliminar comentario
export const deleteComment = async (req, res) => {
    const { id } = req.params;
    try {
        const comment = await Comment.findByPk(id);
        if (!comment) {
            res.status(404).json({ ok: false, msg: 'Comentario no encontrado' });
            return;
        }
        await comment.destroy();
        res.status(200).json({ ok: true, msg: 'Comentario eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar comentario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
//# sourceMappingURL=comments.controller.js.map