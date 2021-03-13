import Head from "next/head";
import Image from "next/image";
import NavBarPk from "../../components/navbarpk";
import { Container, CardDeck } from "react-bootstrap";
import { connectToDatabase } from "../../util/mongodb";
import { PokemonsDex } from "../../components/pokemon"

export async function getStaticProps(context) {
  const { db } = await connectToDatabase();

  const pks = await db
    .collection("pokemons")
    .find({})
    .project({ id: 1, nome: 1 })
    .toArray();

  return {
    props: { pokemons: JSON.parse(JSON.stringify(pks)) },
  };
}

export default function Pokedex({ user, pokemons }) {
  return (
    <>
      <Head>
        <title>PokemonFanSite - Pokedex</title>
      </Head>
      <NavBarPk user={user} />

      <Container className="my-4 p-4">
        <h2>Pokedex</h2>
        <div className="d-flex justify-content-center flex-row flex-wrap pokedex-card">
          {pokemons.map((pokemon) => (
            <PokemonsDex pokemon={pokemon} transparent={true} />
          ))}
        </div>
      </Container>
    </>
  );
}
