import { NavigationMenu, NavigationMenuContent, NavigationMenuItem, NavigationMenuLink, NavigationMenuList, NavigationMenuTrigger, navigationMenuTriggerStyle } from "@/components/ui/navigation-menu";
import { cn } from "@/lib/utils";
import Link from "next/link";
import type { AnchorHTMLAttributes, HTMLAttributes } from "react";

interface Entry {
  title: string;
  description: string;
  href: string;
}

const gifts: Entry[] = [
  {
    title: "All Gifts",
    description: "Find the perfect gift for every occasion and loved one.",
    href: "/gifts",
  },
  {
    title: "Gift Sets",
    description: "Curated gift sets for a luxurious, ready-to-give experience.",
    href: "/gifts/sets",
  },
  {
    title: "Gift Cards",
    description: "Give the gift of choice with our flexible gift cards.",
    href: "/gifts/cards",
  },
];

export default function Header({ className, ...props }: HTMLAttributes<HTMLElement>) {
  return (
    <header className={cn("w-full flex justify-center items-center", className)} {...props}>
      <NavigationMenu>
        <NavigationMenuList>
          <NavigationMenuItem>
            <NavigationMenuTrigger>Gifts</NavigationMenuTrigger>
            <NavigationMenuContent>
              <ul className="flex flex-col w-64 p-4">
                {gifts.map(({ description, ...props }, i) => (
                  <ContentListItem key={i} {...props}>
                    {description}
                  </ContentListItem>
                ))}
              </ul>
            </NavigationMenuContent>
          </NavigationMenuItem>
          <NavigationMenuItem>
            <NavigationMenuLink className={navigationMenuTriggerStyle()} asChild>
              <Link href="/new">
                New
              </Link>
            </NavigationMenuLink>
          </NavigationMenuItem>

        </NavigationMenuList>
      </NavigationMenu>
    </header>
  );
}

function ContentListItem({ children, title, className, ...props }: AnchorHTMLAttributes<HTMLAnchorElement> & { title: string; href: string }) {
  return (
    <li>
      <NavigationMenuLink className={cn(navigationMenuTriggerStyle(), "block space-y-1 h-fit w-full", className)} asChild>
        <Link {...props}>
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">{children}</p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
}
