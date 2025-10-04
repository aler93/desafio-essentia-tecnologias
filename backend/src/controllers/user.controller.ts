import { Request, Response } from "express";
import { User } from "../models";
// @ts-ignore
import jwt from 'jsonwebtoken';
// @ts-ignore
import bcrypt from 'bcrypt';

const SALT_ROUNDS = 12;

export const createUser = async (req: Request, res: Response) => {
    try {
        let { name, email, password } = req.body;
        let errMsg = ""
        let err = false

        if (!name || name.trim() === "") {
            err = true
            errMsg += "O campo 'nome' é obrigatório<br>"
        }
        if (!email || email.trim() === "") {
            err = true
            errMsg += "O campo 'e-mail' é obrigatório<br>"
        }
        if (!password || password.trim() === "") {
            err = true
            errMsg += "O campo 'senha' é obrigatório<br>"
        }

        const existingUser = await User.findOne({ where: { email } });
        if (existingUser) {
            err = true
            errMsg += `O e-mail ${email} já está sendo usado<br>`
        }

        if(err) {
            return res.status(422).json({ error: errMsg });
        }

        password = await bcrypt.hash(password, SALT_ROUNDS);

        const user = await User.create({ name, email, password });
        res.status(201).json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao criar conta de usuário" });
    }
};

export async function login(req: Request, res: Response) {
    try {
        const { email, password } = req.body;

        const user = await User.findOne({ where: { email } });
        if (!user) {
            return res.status(401).json({ message: 'Usuário não encontrado.' });
        }

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).json({ message: 'Senha incorreta.' });
        }

        const payload = {
            id: user.id,
            email: user.email,
        };

        const token = jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '4h' }
        );

        return res.status(200).json({
            message: 'Acesso garantido',
            token: token,
            tokenType: 'Bearer'
        });

    } catch (error) {
        console.error('Erro no login:', error);
        return res.status(500).json({ message: 'Erro interno do servidor.' });
    }
}

// Pendente PUT e DELETE para user?
/*export const updateUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);
        const { name, email, password } = req.body;

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        user.name = name ?? user.name;
        user.email = email ?? user.email;
        user.password = password ?? user.password;
        await user.save();

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao atualizar usuário" });
    }
};*/

/*export const deleteUser = async (req: Request, res: Response) => {
    try {
        const id = Number(req.params.id);

        const user = await User.findByPk(id);
        if (!user) {
            return res.status(404).json({ error: "Usuário não encontrado" });
        }

        await user.destroy();

        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: "Erro ao desativar conta do usuário" });
    }
};*/
