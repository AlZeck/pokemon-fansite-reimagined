-- Current sql file was generated after introspecting the database
-- If you want to run this migration please uncomment this code before executing migrations
/*
DO $$ BEGIN
 CREATE TYPE "key_status" AS ENUM('expired', 'invalid', 'valid', 'default');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "key_type" AS ENUM('stream_xchacha20', 'secretstream', 'secretbox', 'kdf', 'generichash', 'shorthash', 'auth', 'hmacsha256', 'hmacsha512', 'aead-det', 'aead-ietf');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_type" AS ENUM('webauthn', 'totp');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "factor_status" AS ENUM('verified', 'unverified');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "aal_level" AS ENUM('aal3', 'aal2', 'aal1');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 CREATE TYPE "code_challenge_method" AS ENUM('plain', 's256');
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tipo" (
	"nome" varchar(20) PRIMARY KEY NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "pokemon" (
	"id" numeric PRIMARY KEY NOT NULL,
	"nome" varchar(20) NOT NULL,
	"tipo1" varchar(12) NOT NULL,
	"tipo2" varchar(12),
	"ps" numeric NOT NULL,
	"att" numeric NOT NULL,
	"dif" numeric NOT NULL,
	"attsp" numeric NOT NULL,
	"difsp" numeric NOT NULL,
	"vel" numeric NOT NULL,
	"uber" boolean NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "mossa" (
	"id" numeric PRIMARY KEY NOT NULL,
	"nome" varchar(20) NOT NULL,
	"tipo" varchar(12) NOT NULL,
	"categoria" varchar(10) NOT NULL,
	"potenza" numeric NOT NULL,
	"precisione" numeric NOT NULL,
	"descrizione" varchar(200) NOT NULL
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "utente" (
	"username" varchar(22) PRIMARY KEY NOT NULL,
	"password" varchar(100)
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "impara" (
	"pokemon" numeric NOT NULL,
	"mossa" numeric NOT NULL,
	CONSTRAINT impara_pkey PRIMARY KEY("pokemon","mossa")
);
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon" ADD CONSTRAINT "pokemon_tipo1_fkey" FOREIGN KEY ("tipo1") REFERENCES "tipo"("nome") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "pokemon" ADD CONSTRAINT "pokemon_tipo2_fkey" FOREIGN KEY ("tipo2") REFERENCES "tipo"("nome") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "mossa" ADD CONSTRAINT "mossa_tipo_fkey" FOREIGN KEY ("tipo") REFERENCES "tipo"("nome") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "impara" ADD CONSTRAINT "impara_mossa_fkey" FOREIGN KEY ("mossa") REFERENCES "mossa"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "impara" ADD CONSTRAINT "impara_pokemon_fkey" FOREIGN KEY ("pokemon") REFERENCES "pokemon"("id") ON DELETE no action ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;

*/