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
    .collection("types")
    .find({})
    .project({ tipo: 1 })
    .toArray();

  return {
    props: { types: JSON.parse(JSON.stringify(pks)) },
  };
}

export default function Typedex({types}) {
  return (
    <>
      <Head>
        <title>PokemonFanSite - Typedex</title>
      </Head>
      <NavBarPk />

      <Container className="my-4 p-4">
        <h3>Typedex</h3>
        <CardDeck className={Style.cardDeck}>
          {types.map((type) => (
            <div className="mb-4">
              <a href={`/typedex/${type.tipo}`} className={Style.cardLink}>
                <Card className={Style.card}>
                  <Card.Body className={Style.cardBody}>
                    <Card.Title className={Style.cardTitle}>
                      {` ${capitalize(type.tipo)} `}
                    </Card.Title>
                    <Image
                      src={`/assets/img/typedex/${type.tipo}.png`}
                      alt={type.tipo}
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
