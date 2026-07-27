import { Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../../config/connection';


export interface iCliente {
    clienteId: number;
    nombre: string;
    empresa?: string;
    ubicacion: string;
    prioridad: 'Alta' | 'Media' | 'Baja';
    tipo: 'Empresa' | 'Individual';
    estadoComercial: 'Negociación' | 'Contactado' | 'Perdido' | 'Sin Contactar';
    ultimaActividad?: Date;
    fechaCreacion?: Date;
    activo?: number;
    estadoConexion?: 'En Línea' | 'Inactivo';

}


export type clienteCreationAttributes = Optional<iCliente, 'clienteId' | 'ultimaActividad' | 'fechaCreacion' | 'activo'>;

export class clienteInstance extends Model<iCliente, clienteCreationAttributes> implements iCliente {
    public clienteId!: number;
    public nombre!: string;
    public empresa!: string;
    public ubicacion!: string;
    public prioridad!: 'Alta' | 'Media' | 'Baja';
    public tipo!: 'Empresa' | 'Individual';
    public estadoComercial!: 'Negociación' | 'Contactado' | 'Perdido' | 'Sin Contactar';
    public ultimaActividad!: Date;
    public fechaCreacion!: Date;
    public activo!: number;
}

const cliente = sequelize.define<clienteInstance>('cliente', {
    clienteId: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
        field: 'clienteId'
    },
    nombre: {
        type: DataTypes.STRING(150),
        allowNull: false
    },
    empresa: {
        type: DataTypes.STRING(150),
        allowNull: true
    },
    ubicacion: {
        type: DataTypes.STRING(100),
        allowNull: false
    },
    prioridad: {
        type: DataTypes.ENUM('Alta', 'Media', 'Baja'),
        allowNull: false,
        defaultValue: 'Media'
    },
    tipo: {
        type: DataTypes.ENUM('Empresa', 'Individual'),
        allowNull: false,
        defaultValue: 'Individual'
    },
    estadoComercial: {
        type: DataTypes.ENUM('Negociación', 'Contactado', 'Perdido', 'Sin Contactar'),
        allowNull: false,
        defaultValue: 'Sin Contactar',
        field: 'estadoComercial'
    },
    ultimaActividad: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'ultimaActividad'
    },
    fechaCreacion: {
        type: DataTypes.DATE,
        allowNull: false,
        defaultValue: DataTypes.NOW,
        field: 'fechaCreacion'
    },
    activo: {
        type: DataTypes.INTEGER,
        allowNull: false,
        defaultValue: 1
    }
}, {
    tableName: 'clientes',
    timestamps: false 
});

export default cliente;