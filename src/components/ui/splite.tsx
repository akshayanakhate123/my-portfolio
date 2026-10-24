'use client';

import { Suspense, lazy, useState, useEffect, useRef, useCallback, memo } from 'react';
import type { Application } from '@splinetool/runtime';

const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

// memo prevents React re-renders from reaching Spline after the first mount.
// When Spline's runtime detects a newer scene version it calls load() again
// internally — if React also re-renders at that moment, a second
// THREE.WebGLRenderer is created before the first is disposed, causing Chrome
// to mark the page as having caused a context loss and blocking all further
// WebGL creation. memo() stops that re-render path entirely.
const SplineWithDispose = memo(function SplineWithDispose({ scene, className }: SplineSceneProps) {
  const appRef = useRef<Application | null>(null);
  const throwRef = useRef<((e: Error) => void) | null>(null);

  const onLoad = useCallback((splineApp: Application) => {
    appRef.current = splineApp;

    // Intercept WebGL context loss: dispose immediately so Spline doesn't
    // try to recreate a renderer while Chrome has blocked new contexts.
    const canvas = (splineApp as unknown as { renderer?: { domElement?: HTMLCanvasElement } })
      .renderer?.domElement;
    if (canvas) {
      canvas.addEventListener('webglcontextlost', (e: Event) => {
        e.preventDefault();
        const app = appRef.current;
        if (app) {
          try { app.dispose(); } catch { /* ignore */ }
          appRef.current = null;
        }
        throwRef.current?.(new Error('WebGL context lost'));
      }, { once: true });
    }
  }, []);

  useEffect(() => {
    return () => {
      const app = appRef.current;
      if (app) {
        try { app.dispose(); } catch { /* ignore */ }
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
});

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
