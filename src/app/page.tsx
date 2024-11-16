import Badge from '@/components/Badge';
import Header from '@/components/Header';
import Hero from '@/components/Hero';
import NoSSR from '@/components/NoSSR';
import TabsCard from './TabsCard';
import Link from 'next/link';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import Image from 'next/image';
import { ArrowRight, MessageCircle } from 'lucide-react';

import collectionsSlotC from './collections-slot-c.webp';
import { Button } from '@/components/ui/button';
import type { HTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import Footer from '@/components/Footer';

const bestsellers = [
  {
    label: 'Text',
    price: 0,
    description: 'Text',
    image: null,
  },
  {
    label: 'Text',
    price: 0,
    description: 'Text',
    image: null,
  },
  {
    label: 'Text',
    price: 0,
    description: 'Text',
    image: null,
  },
];

export default function Home() {
  return (
    <>
      <Header />
      <main>
        <div className="h-svh w-full">
          <Badge />
        </div>
        <NoSSR>
          <Hero />
        </NoSSR>
        <div className="container mx-auto my-8 max-w-screen-lg border *:mt-4 *:border-y last:mt-0 last:border-t-0">
          <section className="p-12 py-24">
            <TabsCard />
          </section>
          <section className="p-16 py-20">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold">Best Sellers</h2>
              <Link
                href="/best-sellers"
                className="font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                View All
                <ArrowRight className="inline" size="16" />
              </Link>
            </div>
            <ul className="mt-8 flex justify-center gap-8">
              {bestsellers.map(({ label, price, description, image }, i) => (
                <li key={i}>
                  <Link href="#">
                    <Card className="rounded-md shadow-sm hover:shadow">
                      <CardHeader>
                        {image ? (
                          <Image src={image} alt={label} />
                        ) : (
                          <Skeleton className="h-64 w-48" />
                        )}
                      </CardHeader>
                      <CardContent>
                        <h3>{label}</h3>
                        <p>{price}</p>
                        <p>{description}</p>
                      </CardContent>
                    </Card>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
          <section className="grid grid-cols-2">
            <div className="flex flex-col justify-between border-r py-32 pl-8">
              <h2 className="text-2xl font-bold">Layering Made Simple</h2>
              <Image
                src={collectionsSlotC}
                alt="Layering Made Simple"
                className="ml-auto"
              />
            </div>
            <div className="p-8 py-16">
              <h2 className="text-muted-foreground">
                <MessageCircle size={16} className="mr-2 inline" />
                Create your custom regimen
              </h2>
              <div className="text-2xl">
                <Button
                  className="mt-4 flex h-auto select-none justify-center rounded-full text-2xl"
                  asChild
                >
                  <Link href="/chat">
                    <strong>Chat</strong> with our skincare expert
                  </Link>
                </Button>
                <p>
                  to create your <strong>personalized regimen</strong> for
                  radiant, healthy skin.
                </p>
              </div>
              <div className="mt-8 flex select-none flex-col gap-4">
                <ExpertMessage>How can I help you?</ExpertMessage>
                <CustomerMessage>
                  My skin is dry and tight. Any product recommendations?
                </CustomerMessage>
                <ExpertMessage>
                  Yes! Start with our <strong>Hydrating Cleanser</strong>,
                  followed by the <strong>Revitalizing Toner</strong>. Use the{' '}
                  <strong>Deep Nourish Serum</strong> and finish with the{' '}
                  <strong>Ultra Rich Moisturizer</strong>.
                </ExpertMessage>
                <CustomerMessage>
                  That sounds perfect. Thank you!
                </CustomerMessage>
              </div>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}

function CustomerMessage({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <Message
      className={cn(
        'ml-auto border-primary bg-primary text-primary-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </Message>
  );
}

function ExpertMessage({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <Message className={cn('bg-background')} {...props}>
      {children}
    </Message>
  );
}

function Message({
  children,
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) {
  return (
    <div
      className={cn(
        'w-fit max-w-xs rounded-lg border p-2 px-4 text-sm shadow-sm [&_strong]:text-muted-foreground',
        className,
      )}
      {...props}
    >
      {children}
    </div>
  );
}
