"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserByIDd = exports.getInfoUser = exports.updatePermissions = void 0;
const permission_1 = __importDefault(require("../../infrestructure/models/permission"));
const permission_2 = require("../../infrestructure/models/permission");
const permission_3 = require("../../infrestructure/models/permission");
const register_1 = __importDefault(require("../../infrestructure/models/register"));
// Controlador para actualizar los permisos de un usuario específico, recibiendo un array de permisos en el cuerpo de la solicitud y actualizando la base de datos en consecuencia
const updatePermissions = async (req, res) => {
    const { userId } = req.params;
    const permissions = req.body;
    try {
        // Se verifica si el usuario existe en la base de datos utilizando Sequelize, buscando por el ID proporcionado. Si no se encuentra ningún usuario con ese ID, se devuelve un error 404 indicando que el usuario no fue encontrado
        for (const perm of permissions) {
            await permission_1.default.update({ allowed: perm.allowed }, { where: {
                    userId: userId,
                    permissionId: perm.permissionId
                } });
        }
        res.json({ message: 'Permisos actualizado', });
        return;
    }
    catch (error) {
        console.error('Error al actualizar los permisos del usuario:', error);
        res.status(500).json({ message: 'Error al actualizar permisos del usuario' });
        return;
    }
};
exports.updatePermissions = updatePermissions;
// Controlador para obtener la información de un usuario específico, incluyendo sus permisos, permitiendo la visualización de esta información en el frontend
const getInfoUser = async (req, res) => {
    const { userId } = req.params;
    // Se verifica si el usuario existe en la base de datos utilizando Sequelize, buscando por el ID proporcionado. Si no se encuentra ningún usuario con ese ID, se devuelve un error 404 indicando que el usuario no fue encontrado
    try {
        const user = await register_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
        }
        // Se realiza una consulta a la base de datos utilizando Sequelize para obtener los permisos del usuario, incluyendo información adicional de los catálogos de permisos y los permisos por tipo de usuario, filtrando por el ID del usuario y el tipo de usuario del mismo
        const users = await permission_1.default.findAll({
            where: { userId, },
            include: [
                {
                    model: permission_2.permissionsCatalog,
                    attributes: ['clave', 'descripcion']
                },
                {
                    model: permission_3.permissionsPerUserType,
                    where: { tipoUsuarioId: user.tipoUsuario },
                    required: true
                }
            ]
        });
        res.json(users);
        return;
    }
    catch (error) {
        console.error('Error al obtener permisos:', error);
        res.status(500).json({ message: 'Error al obtener permisos' });
        return;
    }
};
exports.getInfoUser = getInfoUser;
const getUserByIDd = async (req, res) => {
    // Se extrae el ID del usuario de los parámetros de la solicitud, lo que permite identificar al usuario para el cual se desea obtener el nombre y tipo de usuario
    const { userId } = req.params;
    // Se intenta encontrar un usuario en la base de datos utilizando Sequelize, buscando por el ID proporcionado y seleccionando solo los campos 'nombre' y '
    // tipoUsuario' para devolverlos en la respuesta. Si no se encuentra ningún usuario con ese ID, 
    // se devuelve un error 404 indicando que el usuario no fue encontrado  
    try {
        const user = await register_1.default.findByPk(userId);
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado' });
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
exports.getUserByIDd = getUserByIDd;
