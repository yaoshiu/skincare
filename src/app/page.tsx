import Badge from '@/components/Badge';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import NoSSR from '@/components/NoSSR';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="w-full h-svh">
          <Badge />
        </div>
        <NoSSR>
          <Hero />
        </NoSSR>
        <div className="h-svh"></div>
      </main>
    </>
  );
}
