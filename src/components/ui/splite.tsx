'use client';

import { Suspense, lazy, useState, useRef, useEffect } from 'react';

// React.lazy keeps the original import path that webpack can resolve.
// We defer mounting until the container has non-zero pixel dimensions to
// prevent GL_INVALID_FRAMEBUFFER_OPERATION crashes in Chrome.
const Spline = lazy(() => import('@splinetool/react-spline'));

interface SplineSceneProps {
  scene: string;
  className?: string;
}

export function SplineScene({ scene, className }: SplineSceneProps) {
  const [ready, setReady] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;

    const tryReady = () => {
      if (el.offsetWidth > 0 && el.offsetHeight > 0) {
        setReady(true);
        return true;
      }
      return false;
    };

    if (tryReady()) return;

    const ro = new ResizeObserver(() => { if (tryReady()) ro.disconnect(); });
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  return (
    <div ref={containerRef} className={className} style={{ width: '100%', height: '100%' }}>
      {ready && (
        <Suspense fallback={null}>
          <Spline scene={scene} className="w-full h-full" />
        </Suspense>
      )}
    </div>
  );
}
