import { Request, Response, NextFunction } from 'express';

export class InteraccionMiddleware {

    public validarInteraccion(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {

        const {
            clienteId,
            tipoInteraccion,
            descripcion
        } = req.body;

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

        if (!descripcion?.trim()) {
            res.status(400).json({
                ok: false,
                message: 'La descripción es obligatoria'
            });
            return;
        }

        next();
    }

    public validarClienteId(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {

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

export default new InteraccionMiddleware();