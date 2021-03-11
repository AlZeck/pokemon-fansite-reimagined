import Head from "next/head";
import NavBarPk from "../../components/navbarpk";
import { Efficacy, PokemonsDex, colors } from "../../components/pokemon";
import {
  Container,
  CardDeck,
  Card,
  Row,
  Col,
  ButtonGroup,
  ButtonToolbar,
} from "react-bootstrap";
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

export default function type({ type }) {
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
      <NavBarPk />

      <Container className="my-4 p-4">
        <div className="mb-4" role="group">
          <h3> {capitalize(type.tipo)} </h3>
        </div>
        <Row>
          <Col className="mb-4">
             <Efficacy title="Offensivo" eff={type.offensivo}/> 
          </Col>
          <Col className="mb-4">
            <Efficacy title="Difensivo" eff={type.diffensivo}/>
          </Col>
        </Row>

        <Card>
          <Card.Body>
            <Card.Title> Pokemons </Card.Title>
            <CardDeck className="pokedex-card">
              {type.pokemons.map((pokemon) => (
                <PokemonsDex pokemon={pokemon} transparent={false} />
              ))}
            </CardDeck>
          </Card.Body>
        </Card>

        <Card className="mt-4">
          <Card.Body>
            <Card.Title>Mosse</Card.Title>
            <CardDeck>
              {type.mosse.map((move) => (
                <div className="mb-4">
                  <a
                    className={`card btn btn-tipo ${type.tipo} btn-move`}
                    href={`/movedex/${move.nome}`}
                  >
                    {capitalize(move.nome)}
                  </a>
                </div>
              ))}
            </CardDeck>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
