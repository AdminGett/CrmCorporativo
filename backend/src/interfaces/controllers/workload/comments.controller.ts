import { Request, Response } from "express";
import WorkloadComments from "../../../infrestructure/models/workload/comments";
import { validationResult } from 'express-validator';

// Controladores para la gestión de comentarios relacionados con las cargas de trabajo
export const newComment = async (req: Request, res: Response) => {
    // Validar los datos de entrada utilizando express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    // Se extraen los campos necesarios del cuerpo de la solicitud, que son requeridos para el proceso de registro de un nuevo usuario
    const {
        userComment,
        taskComment,
        commentText,
        submitedAt
    } = req.body;

    // Validar campos obligatorios
    if (
        !userComment ||
        !taskComment ||
        !commentText ||
        !submitedAt
    ) {
        res.status(400).json({ msg: "Todos los campos son obligatorios" });
        return;
    }

    try {
        // Crear el comentario
        const createComment = await WorkloadComments.create({
            userComment,
            taskComment,
            commentText,
            submitedAt
        });

        res.status(201).json({
            msg: `Comentario creado exitosamente`,
        });
    } catch (error) {
        console.error('Error al registrar comentario:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};

// Controlador para actualizar un comentario existente, permitiendo modificar el texto del comentario y actualizando la fecha de actualización
export const updateComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { commentText } = req.body;

    try {
        // Se busca el comentario por su ID utilizando Sequelize, 
        // y si no se encuentra, se devuelve un error 404 indicando que ha ocurrido un error. 
        // Si el comentario existe, se crea un objeto updateData que contiene los nuevos datos del comentario, y 
        // se actualiza el registro del comentario en la base de datos utilizando Sequelize. Finalmente, 
        // se devuelve una respuesta indicando que el comentario ha sido actualizado correctamente junto con los datos actualizados del comentario
        const task = await WorkloadComments.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Ha  ocurrido un error' });
            return
        }
        // Se crea un objeto updateData que contiene los nuevos datos del usuario, y si se proporciona una nueva contraseña, se hashea antes de agregarla al objeto updateData. Luego, se actualiza el registro del usuario en la base de datos utilizando Sequelize y se devuelve una respuesta indicando que el usuario ha sido actualizado correctamente
        const updateData: any = {
            commentText,
        };

        await task.update(updateData);
        res.json({ message: 'Se ha actualizado correctamente', task });
        return;
    } catch (error) {
        console.error('Error al actualizar:', error);
        res.status(500).json({ message: 'Error al actualizar' });
        return;
    }
};

// Controlador para eliminar un comentario existente, buscando el comentario por su ID y eliminándolo de la base de datos 
// utilizando Sequelize. Si el comentario no se encuentra, se devuelve un error 404 indicando que ha ocurrido un error, 
// y si la eliminación es exitosa, se devuelve una respuesta indicando que el comentario ha sido eliminado correctamente
export const deleteComment = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const task = await WorkloadComments.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Ha ocurrido un error' });
            return
        }
        await task.destroy();
        res.json({ message: 'Comentario eliminado' });
        return;
    } catch (error) {
        console.error('Error al eliminar comentario:', error);
        res.status(500).json({ message: 'Error al eliminar comentario' });
        return;
    }
};

// Controlador para obtener todos los comentarios relacionados con una tarea específica, 
// buscando los comentarios por el ID de la tarea y ordenándolos por fecha de envío en orden descendente. 
// Si no se encuentran comentarios para la tarea, se devuelve un error 404 indicando que no hay comentarios para esta tarea
// , y si la consulta es exitosa, se devuelve una respuesta con los comentarios encontrados
export const getCommentsByTaskId = async (req: Request, res: Response) => {
    const { taskComment } = req.params;

    try {
        const comments = await WorkloadComments.findAll({ 
            where: { taskComment },
            order: [['submitedAt', 'DESC']] // ← más recientes primero
        });

        if (!comments.length) {
            res.status(404).json({ message: 'No hay comentarios para esta tarea' });
            return;
        }

        res.json(comments);
        return;
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ message: 'Error al obtener comentarios' });
        return;
    }
}

export const getCommentsByUserId = async (req: Request, res: Response) => {
    const { userComment } = req.params;

    try {
        const comments = await WorkloadComments.findAll({ 
            where: { userComment },
            order: [['submitedAt', 'DESC']] // ← más recientes primero
        });

        if (!comments.length) {
            res.status(404).json({ message: 'No hay comentarios para este usuario' });
            return;
        }
        res.json(comments);
        return;
    } catch (error) {
        console.error('Error al obtener comentarios:', error);
        res.status(500).json({ message: 'Error al obtener comentarios' });
        return;
    }
}