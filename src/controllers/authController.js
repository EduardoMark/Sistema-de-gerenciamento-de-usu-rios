const User = require('../models/userModel');
const bcrypt = require('bcrypt');

const authController = {
    // POST /users
    async register(req, res) {
        try {
            const { name, email, password } = req.body;

            // verifica se os campos foram preenchidos
            if (!name || !email || !password) {
                return res.status(400).json({ error: "Todos os campos devem ser preenchidos." });
            }

            // cria um hash da senha
            const hashedPass = await bcrypt.hash(password, 10);

            // cria um novo usuário no banco de dados 
            const user = await User.create({
                name,
                email,
                password: hashedPass
            });

            res.status(200).json({ message: 'Usuário cadastrado com sucesso' });
        } catch (error) {
            // trata o error de unicidade do email
            if (error.name === "SequelizeUniqueConstraintError") {
                return res.status(400).json({ message: "Email já cadastrado." });
            }
            console.error(error);
            return res.status(500).json({ error: "Não foi possível cadastrar o usuário" });
        }
    },
};

module.exports = authController;