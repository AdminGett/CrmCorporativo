import { Request, Response } from 'express';
import workloadComments from '../../../infrestructure/models/workload/commentsJess';
import { createCommentDTO } from '../../../domain/dto/workload/createComment.dto';



export const getCommentsByTask = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const { taskId } = req.params;

        const idTask =
            parseInt(taskId, 10);


        if (isNaN(idTask)) {

            res.status(400).json({

                message:
                    'El ID de tarea debe ser válido'
            });

            return;
        }


        const comments =
            await workloadComments.findAll({

                where: {
                    taskComment: idTask
                },

                order: [['submintedAt', 'DESC']]
            });


        if (comments.length === 0) {

            res.status(404).json({

                message:
                    'No se encontraron comentarios'
            });

            return;
        }


        res.status(200).json(comments);

    } catch (error: any) {

        console.error(
            'Error al obtener comentarios:',
            error
        );

        res.status(500).json({

            message:
                'Error al obtener comentarios',

            error: error.message
        });
    }
};

export const getCommentsByUser = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const { userId } = req.params;

        const idUsuario =
            parseInt(userId, 10);


        if (isNaN(idUsuario)) {

            res.status(400).json({

                message:
                    'El ID de usuario debe ser válido'
            });

            return;
        }


        const comments =
            await workloadComments.getAllByUser(
                idUsuario
            );


        if (comments.length === 0) {

            res.status(404).json({

                message:
                    'No se encontraron comentarios'
            });

            return;
        }


        res.status(200).json(comments);

    } catch (error: any) {

        console.error(
            'Error al obtener comentarios:',
            error
        );

        res.status(500).json({

            message:
                'Error al obtener comentarios',

            error: error.message
        });
    }
};


export const filterComments = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const {
            userId,
            taskId,
            search
        } = req.query;


        const comments =
            await workloadComments.filterComments({

                userId: userId
                    ? parseInt(userId as string, 10)
                    : undefined,

                taskId: taskId
                    ? parseInt(taskId as string, 10)
                    : undefined,

                searchQuery:
                    search as string
            });


        if (comments.length === 0) {

            res.status(404).json({

                message:
                    'No se encontraron comentarios'
            });

            return;
        }


        res.status(200).json(comments);

    } catch (error: any) {

        console.error(
            'Error al filtrar comentarios:',
            error
        );

        res.status(500).json({

            message:
                'Error al filtrar comentarios',

            error: error.message
        });
    }
};


export const createComment = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const {

            userComment,

            taskComment,

            commentText

        }: createCommentDTO = req.body;


        if (
            !userComment ||
            !taskComment ||
            !commentText
        ) {

            res.status(400).json({

                message:
                    'Faltan campos obligatorios'
            });

            return;
        }


        const newComment =
            await workloadComments.create({

                userComment,

                taskComment,

                commentText,

                submintedAt:
                    new Date()
            });


        res.status(201).json({

            message:
                'Comentario creado correctamente',

            data: newComment
        });

    } catch (error: any) {

        console.error(
            'Error al crear comentario:',
            error
        );

        res.status(500).json({

            message:
                'Error al crear comentario',

            error: error.message
        });
    }
};