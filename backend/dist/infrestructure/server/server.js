"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
// Rutas
const login_routes_1 = __importDefault(require("../../interfaces/routes/login.routes"));
const register_routes_1 = __importDefault(require("../../interfaces/routes/register.routes"));
const users_routes_1 = __importDefault(require("../../interfaces/routes/users.routes"));
const update_routes_1 = __importDefault(require("../../interfaces/routes/update.routes"));
const navbar_routes_1 = __importDefault(require("../../interfaces/routes/navbar.routes"));
const permissions_routes_1 = __importDefault(require("../../interfaces/routes/permissions.routes"));
const workloads_routes_1 = __importDefault(require("../../interfaces/routes/workloads.routes"));
const workloadLog_routes_1 = __importDefault(require("../../interfaces/routes/workloadLog.routes"));
const dashboard_routes_1 = __importDefault(require("../../interfaces/routes/dashboard.routes"));
const comment_routes_1 = __importDefault(require("../../interfaces/routes/comment.routes"));
// Modelos 
const login_1 = __importDefault(require("../models/login"));
const workloads_1 = __importDefault(require("../../infrestructure/models/workloads"));
const workload_logs_1 = __importDefault(require("../../infrestructure/models/workload_logs"));
const comments_1 = __importDefault(require("../../infrestructure/models/comments"));
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
        +this.app.use('/api/users', update_routes_1.default);
        this.app.use('/api/users', navbar_routes_1.default);
        this.app.use('/api/auth', login_routes_1.default);
        this.app.use('/api/auth', register_routes_1.default);
        this.app.use('/api/permissions', permissions_routes_1.default);
        this.app.use('/api/workloads', workloads_routes_1.default);
        this.app.use('/api/users', users_routes_1.default);
        this.app.use('/api/workload-logs', workloadLog_routes_1.default);
        this.app.use('/api/dashboard', dashboard_routes_1.default);
        this.app.use('/api/comments', comment_routes_1.default);
    }
    middlewares() {
        this.app.use(express_1.default.json());
        this.app.use((0, cors_1.default)());
        this.app.use((req, res, next) => {
            console.log(`${req.method} ${req.url}`);
            next();
        });
    }
    async dbConnect() {
        try {
            await login_1.default.sync({ alter: true });
            await workloads_1.default.sync({ alter: true });
            await workload_logs_1.default.sync({ alter: true });
            await comments_1.default.sync({ alter: true });
            console.log(' Base de datos conectada y todos los modeloss');
        }
        catch (error) {
            console.error('Error al conectar la base de datos:', error);
        }
    }
}
exports.default = Server;
