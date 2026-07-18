import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { islands } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { IslandDetail } from "@/components/IslandDetail";

export function generateStaticParams() {
  return islands.map((island) => ({ id: island.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const island = islands.find((i) => i.id === id);
  if (!island) return {};
  return {
    title: `${island.name} — Nós Cabo Verde`,
    description: island.description,
    openGraph: {
      title: `${island.name} — Nós Cabo Verde`,
      description: island.tagline,
      images: [island.image],
    },
  };
}

export default async function IslandPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = islands.findIndex((i) => i.id === id);
  if (index === -1) notFound();

  const island = islands[index];
  const prev = islands[(index - 1 + islands.length) % islands.length];
  const next = islands[(index + 1) % islands.length];

  return (
    <>
      <Navbar />
      <main>
        <IslandDetail island={island} prev={prev} next={next} index={index} />
      </main>
      <Footer />
    </>
  );
}
