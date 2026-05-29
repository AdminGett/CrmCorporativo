"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const userwork_controller_1 = require("../controllers/userwork.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
// GET /api/userwork → tareas del usuario logueado
router.get('/', auth_1.verifyToken, userwork_controller_1.getUserWorkloads);
// PATCH /api/userwork/:id/status → actualizar estado
router.patch('/:id/status', auth_1.verifyToken, userwork_controller_1.updateWorkloadStatus);
// PATCH /api/userwork/:id/delivery → editar entrega
router.patch('/:id/delivery', auth_1.verifyToken, userwork_controller_1.updateWorkloadDelivery);
exports.default = router;
