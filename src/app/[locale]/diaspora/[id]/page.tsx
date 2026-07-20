import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { diasporaCommunities } from "@/lib/data";
import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { CommunityDetail } from "@/components/CommunityDetail";

export function generateStaticParams() {
  return diasporaCommunities.map((c) => ({ id: c.id }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>;
}): Promise<Metadata> {
  const { id } = await params;
  const community = diasporaCommunities.find((c) => c.id === id);
  if (!community) return {};
  return {
    title: `${community.country} — Diáspora · Nós Cabo Verde`,
    description: community.description,
    openGraph: {
      title: `${community.country} — Diáspora · Nós Cabo Verde`,
      description: community.highlight,
      images: [community.image],
    },
  };
}

export default async function CommunityPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const index = diasporaCommunities.findIndex((c) => c.id === id);
  if (index === -1) notFound();

  const community = diasporaCommunities[index];
  const prev = diasporaCommunities[(index - 1 + diasporaCommunities.length) % diasporaCommunities.length];
  const next = diasporaCommunities[(index + 1) % diasporaCommunities.length];

  return (
    <>
      <Navbar />
      <main>
        <CommunityDetail community={community} prev={prev} next={next} index={index} />
      </main>
      <Footer />
    </>
  );
}
