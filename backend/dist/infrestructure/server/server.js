"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const login_routes_1 = __importDefault(require("../../interfaces/routes/login.routes"));
const register_routes_1 = __importDefault(require("../../interfaces/routes/register.routes"));
const delete_routes_1 = __importDefault(require("../../interfaces/routes/delete.routes"));
const login_1 = __importDefault(require("../models/login"));
const update_routes_1 = __importDefault(require("../../interfaces/routes/update.routes"));
dotenv_1.default.config();
class Server {
    constructor() {
        var _a;
        this.app = (0, express_1.default)();
        this.port = (_a = process.env['PORT']) !== null && _a !== void 0 ? _a : '3000';
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
        this.app.use('/api/users', delete_routes_1.default);
        this.app.use('/api/users', update_routes_1.default);
        this.app.use('/api/auth', login_routes_1.default);
        this.app.use('/api/auth', register_routes_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
    }
    async dbConnect() {
        try {
            await login_1.default.sync();
            console.log('Base de datos conectada y sincronizada');
        }
        catch (error) {
            console.error('Error al conectar la base de datos:', error);
        }
    }
}
exports.default = Server;
