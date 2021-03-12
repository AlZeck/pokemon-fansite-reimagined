"use strict";

const Pokemon = require("../models/pokemon_schema");

const ListPokes = (req, res) => {
  Pokemon.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readPoke = (req, res) => {
  Pokemon.find({nome: req.params.name})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
    ListPokes, 
    readPoke,
}