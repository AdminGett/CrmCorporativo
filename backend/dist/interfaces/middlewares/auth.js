"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.verifyToken = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    console.log("AUTH HEADER 👉", authHeader);
    if (!authHeader) {
        res.status(401).json({ message: "Ha ocurrido un errorsote" });
        return;
    }
    const token = authHeader.split(" ")[1];
    console.log("TOKEN 👉", token);
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado." });
    }
    try {
        const decoded = jsonwebtoken_1.default.verify(token, process.env.SECRET_KEY || 'pacoeltaco');
        console.log("DECODED TOKEN 👉", decoded);
        if (!isTokenPayload(decoded)) {
            return res.status(401).json({ message: "Acceso denegado." });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Ocurrio un errorson" });
    }
};
exports.verifyToken = verifyToken;
function isTokenPayload(decoded) {
    return (typeof decoded === "object" &&
        decoded !== null &&
        typeof decoded.userId === "number" &&
        typeof decoded.role === "number");
}
