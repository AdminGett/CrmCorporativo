"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClienteMiddleware = void 0;
class ClienteMiddleware {
    validarCrearCliente(req, res, next) {
        const { nombre, ubicacion, prioridad, tipo, estadoComercial } = req.body;
        if (!(nombre === null || nombre === void 0 ? void 0 : nombre.trim())) {
            res.status(400).json({
                ok: false,
                message: 'El nombre es obligatorio'
            });
            return;
        }
        if (!(ubicacion === null || ubicacion === void 0 ? void 0 : ubicacion.trim())) {
            res.status(400).json({
                ok: false,
                message: 'La ubicación es obligatoria'
            });
            return;
        }
        const prioridades = ['Alta', 'Media', 'Baja'];
        if (!prioridades.includes(prioridad)) {
            res.status(400).json({
                ok: false,
                message: 'Prioridad inválida'
            });
            return;
        }
        const tipos = ['Empresa', 'Individual'];
        if (!tipos.includes(tipo)) {
            res.status(400).json({
                ok: false,
                message: 'Tipo inválido'
            });
            return;
        }
        const estados = [
            'Negociación',
            'Contactado',
            'Perdido',
            'Sin Contactar'
        ];
        if (!estados.includes(estadoComercial)) {
            res.status(400).json({
                ok: false,
                message: 'Estado comercial inválido'
            });
            return;
        }
        next();
    }
    validarActualizarCliente(req, res, next) {
        const { id } = req.params;
        if (isNaN(Number(id))) {
            res.status(400).json({
                ok: false,
                message: 'ID inválido'
            });
            return;
        }
        next();
    }
    validarId(req, res, next) {
        const { id } = req.params;
        if (!id || isNaN(Number(id))) {
            res.status(400).json({
                ok: false,
                message: 'ID inválido'
            });
            return;
        }
        next();
    }
}
exports.ClienteMiddleware = ClienteMiddleware;
exports.default = new ClienteMiddleware();
