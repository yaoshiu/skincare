'use client';

import dynamic from 'next/dynamic';
import React from 'react';

function NoSSR({ children }: { children: React.ReactNode }) {
  return <React.Fragment>{children}</React.Fragment>;
}

export default dynamic(() => Promise.resolve(NoSSR), {
  ssr: false,
});
