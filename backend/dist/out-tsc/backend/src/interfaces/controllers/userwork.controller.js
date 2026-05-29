import Workload from '../../infrestructure/models/userwork';
export const createUserWork = async (req, res) => {
    try {
        const { title, description, priority, status, created_by, due_date, assigned_to } = req.body;
        const newWorkload = await Workload.create({
            title,
            description,
            priority,
            status,
            created_by,
            due_date,
            assigned_to
        });
        res.status(201).json(newWorkload);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const getMyWorkloads = async (req, res) => {
    try {
        const userId = req.query['userId'];
        const whereClause = userId ? { assigned_to: Number(userId) } : {};
        const misTareas = await Workload.findAll({
            where: whereClause
        });
        res.status(200).json(misTareas);
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
export const updateWorkloadStatus = async (req, res) => {
    try {
        const taskId = req.params.id;
        const { status } = req.body;
        const workload = await Workload.findOne({
            where: { id: taskId }
        });
        if (!workload) {
            return res.status(404).json({ error: 'Tarea no encontrada' });
        }
        const currentStatus = workload.status;
        if (currentStatus === 'PENDING' && status !== 'IN_PROGRESS') {
            return res.status(400).json({ error: 'Una tarea PENDING solo puede pasar a IN_PROGRESS' });
        }
        if (currentStatus === 'IN_PROGRESS' && status !== 'DONE') {
            return res.status(400).json({ error: 'Una tarea IN_PROGRESS solo puede pasar a DONE' });
        }
        if (currentStatus === 'DONE' && status !== 'PENDING') {
            return res.status(400).json({ error: 'Una tarea DONE solo puede volver a PENDING' });
        }
        workload.status = status;
        await workload.save();
        res.status(200).json({ message: 'Estado actualizado correctamente', workload });
    }
    catch (error) {
        res.status(500).json({ error: error.message });
    }
};
//# sourceMappingURL=userwork.controller.js.map