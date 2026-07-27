import { Request, Response } from 'express';
import { Op } from 'sequelize';
import Cliente, { clienteInstance } from '../../../infrestructure/models/gestionClientes/iCliente';

class ClienteController {

    public async obtenerMetricas(req: Request, res: Response): Promise<void> {
        try {
            const total = await Cliente.count({
                where: { activo: 1 }
            });

            const corporativos = await Cliente.count({
                where: {
                    tipo: 'Empresa',
                    activo: 1
                }
            });

            const personasFisicas = await Cliente.count({
                where: {
                    tipo: 'Individual',
                    activo: 1
                }
            });

            const alta = await Cliente.count({
                where: {
                    prioridad: 'Alta',
                    activo: 1
                }
            });

            const media = await Cliente.count({
                where: {
                    prioridad: 'Media',
                    activo: 1
                }
            });

            const baja = await Cliente.count({
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

        } catch (error: any) {
            res.status(500).json({
                ok: false,
                message: 'Error al obtener métricas',
                error: error.message
            });
        }
    }

    public async obtenerReporteInactivos(req: Request, res: Response): Promise<void> {
        try {

            const { fechaInicio, fechaFin } = req.query;

            const where: any = {
                activo: 1
            };

            if (fechaInicio && fechaFin) {
                where.fechaCreacion = {
                    [Op.between]: [
                        new Date(`${fechaInicio}T00:00:00`),
                        new Date(`${fechaFin}T23:59:59`)
                    ]
                };
            }

            const clientes = await Cliente.findAll({
                where,
                order: [['ultimaActividad', 'DESC']]
            });

            const ahora = new Date();

            const clientesProcesados = clientes.map((cliente: clienteInstance) => {

                const clienteJson: any = cliente.toJSON();

                if (clienteJson.ultimaActividad) {

                    const diferencia =
                        ahora.getTime() -
                        new Date(clienteJson.ultimaActividad).getTime();

                    const minutos = Math.floor(
                        diferencia / (1000 * 60)
                    );

                    clienteJson.estadoConexion =
                        minutos <= 15
                            ? 'En Línea'
                            : 'Inactivo';

                } else {
                    clienteJson.estadoConexion = 'Inactivo';
                }

                return clienteJson;
            });

            res.status(200).json({
                ok: true,
                clientes: clientesProcesados
            });

        } catch (error: any) {
            res.status(500).json({
                ok: false,
                message: 'Error al generar reporte',
                error: error.message
            });
        }
    }

    public async crearCliente(req: Request, res: Response): Promise<void> {
        try {

            const nuevoCliente = await Cliente.create(req.body);

            res.status(201).json({
                ok: true,
                message: 'Cliente registrado correctamente',
                cliente: nuevoCliente
            });

        } catch (error: any) {
            res.status(500).json({
                ok: false,
                message: 'Error al registrar cliente',
                error: error.message
            });
        }
    }

    public async actualizarCliente(req: Request, res: Response): Promise<void> {
        try {

            const { id } = req.params;

            const [rowsUpdated] = await Cliente.update(
                req.body,
                {
                    where: {
                        clienteId: Number(id)
                    }
                }
            );

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

        } catch (error: any) {
            res.status(500).json({
                ok: false,
                message: 'Error al actualizar cliente',
                error: error.message
            });
        }
    }

    public async eliminarCliente(req: Request, res: Response): Promise<void> {
        try {

            const { id } = req.params;

            const [rowsUpdated] = await Cliente.update(
                { activo: 0 },
                {
                    where: {
                        clienteId: Number(id)
                    }
                }
            );

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

        } catch (error: any) {
            res.status(500).json({
                ok: false,
                message: 'Error al eliminar cliente',
                error: error.message
            });
        }
    }
}

export default new ClienteController();