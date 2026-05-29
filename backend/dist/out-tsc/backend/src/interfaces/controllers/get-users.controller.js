import User from '../../infrestructure/models/register';
export const getAllUsers = async (req, res) => {
    try {
        const users = await User.findAll({
            attributes: ['userId', 'nombre', 'paterno', 'materno', 'tipoUsuario', 'activo', 'fechaRegistro'],
            order: [['fechaRegistro', 'DESC']]
        });
        const roleMap = {
            1: 'USER',
            2: 'ADMIN',
            3: 'MEDICO'
        };
        const mappedUsers = users.map(user => {
            const plainUser = user.toJSON();
            plainUser.tipoUsuario = roleMap[plainUser.tipoUsuario] || `TIPO_${plainUser.tipoUsuario}`;
            return plainUser;
        });
        res.status(200).json(mappedUsers);
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al obtener usuarios',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
export const updateUserStatus = async (req, res) => {
    const { id } = req.params;
    const { activo } = req.body;
    try {
        const user = await User.findByPk(id);
        if (!user) {
            res.status(404).json({ msg: 'Usuario no encontrado' });
            return;
        }
        await user.update({ activo });
        res.status(200).json({ msg: 'Estado actualizado correctamente' });
    }
    catch (error) {
        res.status(500).json({
            msg: 'Error al actualizar usuario',
            error: error instanceof Error ? error.message : 'Error desconocido'
        });
    }
};
//# sourceMappingURL=get-users.controller.js.map