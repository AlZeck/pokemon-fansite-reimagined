import Image from "next/image";

function PageSection({
  title,
  description,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <div className="flex justify-center odd:flex-row-reverse ">
      <Image
        src={image}
        alt={imageAlt}
        width={1920}
        height={1080}
        className="h-full w-1/2 object-cover"
      />
      <div className="relative">
        <Image
          src={image}
          alt={imageAlt}
          width={1920}
          height={1080}
          className="h-full object-cover"
        />
        <div className="absolute inset-0 z-10 flex  items-center bg-background p-8 text-center text-foreground shadow backdrop-blur-3xl">
          <div>
            <h5 className="text-3xl font-bold">{title}</h5>
            <p className="text-xl">{description}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageHeader({
  title,
  description,
  image,
  imageAlt,
}: {
  title: string;
  description: string;
  image: string;
  imageAlt: string;
}) {
  return (
    <div className="relative flex h-screen flex-grow snap-center snap-always justify-center">
      <Image
        src={image}
        alt={imageAlt}
        width={1920}
        height={1080}
        className="h-full object-cover"
      />
      <div className="max-w-screen absolute bottom-20 z-20 rounded border bg-background p-4  text-center text-foreground shadow backdrop-blur">
        <h5 className="text-3xl font-bold">{title}</h5>
        <p className="text-xl">{description}</p>
      </div>
    </div>
  );
}

export default function Page() {
  return (
    <main className="container mx-auto">
      <PageHeader
        title="Benvenuto nel mondo dei Pokémon!"
        description="Preparati ad entrare nel magico mondo dei mostriciattoli tascabili!"
        image="/assets/img/home_page/logo.jpg"
        imageAlt="banner"
      />

      <PageSection
        title="Emozionanti scontri ti attendono!"
        description="Registrati al nostro sito e mostra al mondo la tua stoffa da campione in battaglie mozzafiato!"
        image="/assets/img/home_page/battaglia1.png"
        imageAlt="battaglia1"
      />
      <PageSection
        title="Più di 600 mostri da scoprire!"
        description="Esplora il nostro pokedex per imparare tutto su centinaia di
        variegate e mistiche creature!"
        image="/assets/img/home_page/pokedex1.jpg"
        imageAlt="pokedex1"
      />
      <PageSection
        title="Scatena mosse strabilianti!"
        description="Consulta il movedex e trova il giusto tradeoff per portare la
        strategia perfetta in battaglia!"
        image="/assets/img/home_page/movedex1.png"
        imageAlt="movedex1"
      />
      <PageSection
        title="Impara le efficacie di tipo"
        description="Dai un'occhiata al typedex per scoprire le strategie migliori e
        prevalere in battaglia!"
        image="/assets/img/home_page/typedex1.png"
        imageAlt="typedex1"
      />
      <PageSection
        title="La lega Pokémon è in attesa del suo campione!"
        description="Registrati al nostro sito e cimentati in scontri all'ultima
        mossa!"
        image="/assets/img/home_page/battaglia2.png"
        imageAlt="battaglia2"
      />
      <PageSection
        title="Un mondo di magiche creature a tua disposizione!"
        description="Esplora il nostro pokedex per imparare ogni dettaglio di oltre
        600 pokemon!"
        image="/assets/img/home_page/pokedex2.jpg"
        imageAlt="pokedex2"
      />
      <PageSection
        title="Attacchi mozzafiato!"
        description="Non perderti il nostro movedex per imparare tutto sulle centinaia di dirompenti mosse disponibili!"
        image="/assets/img/home_page/movedex2.png"
        imageAlt="movedex2"
      />
      <PageSection
        title="18 tipi esplosivi!"
        description="Scopri nel nostro typedex tutto sui tipi che caratterizzano questo magico mondo!"
        image="/assets/img/home_page/typedex2.png"
        imageAlt="typedex2"
      />
    </main>
  );
}
