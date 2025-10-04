import { Router } from "express";
import {
    getTodos,
    createTodo,
    updateTodo,
    concludeTodo,
    deleteTodo,
} from "../controllers/todo.controller";

const router = Router();

router.get("/to-do", getTodos);
router.post("/to-do", createTodo);
router.put("/to-do/:id", updateTodo);
router.patch("/to-do/:id", concludeTodo);
router.delete("/to-do/:id", deleteTodo);

export default router;
