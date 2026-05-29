"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteUser = exports.toggleUserStatus = exports.updateUser = exports.createUser = exports.getUserById = exports.getAllUsers = void 0;
const sequelize_1 = require("sequelize");
const bcrypt_1 = __importDefault(require("bcrypt"));
const users_1 = __importDefault(require("../../infrestructure/models/users"));
const workloads_1 = __importDefault(require("../../infrestructure/models/workloads"));
// Obtener todos los usuarios (con filtros)
const getAllUsers = async (req, res) => {
    try {
        const { role, status, search } = req.query;
        const whereClause = {};
        if (role)
            whereClause.role = role;
        if (status === 'active')
            whereClause.is_active = true;
        if (status === 'inactive')
            whereClause.is_active = false;
        if (search) {
            whereClause[sequelize_1.Op.or] = [
                { name: { [sequelize_1.Op.iLike]: `%${search}%` } },
                { email: { [sequelize_1.Op.iLike]: `%${search}%` } }
            ];
        }
        const users = await users_1.default.findAll({
            where: whereClause,
            attributes: { exclude: ['password'] },
            order: [['created_at', 'DESC']]
        });
        res.status(200).json({
            ok: true,
            data: users,
            total: users.length
        });
    }
    catch (error) {
        console.error('Error al obtener usuarios:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
exports.getAllUsers = getAllUsers;
// Obtener usuario por ID
const getUserById = async (req, res) => {
    try {
        const { id } = req.params;
        const user = await users_1.default.findByPk(id, {
            attributes: { exclude: ['password'] },
            include: [{
                    model: workloads_1.default,
                    as: 'assigned_tasks',
                    attributes: ['id', 'title', 'status', 'priority', 'due_date']
                }]
        });
        if (!user) {
            res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
            return;
        }
        res.status(200).json({ ok: true, data: user });
    }
    catch (error) {
        console.error('Error al obtener usuario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
exports.getUserById = getUserById;
// Crear usuario (solo admin)
const createUser = async (req, res) => {
    const { name, email, password, role, is_active } = req.body;
    if (!name || !email || !password) {
        res.status(400).json({ ok: false, msg: 'Nombre, email y contraseña son obligatorios' });
        return;
    }
    try {
        // Verificar si el email ya existe
        const existingUser = await users_1.default.findOne({ where: { email } });
        if (existingUser) {
            res.status(400).json({ ok: false, msg: 'El email ya está registrado' });
            return;
        }
        const hashedPassword = await bcrypt_1.default.hash(password, 10);
        const newUser = await users_1.default.create({
            name,
            email,
            password: hashedPassword,
            role: role || 'USER',
            is_active: is_active !== undefined ? is_active : true
        });
        const userResponse = newUser.toJSON();
        delete userResponse.password;
        res.status(201).json({
            ok: true,
            msg: 'Usuario creado exitosamente',
            data: userResponse
        });
    }
    catch (error) {
        console.error('Error al crear usuario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
exports.createUser = createUser;
// Actualizar usuario
const updateUser = async (req, res) => {
    const { id } = req.params;
    const { name, email, role, is_active } = req.body;
    try {
        const user = await users_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
            return;
        }
        // Si se actualiza el email, verificar que no exista otro usuario con ese email
        if (email && email !== user.email) {
            const existingUser = await users_1.default.findOne({ where: { email } });
            if (existingUser) {
                res.status(400).json({ ok: false, msg: 'El email ya está en uso' });
                return;
            }
        }
        await user.update({
            name: name || user.name,
            email: email || user.email,
            role: role || user.role,
            is_active: is_active !== undefined ? is_active : user.is_active,
            updated_at: new Date()
        });
        const userResponse = user.toJSON();
        delete userResponse.password;
        res.status(200).json({
            ok: true,
            msg: 'Usuario actualizado exitosamente',
            data: userResponse
        });
    }
    catch (error) {
        console.error('Error al actualizar usuario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
exports.updateUser = updateUser;
// Cambiar estado del usuario (activar/desactivar)
const toggleUserStatus = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await users_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
            return;
        }
        const newStatus = !user.is_active;
        await user.update({ is_active: newStatus, updated_at: new Date() });
        res.status(200).json({
            ok: true,
            msg: `Usuario ${newStatus ? 'activado' : 'desactivado'} exitosamente`,
            data: { id: user.id, is_active: newStatus }
        });
    }
    catch (error) {
        console.error('Error al cambiar estado del usuario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
exports.toggleUserStatus = toggleUserStatus;
// Eliminar usuario (soft delete - opcional)
const deleteUser = async (req, res) => {
    const { id } = req.params;
    try {
        const user = await users_1.default.findByPk(id);
        if (!user) {
            res.status(404).json({ ok: false, msg: 'Usuario no encontrado' });
            return;
        }
        // Opcional: verificar que no tenga tareas asignadas
        const assignedTasks = await workloads_1.default.count({ where: { assigned_to: id } });
        if (assignedTasks > 0) {
            res.status(400).json({
                ok: false,
                msg: `No se puede eliminar el usuario porque tiene ${assignedTasks} tareas asignadas`
            });
            return;
        }
        await user.destroy();
        res.status(200).json({ ok: true, msg: 'Usuario eliminado exitosamente' });
    }
    catch (error) {
        console.error('Error al eliminar usuario:', error);
        res.status(500).json({ ok: false, msg: 'Error interno del servidor' });
    }
};
exports.deleteUser = deleteUser;
