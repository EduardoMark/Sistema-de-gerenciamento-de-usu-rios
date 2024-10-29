(async () => {
    require('dotenv').config({path: '../.env'})
    const express = require('express');
    const  sequelize  = require('../src/config/database');
    const User = require('./models/userModel');
    
    const app = express();

    app.use(express.json());

    try {
        await sequelize.sync();
        console.log(`Banco de dados conectado com sucesso!`);
    } catch (error) {
        console.error(`Falha ao tentar conectar com banco de dados!: ${error}`);
    }

    const PORT = process.env.PORT || 3000;

    app.listen(PORT, () => {
        console.log(`Servidor ON: http://localhost:${PORT}`);
    })
})();