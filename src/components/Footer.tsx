import Link from 'next/link';
import { Input } from './ui/input';
import { useId, type InputHTMLAttributes } from 'react';
import { cn } from '@/lib/utils';
import { Label } from './ui/label';
import { ChevronRight } from 'lucide-react';
import { Facebook, Instagram, Twitter, Youtube } from 'react-feather';

const company = [
  {
    title: 'Join Us',
    href: '/join',
  },
  {
    title: 'About Us',
    href: '/about',
  },
];

const commitments = [
  {
    title: 'Accessibility',
    href: '/accessibility',
  },
  {
    title: 'Sustainability',
    href: '/sustainability',
  },
  {
    title: 'Change is the Journey',
    href: '/change-is-the-journey',
  },
  {
    title: 'Everything is Chemicals',
    href: '/everything-is-chemicals',
  },
];

const customerCare = [
  {
    title: 'FAQ',
    href: '/faq',
  },
  {
    title: 'Disposal Instructions',
    href: '/disposal-instructions',
  },
  {
    title: 'Return Policy',
    href: '/return-policy',
  },
  {
    title: 'Promotion Terms & Conditions',
    href: '/promotion-terms-and-conditions',
  },
];

const giftCards = [
  {
    title: 'Purchase',
    href: '/gifts/cards',
  },
  {
    title: 'Check Balance',
    href: '/gifts/cards/balance',
  },
];

const links = [
  {
    label: 'Contact Us',
    href: '/contact',
  },
  {
    label: 'Track Order',
    href: '/order',
  },
  {
    label: 'Sign In',
    href: '/sign-in',
  },
  {
    label: 'Store Locator',
    href: '/location',
  },
];

const social = [
  {
    icon: <Facebook />,
    href: 'https://facebook.com',
  },
  {
    icon: <Instagram />,
    href: 'https://instagram.com',
  },
  {
    icon: <Youtube />,
    href: 'https://youtube.com',
  },
  {
    icon: <Twitter />,
    href: 'https://twitter.com',
  },
];

export default function Footer() {
  return (
    <footer className="container mx-auto mb-16 flex justify-center gap-24">
      <div className="flex gap-12 text-sm *:flex *:flex-col">
        <div className="gap-8">
          <FooterSection title="Company" links={company} />
          <FooterSection title="Our Commitments" links={commitments} />
        </div>
        <div className="gap-8">
          <FooterSection title="Customer Care" links={customerCare} />
          <FooterSection title="Gift Cards" links={giftCards} />
        </div>
        <ul className="gap-4">
          {links.map(({ label, href }, i) => (
            <li key={i}>
              <Link href={href}>{label}</Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-min">
        <h2 className="text-lg font-bold">Stay In Touch</h2>
        <TransitionInput
          className="mt-2"
          type="email"
          placeholder="Email Address"
        />
        <p className="mt-4 text-xs text-muted-foreground [&_a]:underline">
          *By checking the above box you are agreeing to receive email
          communications from DECIEM Inc., its affiliates, brands (The Ordinary,
          NIOD, and LOoPHA) and/or marketing partners. This can be changed at
          any time. Please refer to our{' '}
          <Link href="/privacy-policy">Privacy Policy</Link> and{' '}
          <Link href="/terms-of-use">Terms of Use</Link> for more details or{' '}
          <Link href="/contact">Contact Us</Link>
        </p>
        <div className="mt-4 flex gap-8">
          {social.map(({ icon, href }, i) => (
            <Link key={i} href={href}>
              {icon}
            </Link>
          ))}
        </div>
      </div>
    </footer>
  );
}

function TransitionInput({
  className,
  placeholder,
  id,
  ...props
}: InputHTMLAttributes<HTMLInputElement>) {
  const newId = useId();
  if (!id) {
    id = newId;
  }

  return (
    <div className="relative pt-6">
      <Input
        className={cn(
          'peer h-auto w-96 rounded-none border-0 border-b p-0 shadow-none focus-visible:outline-none focus-visible:ring-0',
          className,
        )}
        id={id}
        placeholder=" "
        {...props}
      />
      <Label
        htmlFor={id}
        className="absolute bottom-2 flex w-full -translate-y-6 select-none items-center justify-between text-muted-foreground transition-transform peer-placeholder-shown:translate-y-0 peer-placeholder-shown:peer-focus-visible:-translate-y-6"
      >
        {placeholder}
        <ChevronRight size={16} />
      </Label>
    </div>
  );
}

function FooterSection({
  title,
  links,
}: {
  title: string;
  links: { title: string; href: string }[];
}) {
  return (
    <div>
      <h2>{title}</h2>
      <ul className="mt-2 text-muted-foreground">
        {links.map(({ title, href }, i) => (
          <li key={i}>
            <Link
              className="transition-colors hover:text-foreground"
              href={href}
            >
              {title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
}
