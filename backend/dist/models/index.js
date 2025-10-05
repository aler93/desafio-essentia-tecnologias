"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = exports.Todo = exports.sequelize = void 0;
const sequelize_1 = require("sequelize");
const dotenv_1 = __importDefault(require("dotenv"));
const todo_model_1 = require("./todo.model");
Object.defineProperty(exports, "Todo", { enumerable: true, get: function () { return todo_model_1.Todo; } });
const user_model_1 = require("./user.model");
Object.defineProperty(exports, "User", { enumerable: true, get: function () { return user_model_1.User; } });
dotenv_1.default.config();
const sequelize = new sequelize_1.Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: "mysql",
    logging: false,
});
exports.sequelize = sequelize;
sequelize.authenticate()
    .then(() => console.log("Conexão com o banco OK"))
    .catch(err => console.error("Erro ao conectar no banco:", err));
(0, todo_model_1.initTodoModel)(sequelize);
(0, user_model_1.initUserModel)(sequelize);
(0, todo_model_1.associateTodoModel)();
