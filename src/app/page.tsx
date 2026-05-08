import Hero from '@/components/Hero';
import Marquee from '@/components/Marquee';
import Capabilities from '@/components/Capabilities';
// import RecentWork from '@/components/RecentWork';
import Philosophy from '@/components/Philosophy';

export default function HomePage() {
  return (
    <>
      <Hero />
      <Marquee />
      <Capabilities />
      <Philosophy />
    </>
  );
}
