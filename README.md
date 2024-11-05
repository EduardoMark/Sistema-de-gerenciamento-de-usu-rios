# Sistema de Gerenciamento de Usuários

Este é um projeto de backend para um sistema de gerenciamento de usuários, desenvolvido com Node.js, Express, PostgreSQL e Sequelize. O sistema permite o cadastro, autenticação e gerenciamento completo de usuários, com operações de CRUD (criação, leitura, atualização e exclusão) e segurança garantida por meio de autenticação JWT.

## Índice
- [Descrição do Projeto](#descrição-do-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Configuração e Instalação](#configuração-e-instalação)
- [Uso](#uso)

## Descrição do Projeto

O objetivo deste projeto é fornecer uma API RESTful para gerenciar usuários em um sistema, com autenticação segura e permissões de acesso. A API permite que administradores vejam todos os usuários cadastrados, que excluam usuários. O projeto é uma ótima base para aplicações que necessitam de um sistema de gerenciamento de contas de usuário com autenticação e controle de acesso.

## Tecnologias Utilizadas

- **Node.js**: Ambiente de execução JavaScript no servidor.
- **Express**: Framework para criação de servidores web em Node.js.
- **PostgreSQL**: Banco de dados relacional para armazenar as informações dos usuários.
- **Sequelize**: ORM (Object-Relational Mapper) para facilitar a interação com o banco de dados PostgreSQL.
- **JWT (JSON Web Token)**: Protocolo de autenticação para proteger rotas e controlar acesso.
- **Controle de acesso**: Protocolo de autorização para proteger rotas e controlar acesso.

## Funcionalidades

- **Cadastro e Login de Usuários**: Criação de contas e autenticação com criptografia de senhas.
- **CRUD de Usuários**: Operações de criação, leitura, atualização e exclusão de usuários.
- **Autenticação JWT**: Segurança nas rotas protegidas, permitindo que apenas usuários autenticados acessem determinadas funcionalidades.
- **Controle de Acesso**: Diferentes permissões baseadas em tipos de usuário (ex: administrador e usuário comum).

## Configuração e Instalação

### Pré-requisitos

- **Node.js** e **npm** instalados
- **PostgreSQL** instalado e configurado, banco de dados "users" criado.

### Passo a Passo

1. Clone este repositório:
    ```bash
    git clone https://github.com/EduardoMark/user-management-api.git
    cd user-management-api
    ```

2. Instale as dependências:
    ```bash
    npm install
    ```

3. Configure o arquivo `.env` com as variáveis de ambiente:
    - Crie um arquivo `.env` na raiz do projeto com as informações necessárias:
      ```plaintext
      DB_HOST=localhost
      DB_USER=seu_usuario
      DB_PASS=sua_senha
      DB_NAME=nome_do_banco
      PORT=porta_do_servidor
      JWT_SECRET=sua_chave_secreta
      ```

6. Inicie o servidor:
    ```bash
    npm start
    ```

## Uso

Para testar a API, você pode usar ferramentas como [Postman](https://www.postman.com/) ou [Insomnia](https://insomnia.rest/).

### Endpoints Principais

- **POST /users/register**: Cadastro de novos usuários
- **POST /users/login**: Login e obtenção de token JWT
- **GET /users**: Lista todos os usuários (apenas para administradores)
- **GET /users/:id**: Detalhes de um usuário específico
- **PUT /users/:id**: Atualização dos dados de um usuário
- **DELETE /users/:id**: Exclusão de um usuário (apenas para administradores)

> Obs: Algumas rotas exigem autenticação JWT e permissões de administrador.
