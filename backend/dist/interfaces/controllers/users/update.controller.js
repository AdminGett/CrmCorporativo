"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getInfoUser = exports.updateUser = void 0;
const register_1 = __importDefault(require("../../../infrestructure/models/user/register"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
// Controlador para actualizar la información de un usuario específico, recibiendo los nuevos datos en el cuerpo de la solicitud y actualizando el registro correspondiente en la base de datos
const updateUser = async (req, res) => {
    const { userId } = req.params;
    const { nombre, passwordEncrypt, paterno, materno, fechaNacimiento, domicilio, nss, codigoPostal, estado, pais, fechaRegistro, tipoUsuario, activo } = req.body;
    try {
        const user = await register_1.default.findByPk(userId);
        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return;
        }
        // Se crea un objeto updateData que contiene los nuevos datos del usuario, y si se proporciona una nueva contraseña, se hashea antes de agregarla al objeto updateData. Luego, se actualiza el registro del usuario en la base de datos utilizando Sequelize y se devuelve una respuesta indicando que el usuario ha sido actualizado correctamente
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
            tipoUsuario: Number(tipoUsuario),
            activo: Number(activo)
        };
        // Si se proporciona una nueva contraseña, se hashea antes de agregarla al objeto updateData
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
// Controlador para eliminar un usuario específico, marcando su registro como inactivo en lugar de eliminarlo físicamente de la base de datos, lo que permite mantener un historial de usuarios y evitar la pérdida de datos relacionados con el usuario eliminado
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
