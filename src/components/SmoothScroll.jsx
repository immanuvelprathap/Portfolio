import { useEffect } from 'react';
import Lenis from 'lenis';

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.07,
      wheelMultiplier: 0.85,
      touchMultiplier: 1.4,
      smoothWheel: true,
      syncTouch: true,
      syncTouchLerp: 0.1,
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      infinite: false,
    });

    window.lenis = lenis;

    let raf = 0;
    const loop = (time) => {
      lenis.raf(time);
      raf = window.requestAnimationFrame(loop);
    };
    raf = window.requestAnimationFrame(loop);

    return () => {
      window.cancelAnimationFrame(raf);
      lenis.destroy();
      delete window.lenis;
    };
  }, []);

  return null;
}
