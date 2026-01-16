import { body } from 'express-validator';

export const validateCreateUser = [

  body('nombre')
    .trim()
    .notEmpty().withMessage('El nombre es obligatorio')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('Nombre inválido'),

  body('paterno')
    .trim()
    .notEmpty().withMessage('Apellido paterno obligatorio')
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('Apellido paterno inválido'),

  body('materno')
    .trim()
    .optional()
    .matches(/^[a-zA-ZáéíóúÁÉÍÓÚñÑ\s]+$/)
    .withMessage('Apellido materno inválido'),

  body('fechaNacimiento')
    .isISO8601()
    .withMessage('Fecha de nacimiento inválida'),

  body('domicilio')
    .trim()
    .notEmpty().withMessage('El domicilio es obligatorio')
    .isLength({ min: 5 })
    .withMessage('Domicilio muy corto'),

  body('nss')
    .trim()
    .optional()
    .matches(/^[0-9]+$/)
    .withMessage('Numero de seguro social inválido, solo numeros'),

  body('codigoPostal')
    .trim()
    .notEmpty().withMessage('Código postal obligatorio')
    .isLength({ min: 5, max: 5 })
    .withMessage('Código postal inválido')
    .isNumeric(),

  body('estado')
    .trim()
    .notEmpty().withMessage('Estado obligatorio'),

  body('pais')
    .trim()
    .notEmpty().withMessage('País obligatorio'),

  body('tipoUsuario')
    .isInt({ min: 1 })
    .withMessage('Tipo de usuario inválido'),

  body('passwordEncrypt')
    .isLength({ min: 6 })
    .withMessage('La contraseña debe tener mínimo 6 caracteres')
];


export const validateLogin = [
  body('id').isInt().withMessage("ID inválido"),
  body('passwordEncrypt').notEmpty().withMessage("Contraseña requerida")
];