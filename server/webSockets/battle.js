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
     }
 
 
 }
 
 module.exports = Pokemon;
 