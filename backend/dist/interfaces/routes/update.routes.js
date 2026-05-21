"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const update_controller_1 = require("../controllers/users/update.controller");
const adminAuth_1 = require("../middlewares/adminAuth");
const router = (0, express_1.Router)();
// Se definen las rutas para actualizar la información de un usuario específico y obtener la información de un usuario, 
// ambas protegidas por el middleware de verificación de administrador para asegurar que solo 
// los usuarios con permisos adecuados puedan acceder a estas funcionalidades, llamando a los 
// controladores correspondientes que manejan la lógica para realizar las actualizaciones y recuperar la información del usuario
router.put('/update/:userId', adminAuth_1.verifyAdmin, update_controller_1.updateUser);
router.get('/update/getUser/:userId', adminAuth_1.verifyAdmin, update_controller_1.getInfoUser);
exports.default = router;
