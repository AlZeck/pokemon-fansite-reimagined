import {
  pgTable,
  pgEnum,
  varchar,
  numeric,
  boolean,
  primaryKey,
} from "drizzle-orm/pg-core";

export const keyStatus = pgEnum("key_status", [
  "expired",
  "invalid",
  "valid",
  "default",
]);
export const keyType = pgEnum("key_type", [
  "stream_xchacha20",
  "secretstream",
  "secretbox",
  "kdf",
  "generichash",
  "shorthash",
  "auth",
  "hmacsha256",
  "hmacsha512",
  "aead-det",
  "aead-ietf",
]);
export const factorType = pgEnum("factor_type", ["webauthn", "totp"]);
export const factorStatus = pgEnum("factor_status", ["verified", "unverified"]);
export const aalLevel = pgEnum("aal_level", ["aal3", "aal2", "aal1"]);
export const codeChallengeMethod = pgEnum("code_challenge_method", [
  "plain",
  "s256",
]);

export const tipo = pgTable("tipo", {
  nome: varchar("nome", { length: 20 }).primaryKey().notNull(),
});

export const pokemon = pgTable("pokemon", {
  id: numeric("id").primaryKey().notNull(),
  nome: varchar("nome", { length: 20 }).notNull(),
  tipo1: varchar("tipo1", { length: 12 })
    .notNull()
    .references(() => tipo.nome),
  tipo2: varchar("tipo2", { length: 12 }).references(() => tipo.nome),
  ps: numeric("ps").notNull(),
  att: numeric("att").notNull(),
  dif: numeric("dif").notNull(),
  attsp: numeric("attsp").notNull(),
  difsp: numeric("difsp").notNull(),
  vel: numeric("vel").notNull(),
  uber: boolean("uber").notNull(),
});

export const mossa = pgTable("mossa", {
  id: numeric("id").primaryKey().notNull(),
  nome: varchar("nome", { length: 20 }).notNull(),
  tipo: varchar("tipo", { length: 12 })
    .notNull()
    .references(() => tipo.nome),
  categoria: varchar("categoria", { length: 10 }).notNull(),
  potenza: numeric("potenza").notNull(),
  precisione: numeric("precisione").notNull(),
  descrizione: varchar("descrizione", { length: 200 }).notNull(),
});

export const utente = pgTable("utente", {
  username: varchar("username", { length: 22 }).primaryKey().notNull(),
  password: varchar("password", { length: 100 }),
});

export const impara = pgTable(
  "impara",
  {
    pokemon: numeric("pokemon")
      .notNull()
      .references(() => pokemon.id),
    mossa: numeric("mossa")
      .notNull()
      .references(() => mossa.id),
  },
  (table) => {
    return {
      imparaPkey: primaryKey(table.pokemon, table.mossa),
    };
  }
);
