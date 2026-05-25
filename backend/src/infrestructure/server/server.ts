import express, { Application } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import loginRoutesUser from '../../interfaces/routes/login.routes';
import User from '../models/login';
import permissionsRouter from '../../interfaces/routes/permissions.routes'
import userRoutes from '../../interfaces/routes/user.routes';
import componentWorkloadRouter from '../../interfaces/routes/comments.routes';
import workloadComments from '../models/comments';
import componentWorkload from '../models/workload';

dotenv.config();

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
        this.app.get('/api/status', (req, res) => {
            res.json({ message: 'Backend activo y respondiendo al frontend correctamente' });
        });
        // Prefijos limpios y únicos por entidad
        this.app.use('/api/users', userRoutes);          // Todo lo relacionado con usuarios (Crear, Editar, Listar, Eliminar)
        this.app.use('/api/auth', loginRoutesUser);       // Todo lo relacionado con Auth (Login y Registro)
        this.app.use('/api/permissions', permissionsRouter);
        this.app.use('/api/componentWorkload', componentWorkloadRouter);


    }

    // Método para configurar los middlewares de la aplicación, incluyendo el middleware para parsear JSON y habilitar CORS
    private middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
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