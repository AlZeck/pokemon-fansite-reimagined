import Head from "next/head";
import Link from "next/link";
import NavBarPk from "../components/navbarpk";
import { Container, Carousel, CardDeck, Card } from "react-bootstrap";

export default function Home({user}) {
  return (
    <>
      <Head>
        <title>PokemonFanSite</title>
      </Head>
      <NavBarPk user={user} />

      <Container className="my-4 p-4">
        {/* Descrizione */}
        {/* Slideshow A.K.A. Carousel*/}
        <Carousel>
          <Carousel.Item interval={10000}>
            <img
              src="/assets/img/home_page/logo.jpg"
              className="d-block w-100"
              alt="Logo PokemonFan"
            />
            <Carousel.Caption>
              <div className="slideshow-info">
                <h5>BENVENUTI IN POKEMON FAN.SITE!</h5>
                Preparati ad entrare nel magico mondo dei mostriciattoli
                tascabili!
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={10000}>
            <img
              src="/assets/img/home_page/battaglia1.png"
              className="d-block w-100"
              alt="battaglia1"
            />
            <Carousel.Caption>
              <div className="slideshow-info">
                <h5>EMOZIONANTI SCONTRI TI ATTENDONO!</h5>
                Registrati al nostro sito e mostra al mondo la tua stoffa da
                campione in battaglie mozzafiato!
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={10000}>
            <img
              src="/assets/img/home_page/pokedex1.jpg"
              className="d-block w-100"
              alt="pokedex1"
            />
            <Carousel.Caption>
              <div className="slideshow-info">
                <h5>PIÙ DI 600 MOSTRI DA SCOPRIRE!</h5>
                Esplora il nostro pokedex per imparare tutto su centinaia di
                variegate e mistiche creature!
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={10000}>
            <img
              src="/assets/img/home_page/movedex1.png"
              className="d-block w-100"
              alt="movedex1"
            />
            <Carousel.Caption>
              <div className="slideshow-info">
                <h5>SCATENA MOSSE STRABILIANTI!</h5>
                Consulta il movedex e trova il giusto tradeoff per portare la
                strategia perfetta in battaglia!
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={10000}>
            <img
              src="/assets/img/home_page/typedex1.png"
              className="d-block w-100"
              alt="typedex1"
            />
            <Carousel.Caption>
              <div className="slideshow-info">
                <h5>IMPARA LE EFFICACIE DI TIPO</h5>
                Dai un'occhiata al typedex per scoprire le strategie migliori e
                prevalere in battaglia!
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={10000}>
            <img
              src="/assets/img/home_page/battaglia2.png"
              className="d-block w-100"
              alt="battaglia2"
            />
            <Carousel.Caption>
              <div className="slideshow-info">
                <h5>LA LEGA POKEMON È IN ATTESA DEL SUO CAMPIONE!</h5>
                Registrati al nostro sito e cimentati in scontri all'ultima
                mossa!
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={10000}>
            <img
              src="/assets/img/home_page/pokedex2.jpg"
              className="d-block w-100"
              alt="pokedex2"
            />
            <Carousel.Caption>
              <div className="slideshow-info">
                <h5>UN MONDO DI MAGICHE CREATURE A TUA DISPOSIZIONE!</h5>
                Esplora il nostro pokedex per imparare ogni dettaglio di oltre
                600 pokemon!
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={10000}>
            <img
              src="/assets/img/home_page/movedex2.png"
              className="d-block w-100"
              alt="movedex2"
            />
            <Carousel.Caption>
              <div className="slideshow-info">
                <h5>ATTACCHI MOZZAFIATO!</h5>
                Non perderti il nostro movedex per imparare tutto sulle
                centinaia di dirompenti mosse disponibili!
              </div>
            </Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item interval={10000}>
            <img
              src="/assets/img/home_page/typedex2.png"
              className="d-block w-100"
              alt="typedex2"
            />
            <Carousel.Caption>
              <div className="slideshow-info">
                <h5>18 TIPI ESPLOSIVI!</h5>
                Scopri nel nostro typedex tutto sui tipi che caratterizzano
                questo magico mondo!
              </div>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
        {/* Cards with links */}
        <CardDeck className="mt-4">
          <Card>
            <a href="/pokedex">
              <img
                src="/assets/img/home_page/pokedex.jpg"
                className="card-img-top"
                alt="pokedex"
              />
              <Card.Body>
                <h5 className="card-title">Pokedex</h5>
              </Card.Body>
            </a>
          </Card>

          <Card>
            <a href="/movedex">
              <img
                src="/assets/img/home_page/movedex.jpg"
                className="card-img-top"
                alt="movedex"
              />
              <Card.Body>
                <h5 className="card-title">Movedex</h5>
              </Card.Body>
            </a>
          </Card>
          <Card>
            <a href="/typedex">
              <img
                src="/assets/img/home_page/typedex.jpg"
                className="card-img-top"
                alt="typedex"
              />
              <Card.Body>
                <h5 className="card-title">Typedex</h5>
              </Card.Body>
            </a>
          </Card>
        </CardDeck>
      </Container>
    </>
  );
}
