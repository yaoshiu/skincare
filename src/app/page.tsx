import Badge from '@/components/Badge';
import Header from '@/components/Header';
import Hero from '@/components/Hero';

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="w-full h-svh">
          <Badge />
        </div>
        <Hero />
        <div className="h-svh"></div>
      </main>
    </>
  );
}
