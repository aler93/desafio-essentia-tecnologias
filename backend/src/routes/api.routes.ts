import { Router } from "express";
// Tarefas
import {
    getTodos,
    createTodo,
    updateTodo,
    concludeTodo,
    deleteTodo,
} from "../controllers/todo.controller";
// Users
import {
    createUser,
    login,
} from "../controllers/user.controller";

const router = Router();

// Tarefas
router.get("/to-do", getTodos);
router.post("/to-do", createTodo);
router.put("/to-do/:id", updateTodo);
router.patch("/to-do/:id", concludeTodo);
router.delete("/to-do/:id", deleteTodo);

// Usuário + Auth
router.post("/user", createUser)
router.post("/login", login)

export default router;
