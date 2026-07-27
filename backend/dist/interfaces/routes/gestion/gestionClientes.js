"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cliente_Controller_1 = __importDefault(require("../../controllers/gestionClientes/cliente.Controller"));
const interaccion_controller_1 = __importDefault(require("../../controllers/gestionClientes/interaccion.controller"));
const cliente_middleware_1 = __importDefault(require("../../middlewares/cliente.middleware"));
const interaccion_middleware_1 = __importDefault(require("../../middlewares/interaccion.middleware"));
const router = (0, express_1.Router)();
router.get('/clientes/metricas', cliente_Controller_1.default.obtenerMetricas);
router.get('/clientes/reporte-inactivos', cliente_Controller_1.default.obtenerReporteInactivos);
router.post('/clientes', cliente_middleware_1.default.validarCrearCliente, cliente_Controller_1.default.crearCliente);
router.put('/clientes/:id', cliente_middleware_1.default.validarActualizarCliente, cliente_Controller_1.default.actualizarCliente);
router.delete('/clientes/:id', cliente_middleware_1.default.validarId, cliente_Controller_1.default.eliminarCliente);
router.post('/interacciones', interaccion_middleware_1.default.validarInteraccion, interaccion_controller_1.default.registrarInteraccion);
router.get('/interacciones/cliente/:clienteId', interaccion_middleware_1.default.validarClienteId, interaccion_controller_1.default.obtenerHistorialCliente);
exports.default = router;
