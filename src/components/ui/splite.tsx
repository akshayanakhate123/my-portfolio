'use client';

import { Suspense, lazy, useState, useEffect, useRef, useCallback } from 'react';
import type { Application } from '@splinetool/runtime';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

// Inner wrapper that holds a ref to the Spline Application and disposes it on unmount.
// Without this, each unmount/remount leaks a WebGL context, and Chrome blocks new ones
// once the global limit (~8-16) is reached.
function SplineWithDispose({ scene, className }: SplineSceneProps) {
  const appRef = useRef<Application | null>(null);

  const onLoad = useCallback((splineApp: Application) => {
    appRef.current = splineApp;
  }, []);

  useEffect(() => {
    return () => {
      const app = appRef.current;
      if (app) {
        try { app.dispose(); } catch { /* ignore dispose errors */ }
        appRef.current = null;
      }
    };
  }, []);

  return (
    <Spline
      scene={scene}
      className={className}
      onLoad={onLoad}
    />
  );
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);

  if (!mounted) return null;

  return (
    <Suspense fallback={null}>
      <SplineWithDispose scene={scene} className={className} />
    </Suspense>
  );
}
