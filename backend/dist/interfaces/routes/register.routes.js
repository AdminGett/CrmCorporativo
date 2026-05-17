"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const register_controller_1 = require("../controllers/users/register.controller");
const validateUser_1 = require("../middlewares/validateUser");
const router = (0, express_1.Router)();
// Se define la ruta para el registro de un nuevo usuario, que utiliza el middleware de validación para asegurarse de que los datos de entrada son válidos antes de llamar al controlador que maneja la lógica para crear un nuevo usuario en el sistema
router.post('/register', validateUser_1.validateCreateUser, register_controller_1.registerUser);
exports.default = router;
