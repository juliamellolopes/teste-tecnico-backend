<h1 align="center"> Teste Técnico Backend 

<h3>
  Este repositório contém a implementação de uma API RESTful desenvolvida com NestJS, TypeScript e MySQL como parte de um teste técnico para vaga de estágio backend.
</h2>

## 🚀 Tecnologias Utilizadas

- [Node.js](https://nodejs.org/)
- [NestJS](https://nestjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [MySQL](https://www.mysql.com/)
- [TypeORM](https://typeorm.io/)
- [JWT](https://jwt.io/)
- [Swagger](https://swagger.io/)
- [Insomnia](https://insomnia.rest/) – Utilizado para testar os endpoints da API

## 🛠️ Como rodar o projeto localmente

### 📋 Pré-requisitos

- Node.js (versão 18 ou superior recomendada)
- MySQL instalado e rodando localmente
- Git

### 📦 Instalação

1. **Clone o repositório:**

```bash
git clone https://github.com/juliamellolopes/teste-tecnico-backend.git
```

2. Instale as dependências:

 ```bash
npm install
```

3. Configure o arquivo .env:
Crie um arquivo .env na raiz do projeto com os seguintes dados:

 ```bash
DB_HOST=localhost
DB_PORT=3306
DB_USER=root
DB_PASS=sua_senha \\altere_para_sua_senha
DB_NAME=teste_tecnico \\nome_do_banco

JWT_SECRET=segredo-super-seguro
```

4. Suba o banco de dados:

 ```bash
CREATE DATABASE teste_tecnico;
```

5. Inicie o projeto:
   
 ```bash
npm run start:dev
```

6. Acesse a documentação Swagger:
http://localhost:3000/docs

## ⚙️ Funcionalidades da API

A API fornece os seguintes endpoints:

### 🔐 Autenticação

- `POST /auth/register`  
  Cria um novo usuário.

- `POST /auth/login`  
  Realiza login com e-mail e senha, retornando um token JWT.

### 👤 Usuários

- Os usuários cadastrados podem:
  - Criar tarefas associadas a si mesmos.
  - Ver apenas suas próprias tarefas.
  - Editar e excluir suas tarefas.

### ✅ Tarefas

> Todos os endpoints abaixo requerem um token JWT válido no cabeçalho `Authorization: Bearer <token>`.

- `GET /tasks`  
  Lista todas as tarefas do usuário autenticado.

- `POST /tasks`  
  Cria uma nova tarefa com base no corpo da requisição.

- `PUT /tasks/:id`  
  Atualiza uma tarefa específica do usuário autenticado.

- `DELETE /tasks/:id`  
  Remove uma tarefa específica do usuário autenticado.

## 🧪 Testes Manuais Sugeridos

Siga os passos abaixo para validar o comportamento esperado da API:

### ✅ Cenário 1: Criação e autenticação de usuários

1. Crie o usuário A via `POST /auth/register`
2. Crie o usuário B via `POST /auth/register`
3. Faça login com o usuário A (`POST /auth/login`) e salve o token.
4. Faça login com o usuário B (`POST /auth/login`) e salve o token.

### ✅ Cenário 2: Criação de tarefas

5. Com o token do usuário A, crie 2 tarefas com `POST /tasks`.
6. Com o token do usuário B, crie outras 2 tarefas com `POST /tasks`.

### ✅ Cenário 3: Visualização de tarefas

7. Faça um `GET /tasks` com o token do usuário A e verifique que aparecem **somente** as tarefas dele.
8. Faça o mesmo com o token do usuário B.

### ✅ Cenário 4: Edição de tarefas

9. Tente editar uma tarefa do usuário A com o token do usuário B → deve falhar.
10. Edite a própria tarefa de cada usuário com sucesso.

### ✅ Cenário 5: Exclusão de tarefas

11. Tente deletar uma tarefa do usuário A com o token do usuário B → deve falhar.
12. Delete uma tarefa própria com sucesso.
