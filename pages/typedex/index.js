import Head from "next/head";
import Image from "next/image";
import NavBarPk from "../../components/navbarpk";
import { Container, CardDeck, Card } from "react-bootstrap";
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

export default function Typedex({ user, types }) {
  return (
    <>
      <Head>
        <title>PokemonFanSite - Typedex</title>
      </Head>
      <NavBarPk user={user} />

      <Container className="my-4 p-4">
        <h2>Typedex</h2>
        <div className="d-flex justify-content-center flex-row flex-wrap typedex-card">
          {types.map((type) => (
            <div className="mx-2 mb-4">
              <a
                href={`/typedex/${type.tipo}`}
                className="typedex-card transparent"
              >
                <Card className={type.tipo}>
                  <Card.Body>
                    <Card.Title>{` ${capitalize(type.tipo)} `}</Card.Title>
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
        </div>
      </Container>
    </>
  );
}
