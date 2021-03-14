import React from "react";
import Head from "next/head";
import Image from "next/image";
import NavBarPk from "../../components/navbarpk";
import { Container, Pagination } from "react-bootstrap";
import { connectToDatabase } from "../../util/mongodb";
import { PokemonsDex , MiddlePagination } from "../../components/pokemon";

export async function getStaticProps(context) {
  const { db } = await connectToDatabase();

  const pks = await db
    .collection("pokemons")
    .find({})
    .project({ id: 1, nome: 1 })
    .toArray();

  return {
    props: { pokemons: JSON.parse(JSON.stringify(pks)) },
  };
}

const MAXPERPAGE = 25;
export default class Pokedex extends React.Component {
  constructor(props) {
    super(props);
    let start = 0;
    let end = MAXPERPAGE;

    this.state = {
      start,
      end,
      active: 1,
      pokemons: this.props.pokemons?.slice(start, end),
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
      pokemons: this.props.pokemons?.slice(start, end),
    });
  }

  render() {
    const last = Math.ceil((this.props.pokemons?.length ?? 1) / MAXPERPAGE);

    return (
      <>
        <Head>
          <title>PokemonFanSite - Pokedex</title>
        </Head>
        <NavBarPk user={this.props.user} />

        <Container className="my-4 p-4">
          <h2>Pokedex</h2>

          <div className="d-flex justify-content-center flex-row flex-wrap pokedex-card">
            {this.state.pokemons.map((pokemon) => (
              <PokemonsDex key={pokemon.id} pokemon={pokemon} transparent={true} />
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
