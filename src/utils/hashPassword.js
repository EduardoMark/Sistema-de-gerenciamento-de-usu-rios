const bcrypt = require('bcrypt');

// função para criptografar a senha
async function hashPassword(password) {
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds);
        return hashedPassword;
    } catch (error) {
        console.error(`Error ao tentar fazer o hash da senha: ${error.message}`);
        throw new Error("Falha no hashing");
    }
}

// função para comparar a senha e o hash
async function compareHash(password, hashedPassword) {
    try {
        const comperaPassword = await bcrypt.compare(password, hashedPassword);
        return comperaPassword;
    } catch (error) {
        console.error(`Error ao tentar comparar o hash da senha: ${error.message}`);
        throw new Error("Falha no compare");  
    }
}

module.exports = {hashPassword, compareHash};