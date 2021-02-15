import Head from "next/head";
import Image from "next/image";
import NavBarPk from "../../components/navbarpk";
import { BtnTipo, Stats, PokeCard, VociPokedex, colors } from "../../components/pokemon";
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

export default function Pokemon({ pokemon }) {
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
      <NavBarPk />

      <Container className="my-4 p-4">
        <Row>
          <Col>
            <ButtonToolbar className="justify-content-between">
              <div role="group">
                <h3> {capitalize(pokemon.nome)} </h3>
              </div>
              <ButtonGroup>
                <BtnTipo tipo={pokemon.tipo1} />
                <BtnTipo tipo={pokemon.tipo2} />
              </ButtonGroup>
            </ButtonToolbar>

            <Card className="my-4">
              <Stats pokemon={pokemon} />
            </Card>
          </Col>
          <Col sm={4}>
            <PokeCard pokemon={pokemon.nome} />
          </Col>
        </Row>
        <VociPokedex voci={pokemon.voci_pokedex} />
        <Card className="mt-4">
          <Card.Body>
            <Card.Title> Mosse </Card.Title>
            <CardDeck>
              {pokemon.mosse.map(move => (
                <div className="mb-4">
                  <a className={`card btn btn-tipo ${move.tipo} btn-move`}
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
