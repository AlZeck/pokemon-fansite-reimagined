import Head from "next/head";
import NavBarPk from "../../components/navbarpk";

export default function Battle({user}) {
  return (
    <>
      <Head>
        <title>PokemonFanSite</title>
      </Head>
      
      <NavBarPk user={user} />
    </>
  );
}
