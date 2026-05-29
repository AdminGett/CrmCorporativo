<<<<<<< HEAD:backend/src/infrestructure/models/workload.ts
import { Model, DataTypes, Optional, Op } from 'sequelize';
import sequelize from '../../config/connection';
import { workloadDTO } from '../../domain/dto/workload.dto';
=======
import {Model, DataTypes, Optional } from 'sequelize';
import sequelize from '../../../config/connection';
import { workLoad } from '../../../domain/dto/workload/workload';

// Definición de la interfaz Workload que representa la estructura de una tarea o carga de trabajo en el sistema
export interface Workload {
    id: number;
    userAssignedId: number;
    title: string;
    descriptionTask: string;
    dateDue: string;
    submintedAt: string;
    statusTask: 'pending' | 'in_progress' | 'completed';
    priority: 'low' | 'medium' | 'high';
    createdAt?: Date;
    updatedAt?: Date;
}
>>>>>>> origin/Student:backend/src/infrestructure/models/workload/workload.ts

// extiende de Optional para permitir que ciertos campos sean opcionales al crear una nueva instancia de Workload
export type workloadAttributes = Optional<workLoad,  'id' | 'createdAt' | 'updatedAt'>;

<<<<<<< HEAD:backend/src/infrestructure/models/workload.ts
export type workloadCreationAttributes =
Optional<
    workloadDTO,
    'id' | 'createdAt' | 'updatedAt'
>;


export class componentWorkload
extends Model<
    workloadDTO,
    workloadCreationAttributes
>
implements workloadDTO {

=======
// Clase WorkloadInstance que extiende de Model para representar una instancia de la tabla workload en la base de datos
export class WorkloadInstance extends Model<Workload, workloadAttributes> implements Workload {
>>>>>>> origin/Student:backend/src/infrestructure/models/workload/workload.ts
    public id!: number;

    public userAssignedId!: number;
<<<<<<< HEAD:backend/src/infrestructure/models/workload.ts

=======
>>>>>>> origin/Student:backend/src/infrestructure/models/workload/workload.ts
    public title!: string;

    public descriptionTask!: string;
<<<<<<< HEAD:backend/src/infrestructure/models/workload.ts

    public dateDue!: Date;

    public submittedAt!: Date;

    public statusTask!:
        | 'pending'
        | 'in_progress'
        | 'completed';

    public priority!:
        | 'low'
        | 'medium'
        | 'high';

=======
    public dateDue!: string;
    public submintedAt!: string;
    public statusTask!: 'pending' | 'in_progress' | 'completed';
    public priority!: 'low' | 'medium' | 'high';
>>>>>>> origin/Student:backend/src/infrestructure/models/workload/workload.ts
    public createdAt!: Date;

    public updatedAt!: Date;


    public static async getAllByUser(
        userId: number
    ): Promise<componentWorkload[]> {

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
    }): Promise<componentWorkload[]> {

        const whereClause: any = {};

        if (filters.userId) {
            whereClause.userAssignedId =
                filters.userId;
        }

        if (filters.status) {
            whereClause.statusTask =
                filters.status;
        }

        if (filters.priority) {
            whereClause.priority =
                filters.priority;
        }

        if (filters.searchQuery) {

            whereClause.title = {
                [Op.like]:
                    `%${filters.searchQuery}%`
            };
        }

        return await this.findAll({

            where: whereClause,

            order: [['createdAt', 'DESC']]
        });
    }
}

<<<<<<< HEAD:backend/src/infrestructure/models/workload.ts
=======
// Definición del modelo Workload utilizando Sequelize, mapeando los campos de la interfaz Workload a las 
// columnas de la tabla workload en la base de datos
const Workload = sequelize.define<WorkloadInstance>('workload', {
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
        allowNull: false
    },
    statusTask: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'),
        allowNull: false
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'),
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
},{
    tableName: 'workload',
    timestamps: false
});
>>>>>>> origin/Student:backend/src/infrestructure/models/workload/workload.ts

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

        submittedAt: {
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