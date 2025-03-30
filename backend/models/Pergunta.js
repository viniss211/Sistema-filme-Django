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
