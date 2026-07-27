import { Model, DataTypes, Optional, Op } from 'sequelize';
import sequelize from '../../config/connection';
import { commentDTO } from '../../domain/dto/comment.dto';



export type commentCreationAttributes =
    Optional<
        commentDTO,
        'id' | 'submittedAt'
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

    public submittedAt!: Date;



    public static async getAllByUser(
        userId: number
    ): Promise<comments[]> {

        return await this.findAll({

            where: {
                userComment: userId
            },

            order: [['submittedAt', 'DESC']]
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

            order: [['submittedAt', 'DESC']]
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

        submittedAt: {
            type: DataTypes.DATE,
            allowNull: false,
            defaultValue: DataTypes.NOW,

            // nombre real MySQL
            field: 'submitedAt'
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