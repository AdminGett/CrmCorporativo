"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const get_users_controller_1 = require("../controllers/get-users.controller");
const router = (0, express_1.Router)();
router.get('/', get_users_controller_1.getAllUsers);
router.put('/:id', get_users_controller_1.updateUserStatus);
exports.default = router;
