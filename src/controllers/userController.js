const User = require('../models/userModel');
const validator = require('validator');
const bcrypt = require('bcrypt');

const userController = {
    // GET /
    async index(req, res) {
        try {
            // busca todos os usuários no banco de dados, retornando os atributos específicos
            const users = await User.findAll({
                attributes: ['id', 'name', 'email']
            });

            // verifica se não foram retornados usuários do banco
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

            // busca um único usuário no banco 
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
    // PUT /users/:id
    async update(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password } = req.body;

            // verifica se o id fornecido é do tipo UUID
            if (!validator.isUUID(id)) return res.status(400).json({ error: "Formato do ID inválido" });

            // busca um usuário pelo id
            const user = await User.findByPk(id);
            // verifica se o usuário não for encontrado
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            // verifica se nenhum campo foi preenchido
            if (!name && !email && !password) return res.status(400).json({ error: "Nenhum dado fornecido." });

            // cria objeto para dados de update
            const updateData = {};
            if (typeof name === 'string') updateData.name = name;
            if (typeof email === 'string') updateData.email = email;
            if (typeof password === 'string') {
                // criptografa a senha
                const hashedPass = await bcrypt.hash(password, 10);
                // armazena a senha criptografada no objeto
                updateData.password = hashedPass;
            } 

            // atualiza os dados do usuário específico, passando o objeto de dados atualizado 
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

            // exclui o usuário do banco de dados
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