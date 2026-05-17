import { Request, Response } from 'express';
import User from "../../../infrestructure/models/user/register";
import { Op } from "sequelize";

// Controlador para eliminar un usuario de forma lógica, marcándolo como inactivo en la base de datos
export const deleteUser = async (req: Request, res: Response) => {
  const { userId } = req.params;
    const usuario = await User.findByPk(userId);

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

// Controlador para obtener todos los usuarios activos de la base de datos
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    //Se buscan todos los usuarios cuyo campo 'activo' sea igual a 1, lo que indica que están activos
    const users = await User.findAll({ where: { activo: 1 } });
    res.json(users);
    return;
  } catch (error) {
    // Si ocurre un error durante la consulta, se captura y se devuelve un error 500 con un mensaje descriptivo
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
    return;
  }
}

// Controlador para obtener un usuario por su nombre, permitiendo una búsqueda parcial utilizando el operador LIKE de SQL
export const search = async (req: Request, res: Response) => {
    try {
        const search = String(req.query.search || '').trim();

        if (!search) {
            res.status(400).json({ message: 'Nombre para búsqueda faltante' });
            return;
        }

        const users = await User.findAll({
            where: {
                activo: 1,
                [Op.or]: [ // ← busca en nombre, paterno y materno
                    { nombre:  { [Op.like]: `%${search}%` } },
                    { paterno: { [Op.like]: `%${search}%` } },
                    { materno: { [Op.like]: `%${search}%` } },
                ]
            },
            attributes: [ // solo devuelve los campos necesarios, nunca la contraseña
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

    } catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ message: 'Error al obtener usuario' });
        return;
    }
};