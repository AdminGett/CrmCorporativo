"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const workLoad_controller_1 = require("../controllers/workLoad.controller");
const router = (0, express_1.Router)();
router.post('/newTask', workLoad_controller_1.newTask);
exports.default = router;
