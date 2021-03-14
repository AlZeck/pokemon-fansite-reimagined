import Image from "next/image";
import { CardDeck, Card, Row, Col, Nav, Tab } from "react-bootstrap";
import { capitalize } from "../util/stringUtils";

function Stats(props) {
  var stats = ["potenza", "precisione"];
  var max = 250;
  var dim = 4;
  if (props.type === "Pokemon") {
    stats = ["ps", "att", "dif", "attsp", "difsp", "vel"];
    max = 270;
    dim = 2;
  }
  return (
    <Card.Body>
      <Card.Title> Statistiche </Card.Title>
      {stats.map((stat) => {
        const val = props.info[stat];
        const per = (val * 100) / max;
        return (
          <Row className="py-2">
            <Col sm={dim} className="stat-label">
              {capitalize(stat)}
            </Col>
            <Col>
              <div className="progress justify-content-between">
                <div
                  className={`progress-bar bar-stat-${stat}`}
                  role="progressbar"
                  aria-valuenow={`${per}`}
                  aria-valuemin="0"
                  aria-valuemax={`${max}`}
                  style={{ width: `${per}%` }}
                >
                  {` ${val} `}
                </div>
              </div>
            </Col>
          </Row>
        );
      })}
    </Card.Body>
  );
}

function BtnTipo(props) {
  if (props.notClickable){
    return (
      <div
        className={`btn btn-tipo ${props.tipo}`}
        style={{cursor: "default"}}
      >
        {capitalize(props.tipo)}
      </div>
    );
  }
  else if (props.tipo !== "")
    return (
      <a
        className={`btn btn-tipo ${props.tipo}`}
        href={`/typedex/${props.tipo}`}
      >
        {capitalize(props.tipo)}
      </a>
    );
  else return "";
}

function PokeCard(props) {
  return (
    <Card className="pokecard">
      <img
        className="card-img-top"
        src={`/assets/pokemon/artwork/${props.pokemon}.png`}
        alt={props.pokemon}
      />
      <Card.Body>
        <div className="row row-sprites">
          <Card>
            <img
              className="card-img-top"
              src={`/assets/pokemon/mini_sprite/${props.pokemon}.png`}
              alt={`${props.pokemon}_mini_sprite`}
            />
          </Card>
          <Card>
            <img
              className="card-img-top"
              src={`/assets/pokemon/front_sprite/${props.pokemon}.gif`}
              alt={`${props.pokemon}_front_sprite`}
            />
          </Card>
          <Card>
            <img
              className="card-img-top"
              src={`/assets/pokemon/back_sprite/${props.pokemon}.gif`}
              alt={`${props.pokemon}_back_sprite`}
            />
          </Card>
        </div>
      </Card.Body>
    </Card>
  );
}

function VociPokedex(props) {
  return (
    <Card>
      <Tab.Container defaultActiveKey="Voce1">
        <Card.Header>
          <Card.Title> Voci pokedex </Card.Title>
          <Nav variant="pills" cardHeaderBsPrefix>
            {props.voci.map((_, c) => (
              <Nav.Item>
                <Nav.Link eventKey={`Voce${c + 1}`}>{`Voce ${c + 1}`}</Nav.Link>
              </Nav.Item>
            ))}
          </Nav>
        </Card.Header>
        <Card.Body>
          <Tab.Content>
            {props.voci.map((v, c) => (
              <Tab.Pane eventKey={`Voce${c + 1}`}>
                <div className="voce-text">{v.voce}</div>
                <div class="row games-card-deck">
                  {v.giochi.map((game) => (
                    <img
                      class="card mb-4"
                      src={`/assets/img/boxart/${game}.png`}
                      alt={`${game}_boxart`}
                    />
                  ))}
                </div>
              </Tab.Pane>
            ))}
          </Tab.Content>
        </Card.Body>
      </Tab.Container>
    </Card>
  );
}

const colors = {
  acciaio: "#1D4C5E",
  acqua: "#114983",
  buio: "#1E1A25",
  coleottero: "#547904",
  drago: "#002B50",
  elettro: "#917908",
  erba: "#11500A",
  folletto: "#A940A3",
  fuoco: "#A74700",
  ghiaccio: "#187C6A",
  lotta: "#801334",
  normale: "#444B53",
  ombra: "#3E3355",
  psico: "#A20D14",
  roccia: "#7E6E3F",
  sconosciuto: "#44685E",
  spettro: "#193177",
  terra: "#9A3E0B",
  veleno: "#79339D",
  volante: "#3B5DA2",
  fisico: "#82150B",
};

function PokemonsDex(props) {
  return (
    <div className="mx-2 mb-4">
      <a
        href={`/pokedex/${props.pokemon.nome}`}
        className={`pokedex-card ${props.transparent ? "transparent" : ""}`}
      >
        <Card>
          <Card.Body>
            <Card.Title>
              <span className="number"> #{props.pokemon.id} </span>
              {" " + capitalize(props.pokemon.nome)}
            </Card.Title>
            <Image
              src={`/assets/pokemon/artwork/${props.pokemon.nome}.png`}
              alt={props.pokemon.nome}
              width={110}
              height={110}
            />
          </Card.Body>
        </Card>
      </a>
    </div>
  );
}

function EfficacyTypes(props) {
  return (
    <>
      <strong> {props.title} </strong>
      <CardDeck className="justify-content-center">
        {props.types.map((type) => (
          <a
            className={`btn btn-tipo ${type} btn-move m-2`}
            href={`/typedex/${type}`}
          >
            {capitalize(type)}
          </a>
        ))}
      </CardDeck>
    </>
  );
}

function Efficacy(props) {
  return (
    <Card className="h-100 text-center">
      <Card.Header>
        <Card.Title>{props.title}</Card.Title>
      </Card.Header>
      <Card.Body>
        <EfficacyTypes title="Superefficace" types={props.eff.superefficace} />
        <hr />
        <EfficacyTypes title="Poco Efficace" types={props.eff.poco_efficace} />
        <hr />
        <EfficacyTypes title="Inefficace" types={props.eff.inefficace} />
      </Card.Body>
    </Card>
  );
}

export { BtnTipo, Stats, PokeCard, VociPokedex, colors, PokemonsDex, Efficacy };
