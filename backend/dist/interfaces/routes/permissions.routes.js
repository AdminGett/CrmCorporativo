"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permissions_controller_1 = require("../controllers/permissions.controller");
const auth_middleware_1 = require("../middlewares/auth.middleware");
const router = (0, express_1.Router)();
//
router.put('/:userId', auth_middleware_1.verifyToken, permissions_controller_1.updatePermissions);
router.get('/getUser/:userId', auth_middleware_1.verifyToken, permissions_controller_1.getInfoUser);
router.get('/getUserById/:userId', auth_middleware_1.verifyToken, permissions_controller_1.getUserByIDd);
exports.default = router;
