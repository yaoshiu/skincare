'use client';

import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from '@/components/ui/navigation-menu';
import { cn } from '@/lib/utils';
import {
  CreditCard,
  Gift,
  Heart,
  Menu,
  MessageCircle,
  MessageCircleQuestion,
  X,
} from 'lucide-react';
import Link from 'next/link';
import { useEffect, useState, type HTMLAttributes } from 'react';
import { ModeToggle } from './ui/mode-toggle';
import { Button } from './ui/button';
import { Accordion, AccordionContent, AccordionTrigger } from './ui/accordion';
import { AccordionItem } from '@radix-ui/react-accordion';
import { motion } from 'framer-motion';

const gifts = [
  {
    title: 'All Gifts',
    description: 'Perfect gifts for any occasion',
    href: '/gifts',
    Icon: Gift,
  },
  {
    title: 'Gift Sets',
    description: 'Luxury sets, ready to gift',
    href: '/gifts/sets',
    Icon: Heart,
  },
  {
    title: 'Gift Cards',
    description: 'The gift of choice',
    href: '/gifts/cards',
    Icon: CreditCard,
  },
];

const sources = [
  {
    title: 'Chat',
    description: 'Get expert skincare advice',
    href: '/chat',
    Icon: MessageCircle,
  },
  {
    title: 'Contact Us',
    description: 'Support for every step',
    href: '/contact',
    Icon: MessageCircleQuestion,
  },
];

const triggers = [
  {
    title: 'Gifts',
    entries: gifts,
  },
  {
    title: 'Resources',
    entries: sources,
  },
];

const links = [
  {
    title: 'New',
    href: '/new',
  },
  {
    title: 'Best Sellers',
    href: '/best-sellers',
  },
  {
    title: 'Skincare',
    href: '/skincare',
  },
];

const MotionX = motion(X);
const MotionMenu = motion(Menu);

export default function Header({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
  });

  return (
    <header
      className={cn(
        'fixed w-full border-b bg-background p-4',
        open ? 'z-30 h-full' : 'z-20',
        className,
      )}
      {...props}
    >
      <div className="grid grid-cols-3">
        <NavigationMenu className="col-start-2 hidden w-fit self-center justify-self-center text-muted-foreground md:flex">
          <NavigationMenuList>
            {triggers.map(({ title, entries }) => (
              <NavigationMenuItem key={title}>
                <NavigationMenuTrigger className="rounded-full focus:bg-transparent focus:text-muted-foreground">
                  {title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="p-2">
                    {entries.map(({ description, title, Icon, href }, i) => (
                      <li key={i}>
                        <NavigationMenuLink
                          className={cn(
                            navigationMenuTriggerStyle(),
                            'group grid h-fit auto-rows-auto grid-cols-[1fr_12rem] gap-x-2 p-2 hover:bg-background',
                          )}
                          asChild
                        >
                          <Link href={href}>
                            <div className="row-span-2 flex items-center justify-center rounded-sm border p-1 transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-primary-foreground">
                              <Icon />
                            </div>
                            <div className="text-sm font-medium">{title}</div>
                            <p className="line-clamp-1 text-xs leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
                              {description}
                            </p>
                          </Link>
                        </NavigationMenuLink>
                      </li>
                    ))}
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ))}
            {links.map(({ title, href }, i) => (
              <NavigationMenuItem key={i}>
                <NavigationMenuLink
                  className={cn(navigationMenuTriggerStyle(), 'rounded-full')}
                  asChild
                >
                  <Link href={href}>{title}</Link>
                </NavigationMenuLink>
              </NavigationMenuItem>
            ))}
          </NavigationMenuList>
        </NavigationMenu>
        <div className="col-start-3 hidden justify-self-end md:block">
          <ModeToggle />
        </div>
        <Button
          variant="outline"
          onClick={() => setOpen(!open)}
          className="col-start-3 h-fit justify-self-end rounded-full p-2 md:hidden"
          aria-label="Open Menu"
        >
          {open ? (
            <MotionX
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
            />
          ) : (
            <MotionMenu
              initial={{ rotate: -90, scale: 0 }}
              animate={{ rotate: 0, scale: 1 }}
              exit={{ rotate: 90, scale: 0 }}
            />
          )}
        </Button>
      </div>
      {open && (
        <Accordion
          type="single"
          className="col-span-3 row-start-2 p-4 text-muted-foreground"
        >
          {triggers.map(({ title, entries }, i) => (
            <AccordionItem value={title} key={i}>
              <AccordionTrigger className="text-base">{title}</AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col gap-4 text-base">
                  {entries.map(({ title, Icon, href }, i) => (
                    <li key={i}>
                      <Link href={href} className="flex items-center gap-2">
                        <Icon size={20} />
                        <h3>{title}</h3>
                      </Link>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
          {links.map(({ title, href }, i) => (
            <AccordionItem value={title} key={i} className="py-4">
              <Link href={href}>{title}</Link>
            </AccordionItem>
          ))}
          <AccordionItem value="py-4">
            <ModeToggle />
          </AccordionItem>
        </Accordion>
      )}
    </header>
  );
}
