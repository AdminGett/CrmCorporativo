import { Optional, Model, DataTypes } from 'sequelize';
import sequelize from '../../config/connection';


export interface ISession {
  id: string;
  user_id: string;
  refresh_token: string;
  expires_at: Date;
  created_at?: Date;
}

export type SessionCreationAttributes = Optional<ISession, 'id' | 'created_at'>;

export class SessionInstance extends Model<ISession, SessionCreationAttributes> implements ISession {
  public id!: string;
  public user_id!: string;
  public refresh_token!: string;
  public expires_at!: Date;
  public created_at!: Date;
}

const Session = sequelize.define<SessionInstance>('Session', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  user_id: {
    type: DataTypes.UUID,
    allowNull: false,
    references: {
      key: 'id'
    }
  },
  refresh_token: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  expires_at: {
    type: DataTypes.DATE,
    allowNull: false
  },
  created_at: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW
  }
}, {
  tableName: 'sessions',
  timestamps: false
});

export default Session;