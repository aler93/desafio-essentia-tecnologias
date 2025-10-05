"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Todo = void 0;
exports.initTodoModel = initTodoModel;
exports.associateTodoModel = associateTodoModel;
const sequelize_1 = require("sequelize");
const user_model_1 = require("./user.model");
class Todo extends sequelize_1.Model {
}
exports.Todo = Todo;
function initTodoModel(sequelize) {
    Todo.init({
        id: {
            type: sequelize_1.DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
        },
        userId: {
            type: sequelize_1.DataTypes.INTEGER,
            allowNull: true,
        },
        title: {
            type: sequelize_1.DataTypes.STRING(150),
            allowNull: false,
        },
        description: {
            type: sequelize_1.DataTypes.TEXT,
            allowNull: true,
        },
        createdAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        updatedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        deletedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
        concludedAt: {
            type: sequelize_1.DataTypes.DATE,
            allowNull: true,
        },
    }, {
        sequelize,
        modelName: "Todo",
        tableName: "todos",
        timestamps: true,
        paranoid: false,
    });
    return Todo;
}
function associateTodoModel() {
    Todo.belongsTo(user_model_1.User, {
        foreignKey: "userId",
        as: "user",
    });
}
