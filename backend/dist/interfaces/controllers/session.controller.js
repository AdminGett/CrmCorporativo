"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.obtenerSesiones = exports.crearSesion = void 0;
const session_1 = __importDefault(require("../../infrestructure/models/session"));
const crearSesion = async (req, res) => {
    try {
        const { user_id, refresh_token, expires_at } = req.body;
        const nuevaSesion = await session_1.default.create({
            user_id: user_id,
            refresh_token: refresh_token,
            expires_at: expires_at
        });
        res.status(201).json({
            mensaje: 'Sesion creada con exito',
            data: nuevaSesion
        });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ mensaje: 'Hubo un error al crar la session' });
    }
};
exports.crearSesion = crearSesion;
const obtenerSesiones = async (req, res) => {
    try {
        const sesiones = await session_1.default.findAll();
        res.status(200).json(sesiones);
    }
    catch (error) {
        res.status(500).json({ mensaje: 'Hubo un error al obtener las sessiones' });
    }
};
exports.obtenerSesiones = obtenerSesiones;
