const User = require('../models/userModel');

const userController = {
    async index(req, res) {
        try {
            const users = await User.findAll({
                attributes: ['id', 'name', 'email']
            });

            if (users.length === 0) {
                return res.status(400).json({ error: 'Nenhum usuário cadastrado.' });
            }

            return res.status(200).json(users);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Error ao buscar o usuário!" });
        }
    },

    async show(req, res) {
        try {
            const { id } = req.params;

            const user = await User.findOne({
                where: { id },
                attributes: ['id', 'name', 'email', 'createdAt', 'updatedAt']
            });

            if (user.length === 0) {
                return res.status(400).json({ error: 'Nenhum usuário cadastrado.' });
            }

            return res.status(200).json(user);
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Não foi possível encontrar o usuário." });
        }
    },

    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            if (!name || !email || !password) {
                return res.status(400).json({ error: "Todos os campos devem ser preenchidos." });
            }

            const user = await User.create({
                name,
                email,
                password
            });

            res.status(200).json({ message: 'Usuário cadastrado com sucesso', user });
        } catch (error) {
            console.error(error);
            return res.status(500).json({ error: "Não foi possível cadastra o usuário" });
        }
    }
}

module.exports = userController;