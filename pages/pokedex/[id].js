import Head from "next/head";
import NavBarPk from "../../components/navbarpk";
import { BtnTipo, Stats, PokeCard, VociPokedex, colors } from "../../components/pokemon";
import {
  Container,
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

  const pks = await db
    .collection("pokemons")
    .find({})
    .project({ id: 1, nome: 1 })
    .toArray();

  const pokemons = await JSON.parse(JSON.stringify(pks));

  return {
    paths: pokemons.map((pokemon) => {
      return { params: { id: pokemon.nome } };
    }),
    fallback: false,
  };
}

export async function getStaticProps({ params }) {
  const { db } = await connectToDatabase();

  const pks = await db
    .collection("pokemons")
    .find({ nome: params.id })
    .toArray();

  const pokemon = JSON.parse(JSON.stringify(pks[0]));

  if (!pokemon) {
    return {
      notFound: true,
    };
  }

  return {
    props: { pokemon },
  };
}

export default function Pokemon({ user, pokemon }) {
  return (
    <>
      <Head>
        <title>PokemonFanSite - Pokedex</title>
      </Head>
      <style global jsx>
        {`
          html, body {
            background-image: url(/assets/img/sfondi_tipi/${pokemon.tipo1}.jpg);
          }
          .nav-pills .nav-link.active,
          .nav-pills .show > .nav-link {
            color: #fff;
            background-color: ${colors[pokemon.tipo1]};
          }

          a.nav-link {
            color: ${colors[pokemon.tipo1]};
          }
        `}
      </style>
      <NavBarPk user={user} />

      <Container className="my-4 p-4">
        <Row>
          <Col>
            <ButtonToolbar className="justify-content-between">
              <div role="group">
                <h2> {capitalize(pokemon.nome)} </h2>
              </div>
              <ButtonGroup>
                <BtnTipo tipo={pokemon.tipo1} />
                <BtnTipo tipo={pokemon.tipo2} />
              </ButtonGroup>
            </ButtonToolbar>

            <Card className="my-4">
              <Stats info={pokemon} type="Pokemon" />
            </Card>
          </Col>
          <Col className="mb-4" sm={4}>
            <PokeCard pokemon={pokemon.nome} />
          </Col>
        </Row>
        <VociPokedex voci={pokemon.voci_pokedex} />
        <Card className="mt-4">
          <Card.Body>
            <Card.Title> Mosse </Card.Title>
            <div className="d-flex justify-content-center flex-row flex-wrap">
              {pokemon.mosse.map((move,i) => (
                <div key={i} className="mx-2 mb-4">
                  <a className={`btn btn-tipo ${move.tipo} btn-move`}
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
