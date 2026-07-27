import { Request, Response, NextFunction } from 'express';

export class ClienteMiddleware {

    public validarCrearCliente(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {

        const {
            nombre,
            ubicacion,
            prioridad,
            tipo,
            estadoComercial
        } = req.body;

        if (!nombre?.trim()) {
            res.status(400).json({
                ok: false,
                message: 'El nombre es obligatorio'
            });
            return;
        }

        if (!ubicacion?.trim()) {
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

    public validarActualizarCliente(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {

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

    public validarId(
        req: Request,
        res: Response,
        next: NextFunction
    ): void {

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

export default new ClienteMiddleware();