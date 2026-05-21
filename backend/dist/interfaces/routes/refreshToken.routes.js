"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const refreshToken_controller_1 = require("../controllers/auth/refreshToken.controller");
const router = (0, express_1.Router)();
router.post('/refresh', refreshToken_controller_1.refreshTokenFunction);
exports.default = router;
