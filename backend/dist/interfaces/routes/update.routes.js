"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const update_controller_1 = require("../controllers/update.controller");
const adminAuth_1 = require("../middlewares/adminAuth");
const router = (0, express_1.Router)();
router.put('/update/:userId', adminAuth_1.verifyAdmin, update_controller_1.updateUser);
router.get('/update/getUser/:userId', adminAuth_1.verifyAdmin, update_controller_1.getInfoUser);
exports.default = router;
