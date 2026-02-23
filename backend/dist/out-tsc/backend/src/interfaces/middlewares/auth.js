import jwt from "jsonwebtoken";
import dotenv from "dotenv";
dotenv.config();
export const verifyToken = (req, res, next) => {
    const authHeader = req.header("Authorization");
    if (!authHeader) {
        res.status(401).json({ message: "Ha ocurrido un errorsote" });
        return;
    }
    const token = authHeader.split(" ")[1];
    if (!token) {
        return res.status(401).json({ message: "Acceso denegado." });
    }
    try {
        const decoded = jwt.verify(token, process.env.SECRET_KEY || 'pacoeltaco');
        if (!isTokenPayload(decoded)) {
            return res.status(401).json({ message: "Acceso denegado." });
        }
        req.user = decoded;
        next();
    }
    catch (error) {
        return res.status(401).json({ message: "Ocurrio un errorson" });
    }
};
function isTokenPayload(decoded) {
    return (typeof decoded === "object" &&
        decoded !== null &&
        typeof decoded.userId === "number" &&
        typeof decoded.role === "number");
}
//# sourceMappingURL=auth.js.map