import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import cookieParser from 'cookie-parser';

// Configuración
dotenv.config();

// Rutas
import userRoutes from '../../interfaces/routes/user.routes';

import loginRoutesUser from '../../interfaces/routes/auth/login.routes';
import registerRoutesUser from '../../interfaces/routes/user/register.routes';
import RefreshToken from '../../interfaces/routes/auth/refreshToken.routes';

import userRouter from '../../interfaces/routes/user/delete.routes';
import updateUser from '../../interfaces/routes/user/update.routes';
import nameRouter from '../../interfaces/routes/user/navbar.routes';
import permissionsRouter from '../../interfaces/routes/user/permissions.routes';

import componentWorkloadRouter from '../../interfaces/routes/comments.routes';

import workloadRouter from '../../interfaces/routes/workload/workload.routes';
import commentsRouter from '../../interfaces/routes/workload/comments.routes';

import commentsRouterJess from '../../interfaces/routes/workload/commentsJess.routes';
import workloadRouterJess from '../../interfaces/routes/workload/workloadJess.routes';

// Modelos
import User from '../models/auth/login';
import workloadComments from '../models/comments';
import componentWorkload from '../models/workload/commentsJess';

import gestionClientesRouter from '../../interfaces/routes/gestion/gestionClientes';

// Clase principal del servidor
class Server {

    private readonly app: Application;
    private readonly port: string;

    
    constructor() {

        this.app = express();

        this.port = process.env['PORT'] ?? '3000';

        this.middlewares();

        this.routes();

        this.dbConnect();

        this.listen();
    }

    // Inicializar servidor
    private listen(): void {

        this.app.listen(this.port, () => {

            console.log(
                `Aplicación corriendo en el puerto ${this.port}`
            );

        });
    }

    // Configuración de rutas
    private routes(): void {

        // Estado del backend
        this.app.get('/api/status', (_req, res) => {

            res.json({
                message:
                    'Backend activo y respondiendo correctamente'
            });

        });

        // Usuarios
        this.app.use('/api/users', userRoutes);

        this.app.use('/api/users', userRouter);

        this.app.use('/api/users', updateUser);

        this.app.use('/api/users', nameRouter);

        // Auth
        this.app.use('/api/auth', loginRoutesUser);

        this.app.use('/api/auth', registerRoutesUser);

        this.app.use('/api/auth', RefreshToken);

        // Permisos
        this.app.use(
            '/api/permissions',
            permissionsRouter
        );

        // Workloads principales
        this.app.use(
            '/api/workloads',
            workloadRouter
        );

        this.app.use(
            '/api/workloads',
            commentsRouter
        );

        // Component workload
        this.app.use(
            '/api/componentWorkload',
            componentWorkloadRouter
        );

        this.app.use(
            '/api/componentWorkload',
            workloadRouterJess
        );

        this.app.use(
            '/api/comments',
            commentsRouterJess
        );

        this.app.use(
            '/api/componentWorkload/comments',
            commentsRouter
        );
        this.app.use(
            '/api/gestion-clientes',
            gestionClientesRouter
        );
    }

    // Middlewares
    private middlewares(): void {

        this.app.use(express.json());

        this.app.use(
            cors({
                origin: 'http://localhost:4200',
                credentials: true,
                methods: [
                    'GET',
                    'POST',
                    'PUT',
                    'DELETE',
                    'OPTIONS'
                ],
                allowedHeaders: [
                    'Content-Type',
                    'Authorization'
                ]
            })
        );

        this.app.use(cookieParser());
    }

    // Conexión DB
    private async dbConnect(): Promise<void> {

        try {

            await User.sync();

            await componentWorkload.sync();

            await workloadComments.sync();

            console.log(
                'Base de datos conectada y sincronizada'
            );

        } catch (error) {

            console.error(
                'Error al conectar la base de datos:',
                error
            );
        }
    }
}

export default Server;