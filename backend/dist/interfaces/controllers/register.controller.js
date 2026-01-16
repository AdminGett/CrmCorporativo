"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.registerUser = void 0;
const express_validator_1 = require("express-validator");
const register_1 = __importDefault(require("../../infrestructure/models/register"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const registerUser = async (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }
    const { nombre, passwordEncrypt, paterno, materno, fechaNacimiento, domicilio, nss, codigoPostal, estado, pais, fechaRegistro, tipoUsuario } = req.body;
    // Validar campos obligatorios
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
        // Crear el usuario
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
            tipoUsuario: tipoUsuario
        });
        res.status(201).json({
            msg: `Usuario ${nombre} creado exitosamente`,
            user: {
                nombre: newUser.get('nombre'),
                paterno: newUser.get('paterno'),
                materno: newUser.get('materno'),
                fechaNacimiento: newUser.get('fechaNacimiento'),
                domicilio: newUser.get('domicilio'),
                nss: newUser.get('nss'),
                codigoPostal: newUser.get('codigoPostal'),
                estado: newUser.get('estado'),
                pais: newUser.get('pais'),
                fechaRegistro: newUser.get('fechaRegistro'),
                tipoUsuario: newUser.get('tipoUsuario')
            }
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
