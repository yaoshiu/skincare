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
import { CreditCard, Gift, Heart } from 'lucide-react';
import Link from 'next/link';
import type { AnchorHTMLAttributes, HTMLAttributes, ReactNode } from 'react';

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

export default function Header({
  className,
  ...props
}: HTMLAttributes<HTMLElement>) {
  return (
    <header
      className={cn('w-full flex justify-center items-center', className)}
      {...props}
    >
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Gifts</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="p-2">
                {gifts.map(({ description, ...props }, i) => (
                  <ContentListItem key={i} {...props}>
                    {description}
                  </ContentListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <LinkItem href="/new">New</LinkItem>
          <LinkItem href="/best-sellers">Best Sellers</LinkItem>
          <LinkItem href="/skincare">Skincare</LinkItem>
        </NavigationMenuList>
      </NavigationMenu>
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
        className={cn(navigationMenuTriggerStyle(), className)}
        asChild
      >
        <Link {...props}>{children}</Link>
      </NavigationMenuLink>
    </NavigationMenuItem>
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
          'group grid grid-cols-[1fr_12rem] gap-x-2 auto-rows-auto h-fit p-2 hover:bg-background',
          className,
        )}
        asChild
      >
        <Link {...props}>
          <div className="row-span-2 flex items-center justify-center rounded-sm border p-1 group-hover:bg-foreground group-hover:text-background group-hover:border-foreground">
            {icon}
          </div>
          <div className="text-sm font-medium">{title}</div>
          <p className="line-clamp-1 text-xs leading-relaxed text-muted-foreground group-hover:text-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
