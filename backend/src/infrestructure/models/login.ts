import { Optional, Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';

//  Dtos que se usaran 
export interface IUser {
  id: number;
  nombre: string;
  paterno: string;
  materno: string;
  tipoUsuario: string;
  nombreUsuario: string;
  correo: string;
  activo: boolean;
  ultimaActividad?: Date | null; // Puede ser null al inicio
  fechaRegistro: Date;
  bloqueado: boolean;
}

//interfaz pra poder ingresar
export interface IUserAttributes extends IUser {
  contrasena: string; 
}

// Para la creación, el ID y las fechas son opcionales porque los crea la BD
export type UserCreationAttributes = Optional<IUserAttributes, | 'fechaRegistro' | 'ultimaActividad'>;

//  IUserAttributes da todo lo que debe tener la BD
export class UserInstance extends Model<IUserAttributes, UserCreationAttributes> implements IUserAttributes {
  public id!: number;
  public nombre!: string;
  public paterno!: string;
  public materno!: string;
  public correo!: string;
  public contrasena!: string; 
  public tipoUsuario!: string;
  public nombreUsuario!: string;
  public activo!: boolean;
  public fechaRegistro!: Date;
  public ultimaActividad!: Date | null;
  public bloqueado!: boolean;
}

// Aqui se "copia" la base de datos de SQL para hacer consultas
const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: { 
    type: DataTypes.STRING, 
    allowNull: false
  },
  paterno: { 
    type: DataTypes.STRING,
    allowNull: false 
  },
  materno: { 
    type: DataTypes.STRING, 
    allowNull: false 
  },
  correo: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: { isEmail: true }
  },
  contrasena: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  tipoUsuario: { 
    type: DataTypes.STRING,
    allowNull: false },
  nombreUsuario: { 
    type: DataTypes.STRING, 
    allowNull: false 
},
  fechaRegistro: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    allowNull: false
  },
  ultimaActividad: {
    type: DataTypes.DATE,
    defaultValue: null,
    allowNull: true
  },
  activo: {
    type: DataTypes.BOOLEAN,
    defaultValue: true,
    allowNull: false
  },
  bloqueado: {
    type: DataTypes.BOOLEAN,
    defaultValue: false,
    allowNull: false
  }
}, {
  tableName: 'usuarios', 
  timestamps: false
});

export default User;