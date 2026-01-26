import { Request, Response } from 'express';
import User from "../../infrestructure/models/register";
import { Op } from "sequelize";

export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
    const usuario = await User.findByPk(userId);

    if (!usuario) {
      res.status(404).json({ message: 'Usuario no encontrado' });
      return;
    }

    await usuario.update({ activo: 0 });
    res.json({ message: 'Usuario eliminado' });
    return;
};

export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await User.findAll({ where: { activo: 1 } });
    res.json(users);
    return;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
    return;
  }
}

export const getUserByName = async (req: Request, res: Response) => {        
    try {
        const search = String(req.query.search || '').trim();// Obtener el parámetro de búsqueda de la consulta (El trim es para eliminar espacios en blanco)

        const where: any = { activo: 1 };

        if (!search) {
            res.status(400).json({ message: 'Nombre para búsqueda faltante' });
            return;
        }

        const user = await User.findAll({ 
            where: {
                nombre: {
                     [Op.like]: `%${search}%` 
                    }, 
                    activo: 1 
                } 
            }
        );
            
        const users = await User.findAll({ where: { activo: 1 } });

        res.json(user);
        return;
    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
        return;
    }
};