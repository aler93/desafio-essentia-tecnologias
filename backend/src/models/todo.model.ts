import {
    DataTypes,
    Model,
    Optional,
    Sequelize
} from "sequelize";

interface TodoAttributes {
    id: number;
    title: string;
    description?: string | null;
    createdAt?: Date;
    updatedAt?: Date;
    deletedAt?: Date | null;
    concludedAt?: Date | null;
}

type TodoCreationAttributes = Optional<
    TodoAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt" | "concludedAt"
>;

export class Todo
    extends Model<TodoAttributes, TodoCreationAttributes>
    implements TodoAttributes
{
    public id!: number;
    public title!: string;
    public description?: string | null;
    public createdAt?: Date;
    public updatedAt?: Date;
    public deletedAt?: Date | null;
    public concludedAt?: Date | null;
}

export function initTodoModel(sequelize: Sequelize): typeof Todo {
    Todo.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            title: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            description: {
                type: DataTypes.TEXT,
                allowNull: true,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            deletedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
            concludedAt: {
                type: DataTypes.DATE,
                allowNull: true,
            },
        },
        {
            sequelize,
            modelName: "Todo",
            tableName: "todos",
            timestamps: true,
            paranoid: false,
        }
    );

    return Todo;
}
