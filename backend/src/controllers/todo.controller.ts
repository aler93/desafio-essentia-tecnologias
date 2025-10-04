import { Request, Response } from "express";
import { Todo } from "../models";

export const getTodos = async (req: Request, res: Response) => {
    let useLimit = 100
    let usePage = 1
    try {
        const { limit, page } = req.body;
        if( limit && page ) {
            useLimit = limit;
            usePage = page;
        }
        let offset = (usePage - 1) * useLimit
        const todos = await Todo.findAll({
            order: [["createdAt", "DESC"]],
            limit: useLimit,
            offset: offset
        });
        res.json(todos);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao buscar os itens da lista" });
    }
};

export const createTodo = async (req: Request, res: Response) => {
    try {
        const { title, description } = req.body;

        if (!title || title.trim() === "") {
            return res.status(422).json({ error: "O campo 'título' é obrigatório" });
        }

        console.info("DEBUG", title, description)

        const todo = await Todo.create({ title, description });
        res.status(201).json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao criar item" });
    }
};

export const updateTodo = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { title, description } = req.body;

        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: "Item não encontrado" });
        }

        todo.title = title ?? todo.title;
        todo.description = description ?? todo.description;
        await todo.save();

        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao atualizar todo" });
    }
};

export const deleteTodo = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: "Item não encontrado" });
        }

        await todo.destroy();

        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao remover o item da lista" });
    }
};

export const concludeTodo = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const todo = await Todo.findByPk(id);
        if (!todo) {
            return res.status(404).json({ error: "Item não encontrado" });
        }

        if (!todo.concludedAt) {
            todo.concludedAt = new Date();
        } else {
            todo.concludedAt = null;
        }
        await todo.save();

        res.json(todo);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao concluir o item" });
    }
};
