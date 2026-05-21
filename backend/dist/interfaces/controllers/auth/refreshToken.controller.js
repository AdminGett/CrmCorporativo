"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.refreshTokenFunction = void 0;
const express_validator_1 = require("express-validator");
const refreshToken_1 = __importDefault(require("../../../infrestructure/models/auth/refreshToken"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
// Controlador para manejar la generación de un nuevo token de acceso utilizando un token de actualización válido, 
// permitiendo a los usuarios mantener su sesión activa sin necesidad de volver a iniciar sesión
const refreshTokenFunction = async (req, res) => {
    // Se validan los datos de entrada utilizando express-validator, 
    // y si hay errores, se devuelve un error 400 con los detalles de los errores encontrados
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "Datos inválidos", errors: errors.array() });
    }
    try {
        const refreshToken = req.cookies.refreshToken;
        // Si no se proporciona un token de actualización en las cookies, 
        // se devuelve un error 401 indicando que no se ha proporcionado un token de actualización
        if (!refreshToken) {
            return res.status(401).json({ msg: "Error de sistema" });
        }
        const decoded = jsonwebtoken_1.default.verify(refreshToken, process.env.REFRESH_TOKEN_SECRET);
        const tokenInDb = await refreshToken_1.default.findOne({
            where: {
                token: refreshToken,
                revoked: false,
            }
        });
        // Si el token de actualización no se encuentra en la base de datos, 
        // se devuelve un error 403 indicando que el token de actualización no es válido
        if (!tokenInDb) {
            return res.status(403).json({ msg: "Token de actualización no válido" });
        }
        const accessToken = jsonwebtoken_1.default.sign({
            userId: decoded.userId,
            role: decoded.role,
        }, process.env.ACCESS_TOKEN_SECRET, { expiresIn: '1h' });
        res.json({ accessToken });
    }
    catch (error) {
        console.error('Error al refrescar token:', error);
        res.status(500).json({ msg: "Error al refrescar token" });
    }
};
exports.refreshTokenFunction = refreshTokenFunction;
