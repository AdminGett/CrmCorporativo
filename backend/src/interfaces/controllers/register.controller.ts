import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../../infrestructure/models/register';
import bcrypt from 'bcryptjs';

export const registerUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

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

    // Validar campos obligatorios
    if (
        !nombre ||
        !passwordEncrypt ||
        !paterno ||
        !materno ||
        !fechaNacimiento ||
        !domicilio ||
        !nss ||
        !codigoPostal ||
        !estado ||
        !pais ||
        !fechaRegistro ||
        !tipoUsuario ||
        !activo
    ) {
        res.status(400).json({ msg: "Todos los campos son obligatorios" });
        return;
    }

    try {

        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(passwordEncrypt, 10);
        
        // Crear el usuario
        const newUser = await User.create({
            nombre: nombre,
            passwordEncrypt: hashedPassword,
            paterno: paterno,
            materno: materno,
            fechaNacimiento: fechaNacimiento,
            domicilio: domicilio,
            nss: nss,
            codigoPostal: codigoPostal,
            estado: estado,
            pais: pais,
            tipoUsuario: tipoUsuario,
            activo: 1
        });

        res.status(201).json({
            msg: `Usuario ${nombre} creado exitosamente`,
            user: {
                nombre: newUser.get('nombre'),
                paterno: newUser.get('paterno'),
                materno: newUser.get('materno'),
                fechaNacimiento: newUser.get('fechaNacimiento'),
                domicilio: newUser.get('domicilio'),
                nss: newUser.get('nss'),
                codigoPostal: newUser.get('codigoPostal'),
                estado: newUser.get('estado'),
                pais: newUser.get('pais'),
                fechaRegistro: newUser.get('fechaRegistro'),
                tipoUsuario: newUser.get('tipoUsuario')
            }
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};