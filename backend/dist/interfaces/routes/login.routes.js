"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const login_controller_1 = require("../controllers/login.controller");
//import { validateLogin, validateUserInput } from '../middlewares/validateUser';
const router = (0, express_1.Router)();
//router.post('/login', validateLogin, loginUser);
router.post('/login', login_controller_1.loginUser);
exports.default = router;
