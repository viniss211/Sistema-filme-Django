//Importar módulo express (framework web pro node)
const express = require('express');

//Agr criando aplicação express
const app = express();

//Porta 3000
const port = 3000;

// Permitindo que o servidor entenda arquivos json
app.use(express.json())

//Criando a rota do GET
app.get('/', (req,res)=>{
    res.send('API do Django funcionando');
});

//REQUISIÇÃO POST CRIAR PERGUNTA
const perguntas = [];
app.post('/criar-pergunta', (req, res) => {
    const { nome, email, pergunta } = req.body;
  
    if (!nome || !email || !pergunta) {
      return res.status(400).json({ erro: 'Nome, email e pergunta são obrigatórios.' });
    }
  
    const novaPergunta = {
      id: perguntas.length + 1,
      nome,
      email,
      pergunta,
      resposta: null,
      dataPergunta: new Date()
    };
  
    perguntas.push(novaPergunta);
  
    res.status(201).json({ mensagem: 'Pergunta recebida com sucesso!', pergunta: novaPergunta });
  });

//REQUISIÇÃO GET BUSCAR PERGUNTA
app.get('/buscar-perguntas', (req, res) => {
    res.status(200).json(perguntas);
});

//REQUISIÇÃO RESPONDER-PERGUNTA
app.post('/responder-pergunta', (req, res) => {
    const { id, resposta } = req.body;
  
    if (!id || !resposta) {
      return res.status(400).json({ erro: 'ID da pergunta e resposta são obrigatórios.' });
    }
  
    const pergunta = perguntas.find(p => p.id === id);
  
    if (!pergunta) {
      return res.status(404).json({ erro: 'Pergunta não encontrada.' });
    }
  
    pergunta.resposta = resposta;
    pergunta.dataResposta = new Date();
  
    res.status(200).json({ mensagem: 'Pergunta respondida com sucesso!', pergunta });
  });  

  app.post('/login', (req, res) => {
    const { email, senha } = req.body;
  
    if (email === 'admin@email.com' && senha === '123456') {
      return res.status(200).json({ mensagem: 'Login realizado com sucesso!' });
    } else {
      return res.status(401).json({ erro: 'Credenciais inválidas.' });
    }
  });
  
  
const usuarioAdmin = {
    email: "admin@email.com",
    senha: "123456" // no futuro pode ser criptografado
  };
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