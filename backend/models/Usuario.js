/**
 * models/Usuario.js
 *
 * Define o modelo de dados para autenticação de administradores.
 * Utiliza Mongoose para estruturar os dados de usuários no MongoDB.
 *
 * Campos:
 * - email: Email do usuário (obrigatório e único)
 * - senha: Senha do usuário (obrigatória, armazenada em texto simples neste exemplo)
 */

const mongoose = require('mongoose');

const UsuarioSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  senha: {
    type: String,
    required: true
  }
});

module.exports = mongoose.model('Usuario', UsuarioSchema);
