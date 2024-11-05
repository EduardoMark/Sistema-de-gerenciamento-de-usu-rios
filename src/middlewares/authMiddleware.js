const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    // pega o token passado no header da requisição
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado. Acesso não autorizado.' });
    }

    // verifica se o token é válido
    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado. Acesso proibido.' });
        }
        
        req.user = user; // Adiciona os dados do usuário à requisição
        next();
    });
}

function checkRole(requiredRole) {
    return (req, res, next) => {
        if (req.user.role !== requiredRole) {
            return res.status(403).json({ message: `Acesso restrito a usuários com função: ${requiredRole}` });
        }
        next();
    };
}

module.exports = {authenticateToken, checkRole};
