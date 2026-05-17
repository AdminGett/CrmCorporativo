import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import RefreshToken from '../../../infrestructure/models/auth/refreshToken';
import jwt from 'jsonwebtoken';

// Controlador para manejar la generación de un nuevo token de acceso utilizando un token de actualización válido, 
// permitiendo a los usuarios mantener su sesión activa sin necesidad de volver a iniciar sesión
export const refreshTokenFunction = async (req: Request, res: Response) => {
    // Se validan los datos de entrada utilizando express-validator, 
    // y si hay errores, se devuelve un error 400 con los detalles de los errores encontrados
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "Datos inválidos", errors: errors.array() });
    }

    try {
        const refreshToken = req.cookies.refreshToken;
    // Si no se proporciona un token de actualización en las cookies, 
    // se devuelve un error 401 indicando que no se ha proporcionado un token de actualización
    if (!refreshToken) {
        return res.status(401).json({ msg: "Error de sistema" });
    }

    const decoded = jwt.verify(
        refreshToken, 
        process.env.REFRESH_TOKEN_SECRET!
    );

    const tokenInDb = await RefreshToken.findOne({ 
        where: { 
            token: refreshToken,
            revoked: false,
        } 
    });
    // Si el token de actualización no se encuentra en la base de datos, 
    // se devuelve un error 403 indicando que el token de actualización no es válido
    if (!tokenInDb) {
        return res.status(403).json({ msg: "Token de actualización no válido" });
    }

    const accessToken = jwt.sign(
        {
            userId: (decoded as any).userId,
            role: (decoded as any).role,
        },
        process.env.ACCESS_TOKEN_SECRET!,
        { expiresIn: '1h' }
    );

    res.json({ accessToken });
}
    catch (error) {
        console.error('Error al refrescar token:', error);
        res.status(500).json({ msg: "Error al refrescar token" });
    }
}