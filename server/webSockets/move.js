/**
 * Container class for moves in Battle simulation
 * based on original code in PHP from Pokemon-FanSite
 */

const MoveDB = require("../models/move_schema")

class Move {
  #name;
  #type;
  #category;
  #power;
  #accuracy;

  async constructor(name) {
    const info = await MoveDB.findOne({nome: name});
    this.#name = info.name;
    this.#type = info.tipo;
    this.#category = info.categoria;
    this.#power = info.potenza;
    this.#accuracy = info.precisione;
  }

  get name() {
    return this.#name;
  }
  get type() {
    return this.#type;
  }
  get category() {
    return this.#category;
  }
  get power() {
    return this.#power;
  }
  get accuracy() {
    return this.#accuracy;
  }
}

module.exports = Move;