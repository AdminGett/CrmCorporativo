"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoUser = exports.updateUser = void 0;
const register_1 = __importDefault(require("../../infrestructure/models/register"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { nombre, passwordEncrypt, paterno, materno, fechaNacimiento, domicilio, nss, codigoPostal, estado, pais, fechaRegistro, tipoUsuario, activo } = req.body;
    try {
        const user = await register_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        const updateData = {
            nombre,
            passwordEncrypt,
            paterno,
            materno,
            fechaNacimiento,
            domicilio,
            nss,
            codigoPostal,
            estado,
            pais,
            fechaRegistro,
            tipoUsuario,
            activo
        };
        if (passwordEncrypt && passwordEncrypt.trim() !== '') {
            const salt = await bcryptjs_1.default.genSalt(10);
            updateData.passwordEncrypt = await bcryptjs_1.default.hash(passwordEncrypt, salt);
        }
        await user.update(updateData);
        res.json({ message: 'Usuario actualizado', user });
        return;
    }
    catch (error) {
        console.error('Error al actualizar Usuario:', error);
        res.status(500).json({ message: 'Error al actualizar Usuario' });
        return;
    }
};
exports.updateUser = updateUser;
const getInfoUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const users = await register_1.default.findOne({ where: { userId: userId } });
        res.json(users);
        return;
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
        return;
    }
};
exports.getInfoUser = getInfoUser;
