"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const express_validator_1 = require("express-validator");
const register_1 = __importDefault(require("../../infrestructure/models/register"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Controlador para manejar el proceso de registro de un nuevo usuario, validando los datos de entrada, hasheando la contraseña y creando un nuevo registro en la base de datos
const registerUser = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    // Se extraen los campos necesarios del cuerpo de la solicitud, que son requeridos para el proceso de registro de un nuevo usuario
    const { nombre, passwordEncrypt, paterno, materno, fechaNacimiento, domicilio, nss, codigoPostal, estado, pais, fechaRegistro, tipoUsuario, activo } = req.body;
    // Validar campos obligatorios - activo ya tiene defaultValue: 1 en el modelo
    if (!nombre ||
        !passwordEncrypt ||
        !paterno ||
        !materno ||
        !fechaNacimiento ||
        !domicilio ||
        !nss ||
        !codigoPostal ||
        !estado ||
        !pais ||
        !fechaRegistro ||
        !tipoUsuario) {
        res.status(400).json({ msg: "Todos los campos son obligatorios" });
        return;
    }
    try {
        // Hashear la contraseña
        const hashedPassword = await bcryptjs_1.default.hash(passwordEncrypt, 10);
        // Crear el usuario - activo usará el defaultValue: 1 del modelo si no se proporciona
        const newUser = await register_1.default.create({
            nombre: nombre,
            passwordEncrypt: hashedPassword,
            paterno: paterno,
            materno: materno,
            fechaNacimiento: fechaNacimiento,
            domicilio: domicilio,
            nss: nss,
            codigoPostal: codigoPostal,
            estado: estado,
            pais: pais,
            tipoUsuario: tipoUsuario,
            activo: activo !== undefined ? activo : 1 // Usar el valor enviado o default 1
        });
        res.status(201).json({
            msg: `Usuario ${nombre} creado exitosamente`,
        });
    }
    catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.registerUser = registerUser;
