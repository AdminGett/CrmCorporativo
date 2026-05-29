"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const usercomment_controller_1 = require("../controllers/usercomment.controller");
const router = (0, express_1.Router)();
router.get('/workload/:workloadId', usercomment_controller_1.getCommentsByWorkload);
router.post('/', usercomment_controller_1.createComment);
exports.default = router;
