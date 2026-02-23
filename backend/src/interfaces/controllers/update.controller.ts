import { Request, Response } from 'express';
import User from "../../infrestructure/models/register";
import bcrypt from 'bcryptjs';

// Controlador para actualizar la información de un usuario específico, recibiendo los nuevos datos en el cuerpo de la solicitud y actualizando el registro correspondiente en la base de datos
export const updateUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
    const {
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
    } = req.body;

    try {
        const user = await User.findByPk(userId);

        if (!user) {
            res.status(404).json({ message: 'Usuario no encontrado' });
            return
        }
// Se crea un objeto updateData que contiene los nuevos datos del usuario, y si se proporciona una nueva contraseña, se hashea antes de agregarla al objeto updateData. Luego, se actualiza el registro del usuario en la base de datos utilizando Sequelize y se devuelve una respuesta indicando que el usuario ha sido actualizado correctamente
        const updateData: any = {
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

        // Si se proporciona una nueva contraseña, se hashea antes de agregarla al objeto updateData
        if(passwordEncrypt && passwordEncrypt.trim() !== ''){
            const salt = await bcrypt.genSalt(10);
            updateData.passwordEncrypt = await bcrypt.hash(passwordEncrypt,salt); 
        }

        await user.update(updateData);
        res.json({ message: 'Usuario actualizado', user });
        return;

    } catch (error) {
        console.error('Error al actualizar Usuario:', error);
        res.status(500).json({ message: 'Error al actualizar Usuario' });
        return;
    }

    
};

// Controlador para eliminar un usuario específico, marcando su registro como inactivo en lugar de eliminarlo físicamente de la base de datos, lo que permite mantener un historial de usuarios y evitar la pérdida de datos relacionados con el usuario eliminado
export const getInfoUser = async (req: Request, res: Response) => {
    const { userId } = req.params;
  try {
    const users = await User.findOne({ where: { userId: userId } });
    res.json(users);
    return;
  } catch (error) {
    console.error('Error al obtener usuarios:', error);
    res.status(500).json({ message: 'Error al obtener usuarios' });
    return;
  }
}