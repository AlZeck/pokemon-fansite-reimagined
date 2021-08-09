class User {
  #username;
  #team;
  constructor(username, pkm1, pkm2, pkm3, pkm4, pkm5, pkm6) {
    this.#username = username;
    this.#team = [pkm1, pkm2, pkm3, pkm4, pkm5, pkm6];
  }

  get username() {
    return this.#username;
  }

  get pkm1() {
    return this.#team[0];
  }

  get pkm2() {
    return this.#team[1];
  }

  get pkm3() {
    return this.#team[2];
  }

  get pkm4() {
    return this.#team[3];
  }

  get pkm5() {
    return this.#team[4];
  }
  
  get pkm6() {
    return this.#team[5];
  }

  findPokemonInTeamById(id) {
    return this.#team.filter((pkm) => pkm.id === id)[0];
  }

  get isDefeated() {
    return this.#team.reduce((prev, curr) => prev && curr.isDefeated);
  }
}

module.export = User;
