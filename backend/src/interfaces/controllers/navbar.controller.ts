import { Request, Response } from 'express';
import User from "../../infrestructure/models/register";

// Controlador para obtener el nombre y tipo de usuario de un usuario específico por su ID, permitiendo la visualización de esta información en la barra de navegación del frontend
export const getUserName = async (req: Request, res: Response) => {
  // Se extrae el ID del usuario de los parámetros de la solicitud, lo que permite identificar al usuario para el cual se desea obtener el nombre y tipo de usuario
  const { userId } = req.params;

  // Se intenta encontrar un usuario en la base de datos utilizando Sequelize, buscando por el ID proporcionado y seleccionando solo los campos 'nombre' y 'tipoUsuario' para devolverlos en la respuesta. Si no se encuentra ningún usuario con ese ID, se devuelve un error 404 indicando que el usuario no fue encontrado  
  try {
    const user = await User.findOne({ where: { userId }, attributes: ['nombre', 'tipoUsuario'] });
    if (!user) {
      return res.status(404).json({ message: 'Usurio no encontrado' });
    }
    res.json(user);
    return;
  } catch (error) {
    console.error('Error al obtener el nombre:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
    return;
  }
}

