"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sequelize_1 = require("sequelize");
const iCliente_1 = __importDefault(require("../../../infrestructure/models/gestionClientes/iCliente"));
class ClienteController {
    async obtenerMetricas(req, res) {
        try {
            const total = await iCliente_1.default.count({
                where: { activo: 1 }
            });
            const corporativos = await iCliente_1.default.count({
                where: {
                    tipo: 'Empresa',
                    activo: 1
                }
            });
            const personasFisicas = await iCliente_1.default.count({
                where: {
                    tipo: 'Individual',
                    activo: 1
                }
            });
            const alta = await iCliente_1.default.count({
                where: {
                    prioridad: 'Alta',
                    activo: 1
                }
            });
            const media = await iCliente_1.default.count({
                where: {
                    prioridad: 'Media',
                    activo: 1
                }
            });
            const baja = await iCliente_1.default.count({
                where: {
                    prioridad: 'Baja',
                    activo: 1
                }
            });
            res.status(200).json({
                ok: true,
                metricas: {
                    totalClientes: total,
                    porTipo: {
                        corporativo: corporativos,
                        personaFisica: personasFisicas
                    },
                    porPrioridad: {
                        alta,
                        media,
                        baja
                    },
                    reportesGenerados: 3
                }
            });
        }
        catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al obtener métricas',
                error: error.message
            });
        }
    }
    async obtenerReporteInactivos(req, res) {
        try {
            const { fechaInicio, fechaFin } = req.query;
            const where = {
                activo: 1
            };
            if (fechaInicio && fechaFin) {
                where.fechaCreacion = {
                    [sequelize_1.Op.between]: [
                        new Date(`${fechaInicio}T00:00:00`),
                        new Date(`${fechaFin}T23:59:59`)
                    ]
                };
            }
            const clientes = await iCliente_1.default.findAll({
                where,
                order: [['ultimaActividad', 'DESC']]
            });
            const ahora = new Date();
            const clientesProcesados = clientes.map((cliente) => {
                const clienteJson = cliente.toJSON();
                if (clienteJson.ultimaActividad) {
                    const diferencia = ahora.getTime() -
                        new Date(clienteJson.ultimaActividad).getTime();
                    const minutos = Math.floor(diferencia / (1000 * 60));
                    clienteJson.estadoConexion =
                        minutos <= 15
                            ? 'En Línea'
                            : 'Inactivo';
                }
                else {
                    clienteJson.estadoConexion = 'Inactivo';
                }
                return clienteJson;
            });
            res.status(200).json({
                ok: true,
                clientes: clientesProcesados
            });
        }
        catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al generar reporte',
                error: error.message
            });
        }
    }
    async crearCliente(req, res) {
        try {
            const nuevoCliente = await iCliente_1.default.create(req.body);
            res.status(201).json({
                ok: true,
                message: 'Cliente registrado correctamente',
                cliente: nuevoCliente
            });
        }
        catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al registrar cliente',
                error: error.message
            });
        }
    }
    async actualizarCliente(req, res) {
        try {
            const { id } = req.params;
            const [rowsUpdated] = await iCliente_1.default.update(req.body, {
                where: {
                    clienteId: Number(id)
                }
            });
            if (rowsUpdated === 0) {
                res.status(404).json({
                    ok: false,
                    message: 'Cliente no encontrado'
                });
                return;
            }
            res.status(200).json({
                ok: true,
                message: 'Cliente actualizado correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al actualizar cliente',
                error: error.message
            });
        }
    }
    async eliminarCliente(req, res) {
        try {
            const { id } = req.params;
            const [rowsUpdated] = await iCliente_1.default.update({ activo: 0 }, {
                where: {
                    clienteId: Number(id)
                }
            });
            if (rowsUpdated === 0) {
                res.status(404).json({
                    ok: false,
                    message: 'Cliente no encontrado'
                });
                return;
            }
            res.status(200).json({
                ok: true,
                message: 'Cliente eliminado correctamente'
            });
        }
        catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al eliminar cliente',
                error: error.message
            });
        }
    }
}
exports.default = new ClienteController();
