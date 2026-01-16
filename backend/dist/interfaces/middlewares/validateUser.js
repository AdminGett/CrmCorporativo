"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateLogin = exports.validateCreateUser = void 0;
const express_validator_1 = require("express-validator");
exports.validateCreateUser = [
    (0, express_validator_1.body)('nombre')
        .trim()
        .notEmpty().withMessage('El nombre es obligatorio')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('Nombre inválido'),
    (0, express_validator_1.body)('paterno')
        .trim()
        .notEmpty().withMessage('Apellido paterno obligatorio')
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('Apellido paterno inválido'),
    (0, express_validator_1.body)('materno')
        .trim()
        .optional()
        .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
        .withMessage('Apellido materno inválido'),
    (0, express_validator_1.body)('fechaNacimiento')
        .isISO8601()
        .withMessage('Fecha de nacimiento inválida'),
    (0, express_validator_1.body)('domicilio')
        .trim()
        .notEmpty().withMessage('El domicilio es obligatorio')
        .isLength({ min: 5 })
        .withMessage('Domicilio muy corto'),
    (0, express_validator_1.body)('nss')
        .trim()
        .optional()
        .matches(/^[0-9]+$/)
        .withMessage('Numero de seguro social inválido, solo numeros'),
    (0, express_validator_1.body)('codigoPostal')
        .trim()
        .notEmpty().withMessage('Código postal obligatorio')
        .isLength({ min: 5, max: 5 })
        .withMessage('Código postal inválido')
        .isNumeric(),
    (0, express_validator_1.body)('estado')
        .trim()
        .notEmpty().withMessage('Estado obligatorio'),
    (0, express_validator_1.body)('pais')
        .trim()
        .notEmpty().withMessage('País obligatorio'),
    (0, express_validator_1.body)('tipoUsuario')
        .isInt({ min: 1 })
        .withMessage('Tipo de usuario inválido'),
    (0, express_validator_1.body)('passwordEncrypt')
        .isLength({ min: 6 })
        .withMessage('La contraseña debe tener mínimo 6 caracteres')
];
exports.validateLogin = [
    (0, express_validator_1.body)('id').isInt().withMessage("ID inválido"),
    (0, express_validator_1.body)('passwordEncrypt').notEmpty().withMessage("Contraseña requerida")
];
