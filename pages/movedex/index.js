import React from "react";
import Head from "next/head";
import Image from "next/image";
import NavBarPk from "../../components/navbarpk";
import { Container, Card, Pagination } from "react-bootstrap";
import { connectToDatabase } from "../../util/mongodb";
import { capitalize } from "../../util/stringUtils";
import { MiddlePagination } from "../../components/pokemon";

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


const MAXPERPAGE = 25;
export default class Movedex extends React.Component {
  constructor(props) {
    super(props);
    let start = 0;
    let end = MAXPERPAGE;

    this.state = {
      start,
      end,
      active: 1,
      moves: this.props.moves?.slice(start, end),
    };
    this.handlePagination = this.handlePagination.bind(this);
  }

  handlePagination(active) {
    const start = MAXPERPAGE * (active - 1);
    const end = start + MAXPERPAGE;

    this.setState({
      start,
      end,
      active,
      moves: this.props.moves?.slice(start, end),
    });
  }

  render() {
    const moves = this.state.moves;
    const last = Math.ceil((this.props.moves?.length ?? 1) / MAXPERPAGE);
    return (
      <>
        <Head>
          <title>PokemonFanSite - Movedex</title>
        </Head>
        <NavBarPk user={this.props.user} />

        <Container className="my-4 p-4">
          <h2>Movedex</h2>
          <div className="d-flex justify-content-center flex-row flex-wrap pokedex-card">
            {moves.map((move,i) => (
              <div key={i} className="mx-2 mb-4">
                <a
                  href={`/movedex/${move.nome}`}
                  className="pokedex-card transparent"
                >
                  <Card>
                    <Card.Body>
                      <Card.Title>{` ${capitalize(move.nome)} `}</Card.Title>
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
          <div className="d-flex justify-content-center">
            <Pagination>
              <Pagination.First
                disabled={1 === this.state.active}
                onClick={() => this.handlePagination(1)}
              />
              <Pagination.Prev
                disabled={1 === this.state.active}
                onClick={() => this.handlePagination(this.state.active - 1)}
              />
              <MiddlePagination
                last={last}
                current={this.state.active}
                handler={this.handlePagination}
              />
              <Pagination.Next
                disabled={last === this.state.active}
                onClick={() => this.handlePagination(this.state.active + 1)}
              />
              <Pagination.Last
                disabled={last === this.state.active}
                onClick={() => this.handlePagination(last)}
              />
            </Pagination>
          </div>
        </Container>
      </>
    );
  }
}
