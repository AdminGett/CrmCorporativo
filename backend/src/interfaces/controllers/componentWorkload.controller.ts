import { Request, Response } from 'express';
import componentWorkload from '../../infrestructure/models/workload';
import { createWorkloadDTO } from '../../domain/dto/createWorkload.dto';

export const getWorkloadByUser = async (
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


        const tasks =
            await componentWorkload.getAllByUser(
                idUsuario
            );


        if (tasks.length === 0) {

            res.status(404).json({

                message:
                    'No se encontraron tareas'
            });

            return;
        }


        res.status(200).json(tasks);

    } catch (error: any) {

        console.error(
            'Error al obtener tareas:',
            error
        );

        res.status(500).json({

            message:
                'Error al obtener la carga de trabajo',

            error: error.message
        });
    }
};


export const filterWorkloadTasks = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const {
            userId,
            status,
            priority,
            search
        } = req.query;


        const tasks =
            await componentWorkload.filterTasks({

                userId: userId
                    ? parseInt(userId as string, 10)
                    : undefined,

                status: status as
                    | 'pending'
                    | 'in_progress'
                    | 'completed',

                priority: priority as
                    | 'low'
                    | 'medium'
                    | 'high',

                searchQuery:
                    search as string
            });


        if (tasks.length === 0) {

            res.status(404).json({

                message:
                    'No se encontraron tareas con esos filtros'
            });

            return;
        }


        res.status(200).json(tasks);

    } catch (error: any) {

        console.error(
            'Error al filtrar tareas:',
            error
        );

        res.status(500).json({

            message:
                'Error al filtrar tareas',

            error: error.message
        });
    }
};

export const createWorkloadTask = async (
    req: Request,
    res: Response
): Promise<void> => {

    try {

        const {

            userAssignedId,

            title,

            descriptionTask,

            dateDue,

            statusTask,

            priority

        }: createWorkloadDTO = req.body;

        if (
            !userAssignedId ||
            !title ||
            !descriptionTask ||
            !dateDue ||
            !statusTask ||
            !priority
        ) {

            res.status(400).json({

                message:
                    'Faltan campos obligatorios'
            });

            return;
        }



        const newTask =
            await componentWorkload.create({

                userAssignedId,

                title,

                descriptionTask,

                dateDue:
                    new Date(dateDue),

                statusTask,

                priority,

                submittedAt:
                    new Date()
            });


        res.status(201).json({

            message:
                'Tarea creada correctamente',

            data: newTask
        });

    } catch (error: any) {

        console.error(
            'Error al crear tarea:',
            error
        );

        res.status(500).json({

            message:
                'Error al crear tarea',

            error: error.message
        });
    }
};