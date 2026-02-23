"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByName = exports.getAllUsers = exports.deleteUser = void 0;
const register_1 = __importDefault(require("../../infrestructure/models/register"));
const sequelize_1 = require("sequelize");
// Controlador para eliminar un usuario de forma lógica, marcándolo como inactivo en la base de datos
const deleteUser = async (req, res) => {
    const { userId } = req.params;
    const usuario = await register_1.default.findByPk(userId);
    // Si el usuario no existe, se devuelve un error 404
    if (!usuario) {
        res.status(404).json({ message: 'Usuario no encontrado' });
        return;
    }
    // En lugar de eliminar físicamente el registro, se actualiza el campo 'activo' a 0 para marcarlo como inactivo
    await usuario.update({ activo: 0 });
    res.json({ message: 'Usuario eliminado' });
    return;
};
exports.deleteUser = deleteUser;
// Controlador para obtener todos los usuarios activos de la base de datos
const getAllUsers = async (_req, res) => {
    try {
        //Se buscan todos los usuarios cuyo campo 'activo' sea igual a 1, lo que indica que están activos
        const users = await register_1.default.findAll({ where: { activo: 1 } });
        res.json(users);
        return;
    }
    catch (error) {
        // Si ocurre un error durante la consulta, se captura y se devuelve un error 500 con un mensaje descriptivo
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
        return;
    }
};
exports.getAllUsers = getAllUsers;
// Controlador para obtener un usuario por su nombre, permitiendo una búsqueda parcial utilizando el operador LIKE de SQL
const getUserByName = async (req, res) => {
    try {
        const search = String(req.query.search || '').trim(); // Obtener el parámetro de búsqueda de la consulta (El trim es para eliminar espacios en blanco)
        // Se construye la condición de búsqueda utilizando el operador LIKE para permitir coincidencias parciales en el nombre del usuario, y se asegura que solo se busquen usuarios activos (activo: 1)
        const where = { activo: 1 };
        // Si se proporciona un término de búsqueda, se agrega la condición de búsqueda para el nombre utilizando el operador LIKE, lo que permite encontrar usuarios cuyo nombre contenga el término de búsqueda
        if (!search) {
            res.status(400).json({ message: 'Nombre para búsqueda faltante' });
            return;
        }
        // Se realiza la consulta a la base de datos utilizando Sequelize, buscando usuarios cuyo nombre coincida parcialmente con el término de búsqueda y que estén activos
        const user = await register_1.default.findAll({
            where: {
                nombre: {
                    [sequelize_1.Op.like]: `%${search}%`
                },
                activo: 1
            }
        });
        // Si no se encuentra ningún usuario que coincida con el término de búsqueda, se devuelve un error 404 indicando que no se encontraron usuarios
        if (user.length === 0) {
            res.status(404).json({ message: 'No se encontraron usuarios con ese nombre' });
            return;
        }
        const users = await register_1.default.findAll({ where: { activo: 1 } });
        res.json(user);
        return;
    }
    catch (error) {
        // Si ocurre un error durante la consulta, se captura y se devuelve un error 500 con un mensaje descriptivo
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
        return;
    }
};
exports.getUserByName = getUserByName;
