import componentWorkload from "../../infrestructure/models/componentWorkload";
// 1. OBTENER TAREAS POR USUARIO (Usando el método estático del modelo)
export const getWorkloadByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        // Convertimos a número ya que req.params los lee como string
        const idUsuario = parseInt(userId, 10);
        if (isNaN(idUsuario)) {
            res.status(400).json({ message: 'El id de usuario debe ser un número válido' });
            return;
        }
        // Llamamos a la función estática que creamos en el modelo
        const tasks = await componentWorkload.getAllByUser(idUsuario);
        if (tasks.length === 0) {
            res.status(404).json({ message: 'No se encontraron tareas para este usuario' });
            return;
        }
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al obtener la carga de trabajo', error: error.message });
    }
};
// 2. FILTRAR TAREAS (Nuevo endpoint dinámico)
// Ejemplo de uso: /api/workload/filter?userId=1&status=pending&priority=high&search=diseño
export const filterWorkloadTasks = async (req, res) => {
    try {
        const { userId, status, priority, search } = req.query;
        // Construimos los filtros mapeando los query params de la URL
        const tasks = await componentWorkload.filterTasks({
            userId: userId ? parseInt(userId, 10) : undefined,
            status: status,
            priority: priority,
            searchQuery: search
        });
        if (tasks.length === 0) {
            res.status(404).json({ message: 'No se encontraron tareas con los filtros aplicados' });
            return;
        }
        res.status(200).json(tasks);
    }
    catch (error) {
        res.status(500).json({ message: 'Error al filtrar las tareas', error: error.message });
    }
};
// 3. CREAR UNA NUEVA TAREA
export const createWorkloadTask = async (req, res) => {
    try {
        const { userAssignedId, title, descriptionTask, dateDue, statusTask, priority } = req.body;
        // Validación básica antes de insertar
        if (!userAssignedId || !title || !descriptionTask || !dateDue || !statusTask || !priority) {
            res.status(400).json({ message: 'Faltan campos obligatorios en el cuerpo de la petición' });
            return;
        }
        const newTask = await componentWorkload.create({
            userAssignedId,
            title,
            descriptionTask,
            dateDue: new Date(dateDue), // Nos aseguramos de guardarlo como objeto Date
            statusTask,
            priority,
            submintedAt: new Date() // Seteamos la fecha actual de creación
        });
        res.status(201).json({
            message: 'Tarea de carga de trabajo creada con éxito',
            data: newTask
        });
    }
    catch (error) {
        res.status(500).json({ message: 'Error al crear la tarea', error: error.message });
    }
};
//# sourceMappingURL=componentWorkload.controller.js.map