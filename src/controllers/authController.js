require('dotenv').config({ path: '../../.env' });
const User = require('../models/userModel');
const { hashPassword, compareHash } = require('../utils/hashPassword');
const jwt = require('jsonwebtoken');

const authController = {
    // POST /users
    async registerUser(req, res) {
        try {
            const { name, email, password, role } = req.body;

            // verifica se os campos foram preenchidos
            if (!name || !email || !password) {
                return res.status(400).json({ error: "Todos os campos devem ser preenchidos." });
            }

            // valida o campo role
            const validRoles = ['admin', 'moderador', 'user'];
            if (role && !validRoles.includes(role)) {
                return res.status(400).json({ message: "Campo de papel do usuário especificado errado." });
            }

            // cria um hash da senha
            const hashedPass = await hashPassword(password);

            // cria um novo usuário no banco de dados 
            const user = await User.create({
                name,
                email,
                password: hashedPass,
                role: role || 'user'
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
    async loginUser(req, res) {
        const { email, password } = req.body;
        
        if (!email || !password) return res.status(400).json({ error: "Todos os campos devem ser preencidos" });

        try {
            const user = await User.findOne({
                where: { email: email },
                attributes: ['email', 'password', 'role']
            })

            if (!user) return res.status(401).json({ error: "Credenciais inválidas" });

            // compara se a senha informado é igual a cadastrada
            const comparePassword = await compareHash(password, user.dataValues.password);
            if (!comparePassword) return res.status(401).json({ error: "Credenciais inválidas" });

            const payload = { email, role: user.role }; // conteúdo do token
            const secretKey = process.env.JWT_SECRET; // chave secreta do jwt
            // gera um token jwt
            const token = jwt.sign(payload, secretKey, { expiresIn: '1h' }); 
            
            return res.status(200).json({ token });
        } catch (error) {
            console.error(`Erro ao tentar efetuar login: ${error.message}`);
            return res.status(500).json({ error: `Erro ao tentar efetuar login:` });
        }
    }
};

module.exports = authController;