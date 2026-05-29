"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.logout = void 0;
const refreshToken_1 = __importDefault(require("../../../infrestructure/models/auth/refreshToken"));
const login_1 = __importDefault(require("../../../infrestructure/models/auth/login"));
const logout = async (req, res) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (refreshToken) {
            const tokenInDb = await refreshToken_1.default.findOne({
                where: { token: refreshToken }
            });
            if (tokenInDb) {
                await refreshToken_1.default.update({ revoked: true }, { where: { token: refreshToken } });
                await login_1.default.update({ ultimaActividad: new Date() }, { where: { id: tokenInDb.userId } });
            }
        }
        res.clearCookie('refreshToken', {
            httpOnly: true,
            secure: false,
            sameSite: 'lax',
        });
        return res.status(200).json({ msg: "Cierre de sesión exitoso" });
    }
    catch (error) {
        console.error('Error al cerrar sesión:', error);
        return res.status(500).json({ msg: "Error al cerrar sesión" });
    }
};
exports.logout = logout;
