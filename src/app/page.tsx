import Badge from '@/components/Badge';
import Header from '@/components/Header';
import { Activity } from 'lucide-react';

export default function Home() {
  return (
    <>
      <Header className="fixed z-10" />
      <main>
        <div className="w-full h-svh">
          <Badge />
        </div>
        <div>
          <Activity className="fixed top-0 left-0" />
          <h1>LUNEX</h1>
          <p>Where radiance meets care.</p>
        </div>
        <div>test</div>
      </main>
    </>
  );
}
