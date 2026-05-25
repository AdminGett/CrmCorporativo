"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCreateComment = void 0;
const validateCreateComment = (req, res, next) => {
    const { userComment, taskComment, commentText } = req.body;
    if (!userComment ||
        !taskComment ||
        !commentText) {
        res.status(400).json({
            message: 'Faltan campos obligatorios'
        });
        return;
    }
    next();
};
exports.validateCreateComment = validateCreateComment;
