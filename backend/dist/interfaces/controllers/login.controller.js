"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.loginUser = void 0;
const express_validator_1 = require("express-validator");
const login_1 = __importDefault(require("../../infrestructure/models/login"));
// import bcrypt from 'bcryptjs';  para cuadno la contrasena sea encriptada
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const console_1 = require("console");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const loginUser = async (req, res) => {
    var _a;
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ msg: "Datos inválidos", errors: errors.array() });
    }
    const { id, passwordEncrypt } = req.body;
    console.log("Datos del body:", { id, passwordEncrypt });
    try {
        const user = await login_1.default.findOne({ where: { id: id } });
        if (!user) {
            console.log("Usuario no encontrado", id);
            return res.status(400).json({
                msg: `Ha ocurrido un problema, vuelve a intentar`
            });
        }
        // if(passwordEncrypt !== user.passwordEncrypt){
        //     return res.status(400).json({msg:"Ha ocurrido un error"});
        // }
        const passwordValid = await bcryptjs_1.default.compare(passwordEncrypt, user.passwordEncrypt);
        if (!passwordValid) {
            res.status(400).json({
                msg: "Ha ocurrido un problema, vuelve a intentar"
            });
            return;
        }
        const token = jsonwebtoken_1.default.sign({
            id: user.id,
            role: user.tipoUsuario,
        }, (_a = process.env['SECRET_KEY']) !== null && _a !== void 0 ? _a : 'pacoeltaco', {
            expiresIn: '1h'
        });
        res.json({ token });
    }
    catch {
        console.error(console_1.error);
        res.status(500).json({ msg: "Algo a ocurrido, contacte con el adminitrador" });
    }
};
exports.loginUser = loginUser;
