"use strict";

const Type = require("../models/type_schema");

const ListTypes = (req, res) => {
  Type.find()
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

const readType = (req, res) => {
  Type.find({nome: req.params.name})
    .then((data) => {
      res.status(200).json(data);
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json(err);
    });
};

module.exports = {
    ListTypes, 
    readType,
}