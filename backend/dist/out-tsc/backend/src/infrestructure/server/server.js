import * as express from 'express';
import * as cors from 'cors';
import * as dotenv from 'dotenv';
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
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }
    routes() {
        this.app.get('/api/status', (req, res) => {
            res.json({ message: 'Backend activo y respondiendo al frontend correctamente' });
        });
    }
    middlewares() {
        this.app.use(express.json());
        this.app.use(cors());
    }
    async dbConnect() {
        try {
            // await User.sync();
            console.log('Base de datos conectada y sincronizada');
        }
        catch (error) {
            console.error('Error al conectar la base de datos:', error);
        }
    }
}
export default Server;
//# sourceMappingURL=server.js.map