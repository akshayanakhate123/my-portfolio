'use client';

import { Suspense, lazy, useState, useEffect } from 'react';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  // Never render on the server — @splinetool/runtime accesses WebGL/window
  // APIs that don't exist in Node.js and will throw during SSR pre-rendering.
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <Spline scene={scene} className={className} />
    </Suspense>
  );
}
