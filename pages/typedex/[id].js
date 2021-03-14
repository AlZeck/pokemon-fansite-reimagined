import Head from "next/head";
import Image from "next/image";
import NavBarPk from "../../components/navbarpk";
import { Efficacy, PokemonsDex, colors } from "../../components/pokemon";
import { Container, Media, Card, Row, Col } from "react-bootstrap";
// import Style from "../../styles/Pokedex.module.css";
import { connectToDatabase } from "../../util/mongodb";
import { capitalize } from "../../util/stringUtils";

export async function getStaticPaths() {
  // Return a list of possible value for id
  const { db } = await connectToDatabase();

  const mvs = await db
    .collection("types")
    .find({})
    .project({ tipo: 1 })
    .toArray();

  const types = await JSON.parse(JSON.stringify(mvs));

  return {
    paths: types.map((type) => {
      return { params: { id: type.tipo } };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();

  const mvs = await db.collection("types").find({ tipo: params.id }).toArray();

  const type = JSON.parse(JSON.stringify(mvs[0]));

  if (!type) {
    return {
      notFound: true,
    };
  }

  return {
    props: { type },
  };
}

export default function type({ user, type }) {
  return (
    <>
      <Head>
        <title>PokemonFanSite - Typedex</title>
      </Head>
      <style global jsx>
        {`
          html,
          body {
            background-image: url(/assets/img/sfondi_tipi/${type.tipo}.jpg);
          }
          .nav-pills .nav-link.active,
          .nav-pills .show > .nav-link {
            color: #fff;
            background-color: ${colors[type.tipo]};
          }

          a.nav-link {
            color: ${colors[type.tipo]};
          }
        `}
      </style>
      <NavBarPk user={user} />

      <Container className="my-4 p-4">
        <Media className="mb-4">
          <Media.Body>
            <h2> {capitalize(type.tipo)} </h2>
          </Media.Body>
          <Image
            src={`/assets/img/typedex/${type.tipo}.png`}
            alt={type.tipo}
            width={40}
            height={40}
          />
        </Media>
        <Row>
          <Col className="mb-4">
            <Efficacy title="Offensivo" eff={type.offensivo} />
          </Col>
          <Col className="mb-4">
            <Efficacy title="Difensivo" eff={type.diffensivo} />
          </Col>
        </Row>

        <Card>
          <Card.Body>
            <Card.Title> Pokemons </Card.Title>
            <div className="d-flex justify-content-center flex-row flex-wrap pokedex-card">
              {type.pokemons.map((pokemon) => (
                <PokemonsDex key={pokemon.id} pokemon={pokemon} transparent={false} />
              ))}
            </div>
          </Card.Body>
        </Card>

        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Mosse</Card.Title>
            <div className="d-flex justify-content-center flex-row flex-wrap">
              {type.mosse.map((move,i) => (
                <div key={i} className="mx-2 mb-4">
                  <a
                    className={`btn btn-tipo ${type.tipo} btn-move`}
                    href={`/movedex/${move.nome}`}
                  >
                    {capitalize(move.nome)}
                  </a>
                </div>
              ))}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
