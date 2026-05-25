import componentWorkloadComments from "../../infrestructure/models/workloadComments";
// 1. OBTENER COMENTARIOS POR TAREA (Tu método original corregido)
export const getCommentsByTask = async (req, res) => {
    try {
        const { taskId } = req.params;
        const comments = await componentWorkloadComments.findAll({
            where: { taskComment: taskId },
            order: [['submittedAt', 'DESC']] // Opcional: muestra los más recientes primero
        });
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios de la tarea', error: error.message });
    }
};
// 2. NUEVO: MOSTRAR COMENTARIOS POR USUARIO
export const getCommentsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const idUsuario = parseInt(userId, 10);
        if (isNaN(idUsuario)) {
            res.status(400).json({ message: 'El id de usuario debe ser un número válido' });
            return;
        }
        // Usamos el método estático que agregamos al modelo
        const comments = await componentWorkloadComments.getByUser(idUsuario);
        if (comments.length === 0) {
            res.status(404).json({ message: 'No se encontraron comentarios para este usuario' });
            return;
        }
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener los comentarios del usuario', error: error.message });
    }
};
// 3. NUEVO: BUSQUEDA POR FILTROS Y FILTRAR COMENTARIOS (Dinámico)
// Ejemplo de uso: /api/comments/filter?taskId=3&userId=1&search=importante
export const filterComments = async (req, res) => {
    try {
        const { userId, taskId, search } = req.query;
        // Invocamos el filtro dinámico del modelo
        const comments = await componentWorkloadComments.filterComments({
            userId: userId ? parseInt(userId, 10) : undefined,
            taskId: taskId ? parseInt(taskId, 10) : undefined,
            searchQuery: search
        });
        if (comments.length === 0) {
            res.status(404).json({ message: 'No se encontraron comentarios con los filtros especificados' });
            return;
        }
        res.status(200).json(comments);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al filtrar los comentarios', error: error.message });
    }
};
// 4. AGREGAR COMENTARIOS (Tu método original corregido)
export const createComment = async (req, res) => {
    try {
        const { userComment, taskComment, commentText } = req.body;
        // Validación rápida de campos obligatorios
        if (!userComment || !taskComment || !commentText) {
            res.status(400).json({ message: 'Faltan campos obligatorios en el cuerpo de la petición' });
            return;
        }
        const newComment = await componentWorkloadComments.create({
            userComment,
            taskComment,
            commentText,
            submittedAt: new Date()
        });
        res.status(201).json({ message: 'Comentario creado con éxito', data: newComment });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear el comentario', error: error.message });
    }
};
//# sourceMappingURL=workloadComments.controller.js.map