import { validationResult } from 'express-validator';
import User from '../../infrestructure/models/login';
// import bcrypt from 'bcryptjs';  para cuadno lacontrasen sea encriptada
import * as jwt from 'jsonwebtoken';
import { error } from 'console';
export const loginUser = async (req, res) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ msg: "Datos inválidos", errors: errors.array() });
        return;
    }
    const { id, contrasena } = req.body;
    const user = await User.findOne({ where: { id: id } });
    try {
        if (!user) {
            res.status(400).json({
                msg: `Ha ocurrido un problema, vuelve a intentar`
            });
            return;
        }
        if (contrasena !== user.contrasena) {
            res.status(400).json({ msg: "Ha ocurrido un error" });
        }
        const token = jwt.sign({
            id: user.id,
            role: user.tipoUsuario,
            username: user.nombreUsuario,
            email: user.correo
        }, process.env['SECRET_KEY'] ?? 'pacoeltaco', {
            expiresIn: '1h'
        });
        res.json({ token });
    }
    catch {
        console.error(error);
        res.status(500).json({ msg: "Algo a ocurrido, contacte con el adminitrador" });
    }
};
//# sourceMappingURL=login.controller.js.map