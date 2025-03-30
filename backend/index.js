require('dotenv').config(); // carrega o .env
const mongoose = require('mongoose');
const Pergunta = require('./models/Pergunta');
const Usuario = require('./models/Usuario');
const cors = require('cors');
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER, // seu email
    pass: process.env.EMAIL_PASS  // senha ou app password
  }
});

// Conectar ao MongoDB local
mongoose.connect(process.env.MONGO_URI)
.then(() => console.log('MongoDB conectado!'))
.catch(err => console.error('Erro ao conectar no MongoDB:', err));


//Importar módulo express (framework web pro node)
const express = require('express');

//Agr criando aplicação express
const app = express();

//Porta 3000
const port = 3000;

// Permitindo que o servidor entenda arquivos json
app.use(cors());
app.use(express.json())

//Criando a rota do GET
app.get('/', (req,res)=>{
    res.send('API do Django funcionando');
});

//REQUISIÇÃO POST CRIAR PERGUNT
app.post('/criar-pergunta', async (req, res) => {
  const { nome, email, pergunta } = req.body;

  if (!nome || !email || !pergunta) {
    return res.status(400).json({ erro: 'Nome, email e pergunta são obrigatórios.' });
  }

  try {
    const novaPergunta = await Pergunta.create({ nome, email, pergunta });
    res.status(201).json({ mensagem: 'Pergunta recebida com sucesso!', pergunta: novaPergunta });
  } catch (err) {
    console.error(err);
    res.status(500).json({ erro: 'Erro ao salvar a pergunta no banco de dados.' });
  }
});


//REQUISIÇÃO GET BUSCAR PERGUNTA
app.get('/buscar-perguntas', async (req, res) => {
  try {
    const perguntas = await Pergunta.find().sort({ data: -1 }); // mais recentes primeiro
    res.status(200).json(perguntas);
  } catch (err) {
    res.status(500).json({ erro: 'Erro ao buscar perguntas.' });
  }
});


//REQUISIÇÃO RESPONDER-PERGUNTA
app.post('/responder-pergunta', async (req, res) => {
  const { id, resposta } = req.body;

  if (!id || !resposta) {
    return res.status(400).json({ erro: 'ID da pergunta e resposta são obrigatórios.' });
  }

  try {
    const perguntaAtualizada = await Pergunta.findByIdAndUpdate(
      id,
      { resposta, dataResposta: new Date() },
      { new: true }
    );

    if (!perguntaAtualizada) {
      return res.status(404).json({ erro: 'Pergunta não encontrada.' });
    }

    // Enviar e-mail
    await transporter.sendMail({
      from: `"Oracclum" <${process.env.EMAIL_USER}>`,
      to: perguntaAtualizada.email,
      subject: 'Resposta à sua pergunta sobre Django Livre',
      text: `Olá ${perguntaAtualizada.nome || 'amigo'},\n\nSua pergunta:\n"${perguntaAtualizada.pergunta}"\n\nFoi respondida com:\n"${resposta}"\n\nObrigado por participar!`
    });

    console.log('✅ Email enviado com sucesso!');

    res.status(200).json({ mensagem: 'Pergunta respondida com sucesso!', pergunta: perguntaAtualizada });

  } catch (err) {
    console.error('❌ Erro ao enviar e-mail:', err);
    res.status(500).json({ erro: 'Erro ao responder a pergunta.' });
  }
});

  
// REQUISIÇÂO POST PARA LOGIN
app.post('/login', (req, res) => {
    const { email, senha } = req.body;
  
    if (email === 'admin@email.com' && senha === '123456') {
      return res.status(200).json({ mensagem: 'Login realizado com sucesso!' });
    } else {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }
  });
  
//Inicializa o servidor 
app.listen(port,()=>{
    console.log(`Servidor rodando em http://localhost:${port}`);
});

app.post('/login', async (req, res) => {
  const { email, senha } = req.body;

  try {
    const usuario = await Usuario.findOne({ email });

    if (!usuario || usuario.senha !== senha) {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }

    res.status(200).json({ mensagem: 'Login realizado com sucesso!' });
  } catch (err) {
    console.error('Erro ao fazer login:', err);
    res.status(500).json({ erro: 'Erro no servidor ao tentar login.' });
  }
});