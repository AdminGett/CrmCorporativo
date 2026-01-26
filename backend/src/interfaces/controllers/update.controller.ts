import { Request, Response } from 'express';
import User from "../../infrestructure/models/register";
import bcrypt from 'bcryptjs';

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