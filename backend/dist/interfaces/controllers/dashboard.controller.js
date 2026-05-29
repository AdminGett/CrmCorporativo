"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDashboardStats = void 0;
const getDashboardStats = async (req, res) => {
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
exports.getDashboardStats = getDashboardStats;
