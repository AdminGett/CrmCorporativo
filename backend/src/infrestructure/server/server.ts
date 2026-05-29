import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
<<<<<<< HEAD
import loginRoutesUser from '../../interfaces/routes/login.routes';
import User from '../models/login';
import permissionsRouter from '../../interfaces/routes/permissions.routes'
import userRoutes from '../../interfaces/routes/user.routes';
import componentWorkloadRouter from '../../interfaces/routes/comments.routes';
import workloadComments from '../models/comments';
import componentWorkload from '../models/workload';
=======
import cookieParser from 'cookie-parser';
>>>>>>> origin/Student

dotenv.config();
import { Application } from 'express';

import loginRoutesUser from '../../interfaces/routes/auth/login.routes';
import registerRoutesUser from '../../interfaces/routes/user/register.routes';

import userRouter from '../../interfaces/routes/user/delete.routes';
import User from '../models/auth/login';
import updateUser from '../../interfaces/routes/user/update.routes';
import nameRouter from '../../interfaces/routes/user/navbar.routes'
import permissionsRouter from '../../interfaces/routes/user/permissions.routes'


import logoutRouter from '../../interfaces/routes/auth/logout.routes';
import RefreshToken from '../../interfaces/routes/auth/refreshToken.routes';

import workloadRouter from '../../interfaces/routes/workload/workload.routes';
import commentsRouter from '../../interfaces/routes/workload/comments.routes';
import commentsRouterJess from '../../interfaces/routes/workload/commentsJess.routes'
import workloadRouterJess from '../../interfaces/routes/workload/workloadJess.routes'

// Clase principal del servidor que configura y levanta la aplicación Express
class Server {
    private readonly app: Application;
    private readonly port: string;

    // En el constructor se inicializa la aplicación, se configuran los middlewares, las rutas, la conexión a la base de datos y se inicia el servidor
    constructor() {
        this.app = express();
        this.port = process.env['PORT'] ?? '3000';

        this.middlewares();
        this.routes();
        this.dbConnect();
        this.listen();
    }

    // Método para iniciar el servidor y escuchar en el puerto configurado
    private listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }

    // Método para configurar las rutas de la aplicación, incluyendo rutas de autenticación, gestión de usuarios y permisos
    private routes() {
<<<<<<< HEAD
        this.app.get('/api/status', (req, res) => {
            res.json({ message: 'Backend activo y respondiendo al frontend correctamente' });
        });
        // Prefijos limpios y únicos por entidad
        this.app.use('/api/users', userRoutes);          // Todo lo relacionado con usuarios (Crear, Editar, Listar, Eliminar)
        this.app.use('/api/auth', loginRoutesUser);       // Todo lo relacionado con Auth (Login y Registro)
        this.app.use('/api/permissions', permissionsRouter);
        this.app.use('/api/componentWorkload', componentWorkloadRouter);


=======
        // Se configuran las rutas para la gestión de usuarios, autenticación y permisos,
        // así como las rutas para la gestión de cargas de trabajo y comentarios, asegurando que 
        // cada conjunto de funcionalidades esté organizado en su propia ruta base para una mejor estructura y mantenimiento del código
        this.app.use('/api/users', userRouter);
        this.app.use('/api/users', updateUser);
        this.app.use('/api/users', nameRouter);

        // Rutas de autenticación para login, registro, logout y refresh token
        this.app.use('/api/auth', loginRoutesUser);
        this.app.use('/api/auth', registerRoutesUser);
        this.app.use('/api/auth', logoutRouter);
        this.app.use('/api/auth', RefreshToken);

        // Rutas para la gestión de permisos de usuario
        this.app.use('/api/permissions', permissionsRouter);

        // Rutas para la gestión de cargas de trabajo y comentarios relacionados, permitiendo una organización clara de las funcionalidades 
        // relacionadas con las tareas y sus comentarios dentro del sistema
        this.app.use('/api/workloads', workloadRouter);
        this.app.use('/api/workloads', commentsRouter);

        this.app.use('/api/componentWorkload', workloadRouterJess);
        this.app.use('/api/comments', commentsRouterJess);
        this.app.use( '/api/componentWorkload/comments', commentsRouter);
>>>>>>> origin/Student
    }

    // Método para configurar los middlewares de la aplicación, incluyendo el middleware para parsear JSON y habilitar CORS
    private middlewares() {
        this.app.use(express.json());
        this.app.use(cors({
            origin: 'http://localhost:4200', // Tu puerto de Angular
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        this.app.use(cookieParser());
    }

    // Método para conectar a la base de datos y sincronizar los modelos definidos, asegurando que la estructura de la base de datos esté actualizada
    private async dbConnect() {
        try {
            await User.sync();
            await componentWorkload.sync();
            await workloadComments.sync();
            console.log('Base de datos conectada y sincronizada');
        } catch (error) {
            console.error('Error al conectar la base de datos:', error);
        }
    }
}

export default Server;