import { Request, Response } from "express";
import RefreshToken from "../../../infrestructure/models/auth/refreshToken";
import User from "../../../infrestructure/models/auth/login";

export const logout = async (req: Request, res: Response) => {
    try {
        const refreshToken = req.cookies.refreshToken;

        if (refreshToken) {
            const tokenInDb = await RefreshToken.findOne({
                where: { token: refreshToken }
            })

            if (tokenInDb) {
                await RefreshToken.update(
                    { revoked: true },
                    { where: { token: refreshToken } }
                );

                await User.update(
                    {ultimaActividad: new Date()},
                    { where: { id: tokenInDb.userId } }
                );
            }
        }


        res.clearCookie('refreshToken',
            {
                httpOnly: true,
                secure: false,
                sameSite: 'lax',
            }
        );

        return res.status(200).json({ msg: "Cierre de sesión exitoso" });
    }
    catch (error) {
        console.error('Error al cerrar sesión:', error);
        return res.status(500).json({ msg: "Error al cerrar sesión" });
    }
}