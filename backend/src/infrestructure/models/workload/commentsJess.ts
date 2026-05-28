import { Model, DataTypes, Optional, Op } from 'sequelize';
import sequelize from '../../../config/connection';
import { commentDTO } from '../../../domain/dto/workload/comment.dto';



export type commentCreationAttributes =
    Optional<
        commentDTO,
        'id' | 'submintedAt'
    >;



export class comments
    extends Model<
        commentDTO,
        commentCreationAttributes
    >
    implements commentDTO {

    public id!: number;

    public userComment!: number;

    public taskComment!: number;

    public commentText!: string;

    public submintedAt!: Date;

    public static async getByUser(
        userId: number
    ): Promise<comments[]> {

        return await this.findAll({

            where: {
                userComment: userId
            },

            order: [['submintedAt', 'DESC']]
        });
    }


    public static async filterComments(filters: {
        userId?: number;
        taskId?: number;
        searchQuery?: string;
    }): Promise<comments[]> {

        const whereClause: any = {};

        if (filters.userId) {
            whereClause.userComment =
                filters.userId;
        }

        if (filters.taskId) {
            whereClause.taskComment =
                filters.taskId;
        }

        if (filters.searchQuery) {

            whereClause.commentText = {
                [Op.like]:
                    `%${filters.searchQuery}%`
            };
        }

        return await this.findAll({

            where: whereClause,

            order: [['submintedAt', 'DESC']]
        });
    }
}

comments.init(
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },

        userComment: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        taskComment: {
            type: DataTypes.INTEGER,
            allowNull: false
        },

        commentText: {
            type: DataTypes.STRING,
            allowNull: false
        },

        submintedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,

            // nombre real MySQL
            field: 'submintedAt'
        }
    },
    {
        sequelize,

        modelName: 'comments',

        tableName: 'comments',

        timestamps: false
    }
);

export default comments;