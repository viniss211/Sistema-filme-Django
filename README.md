# Perguntas & Respostas sobre Django Livre 🤠

Projeto full stack com frontend institucional estático, painel de administração em React e backend Node.js com MongoDB, para recebimento e resposta de perguntas com envio automático por e-mail.

---

## 📁 Estrutura do Projeto

```
/backend              → API backend (Node.js + Express)
   models/         → Models Mongoose (Pergunta, Usuario)
   .env            → Configurações sensíveis (Mongo URI e e-mail)
   index.js        → Lógica principal da API

/landing-page         → Página estática de envio de perguntas
   index.html      → Interface pública
   style.css       → Estilização
   img/            → Imagens usadas na landing

/painel-admin         → Painel administrativo (React)
   src/            → Código-fonte React
   public/         → Arquivos públicos
   README.md       → Documentação do frontend admin
```

---

## 🚀 Como rodar o projeto localmente

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/oracclum.git
cd oracclum
```

---

## 🔧 Backend (Node.js)

### 2. Acesse a pasta do backend

```bash
cd backend
```

### 3. Instale as dependências

```bash
npm install
```

---

## ⚙️ Configuração do MongoDB com Compass

### 4. Instale o MongoDB Compass

Baixe em: https://www.mongodb.com/try/download/compass

### 5. Crie o banco de dados e usuário

- Abra o Compass
- Crie um banco chamado `oracclum`
- Crie uma coleção chamada `perguntas`
- (Opcional) Crie um usuário no banco `admin` com permissão de leitura e escrita:

```bash
mongosh
```

```js
use admin

db.createUser({
  user: "meuusuario",
  pwd: "minhasenha",
  roles: [ { role: "readWrite", db: "oracclum" } ]
})
```

---

### 6. Crie o arquivo `.env` na pasta `/backend`

```env
MONGO_URI=mongodb://meuusuario:minhasenha@localhost:27017/oracclum?authSource=admin
EMAIL_USER=seuemail@gmail.com
EMAIL_PASS=senhadeaplicativo
```

⚠️ **IMPORTANTE:** Use uma senha de aplicativo do Gmail.  
Gere em: https://myaccount.google.com/apppasswords

---

### 7. Inicie o backend

```bash
node index.js
```

O backend estará rodando em: `http://localhost:3000`

---

## 🖥️ Painel Administrativo (React)

### 8. Acesse a pasta do painel

```bash
cd ../painel-admin
```

### 9. Instale as dependências

```bash
npm install
```

### 10. Inicie o painel React

```bash
npm start
```


---

## 🌐 Landing Page

### 11. Acesse o `index.html`

Abra o arquivo diretamente no navegador(recomendo o uso da extensão lives server do VScode):

```bash
landing-page/index.html
```

⚠️ A landing faz requisições para o backend local, então ele deve estar rodando antes.

---

## 📦 Instalação de Dependências

Antes de rodar o projeto, é necessário instalar as dependências nas pastas corretas:

### 🔧 Backend (Node.js)

Acesse a pasta `/backend` e execute:

```bash
cd backend
npm install
```

Dependências utilizadas:
- express
- mongoose
- cors
- nodemailer
- dotenv

---

### 🖥️ Painel Administrativo (React)

Acesse a pasta `/painel-admin` e execute:

```bash
cd painel-admin
npm install
```

Dependências utilizadas:
- react
- react-dom
- react-router-dom
- vite (ou create-react-app, conforme setup)

---

### 🌐 Landing Page

A landing-page é uma página estática, então **não requer instalação de dependências**. Basta abrir o `index.html` diretamente no navegador.

---

## 👤 Login de administrador

### A) Login fixo:

```
Email: admin@email.com
Senha: 123456
```

### B) Login via modelo `Usuario`:

1. Insira manualmente no banco:

```json
{
  "email": "admin@email.com",
  "senha": "123456"
}
```

> ⚠️ Em produção, use hashing (ex: bcrypt)

---

## 📬 Como funciona

- Visitante envia pergunta pela landing
- Admin responde pela interface do painel
- E-mail automático é enviado com a resposta

---

## 🛠️ Tecnologias

- **Frontend público**: HTML, CSS
- **Painel**: React + React Router DOM
- **Backend**: Node.js, Express, Nodemailer
- **Banco de Dados**: MongoDB
- **E-mail**: Gmail + App Password

