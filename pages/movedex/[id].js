import Head from "next/head";
import NavBarPk from "../../components/navbarpk";
import { BtnTipo, Stats, PokemonsDex, colors } from "../../components/pokemon";
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
    .collection("moves")
    .find({})
    .project({ nome: 1 })
    .toArray();

  const moves = await JSON.parse(JSON.stringify(mvs));

  return {
    paths: moves.map((move) => {
      return { params: { id: move.nome } };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();

  const mvs = await db.collection("moves").find({ nome: params.id }).toArray();

  const move = JSON.parse(JSON.stringify(mvs[0]));

  if (!move) {
    return {
      notFound: true,
    };
  }

  return {
    props: { move },
  };
}

export default function move({user, move }) {
  return (
    <>
      <Head>
        <title>PokemonFanSite - Movedex</title>
      </Head>
      <style global jsx>
        {`
          html,
          body {
            background-image: url(/assets/img/sfondi_tipi/${move.tipo}.jpg);
          }
          .nav-pills .nav-link.active,
          .nav-pills .show > .nav-link {
            color: #fff;
            background-color: ${colors[move.tipo]};
          }

          a.nav-link {
            color: ${colors[move.tipo]};
          }
        `}
      </style>
      
      <NavBarPk user={user} />

      <Container className="my-4 p-4">
        <Row>
          <Col className="mb-4">
            <ButtonToolbar className="justify-content-between">
              <div className="mb-4" role="group">
                <h2> {capitalize(move.nome)} </h2>
              </div>
              <ButtonGroup className="mb-4">
                <BtnTipo tipo={move.tipo} />
                <BtnTipo tipo={move.categoria} notClickable/>
              </ButtonGroup>
            </ButtonToolbar>
            <Card>
              <Card.Body>
              <Card.Title>Descrizione</Card.Title>
              {move.descrizione}
              </Card.Body>
            </Card>
          </Col>
          <Col className="mb-4">
            <Card className="h-100">
              <Stats info={move} type="move" />
            </Card>
          </Col>
        </Row>

        <Card>
          <Card.Body>
            <Card.Title> Pokemons </Card.Title>
            <div className="d-flex justify-content-center flex-row flex-wrap pokedex-card">
              {move.pokemons.map((pokemon) => (
                <PokemonsDex pokemon={pokemon} transparent={false} />
              ))}
            </div>
          </Card.Body>
        </Card>
      </Container>
    </>
  );
}
