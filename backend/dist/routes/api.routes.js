"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
// Tarefas
const todo_controller_1 = require("../controllers/todo.controller");
// Users
const user_controller_1 = require("../controllers/user.controller");
const router = (0, express_1.Router)();
// Tarefas
router.get("/to-do", todo_controller_1.getTodos);
router.post("/to-do", todo_controller_1.createTodo);
router.put("/to-do/:id", todo_controller_1.updateTodo);
router.patch("/to-do/:id", todo_controller_1.concludeTodo);
router.delete("/to-do/:id", todo_controller_1.deleteTodo);
// Usuário + Auth
router.post("/user", user_controller_1.createUser);
router.post("/login", user_controller_1.login);
exports.default = router;
