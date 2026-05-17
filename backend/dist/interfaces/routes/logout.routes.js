"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const logout_controller_1 = require("../controllers/auth/logout.controller");
const login_routes_1 = __importDefault(require("./login.routes"));
login_routes_1.default.post('/logout', logout_controller_1.logout);
exports.default = login_routes_1.default;
