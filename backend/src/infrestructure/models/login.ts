import { Optional, Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';

//  Dtos que se usaran 
export interface IUser {
  id: number;
  tipoUsuario: string;
  activo: boolean;
  ultimaActividad?: Date | null; // Puede ser null al inicio
  intentosLogueo: number;
  bloqueado: boolean;
}

//interfaz pra poder ingresar
export interface IUserAttributes extends IUser {
  passwordEncrypt: string; 
}

// Para la creación, el ID y las fechas son opcionales porque los crea la BD
export type UserCreationAttributes = Optional<IUserAttributes,'ultimaActividad'>;

//  IUserAttributes da todo lo que debe tener la BD
export class UserInstance extends Model<IUserAttributes, UserCreationAttributes> implements IUserAttributes {
  public id!: number;
  public passwordEncrypt!: string; 
  public tipoUsuario!: string;
  public activo!: boolean;
  public intentosLogueo!: number;
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
  passwordEncrypt: { 
    type: DataTypes.STRING,
    allowNull: false
  },
  tipoUsuario: { 
    type: DataTypes.INTEGER,
    allowNull: false 
  },
  intentosLogueo: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
    allowNull: false
  },
  ultimaActividad: {
    type: DataTypes.DATE,
    defaultValue: null,
    allowNull: true
  },
  activo: {
    type: DataTypes.INTEGER,
    defaultValue: true,
    allowNull: false
  },
  bloqueado: {
    type: DataTypes.INTEGER,
    defaultValue: false,
    allowNull: false
  }
  
}, {
  tableName: 'loginUsuarios', 
  timestamps: false
});

export default User;