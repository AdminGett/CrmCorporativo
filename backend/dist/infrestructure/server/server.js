"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
// Configuración
dotenv_1.default.config();
// Rutas
const user_routes_1 = __importDefault(require("../../interfaces/routes/user.routes"));
const login_routes_1 = __importDefault(require("../../interfaces/routes/auth/login.routes"));
const register_routes_1 = __importDefault(require("../../interfaces/routes/user/register.routes"));
const refreshToken_routes_1 = __importDefault(require("../../interfaces/routes/auth/refreshToken.routes"));
const delete_routes_1 = __importDefault(require("../../interfaces/routes/user/delete.routes"));
const update_routes_1 = __importDefault(require("../../interfaces/routes/user/update.routes"));
const navbar_routes_1 = __importDefault(require("../../interfaces/routes/user/navbar.routes"));
const permissions_routes_1 = __importDefault(require("../../interfaces/routes/user/permissions.routes"));
const comments_routes_1 = __importDefault(require("../../interfaces/routes/comments.routes"));
const workload_routes_1 = __importDefault(require("../../interfaces/routes/workload/workload.routes"));
const comments_routes_2 = __importDefault(require("../../interfaces/routes/workload/comments.routes"));
const commentsJess_routes_1 = __importDefault(require("../../interfaces/routes/workload/commentsJess.routes"));
const workloadJess_routes_1 = __importDefault(require("../../interfaces/routes/workload/workloadJess.routes"));
// Modelos
const login_1 = __importDefault(require("../models/auth/login"));
const comments_1 = __importDefault(require("../models/comments"));
const commentsJess_1 = __importDefault(require("../models/workload/commentsJess"));
const gestionClientes_1 = __importDefault(require("../../interfaces/routes/gestion/gestionClientes"));
// Clase principal del servidor
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
    // Inicializar servidor
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }
    // Configuración de rutas
    routes() {
        // Estado del backend
        this.app.get('/api/status', (_req, res) => {
            res.json({
                message: 'Backend activo y respondiendo correctamente'
            });
        });
        // Usuarios
        this.app.use('/api/users', user_routes_1.default);
        this.app.use('/api/users', delete_routes_1.default);
        this.app.use('/api/users', update_routes_1.default);
        this.app.use('/api/users', navbar_routes_1.default);
        // Auth
        this.app.use('/api/auth', login_routes_1.default);
        this.app.use('/api/auth', register_routes_1.default);
        this.app.use('/api/auth', refreshToken_routes_1.default);
        // Permisos
        this.app.use('/api/permissions', permissions_routes_1.default);
        // Workloads principales
        this.app.use('/api/workloads', workload_routes_1.default);
        this.app.use('/api/workloads', comments_routes_2.default);
        // Component workload
        this.app.use('/api/componentWorkload', comments_routes_1.default);
        this.app.use('/api/componentWorkload', workloadJess_routes_1.default);
        this.app.use('/api/comments', commentsJess_routes_1.default);
        this.app.use('/api/componentWorkload/comments', comments_routes_2.default);
        this.app.use('/api/gestion-clientes', gestionClientes_1.default);
    }
    // Middlewares
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
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
        }));
        this.app.use((0, cookie_parser_1.default)());
    }
    // Conexión DB
    async dbConnect() {
        try {
            await login_1.default.sync();
            await commentsJess_1.default.sync();
            await comments_1.default.sync();
            console.log('Base de datos conectada y sincronizada');
        }
        catch (error) {
            console.error('Error al conectar la base de datos:', error);
        }
    }
}
exports.default = Server;
