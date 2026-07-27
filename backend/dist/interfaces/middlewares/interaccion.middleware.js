"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteraccionMiddleware = void 0;
class InteraccionMiddleware {
    validarInteraccion(req, res, next) {
        const { clienteId, tipoInteraccion, descripcion } = req.body;
        if (!clienteId || isNaN(Number(clienteId))) {
            res.status(400).json({
                ok: false,
                message: 'Cliente inválido'
            });
            return;
        }
        const tipos = [
            'Llamada',
            'Reunión',
            'Nota',
            'Correo'
        ];
        if (!tipos.includes(tipoInteraccion)) {
            res.status(400).json({
                ok: false,
                message: 'Tipo de interacción inválido'
            });
            return;
        }
        if (!(descripcion === null || descripcion === void 0 ? void 0 : descripcion.trim())) {
            res.status(400).json({
                ok: false,
                message: 'La descripción es obligatoria'
            });
            return;
        }
        next();
    }
    validarClienteId(req, res, next) {
        const { clienteId } = req.params;
        if (!clienteId || isNaN(Number(clienteId))) {
            res.status(400).json({
                ok: false,
                message: 'ClienteId inválido'
            });
            return;
        }
        next();
    }
}
exports.InteraccionMiddleware = InteraccionMiddleware;
exports.default = new InteraccionMiddleware();
