/**
 * models/Pergunta.js
 *
 * Define o modelo de dados para perguntas enviadas pelos usuários.
 * Utiliza Mongoose para estruturar os documentos armazenados no MongoDB.
 *
 * Campos:
 * - nome: Nome do usuário que enviou a pergunta (obrigatório)
 * - email: Email do usuário (obrigatório)
 * - pergunta: Texto da pergunta feita (obrigatório)
 * - resposta: Resposta fornecida pelo administrador (pode ser nula inicialmente)
 * - data: Data de criação da pergunta (gerada automaticamente)
 * - dataResposta: Data em que a resposta foi enviada (nulo até ser respondida)
 */

const mongoose = require('mongoose');

const PerguntaSchema = new mongoose.Schema({
  nome: { type: String, required: true },
  email: { type: String, required: true },
  pergunta: { type: String, required: true },
  resposta: { type: String, default: null },
  data: { type: Date, default: Date.now },
  dataResposta: { type: Date, default: null }
});

module.exports = mongoose.model('Pergunta', PerguntaSchema);
