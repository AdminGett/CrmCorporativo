import { Sequelize } from 'sequelize';
// Cargamos las variables de entorno desde el archivo .env
const sequelize = new Sequelize(process.env['DB_NAME'] ?? 'SisCrm', process.env['DB_USER'] ?? 'robin', process.env['DB_PASSWORD'] ?? 'jesuisdami@n', {
    host: process.env['DB_HOST'] ?? '74.208.68.144',
    dialect: 'mysql',
    logging: false,
});
export default sequelize;
//# sourceMappingURL=connection.js.map