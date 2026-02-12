"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const navbar_controller_1 = require("../controllers/navbar.controller");
const auth_1 = require("../middlewares/auth");
const router = (0, express_1.Router)();
router.get('/:userId', auth_1.verifyToken, navbar_controller_1.getUserName);
exports.default = router;
