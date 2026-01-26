import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Application } from 'express';
import loginRoutesUser from '../../interfaces/routes/login.routes';
import registerRoutesUser from '../../interfaces/routes/register.routes';
import userRouter from '../../interfaces/routes/delete.routes';
import User from '../models/login';
import updateUser from '../../interfaces/routes/update.routes';

dotenv.config();

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

    private listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }

    private routes() {
        this.app.get('/api/status', (req, res) => {
            res.json({ message: 'Backend activo y respondiendo al frontend correctamente' });
        });
        this.app.use('/api/users', userRouter);
        this.app.use('/api/users', updateUser);
        this.app.use('/api/auth', loginRoutesUser);
        this.app.use('/api/auth', registerRoutesUser);
    }

    private middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }

    private async dbConnect() {
        try {
            await User.sync();
            console.log('Base de datos conectada y sincronizada');
        } catch (error) {
            console.error('Error al conectar la base de datos:', error);
        }
    }
}

export default Server;