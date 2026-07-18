import { Navbar } from "@/components/Navbar";
import { HeroSection } from "@/components/HeroSection";
import { IslandsSection } from "@/components/IslandsSection";
import { EditorialSection } from "@/components/EditorialSection";
import { MundialSection } from "@/components/MundialSection";
import { CultureSection } from "@/components/CultureSection";
import { FacesSection } from "@/components/FacesSection";
import { FlavorsSection } from "@/components/FlavorsSection";
import { MusicSection } from "@/components/MusicSection";
import { AgendaSection } from "@/components/AgendaSection";
import { Footer } from "@/components/Footer";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main>
        <HeroSection />
        <IslandsSection />
        <EditorialSection />
        <MundialSection />
        <CultureSection />
        <FacesSection />
        <FlavorsSection />
        <MusicSection />
        <AgendaSection />
      </main>
      <Footer />
    </>
  );
}
