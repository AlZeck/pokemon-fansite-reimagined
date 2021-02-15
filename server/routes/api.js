const express = require("express");

const {
  createData,
  readData,
  updateData,
  deleteData,
} = require("../controllers/user_controller");

const { ListPokes, readPoke } = require("../controllers/pokemon_controller");
const { ListMoves, readMove } = require("../controllers/move_controller");
const { ListTypes, readType } = require("../controllers/type_controller");

const router = express.Router();

router
  .post("/", createData)
  .get("/", readData)
  .put("/:id", updateData)
  .delete("/:id", deleteData);

router.get("/pokedex", ListPokes).get("/pokedex/:name", readPoke);

router.get("/movedex", ListMoves).get("/movedex/:name", readMove);

router.get("/typedex", ListTypes).get("/typedex/:name", readType);

module.exports = router;
