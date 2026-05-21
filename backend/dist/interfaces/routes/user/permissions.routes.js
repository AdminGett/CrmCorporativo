"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const permissions_controller_1 = require("../../controllers/users/permissions.controller");
const verifyToken_1 = require("../../middlewares/verifyToken");
const router = (0, express_1.Router)();
//
router.put('/:userId', verifyToken_1.verifyToken, permissions_controller_1.updatePermissions);
router.get('/getUser/:userId', verifyToken_1.verifyToken, permissions_controller_1.getInfoUser);
router.get('/getUserById/:userId', verifyToken_1.verifyToken, permissions_controller_1.getUserByIDd);
exports.default = router;
