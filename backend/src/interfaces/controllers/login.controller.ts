import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User, { IUserAttributes } from '../../infrestructure/models/login';
// import bcrypt from 'bcryptjs';  para cuadno la contrasena sea encriptada
import jwt from 'jsonwebtoken';
import { error } from 'console';
import bcrypt from 'bcryptjs';

export const loginUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "Datos inválidos", errors: errors.array() });
    }

    const { id, passwordEncrypt } = req.body;

    console.log("Datos del body:", { id, passwordEncrypt });

    try {
        const user: any = await User.findOne({ where: { id: id } }) as IUserAttributes | null;
        if (!user) {
            console.log("Usuario no encontrado",id);
            return res.status(400).json({
                msg: `Ha ocurrido un problema, vuelve a intentar`
            });
        }

        // if(passwordEncrypt !== user.passwordEncrypt){
        //     return res.status(400).json({msg:"Ha ocurrido un error"});
        // }

        const passwordValid = await bcrypt.compare(passwordEncrypt, user.passwordEncrypt);
    if (!passwordValid) {
        res.status(400).json({
            msg: "Ha ocurrido un problema, vuelve a intentar"
        });
        return;
    }

        const token = jwt.sign(
            {
                id: user.id,
                role: user.tipoUsuario,
            },
            process.env['SECRET_KEY'] ?? 'pacoeltaco',
            {
                expiresIn: '1h'
            }
        );

        res.json({ token });
    }
    catch{
        console.error(error);
        res.status(500).json({msg: "Algo a ocurrido, contacte con el adminitrador"})
    }
};