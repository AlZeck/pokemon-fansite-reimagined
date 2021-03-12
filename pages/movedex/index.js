import Head from "next/head";
import Image from "next/image";
import NavBarPk from "../../components/navbarpk";
import { Container, CardDeck, Card } from "react-bootstrap";
import { connectToDatabase } from "../../util/mongodb";
import { capitalize } from "../../util/stringUtils";

export async function getStaticProps(context) {
  const { db } = await connectToDatabase();

  const pks = await db
    .collection("moves")
    .find({})
    .project({ nome: 1, tipo: 1 })
    .toArray();

  return {
    props: { moves: JSON.parse(JSON.stringify(pks)) },
  };
}

export default function Movedex({moves}) {
  return (
    <>
      <Head>
        <title>PokemonFanSite - Movedex</title>
      </Head>
      <NavBarPk />

      <Container className="my-4 p-4">
        <h2>Movedex</h2>
        <div className="d-flex justify-content-center flex-row flex-wrap pokedex-card">
          {moves.map((move) => (
            <div className="mx-2 mb-4">
              <a href={`/movedex/${move.nome}`} className="pokedex-card transparent">
                <Card>
                  <Card.Body>
                    <Card.Title>
                      {` ${capitalize(move.nome)} `}
                    </Card.Title>
                    <Image
                      src={`/assets/img/mosse/${move.tipo}.png`}
                      alt={move.nome}
                      width={110}
                      height={110}
                    />
                  </Card.Body>
                </Card>
              </a>
            </div>
          ))}
        </div>
      </Container>
    </>
  );
}
