import { Request, Response } from 'express';
import permission from "../../infrestructure/models/permission";
import {permissionsCatalog} from "../../infrestructure/models/permission";
import { permissionsPerUserType } from '../../infrestructure/models/permission';
import User from '../../infrestructure/models/register';

// Controlador para actualizar los permisos de un usuario específico, recibiendo un array de permisos en el cuerpo de la solicitud y actualizando la base de datos en consecuencia
export const updatePermissions = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const permissions = req.body; 
    try {
        // Se verifica si el usuario existe en la base de datos utilizando Sequelize, buscando por el ID proporcionado. Si no se encuentra ningún usuario con ese ID, se devuelve un error 404 indicando que el usuario no fue encontrado
        for(const perm of permissions){
            await permission.update( 
                {allowed:perm.allowed},
                {where: {
                    userId: userId,
                    permissionId: perm.permissionId
                }}
            );
        }
        res.json({ message: 'Permisos actualizado',  });
        return;

    } catch (error) {
        console.error('Error al actualizar los permisos del usuario:', error);
        res.status(500).json({ message: 'Error al actualizar permisos del usuario' });
        return;
    }

    
};

// Controlador para obtener la información de un usuario específico, incluyendo sus permisos, permitiendo la visualización de esta información en el frontend
export const getInfoUser = async (req: Request, res: Response) => {
   const { userId } = req.params;

   // Se verifica si el usuario existe en la base de datos utilizando Sequelize, buscando por el ID proporcionado. Si no se encuentra ningún usuario con ese ID, se devuelve un error 404 indicando que el usuario no fue encontrado
  try {
    const user = await User.findByPk(userId);

    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    
    // Se realiza una consulta a la base de datos utilizando Sequelize para obtener los permisos del usuario, incluyendo información adicional de los catálogos de permisos y los permisos por tipo de usuario, filtrando por el ID del usuario y el tipo de usuario del mismo
    const users = await permission.findAll({ 
        where: { userId, },
        include: [
            {
                model: permissionsCatalog,
                attributes: ['clave', 'descripcion']
            },
            {
                model: permissionsPerUserType,
                where: { tipoUsuarioId: user.tipoUsuario },
                required: true
            }
        ]
    });
    res.json(users);
    return;
  } catch (error) {
    console.error('Error al obtener permisos:', error);
    res.status(500).json({ message: 'Error al obtener permisos' });
    return;
  }
}

export const getUserByIDd = async (req: Request, res: Response) => {
  // Se extrae el ID del usuario de los parámetros de la solicitud, lo que permite identificar al usuario para el cual se desea obtener el nombre y tipo de usuario
  const { userId } = req.params;

  // Se intenta encontrar un usuario en la base de datos utilizando Sequelize, buscando por el ID proporcionado y seleccionando solo los campos 'nombre' y '
  // tipoUsuario' para devolverlos en la respuesta. Si no se encuentra ningún usuario con ese ID, 
  // se devuelve un error 404 indicando que el usuario no fue encontrado  
  try {
    const user = await User.findByPk(userId)
    if (!user) {
      return res.status(404).json({ message: 'Usuario no encontrado' });
    }
    res.json(user);
    return;
  } catch (error) {
    console.error('Error al obtener el nombre:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
    return;
  }
}