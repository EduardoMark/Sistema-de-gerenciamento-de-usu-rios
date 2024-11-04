const User = require('../models/userModel');
const validator = require('validator');
const hashPassword = require('../utils/hashPassword');

const userController = {
    // GET /users
    async getAllUsers(req, res) {
        try {
            // busca todos os usuários no banco de dados, retornando os atributos específicos
            const users = await User.findAll({
                attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
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
    async getUserById(req, res) {
        try {
            const { id } = req.params;

            // busca um único usuário no banco 
            const user = await User.findOne({
                where: { id },
                attributes: ['id', 'name', 'email', 'role', 'createdAt', 'updatedAt']
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
    async updateUser(req, res) {
        try {
            const { id } = req.params;
            const { name, email, password, role } = req.body;

            // verifica se o id fornecido é do tipo UUID
            if (!validator.isUUID(id)) return res.status(400).json({ error: "Formato do ID inválido" });

            // busca um usuário pelo id
            const user = await User.findByPk(id);
            // verifica se o usuário não for encontrado
            if (!user) {
                return res.status(404).json({ error: "Usuário não encontrado." });
            }

            // verifica se nenhum campo foi preenchido
            if (!name && !email && !password && !role) return res.status(400).json({ error: "Nenhum dado fornecido." });

            // cria objeto para dados de update
            const updateData = {};
            if (typeof name === 'string') updateData.name = name;
            if (typeof email === 'string') updateData.email = email;
            if (typeof password === 'string') {
                // criptografa a senha
                const hashedPass = await hashPassword(password);
                // armazena a senha criptografada no objeto
                updateData.password = hashedPass;
            }
            if (typeof role === 'string') {
                const validRoles = ['admin', 'moderador', 'user'];
                if (role && !validRoles.includes(role)) {
                    return res.status(400).json({ message: "Campo de papel do usuário especificado errado." });
                }
                updateData.role = role;
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
    async deleteUser(req, res) {
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