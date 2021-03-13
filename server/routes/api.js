const express = require("express");

const { ListPokes, readPoke } = require("../controllers/pokemon_controller");
const { ListMoves, readMove } = require("../controllers/move_controller");
const { ListTypes, readType } = require("../controllers/type_controller");

const router = express.Router();

router.get("/pokedex", ListPokes).get("/pokedex/:name", readPoke);

router.get("/movedex", ListMoves).get("/movedex/:name", readMove);

router.get("/typedex", ListTypes).get("/typedex/:name", readType);

module.exports = router;
