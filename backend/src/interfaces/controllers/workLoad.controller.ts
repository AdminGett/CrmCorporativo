import { Request, Response } from "express";
import Workload from "../../infrestructure/models/workload"
import { validationResult } from 'express-validator';

export const newTask = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    // Se extraen los campos necesarios del cuerpo de la solicitud, que son requeridos para el proceso de registro de un nuevo usuario
    const {
        id,
        userAssignedId,
        adminId,
        title,
        descriptionTask,
        dateDue,
        submintedAt,
        statusTask,
        priority,
    } = req.body;

    // Validar campos obligatorios
    if (
        !id ||
        !userAssignedId ||
        !adminId ||
        !title ||
        !descriptionTask ||
        !dateDue ||
        !submintedAt ||
        !statusTask ||
        !priority 
    ) {
        res.status(400).json({ msg: "Todos los campos son obligatorios" });
        return;
    }

    try {
        // Crear el usuario
        const createTask = await Workload.create({
            id,
            userAssignedId,
            adminId,
            title,
            descriptionTask,
            dateDue,
            submintedAt,
            statusTask,
            priority
        });

        res.status(201).json({
            msg: `Tarea ${title} creada exitosamente`,
        });
    } catch (error) {
        console.error('Error al registrar tarea:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
