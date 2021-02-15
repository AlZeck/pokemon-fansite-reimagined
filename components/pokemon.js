import { Card, Row, Col, Nav, Tab } from "react-bootstrap";
import { capitalize } from "../util/stringUtils";

function Stats(props) {
  const stats = ["ps", "att", "dif", "attsp", "difsp", "vel"];

  return (
    <Card>
      <Card.Body>
        <Card.Title> Statistiche </Card.Title>
        {stats.map((stat) => {
          const val = props.pokemon[stat];
          const per = (val * 100) / 270;
          return (
            <Row className="py-2">
              <Col sm={2} className="stat-label">
                {capitalize(stat)}
              </Col>
              <Col>
                <div className="progress justify-content-between">
                  <div
                    className={`progress-bar bar-stat-${stat}`}
                    role="progressbar"
                    aria-valuenow={`${per}`}
                    aria-valuemin="0"
                    aria-valuemax="270"
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
    </Card>
  );
}

function BtnTipo(props) {
  if (props.tipo !== "")
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

export { BtnTipo, Stats, PokeCard, VociPokedex, colors };
