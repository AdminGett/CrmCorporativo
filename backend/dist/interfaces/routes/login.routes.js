"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controllers/login.controller");
const validateUser_1 = require("../middlewares/validateUser");
const router = (0, express_1.Router)();
// Se define la ruta para el inicio de sesión de un usuario, que utiliza el middleware de validación para asegurarse de que los datos de entrada son válidos antes de llamar al controlador que maneja el proceso de autenticación y generación del token JWT
router.post('/login', validateUser_1.validateLogin, login_controller_1.loginUser);
exports.default = router;
