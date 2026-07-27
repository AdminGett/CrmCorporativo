"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const componentWorkload_controller_1 = require("../controllers/componentWorkload.controller");
const router = (0, express_1.Router)();
router.get('/user/:userId', componentWorkload_controller_1.getWorkloadByUser);
router.get('/filter', componentWorkload_controller_1.filterWorkloadTasks);
router.post('/', componentWorkload_controller_1.createWorkloadTask);
exports.default = router;
