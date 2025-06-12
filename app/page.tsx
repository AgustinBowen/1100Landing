import Navigation from '@/components/layout/Navigation';
import HeroSection from '@/components/sections/HeroSeccion';
import ChampionshipSection from '@/components/sections/CampeonatoSeccion';
import CalendarSection from '@/components/sections/CalendarioSeccion';
import GallerySection from '@/components/sections/GaleriaSeccion';
import Footer from '@/components/layout/Footer';
import {
  getLatestImages,
  getNextRace,
  getAllRaces,
  getCurrentChampionship,
  getChampionshipStats,
  getLatestRace,
} from '../lib/data/dataFetch';
import CalendarWrapper from '@/components/layout/CalendarWrapper';

export default async function HomePage() {
  const [nextRace, allRaces, championship, stats, latestRace, images] = await Promise.all([
    getNextRace(),
    getAllRaces(),
    getCurrentChampionship(),
    getChampionshipStats(),
    getLatestRace(),
    getLatestImages()
  ]);

  return (
    <div className="min-h-screen bg-black">
      <Navigation />
      <main>
        <section id="inicio">
          <HeroSection raceData={nextRace} stats={stats} />
        </section>
        <section id="campeonato">
          <ChampionshipSection championship={championship} stats={stats} latestRace={latestRace} />
        </section>
        <section id="calendario">
          <CalendarWrapper races={allRaces} stats={stats} />
        </section>
        <section id="galeria">
          <GallerySection images={images}/>
        </section>
        <section id="contacto">
          <Footer />
        </section>
      </main>
    </div>
  );
}