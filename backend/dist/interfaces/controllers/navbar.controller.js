"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserName = void 0;
const register_1 = __importDefault(require("../../infrestructure/models/register"));
const getUserName = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await register_1.default.findOne({ where: { userId }, attributes: ['nombre', 'tipoUsuario'] });
        if (!user) {
            return res.status(404).json({ message: 'Usurio no encontrado' });
        }
        res.json(user);
        return;
    }
    catch (error) {
        console.error('Error al obtener el nombre:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
        return;
    }
};
exports.getUserName = getUserName;
