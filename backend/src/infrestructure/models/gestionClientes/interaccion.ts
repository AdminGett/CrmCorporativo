import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../../config/connection';
import cliente from './iCliente';  

export interface interaccion {
    interaccionId: number;
    clienteId: number;
    tipoInteraccion: 'Llamada' | 'Reunión' | 'Nota' | 'Correo';
    descripcion: string;
    fechaInteraccion?: Date;
}

export type interaccionCreationAttributes =
    Optional<interaccion, 'interaccionId' | 'fechaInteraccion'>;

export class interaccionInstance
    extends Model<interaccion, interaccionCreationAttributes>
    implements interaccion {

    public interaccionId!: number;
    public clienteId!: number;
    public tipoInteraccion!: 'Llamada' | 'Reunión' | 'Nota' | 'Correo';
    public descripcion!: string;
    public fechaInteraccion!: Date;
}

const interaccion = sequelize.define<interaccionInstance>('interaccion', {
    interaccionId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'interaccionId'
    },
    clienteId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        field: 'clienteId',
        references: {
            model: 'clientes',
            key: 'clienteId'
        }
    },
    tipoInteraccion: {
        type: DataTypes.ENUM('Llamada', 'Reunión', 'Nota', 'Correo'),
        allowNull: false,
        defaultValue: 'Nota',
        field: 'tipoInteraccion'
    },
    descripcion: {
        type: DataTypes.TEXT,
        allowNull: false
    },
    fechaInteraccion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'fechaInteraccion'
    }
}, {
    tableName: 'interacciones',
    timestamps: false
});

/* ===========================
   RELACIONES
=========================== */
cliente.hasMany(interaccion, {
    foreignKey: 'clienteId',
    as: 'interacciones'
});

interaccion.belongsTo(cliente, {
    foreignKey: 'clienteId',
    as: 'cliente'
});

export default interaccion;