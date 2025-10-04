import {
    DataTypes,
    Model,
    Optional,
    Sequelize
} from "sequelize";

interface UserAttributes {
    id: number;
    name: string;
    email?: string;
    password?: string | null;
    createdAt?: Date;
    updatedAt?: Date | null;
    deletedAt?: Date | null;
}

type TodoCreationAttributes = Optional<
    UserAttributes,
    "id" | "createdAt" | "updatedAt" | "deletedAt" | "password"
>;

export class User
    extends Model<UserAttributes, TodoCreationAttributes>
    implements UserAttributes
{
    public id!: number;
    public name!: string;
    public email?: string;
    public password?: string | null;
    public createdAt?: Date;
    public updatedAt?: Date | null;
    public deletedAt?: Date | null;
}

export function initUserModel(sequelize: Sequelize): typeof User {
    User.init(
        {
            id: {
                type: DataTypes.INTEGER,
                autoIncrement: true,
                primaryKey: true,
            },
            name: {
                type: DataTypes.STRING(150),
                allowNull: false,
            },
            email: {
                type: DataTypes.STRING(200),
                allowNull: false,
            },
            password: {
                type: DataTypes.STRING(200),
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
        },
        {
            sequelize,
            modelName: "User",
            tableName: "users",
            timestamps: true,
            paranoid: false,
        }
    );

    return User;
}
