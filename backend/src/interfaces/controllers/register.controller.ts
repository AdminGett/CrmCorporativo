import { Request, Response } from 'express';
import { validationResult } from 'express-validator';
import User from '../../infrestructure/models/register';
import bcrypt from 'bcryptjs';

// Controlador para manejar el proceso de registro de un nuevo usuario, validando los datos de entrada, hasheando la contraseña y creando un nuevo registro en la base de datos
export const registerUser = async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).json({ errors: errors.array() });
        return;
    }

    // Se extraen los campos necesarios del cuerpo de la solicitud, que son requeridos para el proceso de registro de un nuevo usuario
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

    // Validar campos obligatorios - activo ya tiene defaultValue: 1 en el modelo
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
        !tipoUsuario
    ) {
        res.status(400).json({ msg: "Todos los campos son obligatorios" });
        return;
    }

    try {
        // Hashear la contraseña
        const hashedPassword = await bcrypt.hash(passwordEncrypt, 10);
        
        // Crear el usuario - activo usará el defaultValue: 1 del modelo si no se proporciona
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
            activo: activo !== undefined ? activo : 1 // Usar el valor enviado o default 1
        });

        res.status(201).json({
            msg: `Usuario ${nombre} creado exitosamente`,
        });
    } catch (error) {
        console.error('Error al registrar usuario:', error);
        res.status(500).json({
            msg: 'Error interno del servidor',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};