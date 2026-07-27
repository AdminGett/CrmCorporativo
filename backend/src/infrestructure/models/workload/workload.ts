import { Model, DataTypes, Optional, Op } from 'sequelize';

import sequelize from '../../../config/connection';
import { workloadDTO } from '../../../domain/dto/workload/workload.dto';

// Interfaz principal
export interface Workload {
    id?: number;
    userAssignedId: number;
    title: string;
    descriptionTask: string;
    dateDue: string | Date;
    submintedAt?: string | Date;
    statusTask: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    createdAt?: string | Date;
    updatedAt?: string | Date;
}

// Campos opcionales al crear
export type workloadCreationAttributes = Optional<
    workloadDTO,
    'id' | 'createdAt' | 'updatedAt'
>;

// Modelo principal
export class componentWorkload
    extends Model<workloadDTO, workloadCreationAttributes>
    implements workloadDTO {

    public id?: number;

    public userAssignedId!: number;

    public title!: string;

    public descriptionTask!: string;

    public dateDue!: string | Date;

    public submintedAt?: string | Date;

    public statusTask!: 'pending' | 'in_progress' | 'completed';

    public priority!: 'low' | 'medium' | 'high';

    public createdAt?: string | Date;

    public updatedAt?: string | Date;

    public static async getAllByUser(
    userId: number
): Promise<any[]> {

    return await this.findAll({
        where: {
            userAssignedId: userId
        },
        order: [['dateDue', 'ASC']]
    });
}

    public static async filterTasks(filters: {
    userId?: number;
    status?: 'pending' | 'in_progress' | 'completed';
    priority?: 'low' | 'medium' | 'high';
    searchQuery?: string;
}): Promise<any[]> {

    const whereClause: any = {};

    if (filters.userId) {
        whereClause.userAssignedId = filters.userId;
    }

    if (filters.status) {
        whereClause.statusTask = filters.status;
    }

    if (filters.priority) {
        whereClause.priority = filters.priority;
    }

    if (filters.searchQuery) {
        whereClause.title = {
            [Op.like]: `%${filters.searchQuery}%`
        };
    }

    return await this.findAll({
        where: whereClause,
        order: [['createdAt', 'DESC']]
    });
}
}

// Inicialización del modelo
componentWorkload.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        userAssignedId: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        title: {
            type: DataTypes.STRING,
            allowNull: false
        },

        descriptionTask: {
            type: DataTypes.STRING,
            allowNull: false
        },

        dateDue: {
            type: DataTypes.DATE,
            allowNull: false
        },

        submintedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        statusTask: {
            type: DataTypes.ENUM(
                'pending',
                'in_progress',
                'completed'
            ),
            allowNull: false
        },

        priority: {
            type: DataTypes.ENUM(
                'low',
                'medium',
                'high'
            ),
            allowNull: false
        },

        createdAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        },

        updatedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW
        }
    },
    {
        sequelize,
        modelName: 'componentWorkload',
        tableName: 'workload',
        timestamps: false
    }
);

export default componentWorkload;