"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workloads_controller_1 = require("../controllers/workloads.controller");
const router = (0, express_1.Router)();
// Obtener todas las cargas de trabajo (protegido)
router.get('/', workloads_controller_1.getWorkloads);
// Obtener workload por ID (protegido)
router.get('/:id', workloads_controller_1.getWorkloadById);
// Crear nueva carga de trabajo (protegido)
router.post('/', workloads_controller_1.createWorkload);
// Actualizar carga de trabajo (protegido)
router.put('/:id', workloads_controller_1.updateWorkload);
// Eliminar carga de trabajo (protegido)
router.delete('/:id', workloads_controller_1.deleteWorkload);
exports.default = router;
