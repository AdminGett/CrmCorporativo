import componentWorkloadComments from "../../infrestructure/models/workloadComments";
// 1. OBTENER COMENTARIOS POR TAREA
export const getCommentsByTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const comments = await componentWorkloadComments.findAll({
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
// 2. CREAR UN NUEVO COMENTARIO
export const createComment = async (req, res) => {
    try {
        const { userComment, taskComment, commentText } = req.body;
        const newComment = await componentWorkloadComments.create({
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
//# sourceMappingURL=componentWorkload.middleware.js.map