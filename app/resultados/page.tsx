import Navigation from '@/components/layout/Navigation';
import Footer from '@/components/layout/Footer';
import Resultados from '@/components/sections/Resultados';
import {
  getAllChampionships,
  getChampionshipWithStandings,
  getChampionshipRaces,
} from '../../lib/data/championship';
import { RaceWithDetails, ChampionshipWithStandings, Campeonato } from '@/types/championship';

export default async function CampeonatoPage({
  searchParams,
}: {
  searchParams: Promise<{ year?: string; race?: string }>; // Cambio: ahora es una Promise
}) {
  const allChampionships: Campeonato[] = await getAllChampionships();

  // Await searchParams antes de usar sus propiedades
  const params = await searchParams;
  
  const currentYear = params.year ? parseInt(params.year) : new Date().getFullYear();
  const selectedChampionship = allChampionships.find((ch) => ch.anio === currentYear) || allChampionships[0];

  let championshipWithStandings: ChampionshipWithStandings | null = null;
  let championshipRaces: RaceWithDetails[] = [];

  if (selectedChampionship) {
    [championshipWithStandings, championshipRaces] = await Promise.all([
      getChampionshipWithStandings(selectedChampionship.id),
      getChampionshipRaces(selectedChampionship.id),
    ]);
  }

  return (
    <div className="min-h-screen bg-black pt-20">
      <Navigation />
      <main>
        <Resultados
          allChampionships={allChampionships}
          currentChampionship={championshipWithStandings}
          championshipRaces={championshipRaces}
          selectedYear={currentYear}
          selectedRaceId={params.race}
        />
      </main>
      <Footer />
    </div>
  );
}