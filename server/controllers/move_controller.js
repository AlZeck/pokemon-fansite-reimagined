"use strict";

const Move = require("../models/move_schema");

const ListMoves = (req, res) => {
  Move.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readMove = (req, res) => {
  Move.find({nome: req.params.name})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
    ListMoves, 
    readMove,
}