import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
// Rutas
import loginRoutesUser from '../../interfaces/routes/login.routes';
import registerRoutesUser from '../../interfaces/routes/register.routes';
import usersRouter from '../../interfaces/routes/users.routes';
import updateUser from '../../interfaces/routes/update.routes';
import nameRouter from '../../interfaces/routes/navbar.routes';
import permissionsRouter from '../../interfaces/routes/permissions.routes';
import workloadRouter from '../../interfaces/routes/workload.routes';
import workloadLogsRouter from '../../interfaces/routes/workloadLog.routes';
import dashboardRouter from '../../interfaces/routes/dashboard.routes';
import commentRouter from '../../interfaces/routes/comment.routes';
// Modelos 
import User from '../models/login';
import Workload from '../../infrestructure/models/workloads';
import WorkloadLog from '../../infrestructure/models/workload_logs';
import Comment from '../../infrestructure/models/comments';
dotenv.config();
class Server {
    constructor() {
        this.app = express();
        this.port = process.env['PORT'] ?? '3000';
        this.middlewares();
        this.routes();
        this.dbConnect();
        this.listen();
    }
    listen() {
        this.app.listen(this.port, () => {
            console.log(`✅ Servidor corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        // Ruta de estado
        this.app.get('/api/status', (req, res) => {
            res.json({
                ok: true,
                message: 'Backend activo y respondiendo correctamente',
                timestamp: new Date().toISOString()
            });
        });
        // Rutas
        +this.app.use('/api/users', updateUser);
        this.app.use('/api/users', nameRouter);
        this.app.use('/api/auth', loginRoutesUser);
        this.app.use('/api/auth', registerRoutesUser);
        this.app.use('/api/permissions', permissionsRouter);
        this.app.use('/api/workloads', workloadRouter);
        this.app.use('/api/users', usersRouter);
        this.app.use('/api/workload-logs', workloadLogsRouter);
        this.app.use('/api/dashboard', dashboardRouter);
        this.app.use('/api/comments', commentRouter);
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
        this.app.use((req, res, next) => {
            console.log(`${req.method} ${req.url}`);
            next();
        });
    }
    async dbConnect() {
        try {
            await User.sync({ alter: true });
            await Workload.sync({ alter: true });
            await WorkloadLog.sync({ alter: true });
            await Comment.sync({ alter: true });
            console.log(' Base de datos conectada y todos los modeloss');
        }
        catch (error) {
            console.error('Error al conectar la base de datos:', error);
        }
    }
}
export default Server;
//# sourceMappingURL=server.js.map