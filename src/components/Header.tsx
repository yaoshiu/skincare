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
  MessageCircle,
  MessageCircleQuestion,
} from 'lucide-react';
import Link from 'next/link';
import {
  type AnchorHTMLAttributes,
  type HTMLAttributes,
  type ReactNode,
} from 'react';
import { ModeToggle } from './ui/mode-toggle';

interface Entry {
  title: string;
  description: string;
  href: string;
  icon: ReactNode;
}

const gifts: Entry[] = [
  {
    title: 'All Gifts',
    description: 'Perfect gifts for any occasion',
    href: '/gifts',
    icon: <Gift />,
  },
  {
    title: 'Gift Sets',
    description: 'Luxury sets, ready to gift',
    href: '/gifts/sets',
    icon: <Heart />,
  },
  {
    title: 'Gift Cards',
    description: 'The gift of choice',
    href: '/gifts/cards',
    icon: <CreditCard />,
  },
];

const sources: Entry[] = [
  {
    title: 'Chat',
    description: 'Get expert skincare advice',
    href: '/chat',
    icon: <MessageCircle />,
  },
  {
    title: 'Contact Us',
    description: 'Support for every step',
    href: '/contact',
    icon: <MessageCircleQuestion />,
  },
];

export default function Header({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn(
        'fixed z-10 grid w-full grid-cols-3 border-b bg-background p-4',
        className,
      )}
      {...props}
    >
      <NavigationMenu className="col-start-2 w-fit self-center justify-self-center text-muted-foreground">
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="rounded-full">
              Gifts
            </NavigationMenuTrigger>
            <Content entries={gifts} />
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuTrigger className="rounded-full">
              Resources
            </NavigationMenuTrigger>
            <Content entries={sources} />
          </NavigationMenuItem>
          <LinkItem href="/new">New</LinkItem>
          <LinkItem href="/best-sellers">Best Sellers</LinkItem>
          <LinkItem href="/skincare">Skincare</LinkItem>
        </NavigationMenuList>
      </NavigationMenu>
      <div className="justify-self-end">
        <ModeToggle />
      </div>
    </header>
  );
}

function LinkItem({
  children,
  className,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & { href: string }) {
  return (
    <NavigationMenuItem>
      <NavigationMenuLink
        className={cn(navigationMenuTriggerStyle(), 'rounded-full', className)}
        asChild
      >
        <Link {...props}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
  );
}

function Content({ entries }: { entries: Entry[] }) {
  return (
    <NavigationMenuContent>
      <ul className="p-2">
        {entries.map(({ description, ...props }, i) => (
          <ContentListItem key={i} {...props}>
            {description}
          </ContentListItem>
        ))}
      </ul>
    </NavigationMenuContent>
  );
}

function ContentListItem({
  children,
  title,
  className,
  icon,
  ...props
}: AnchorHTMLAttributes<HTMLAnchorElement> & {
  title: string;
  href: string;
  icon: ReactNode;
}) {
  return (
    <li>
      <NavigationMenuLink
        className={cn(
          navigationMenuTriggerStyle(),
          'group grid h-fit auto-rows-auto grid-cols-[1fr_12rem] gap-x-2 p-2 hover:bg-background',
          className,
        )}
        asChild
      >
        <Link {...props}>
          <div className="row-span-2 flex items-center justify-center rounded-sm border p-1 transition-colors group-hover:border-foreground group-hover:bg-foreground group-hover:text-primary-foreground">
            {icon}
          </div>
          <div className="text-sm font-medium">{title}</div>
          <p className="line-clamp-1 text-xs leading-relaxed text-muted-foreground transition-colors group-hover:text-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
