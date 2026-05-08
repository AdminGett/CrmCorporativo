"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const express_validator_1 = require("express-validator");
const login_1 = __importDefault(require("../../infrestructure/models/login"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Controlador para manejar el proceso de inicio de sesión de un usuario, verificando sus credenciales y generando un token JWT si son válidas
const loginUser = async (req, res) => {
    var _a;
    // Se validan los datos de entrada utilizando express-validator, y si hay errores, se devuelve un error 400 con los detalles de los errores encontrados
    const errors = (0, express_validator_1.validationResult)(req);
    // Si se encuentran errores de validación, se devuelve una respuesta con código 400 y un mensaje indicando que los datos son inválidos, junto con los detalles de los errores
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "Datos inválidos", errors: errors.array() });
    }
    // Se extraen el ID y la contraseña encriptada del cuerpo de la solicitud, que son necesarios para verificar las credenciales del usuario
    const { id, passwordEncrypt } = req.body;
    // Se intenta encontrar un usuario en la base de datos que coincida con el ID proporcionado y que esté activo (activo: 1). Si no se encuentra ningún usuario, se devuelve un error 400 indicando que ha ocurrido un problema
    try {
        const user = await login_1.default.findOne({ where: { id: id, activo: 1 } });
        if (!user) {
            console.log("Usuario no encontrado", id);
            return res.status(400).json({
                msg: `Ha ocurrido un problema, vuelve a intentar`
            });
        }
        // Si el usuario encontrado tiene el campo 'bloqueado' igual a 1, se devuelve un error 403 indicando que la cuenta ha sido bloqueada debido a múltiples intentos fallidos de inicio de sesión
        if (user.bloqueado === 1) {
            return res.status(403).json({
                msg: "Tu cuenta ha sido bloqueada debido a múltiples intentos fallidos. Por favor, contacta al administrador."
            });
        }
        // Se compara la contraseña proporcionada con la contraseña encriptada almacenada en la base de datos utilizando bcrypt. Si las contraseñas no coinciden, se incrementa el contador de intentos de inicio de sesión fallidos y se bloquea la cuenta si se alcanzan 5 intentos fallidos, devolviendo un error 400 con un mensaje indicando que ha ocurrido un problema y el número de intentos actuales
        const passwordValid = await bcryptjs_1.default.compare(passwordEncrypt, user.passwordEncrypt);
        if (!passwordValid) {
            const nuevosIntentos = user.intentosLogueo + 1;
            await login_1.default.update({
                intentosLogueo: nuevosIntentos,
                bloqueado: nuevosIntentos >= 5 ? 1 : 0, // Bloquea la cuenta después de 5 intentos fallidos 
            }, {
                where: { id: user.id }
            });
            res.status(400).json({
                msg: "Ha ocurrido un problema, vuelve a intentar",
                intentos: nuevosIntentos
            });
            return;
        }
        // Si las credenciales son válidas, se restablece el contador de intentos de inicio de sesión fallidos a 0 y se genera un token JWT que incluye el ID del usuario y su rol, con una expiración de 1 hora. Finalmente, se devuelve el token en la respuesta
        await login_1.default.update({
            intentosLogueo: 0,
        }, {
            where: { id: user.id }
        });
        // Se genera un token JWT que incluye el ID del usuario y su rol, utilizando una clave secreta definida en las variables de entorno (o una clave por defecto si no está definida), y se establece una expiración de 1 hora para el token
        const token = jsonwebtoken_1.default.sign({
            userId: user.id,
            role: Number(user.tipoUsuario),
        }, (_a = process.env['SECRET_KEY']) !== null && _a !== void 0 ? _a : 'pacoeltaco', {
            expiresIn: '1h'
        });
        res.json({ token });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ msg: "Algo a ocurrido, contacte con el adminitrador" });
    }
};
exports.loginUser = loginUser;
