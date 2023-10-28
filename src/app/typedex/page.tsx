import { db } from "@/lib/db";
import { type Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "PokemonFanSite - Typedex",
  description: "Scopri i tipi di Pokemon",
};

export default async function Page() {
  const types = await db.query.tipo.findMany();
  return (
    <div className="container mx-auto mt-20 rounded-lg border bg-background p-6 shadow backdrop-blur">
      <h1 className="text-2xl font-bold">Typedex</h1>
      <div className="mt-6 grid grid-cols-2 gap-10 sm:grid-cols-4 lg:grid-cols-6">
        {types.map((type) => (
          <Link href={`/typedex/${type.nome}`} key={type.nome}>
            <div className="flex flex-col items-center rounded border bg-background p-4 hover:bg-white">
              <h3 className="text-lg capitalize">{type.nome}</h3>

              <Image
                src={`/assets/img/typedex/${type.nome}.png`}
                alt={type.nome}
                width={110}
                height={110}
              />
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
