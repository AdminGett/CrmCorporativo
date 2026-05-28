"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const cookie_parser_1 = __importDefault(require("cookie-parser"));
dotenv_1.default.config();
const login_routes_1 = __importDefault(require("../../interfaces/routes/auth/login.routes"));
const register_routes_1 = __importDefault(require("../../interfaces/routes/user/register.routes"));
const delete_routes_1 = __importDefault(require("../../interfaces/routes/user/delete.routes"));
const login_1 = __importDefault(require("../models/auth/login"));
const update_routes_1 = __importDefault(require("../../interfaces/routes/user/update.routes"));
const navbar_routes_1 = __importDefault(require("../../interfaces/routes/user/navbar.routes"));
const permissions_routes_1 = __importDefault(require("../../interfaces/routes/user/permissions.routes"));
const logout_routes_1 = __importDefault(require("../../interfaces/routes/auth/logout.routes"));
const refreshToken_routes_1 = __importDefault(require("../../interfaces/routes/auth/refreshToken.routes"));
const workload_routes_1 = __importDefault(require("../../interfaces/routes/workload/workload.routes"));
const comments_routes_1 = __importDefault(require("../../interfaces/routes/workload/comments.routes"));
const commentsJess_routes_1 = __importDefault(require("../../interfaces/routes/workload/commentsJess.routes"));
const workloadJess_routes_1 = __importDefault(require("../../interfaces/routes/workload/workloadJess.routes"));
// Clase principal del servidor que configura y levanta la aplicación Express
class Server {
    // En el constructor se inicializa la aplicación, se configuran los middlewares, las rutas, la conexión a la base de datos y se inicia el servidor
    constructor() {
        var _a;
        this.app = (0, express_1.default)();
        this.port = (_a = process.env['PORT']) !== null && _a !== void 0 ? _a : '3000';
        this.middlewares();
        this.routes();
        this.dbConnect();
        this.listen();
    }
    // Método para iniciar el servidor y escuchar en el puerto configurado
    listen() {
        this.app.listen(this.port, () => {
            console.log(`Aplicación corriendo en el puerto ${this.port}`);
        });
    }
    // Método para configurar las rutas de la aplicación, incluyendo rutas de autenticación, gestión de usuarios y permisos
    routes() {
        // Se configuran las rutas para la gestión de usuarios, autenticación y permisos,
        // así como las rutas para la gestión de cargas de trabajo y comentarios, asegurando que 
        // cada conjunto de funcionalidades esté organizado en su propia ruta base para una mejor estructura y mantenimiento del código
        this.app.use('/api/users', delete_routes_1.default);
        this.app.use('/api/users', update_routes_1.default);
        this.app.use('/api/users', navbar_routes_1.default);
        // Rutas de autenticación para login, registro, logout y refresh token
        this.app.use('/api/auth', login_routes_1.default);
        this.app.use('/api/auth', register_routes_1.default);
        this.app.use('/api/auth', logout_routes_1.default);
        this.app.use('/api/auth', refreshToken_routes_1.default);
        // Rutas para la gestión de permisos de usuario
        this.app.use('/api/permissions', permissions_routes_1.default);
        // Rutas para la gestión de cargas de trabajo y comentarios relacionados, permitiendo una organización clara de las funcionalidades 
        // relacionadas con las tareas y sus comentarios dentro del sistema
        this.app.use('/api/workloads', workload_routes_1.default);
        this.app.use('/api/workloads', comments_routes_1.default);
        this.app.use('/api/componentWorkload', workloadJess_routes_1.default);
        this.app.use('/api/comments', commentsJess_routes_1.default);
        this.app.use('/api/componentWorkload/comments', comments_routes_1.default);
    }
    // Método para configurar los middlewares de la aplicación, incluyendo el middleware para parsear JSON y habilitar CORS
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)({
            origin: 'http://localhost:4200',
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
            allowedHeaders: ['Content-Type', 'Authorization']
        }));
        this.app.use((0, cookie_parser_1.default)());
    }
    // Método para conectar a la base de datos y sincronizar los modelos definidos, asegurando que la estructura de la base de datos esté actualizada
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
