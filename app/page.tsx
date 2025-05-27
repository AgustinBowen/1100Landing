import Hero from '@/components/HeroSeccion';
import CampeoantoSeccion from '@/components/CampeonatoSeccion';
import CalendarioSeccion from '@/components/CalendarioSeccion';
import Bento from '@/components/BentoGaleriaSeccion';
export default function Home() {
  return (
    <main className='bg-black'>
      <Hero />
      <CampeoantoSeccion />
      <CalendarioSeccion />
      <Bento/>
    </main>
  );
}
