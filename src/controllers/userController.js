const User = require('../models/userModel');
const validator = require('validator');

const userController = {
    // GET /
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
    // GET /users/:id
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
    // POST /users
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
    },
    // PUT /users/:id
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            if (!validator.isUUID(id)) return res.status(400).json({ error: "Formato do ID inválido" });

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            if (!name && !email && !password) return res.status(400).json({ error: "Nenhum dado fornecido." });

            const updateData = {};
            if (typeof name === 'string') updateData.name = name;
            if (typeof email === 'string') updateData.email = email;
            if (typeof password === 'string') updateData.password = password;

            // await user.update(updateData)
            await User.update(updateData, {
                where: { id }
            })

            return res.status(200).json({ message: "Dados atualizado com sucesso." });
        } catch (error) {
            console.error(error.message);
            return res.status(500).json({ error: "Error ao atualizar usuário." });
        }
    },
    // DELETE /users/:id
    async delete(req, res) {
        try {
            const { id } = req.params;

            if (!validator.isUUID(id)) return res.status(400).json({ error: "Formato do ID inválido" });

            const user = await User.findByPk(id);
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            await User.destroy({
                where: { id }
            })

            return res.status(200).json({ message: "Usuário excluído com sucesso." });
        } catch (error) {
            console.error(error.message);
            return res.json({ error: "Não foi possível excluir o usuário" });
        }
    }
}

module.exports = userController;