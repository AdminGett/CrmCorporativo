"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const interaccion_1 = __importDefault(require("../../../infrestructure/models/gestionClientes/interaccion"));
const iCliente_1 = __importDefault(require("../../../infrestructure/models/gestionClientes/iCliente"));
class InteraccionController {
    async registrarInteraccion(req, res) {
        try {
            const { clienteId, tipoInteraccion, descripcion } = req.body;
            const cliente = await iCliente_1.default.findByPk(Number(clienteId));
            if (!cliente) {
                res.status(404).json({
                    ok: false,
                    message: 'El cliente no existe'
                });
                return;
            }
            const nuevaInteraccion = await interaccion_1.default.create({
                clienteId: Number(clienteId),
                tipoInteraccion,
                descripcion
            });
            await iCliente_1.default.update({
                ultimaActividad: new Date()
            }, {
                where: {
                    clienteId: Number(clienteId)
                }
            });
            res.status(201).json({
                ok: true,
                message: 'Interacción registrada correctamente',
                interaccion: nuevaInteraccion
            });
        }
        catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al registrar interacción',
                error: error.message
            });
        }
    }
    async obtenerHistorialCliente(req, res) {
        try {
            const clienteId = Number(req.params.clienteId);
            const historial = await interaccion_1.default.findAll({
                where: {
                    clienteId
                },
                order: [
                    ['fechaInteraccion', 'DESC']
                ]
            });
            res.status(200).json({
                ok: true,
                historial
            });
        }
        catch (error) {
            res.status(500).json({
                ok: false,
                message: 'Error al obtener historial',
                error: error.message
            });
        }
    }
}
exports.default = new InteraccionController();
