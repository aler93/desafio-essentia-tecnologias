"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.concludeTodo = exports.deleteTodo = exports.updateTodo = exports.createTodo = exports.getTodos = void 0;
const models_1 = require("../models");
// @ts-ignore
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const getTodos = async (req, res) => {
    let useLimit = 100;
    let usePage = 1;
    try {
        const { limit, page } = req.body;
        if (limit && page) {
            useLimit = limit;
            usePage = page;
        }
        let offset = (usePage - 1) * useLimit;
        const todos = await models_1.Todo.findAll({
            order: [["createdAt", "DESC"]],
            limit: useLimit,
            offset: offset,
            include: [
                {
                    model: models_1.User,
                    as: "user",
                    attributes: ["name", "email"],
                    required: false,
                },
            ],
        });
        res.json(todos);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar os itens da lista" });
    }
};
exports.getTodos = getTodos;
const createTodo = async (req, res) => {
    try {
        const JWT_SECRET = process.env.JWT_SECRET;
        const { title, description } = req.body;
        if (!title || title.trim() === "") {
            return res.status(422).json({ error: "O campo 'título' é obrigatório" });
        }
        let userId = null;
        const authHeader = req.headers.authorization;
        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1]; // Pega o token após "Bearer "
            try {
                const decodedToken = jsonwebtoken_1.default.verify(token, JWT_SECRET);
                userId = decodedToken.id;
            }
            catch (jwtError) {
                return res.status(403).json({ error: "Token inválido ou expirado." });
            }
        }
        const todo = await models_1.Todo.create({ title, description, userId });
        res.status(201).json(todo);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao criar item" });
    }
};
exports.createTodo = createTodo;
const updateTodo = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const { title, description } = req.body;
        const todo = await models_1.Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: "Item não encontrado" });
        }
        todo.title = title ?? todo.title;
        todo.description = description ?? todo.description;
        await todo.save();
        res.json(todo);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao atualizar todo" });
    }
};
exports.updateTodo = updateTodo;
const deleteTodo = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const todo = await models_1.Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: "Item não encontrado" });
        }
        await todo.destroy();
        res.json(todo);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao remover o item da lista" });
    }
};
exports.deleteTodo = deleteTodo;
const concludeTodo = async (req, res) => {
    try {
        const id = Number(req.params.id);
        const todo = await models_1.Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: "Item não encontrado" });
        }
        if (!todo.concludedAt) {
            todo.concludedAt = new Date();
        }
        else {
            todo.concludedAt = null;
        }
        await todo.save();
        res.json(todo);
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao concluir o item" });
    }
};
exports.concludeTodo = concludeTodo;
