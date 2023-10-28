import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import { NavigationBar } from "@/components/navigation-bar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "PokemonFanSite",
  description: "Sei un fan di Pokemon? Questo è il sito che fa per te!",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className={`${inter.className} `}>
        <NavigationBar />
        <main>{children}</main>
      </body>
    </html>
  );
}
