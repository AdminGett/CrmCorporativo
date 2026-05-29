"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const delete_controller_1 = require("../../controllers/users/delete.controller");
const verifyAdmin_1 = require("../../middlewares/verifyAdmin");
const router = (0, express_1.Router)();
// Se definen las rutas para la gestión de usuarios, incluyendo la ruta para eliminar un usuario específico, obtener todos los usuarios activos y buscar usuarios por nombre, todas protegidas por el middleware de verificación de administrador para asegurar que solo los usuarios con permisos adecuados puedan acceder a estas funcionalidades
router.delete('/:userId', verifyAdmin_1.verifyAdmin, delete_controller_1.deleteUser);
router.get('/', verifyAdmin_1.verifyAdmin, delete_controller_1.getAllUsers);
router.get('/search', verifyAdmin_1.verifyAdmin, delete_controller_1.search);
exports.default = router;
