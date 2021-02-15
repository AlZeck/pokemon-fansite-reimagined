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
        <h3>Movedex</h3>
        <CardDeck className={Style.cardDeck}>
          {moves.map((move) => (
            <div className="mb-4">
              <a href={`/movedex/${move.nome}`} className={Style.cardLink}>
                <Card className={Style.card}>
                  <Card.Body className={Style.cardBody}>
                    <Card.Title className={Style.cardTitle}>
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
        </CardDeck>
      </Container>
    </>
  );
}
