"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.search = exports.getAllUsers = exports.deleteUser = void 0;
const register_1 = __importDefault(require("../../../infrestructure/models/user/register"));
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
const search = async (req, res) => {
    try {
        const search = String(req.query.search || '').trim();
        if (!search) {
            res.status(400).json({ message: 'Nombre para búsqueda faltante' });
            return;
        }
        const users = await register_1.default.findAll({
            where: {
                activo: 1,
                [sequelize_1.Op.or]: [
                    { nombre: { [sequelize_1.Op.like]: `%${search}%` } },
                    { paterno: { [sequelize_1.Op.like]: `%${search}%` } },
                    { materno: { [sequelize_1.Op.like]: `%${search}%` } },
                ]
            },
            attributes: [
                'userId',
                'nombre',
                'paterno',
                'materno',
                'fechaNacimiento',
                'domicilio',
                'nss',
                'codigoPostal',
                'estado',
                'pais',
                'fechaRegistro',
                'tipoUsuario',
                'activo'
            ],
            order: [['nombre', 'ASC']]
        });
        if (!users.length) {
            res.status(404).json({ message: 'No se encontraron usuarios con ese nombre' });
            return;
        }
        res.json(users);
        return;
    }
    catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
        return;
    }
};
exports.search = search;
