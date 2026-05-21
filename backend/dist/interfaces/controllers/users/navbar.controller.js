"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserName = void 0;
const register_1 = __importDefault(require("../../../infrestructure/models/user/register"));
// Controlador para obtener el nombre y tipo de usuario de un usuario específico por su ID, permitiendo la visualización de esta información en la barra de navegación del frontend
const getUserName = async (req, res) => {
    // Se extrae el ID del usuario de los parámetros de la solicitud, lo que permite identificar al usuario para el cual se desea obtener el nombre y tipo de usuario
    const { userId } = req.params;
    // Se intenta encontrar un usuario en la base de datos utilizando Sequelize, buscando por el ID proporcionado y seleccionando solo los campos 'nombre' y 'tipoUsuario' para devolverlos en la respuesta. Si no se encuentra ningún usuario con ese ID, se devuelve un error 404 indicando que el usuario no fue encontrado  
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
