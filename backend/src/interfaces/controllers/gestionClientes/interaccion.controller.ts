import { Request, Response } from 'express';
import Interaccion from '../../../infrestructure/models/gestionClientes/interaccion';
import Cliente from '../../../infrestructure/models/gestionClientes/iCliente';

class InteraccionController {

    public async registrarInteraccion(req: Request, res: Response): Promise<void> {

        try {

            const {
                clienteId,
                tipoInteraccion,
                descripcion
            } = req.body;

            const cliente = await Cliente.findByPk(
                Number(clienteId)
            );

            if (!cliente) {
                res.status(404).json({
                    ok: false,
                    message: 'El cliente no existe'
                });
                return;
            }

            const nuevaInteraccion =
                await Interaccion.create({
                    clienteId: Number(clienteId),
                    tipoInteraccion,
                    descripcion
                });

            await Cliente.update(
                {
                    ultimaActividad: new Date()
                },
                {
                    where: {
                        clienteId: Number(clienteId)
                    }
                }
            );

            res.status(201).json({
                ok: true,
                message: 'Interacción registrada correctamente',
                interaccion: nuevaInteraccion
            });

        } catch (error: any) {

            res.status(500).json({
                ok: false,
                message: 'Error al registrar interacción',
                error: error.message
            });
        }
    }

    public async obtenerHistorialCliente(req: Request, res: Response): Promise<void> {

        try {

            const clienteId = Number(
                req.params.clienteId
            );

            const historial =
                await Interaccion.findAll({
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

        } catch (error: any) {

            res.status(500).json({
                ok: false,
                message: 'Error al obtener historial',
                error: error.message
            });
        }
    }
}

export default new InteraccionController();