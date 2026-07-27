"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// 1. Importaciones del controlador de eliminación/búsqueda (delete.controller)
const delete_controller_1 = require("../controllers/users/delete.controller");
const delete_controller_2 = require("../controllers/users/delete.controller");
// 2. Importaciones del controlador de actualización/detalles (update.controller)
const update_controller_1 = require("../controllers/users/update.controller");
const router = (0, express_1.Router)();
// --- RUTAS DE BÚSQUEDA GENERAL ---
// Obtener todos los usuarios activos
router.get('/', delete_controller_1.getAllUsers);
// Buscar usuarios activos por nombre parcial (?search=Juan)
router.get('/search', delete_controller_2.search);
// --- RUTAS DE UN USUARIO ESPECÍFICO ---
// Mantenemos ':userId' para que coincida con el req.params.userId de tus controladores
// Obtener los detalles de un usuario por ID
router.get('/:userId', update_controller_1.getInfoUser);
// Actualizar los datos de un usuario por ID
router.put('/:userId', update_controller_1.updateUser);
// Eliminación lógica (desactivar usuario) por ID
router.delete('/:userId', delete_controller_1.deleteUser);
exports.default = router;
