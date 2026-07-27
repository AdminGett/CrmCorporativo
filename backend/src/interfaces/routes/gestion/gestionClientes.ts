import { Router } from 'express';

import clienteController from '../../controllers/gestionClientes/cliente.Controller';

import interaccionController from '../../controllers/gestionClientes/interaccion.controller';

import clienteMiddleware from '../../middlewares/cliente.middleware';

import interaccionMiddleware from '../../middlewares/interaccion.middleware';

const router = Router();

router.get(
    '/clientes/metricas',
    clienteController.obtenerMetricas
);

router.get(
    '/clientes/reporte-inactivos',
    clienteController.obtenerReporteInactivos
);

router.post(
    '/clientes',
    clienteMiddleware.validarCrearCliente,
    clienteController.crearCliente
);

router.put(
    '/clientes/:id',
    clienteMiddleware.validarActualizarCliente,
    clienteController.actualizarCliente
);

router.delete(
    '/clientes/:id',
    clienteMiddleware.validarId,
    clienteController.eliminarCliente
);

router.post(
    '/interacciones',
    interaccionMiddleware.validarInteraccion,
    interaccionController.registrarInteraccion
);

router.get(
    '/interacciones/cliente/:clienteId',
    interaccionMiddleware.validarClienteId,
    interaccionController.obtenerHistorialCliente
);

export default router;