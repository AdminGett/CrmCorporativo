import { Request, Response } from "express";
import Workload from "../../../infrestructure/models/workload/workloadJess"
import { validationResult } from 'express-validator';

export const newTask = async (req: Request, res: Response) => {
    // Validar los datos de entrada utilizando express-validator
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    // Se extraen los campos necesarios del cuerpo de la solicitud, que son requeridos para el proceso de registro de un nuevo usuario
    const {
        userAssignedId,
        title,
        descriptionTask,
        dateDue,
        submintedAt,
        statusTask,
        priority,
    } = req.body;

    console.log(req.body); // Verificar los datos recibidos en el cuerpo de la solicitud

    // Validar campos obligatorios
    if (
        !userAssignedId ||
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
            userAssignedId,
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

// Controlador para actualizar una tarea existente, permitiendo modificar los campos de la tarea y actualizando la fecha de actualización
export const updateTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {
            title,
            descriptionTask,
            dateDue,
            submintedAt,
            statusTask,
            priority
    } = req.body;

    try {
        const task = await Workload.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return
        }
// Se crea un objeto updateData que contiene los nuevos datos del usuario, y si se proporciona una nueva contraseña, se hashea antes de agregarla al objeto updateData. Luego, se actualiza el registro del usuario en la base de datos utilizando Sequelize y se devuelve una respuesta indicando que el usuario ha sido actualizado correctamente
        const updateData: any = {
            title,
            descriptionTask,
            dateDue,
            submintedAt,
            statusTask,
            priority
        };
        
        await task.update(updateData);
        res.json({ message: 'Tarea actualizada', task });
        return;
    } catch (error) {
        console.error('Error al actualizar Tarea:', error);
        res.status(500).json({ message: 'Error al actualizar Tarea' });
        return;
    }
};

// Controlador para cambiar el estado de una tarea existente, buscando la tarea por su ID y actualizando el campo 
// statusTask en la base de datos utilizando Sequelize. Si la tarea no se encuentra, se devuelve un error 404 indicando que ha ocurrido un error,
//  y si la actualización es exitosa, se devuelve una respuesta indicando que el estado de la tarea ha sido actualizado correctamente 
// junto con los datos actualizados de la tarea
export const changeState = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { statusTask } = req.body;
    try {
        const task = await Workload.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return
        }
        await task.update({ statusTask });
        res.json({ message: 'Estado de tarea actualizado', task });
        return;
    } catch (error) {
        console.error('Error al actualizar estado de tarea:', error);
        res.status(500).json({ message: 'Error al actualizar estado de tarea' });
        return;
    }
};

// Controlador para cambiar la prioridad de una tarea existente, buscando la tarea por su ID y actualizando el campo
export const changePriority = async (req: Request, res: Response) => {
    const { id } = req.params;
    const { priority } = req.body;
    try {
        const task = await Workload.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return
        }
        await task.update({ priority });
        res.json({ message: 'Prioridad de tarea actualizada', task });
        return;
    } catch (error) {
        console.error('Error al actualizar prioridad de tarea:', error);
        res.status(500).json({ message: 'Error al actualizar prioridad de tarea' });
        return;
    }
};

// Controlador para eliminar una tarea existente, buscando la tarea por su ID y eliminándola de la base de datos utilizando Sequelize. 
// Si la tarea no se encuentra, se devuelve un error 404 indicando que ha ocurrido un error, y si la eliminación es exitosa, 
// se devuelve una respuesta indicando que la tarea ha sido eliminada correctamente
export const deleteTask = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const task = await Workload.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return
        }
        await task.destroy();
        res.json({ message: 'Tarea eliminada' });
        return;
    } catch (error) {
        console.error('Error al eliminar tarea:', error);
        res.status(500).json({ message: 'Error al eliminar tarea' });
        return;
    }
};

export const showTasksByUserId = async (req: Request, res: Response) => {
    const { userAssignedId } = req.params;
    try {
        const tasks = await Workload.findAll({ where: { userAssignedId } });
        if (!tasks.length) {
            res.status(404).json({ message: 'No se encontraron tareas para este usuario' });
            return;
        }
        res.json(tasks);
        return;
    }
        catch (error) {
        console.error('Error al obtener tareas por ID de usuario:', error);
        res.status(500).json({ message: 'Error al obtener tareas por ID de usuario' });
        return;
    }
};

export const taskById = async (req: Request, res: Response) => {
    const { id } = req.params;
    try {
        const task = await Workload.findByPk(id);
        if (!task) {
            res.status(404).json({ message: 'Tarea no encontrada' });
            return;
        }
        res.json(task);
        return;
    } catch (error) {
        console.error('Error al obtener tarea por ID:', error);
        res.status(500).json({ message: 'Error al obtener tarea por ID' });
        return;
    }
};
