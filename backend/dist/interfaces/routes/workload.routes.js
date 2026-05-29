"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
<<<<<<< HEAD
const componentWorkload_controller_1 = require("../controllers/componentWorkload.controller");
const router = (0, express_1.Router)();
router.get('/user/:userId', componentWorkload_controller_1.getWorkloadByUser);
router.get('/filter', componentWorkload_controller_1.filterWorkloadTasks);
router.post('/', componentWorkload_controller_1.createWorkloadTask);
=======
const workLoad_controller_1 = require("../controllers/workload/workLoad.controller");
const router = (0, express_1.Router)();
router.post('/newTask', workLoad_controller_1.newTask);
router.put('/updateTask/:id', workLoad_controller_1.updateTask);
router.delete('/deleteTask/:id', workLoad_controller_1.deleteTask);
router.put('/changeStatus/:id', workLoad_controller_1.changeState);
router.put('/changePriority/:id', workLoad_controller_1.changePriority);
>>>>>>> origin/Student
exports.default = router;
