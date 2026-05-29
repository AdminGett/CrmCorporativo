export const getDashboardStats = async (req, res) => {
    try {
        res.status(200).json({
            ok: true
        });
    }
    catch (error) {
        console.error('Error al obtener estadísticas:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
//# sourceMappingURL=dashboard.controller.js.map