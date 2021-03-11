import Head from "next/head";
import Image from "next/image";
import NavBarPk from "../../components/navbarpk";
import { Container, CardDeck } from "react-bootstrap";
import { connectToDatabase } from "../../util/mongodb";


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

export default function Pokedex({ pokemons }) {
  return (
    <>
      <Head>
        <title>PokemonFanSite - Pokedex</title>
      </Head>
      <NavBarPk />

      <Container className="my-4 p-4">
        <h3>Pokedex</h3>
        <CardDeck className="pokedex-card">
          {pokemons.map((pokemon) => (
            <PokemonsDex pokemon={pokemon} transparent={true} />
          ))}
        </CardDeck>
      </Container>
    </>
  );
}
