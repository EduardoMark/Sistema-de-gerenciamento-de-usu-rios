const jwt = require('jsonwebtoken');

function authenticateToken(req, res, next) {
    const token = req.headers['authorization']?.split(' ')[1];
    
    if (!token) {
        return res.status(401).json({ message: 'Token não encontrado. Acesso não autorizado.' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            return res.status(403).json({ message: 'Token inválido ou expirado. Acesso proibido.' });
        }
        
        req.user = user; // Adiciona os dados do usuário à requisição
        next();
    });
}

module.exports = authenticateToken;
