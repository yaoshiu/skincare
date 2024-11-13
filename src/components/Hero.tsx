'use client';

import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Activity } from 'lucide-react';
import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';
import { Button } from './ui/button';
import Link from 'next/link';

export default function Hero() {
  const { scrollY } = useScroll();
  const { width, height } = useWindowSize();

  const springProps = {
    bounce: 0,
  };

  const [foreground, setForeground] = useState('0, 0%, 0%');
  const theme = useTheme();

  useEffect(() => {
    const timer = setTimeout(() => {
      const root = window.getComputedStyle(document.documentElement);
      setForeground(root.getPropertyValue('--foreground'));
    }, 100);

    return () => clearTimeout(timer);
  }, [theme]);

  const icon = {
    x: useSpring(
      useTransform(scrollY, [0, height / 2], [width / 5, 16]),
      springProps,
    ),
    y: useSpring(
      useTransform(scrollY, [0, height / 2], [height / 3, 16 * 1.5]),
      springProps,
    ),
    scale: useSpring(
      useTransform(scrollY, [0, height / 2], [1.5, 1]),
      springProps,
    ),
  };

  const heading = {
    x: useSpring(
      useTransform(scrollY, [0, height / 2], [width / 5, 16 * 2.5]),
      springProps,
    ),
    y: useSpring(
      useTransform(scrollY, [0, height / 2], [height / 2, 16 * 1.5]),
      springProps,
    ),
    scale: useTransform(scrollY, [0, height / 2], [3, 1]),
  };

  const color = useTransform(
    scrollY,
    [0, height / 2],
    ['hsl(0, 0%, 98%)', `hsl(${foreground})`],
  );

  const description = {
    x: width / 5,
    y: height / 1.5,
  };

  return (
    <div>
      <motion.div
        className="fixed top-0 left-0 z-10 origin-left"
        style={{
          color,
          ...icon,
        }}
      >
        <Activity />
      </motion.div>
      <motion.h1
        className="fixed top-0 left-0 z-10 origin-left select-none"
        style={{
          color,
          ...heading,
        }}
      >
        LUNEX
      </motion.h1>
      <div
        className="absolute dark text-foreground top-0 left-0 origin-left"
        style={{
          translate: `${description.x}px ${description.y}px`,
        }}
      >
        <p>Where radiance meets care.</p>
        <Button className="rounded-full block mt-4" asChild>
          <Link href="/new">Check Out New Releases</Link>
        </Button>
      </div>
    </div>
  );
}

function useWindowSize() {
  const [windowSize, setWindowSize] = useState({
    width: window.innerWidth,
    height: window.innerHeight,
  });

  useEffect(() => {
    function handleResize() {
      setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    }

    window.addEventListener('resize', handleResize);

    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return windowSize;
}
