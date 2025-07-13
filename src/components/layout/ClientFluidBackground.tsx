'use client';

import dynamic from 'next/dynamic';

// Dynamically import the MinimalBackground component with SSR disabled
// Using the simplest possible component to avoid rendering issues
const MinimalBackground = dynamic(
    () => import('./MinimalBackground'),
    { ssr: false }
);

export default MinimalBackground;