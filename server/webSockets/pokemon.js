/**
 * Container class for pokemons in Battle simulation
 * based on original code in PHP from Pokemon-FanSite
 */

const PokemonDB = require("../models/pokemon_schema");
const Move = require("./move");

class Pokemon {
  #id;
  #name;
  #type1;
  #type2;

  #hp;
  #atk;
  #def;
  #spAtk;
  #spDef;
  #speed;
  
  #uber;

  #moveSet;

  async constructor(id, move1, move2, move3, move4) {
    let info = await PokemonDB.findOne({ id: id });
    this.#id = info.id;
    this.#name = info.name;
    this.#type1 = info.tipo1;
    this.#type2 = info.tipo2;
    this.#hp = info.ps;
    this.#atk = info.att;
    this.#def = info.def;
    this.#spAtk = info.attsp;
    this.#spDef = info.difsp;
    this.#speed = info.vel;
    this.#uber = info.uber;
    this.#moveSet = [ move1, move2, move3, move4 ].map( (move) => { return await new Move(move)} );
  }

  get id() {
    return this.#id;
  }
  get name() {
    return this.#name;
  }
  get type1() {
    return this.#type1;
  }
  get type2() {
    return this.#type2;
  }

  get hp() {
    return this.#hp;
  }
  get atk() {
    return this.#atk;
  }
  get def() {
    return this.#def;
  }
  get spAtk() {
    return this.#spAtk;
  }
  get spDef() {
    return this.#spDef;
  }
  get speed() {
    return this.#speed;
  }
  get uber() {
    return this.#uber;
  }

  get move(name) { 
    return this.#moveSet.find( move => move.name === name)
  }

  set applyDamage(damage) {
    this.#hp -= damage;
    if ( this.isDead )
      this.#hp = 0;
  }

  get isDead() {
    return this.#hp > 0;
  }
}

module.exports = Pokemon;
