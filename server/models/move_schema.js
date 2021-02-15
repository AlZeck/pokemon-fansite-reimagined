const { Schema, model } = require('mongoose');

const mossaSchema = new Schema(
  {
    nome: String,
    tipo: String,
    categoria: String,
    potenza: Number,
    precisione: Number,
    descrizione: String
  },
  { timestamps: false },
);

module.exports = model('Move', mossaSchema);
