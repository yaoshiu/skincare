'use client';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';
import { useState, type ButtonHTMLAttributes } from 'react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import Link from 'next/link';
import { ShoppingBag } from 'lucide-react';
import { ScrollArea, ScrollBar } from '@/components/ui/scroll-area';

const tabs = [
  {
    value: 'cleansers',
    label: 'Cleansers',
    description: (
      <p>
        <i>
          <strong>Purify</strong>
        </i>{' '}
        your skin with our gentle cleanser that effectively removes impurities,
        providing a <strong>refreshing start</strong> for your skincare routine.
      </p>
    ),
    details:
      'Our gentle cleanser is formulated to effectively remove makeup, oil, and impurities, ensuring your skin feels clean, refreshed, and prepared for the next steps in your skincare routine.',
  },
  {
    value: 'toners',
    label: 'Toners',
    description: (
      <p>
        <i>
          <strong>Balance</strong>
        </i>{' '}
        your complexion with our revitalizing toner, helping to tighten pores
        and leave skin feeling <strong>smooth</strong> and rejuvenated.
      </p>
    ),
    details:
      'This revitalizing toner helps balance your skin’s natural pH levels while tightening pores and adding a layer of hydration to prepare your skin for better absorption of subsequent products.',
  },
  {
    value: 'exfoliators',
    label: 'Exfoliators',
    description: (
      <p>
        <i>
          <strong>Renew</strong>
        </i>{' '}
        your skin’s texture with our exfoliator, designed to gently remove dead
        cells and reveal <strong>smoother</strong>, more vibrant skin.
      </p>
    ),
    details:
      'Designed to gently slough off dead skin cells, our exfoliator promotes smoother texture, brighter appearance, and a rejuvenated complexion ready for nourishing treatments and hydration.',
  },
  {
    value: 'serums',
    label: 'Serums',
    description: (
      <p>
        <i>
          <strong>Nourish</strong>
        </i>{' '}
        your skin deeply with our powerful serum, delivering essential
        ingredients for a <strong>radiant glow</strong> that lasts.
      </p>
    ),
    details:
      'Our serum is infused with powerful, skin-loving ingredients that penetrate deeply to target signs of aging, dullness, and uneven tone, leaving your skin with a lasting, healthy glow.',
  },
  {
    value: 'moisturizers',
    label: 'Moisturizers',
    description: (
      <p>
        <i>
          <strong>Hydrate</strong>
        </i>{' '}
        and lock in moisture with our rich moisturizer, ensuring your skin
        remains <strong>plump</strong> and youthful throughout the day.
      </p>
    ),
    details:
      'This rich moisturizer deeply hydrates and locks in moisture, creating a protective barrier that keeps your skin feeling soft, supple, and youthful from morning until night.',
  },
];

export default function TabsCard() {
  const [tab, setTab] = useState('cleansers');

  return (
    <Tabs
      onValueChange={setTab}
      defaultValue="cleansers"
      className="flex flex-col px-8 py-16 md:p-12 md:py-24 lg:flex-row lg:gap-20"
    >
      <div className="relative flex flex-col items-center justify-between gap-4 lg:items-start">
        {/* I Hate This */}
        <ScrollArea className="-ml-8 w-[calc(100%+4rem)] place-self-start overflow-visible *:px-8 *:*:pr-8 before:absolute before:left-0 before:top-0 before:z-10 before:h-full before:w-6 before:bg-gradient-to-r before:from-background before:to-transparent after:absolute after:right-0 after:top-0 after:z-10 after:h-full after:w-6 after:bg-gradient-to-r after:from-transparent after:to-background md:before:hidden md:after:hidden">
          <TabsList className="w-fit gap-2 rounded-full p-0">
            {tabs.map(({ value, label }) => (
              <RoundedTabsTrigger key={value} value={value}>
                <span
                  className={cn(
                    'z-10 text-sm font-medium transition-colors',
                    tab === value ? 'delay-150' : '',
                  )}
                >
                  {label}
                </span>
                {tab === value ? (
                  <motion.span
                    className="absolute inset-0 rounded-full border bg-background shadow-sm"
                    layoutId="indicator"
                  />
                ) : null}
              </RoundedTabsTrigger>
            ))}
          </TabsList>
          <ScrollBar orientation="horizontal" className="hidden" />
        </ScrollArea>
        {tabs.map(({ value, description }) => (
          <TabsContent
            key={value}
            value={value}
            className="text-2xl text-muted-foreground *:leading-relaxed [&_strong]:text-3xl [&_strong]:text-foreground"
          >
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {description}
            </motion.div>
          </TabsContent>
        ))}
      </div>
      {tabs.map(({ value, label, details }) => (
        <TabsContent key={value} value={value} className="lg:w-min">
          <div className="flex flex-col items-center">
            <motion.p
              className="hidden text-muted-foreground md:block"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              {details}
            </motion.p>
            <Button
              className="mt-8 flex w-64 items-center justify-between rounded-full"
              asChild
            >
              <Link href={`/${value}`}>
                <motion.span
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                >
                  Explore Our {label}
                </motion.span>
                <ShoppingBag />
              </Link>
            </Button>
          </div>
        </TabsContent>
      ))}
    </Tabs>
  );
}

function RoundedTabsTrigger({
  className,
  children,
  ...props
}: ButtonHTMLAttributes<HTMLButtonElement> & { value: string }) {
  return (
    <TabsTrigger
      className={cn(
        'relative h-full rounded-full px-4 data-[state=active]:bg-transparent data-[state=active]:shadow-none',
        className,
      )}
      {...props}
    >
      {children}
    </TabsTrigger>
  );
}
