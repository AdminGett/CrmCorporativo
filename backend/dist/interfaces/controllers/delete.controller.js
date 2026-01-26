"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByName = exports.getAllUsers = exports.deleteUser = void 0;
const register_1 = __importDefault(require("../../infrestructure/models/register"));
const sequelize_1 = require("sequelize");
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    const usuario = await register_1.default.findByPk(userId);
    if (!usuario) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
    }
    await usuario.update({ activo: 0 });
    res.json({ message: 'Usuario eliminado' });
    return;
};
exports.deleteUser = deleteUser;
const getAllUsers = async (_req, res) => {
    try {
        const users = await register_1.default.findAll({ where: { activo: 1 } });
        res.json(users);
        return;
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
        return;
    }
};
exports.getAllUsers = getAllUsers;
const getUserByName = async (req, res) => {
    try {
        const search = String(req.query.search || '').trim(); // Obtener el parámetro de búsqueda de la consulta (El trim es para eliminar espacios en blanco)
        const where = { activo: 1 };
        if (!search) {
            res.status(400).json({ message: 'Nombre para búsqueda faltante' });
            return;
        }
        const user = await register_1.default.findAll({
            where: {
                nombre: {
                    [sequelize_1.Op.like]: `%${search}%`
                },
                activo: 1
            }
        });
        const users = await register_1.default.findAll({ where: { activo: 1 } });
        res.json(user);
        return;
    }
    catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
        return;
    }
};
exports.getUserByName = getUserByName;
