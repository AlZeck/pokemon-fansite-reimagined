const { Schema, model } = require('mongoose');

const tipoSchema = new Schema(
  {
    tipo: String,
    offensivo: {
        superefficace: [String],
        poco_efficace: [String],
        inefficace: [String]
    },
    diffensivo: {
        superefficace: [String],
        poco_efficace: [String],
        inefficace: [String]
    }
  },
  { timestamps: false },
);

module.exports = model('Type', tipoSchema);
