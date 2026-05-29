"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateUserStatus = exports.getAllUsers = void 0;
const register_1 = __importDefault(require("../../infrestructure/models/register"));
const getAllUsers = async (req, res) => {
    try {
        const users = await register_1.default.findAll({
            attributes: ['userId', 'nombre', 'paterno', 'materno', 'tipoUsuario', 'activo', 'fechaRegistro'],
            order: [['fechaRegistro', 'DESC']]
        });
        const roleMap = {
            1: 'USER',
            2: 'ADMIN',
            3: 'MEDICO'
        };
        const mappedUsers = users.map(user => {
            const plainUser = user.toJSON();
            plainUser.tipoUsuario = roleMap[plainUser.tipoUsuario] || `TIPO_${plainUser.tipoUsuario}`;
            return plainUser;
        });
        res.status(200).json(mappedUsers);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener usuarios',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.getAllUsers = getAllUsers;
const updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { activo } = req.body;
    try {
        const user = await register_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ msg: 'Usuario no encontrado' });
            return;
        }
        await user.update({ activo });
        res.status(200).json({ msg: 'Estado actualizado correctamente' });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al actualizar usuario',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
exports.updateUserStatus = updateUserStatus;
