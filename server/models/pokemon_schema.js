const { Schema, model } = require('mongoose');

const pokemonSchema = new Schema(
  {
    id: Number,
    nome: String,
    tipo1: String,
    tipo2: String,
    ps: Number,
    att: Number,
    dif: Number,
    attsp: Number,
    difsp: Number,
    vel: Number,
    uber: Boolean,
    voci_pokedex: [{ voce: String, giochi: [String] }],
    mosse: [{nome: String, tipo: String}],
  },
  { timestamps: false },
);

module.exports = model('Pokemon', pokemonSchema);
