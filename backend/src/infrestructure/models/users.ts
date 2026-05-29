import { Optional, Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';

export interface IUser {
  id: string;
  name: string;
  email: string;
  password_hash: string;
  role: 'ADMIN' | 'USER';
  is_active: boolean;
  created_at?: Date;
  updated_at?: Date;
}

export type UserCreationAttributes = Optional<IUser, 'id' | 'created_at' | 'updated_at'>;

export class UserInstance extends Model<IUser, UserCreationAttributes> implements IUser {
  public id!: string;
  public name!: string;
  public email!: string;
  public password_hash!: string;
  public role!: 'ADMIN' | 'USER';
  public is_active!: boolean;
  public created_at!: Date;
  public updated_at!: Date;
}

const User = sequelize.define<UserInstance>('User', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true
  },
  password_hash: {
    type: DataTypes.STRING,
    allowNull: false
  },
  role: {
    type: DataTypes.ENUM('ADMIN', 'USER'),
    allowNull: false,
    defaultValue: 'USER'
  },
  is_active: {
    type: DataTypes.BOOLEAN,
    defaultValue: true
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  },
  updated_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'users',
  timestamps: false 
});

export default User;