import User from "../../infrestructure/models/register";
export const getUserName = async (req, res) => {
    const { userId } = req.params;
    try {
        const user = await User.findOne({ where: { userId }, attributes: ['nombre', 'tipoUsuario'] });
        if (!user) {
            return res.status(404).json({ message: 'Usurio no encontrado' });
        }
        res.json(user);
        return;
    }
    catch (error) {
        console.error('Error al obtener el nombre:', error);
        res.status(500).json({ message: 'Error al obtener usuarios' });
        return;
    }
};
//# sourceMappingURL=navbar.controller.js.map