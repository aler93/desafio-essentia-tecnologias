import { Sequelize } from "sequelize";
import dotenv from "dotenv";
import { initTodoModel, Todo, associateTodoModel } from "./todo.model";
import { initUserModel, User } from "./user.model";

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME as string,
    process.env.DB_USER as string,
    process.env.DB_PASSWORD as string,
    {
        host: process.env.DB_HOST,
        port: Number(process.env.DB_PORT),
        dialect: "mysql",
        logging: false,
    }
);

sequelize.authenticate()
    .then(() => console.log("Conexão com o banco OK"))
    .catch(err => console.error("Erro ao conectar no banco:", err));

initTodoModel(sequelize);
initUserModel(sequelize);

associateTodoModel();

export { sequelize, Todo, User };
