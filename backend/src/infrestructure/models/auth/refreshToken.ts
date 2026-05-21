import { Optional, Model, DataTypes } from 'sequelize';
import sequelize from '../../../config/connection';

export interface IRefreshToken {
    id: number;
    userId: number;
    token: string;
    expiresAt: Date;
    revoked: boolean;
    createdAt?: Date;
}

export class RefreshTokenInstance extends Model<IRefreshToken, Optional<IRefreshToken, 'id'>> implements IRefreshToken {
    public id!: number;
    public userId!: number;
    public token!: string;
    public expiresAt!: Date;
    public revoked!: boolean
    public createdAt!: Date;
}

const RefreshToken = sequelize.define<RefreshTokenInstance>('RefreshToken', {
    id: {
        type: DataTypes.INTEGER,   
        primaryKey: true,
        autoIncrement: true
    },
    userId: {
        type: DataTypes.INTEGER,
        allowNull: false
    },
    token: {
        type: DataTypes.STRING,
        allowNull: false
    },
    expiresAt: {
        type: DataTypes.DATE,
        allowNull: false
    },
    revoked: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
        allowNull: false
    },
    createdAt: {
        type: DataTypes.DATE,   
        defaultValue: DataTypes.NOW,
        allowNull: false
    }
}, {
    tableName: 'refreshTokens',
    timestamps: false
});

export default RefreshToken;