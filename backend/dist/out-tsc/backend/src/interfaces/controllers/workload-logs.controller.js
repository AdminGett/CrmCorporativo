import WorkloadLog from '../../infrestructure/models/workload_logs';
// Obtener todos los logs (con filtros opcionales)
export const getAllLogs = async (req, res) => {
    try {
        const { workload_id, limit } = req.query;
        const whereClause = {};
        if (workload_id)
            whereClause.workload_id = workload_id;
        const logs = await WorkloadLog.findAll({
            where: whereClause,
            order: [['timestamp', 'DESC']],
            limit: limit ? parseInt(limit) : 100
        });
        res.status(200).json(logs);
    }
    catch (error) {
        console.error('Error al obtener logs:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
// Obtener logs por workload específico
export const getLogsByWorkload = async (req, res) => {
    try {
        const { workloadId } = req.params;
        const logs = await WorkloadLog.findAll({
            where: { workload_id: workloadId },
            order: [['timestamp', 'DESC']]
        });
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error al obtener logs', error });
    }
};
// Obtener logs por acción
export const getLogsByAction = async (req, res) => {
    try {
        const { action } = req.params;
        const logs = await WorkloadLog.findAll({
            where: { action },
            order: [['timestamp', 'DESC']]
        });
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error al obtener logs por acción', error });
    }
};
// Obtener logs por usuario
export const getLogsByUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const logs = await WorkloadLog.findAll({
            where: { performed_by: userId },
            order: [['timestamp', 'DESC']]
        });
        res.status(200).json(logs);
    }
    catch (error) {
        res.status(500).json({ msg: 'Error al obtener logs por usuario', error });
    }
};
//# sourceMappingURL=workload-logs.controller.js.map