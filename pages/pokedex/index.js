import Head from "next/head";
import Image from "next/image";
import NavBarPk from "../../components/navbarpk";
import { Container, CardDeck, Card } from "react-bootstrap";
import Style from "../../styles/Pokedex.module.css";
import { connectToDatabase } from "../../util/mongodb";
import { capitalize } from "../../util/stringUtils";

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
        <CardDeck className={Style.cardDeck}>
          {pokemons.map((pokemon) => (
            <div className="mb-4">
              <a href={`/pokedex/${pokemon.nome}`} className={Style.cardLink}>
                <Card className={Style.card}>
                  <Card.Body className={Style.cardBody}>
                    <Card.Title className={Style.cardTitle}>
                      {" "}
                      <span className={Style.number}> #{pokemon.id} </span>{" "}
                      {capitalize(pokemon.nome)}{" "}
                    </Card.Title>
                    <Image
                      src={`/assets/pokemon/artwork/${pokemon.nome}.png`}
                      alt={pokemon.nome}
                      width={110}
                      height={110}
                    />
                  </Card.Body>
                </Card>
              </a>
            </div>
          ))}
        </CardDeck>
      </Container>
    </>
  );
}
