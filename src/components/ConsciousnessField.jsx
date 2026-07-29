import { useEffect, useRef } from 'react';
import styled from 'styled-components';

const FieldStyles = styled.div`
  position: fixed;
  inset: 0;
  z-index: 0;
  pointer-events: none;
  background:
    radial-gradient(
      circle at 50% 12%,
      rgba(47, 155, 255, 0.16) 0%,
      rgba(0, 0, 0, 0) 55%
    ),
    radial-gradient(
      circle at 82% 78%,
      rgba(11, 63, 122, 0.22) 0%,
      rgba(0, 0, 0, 0) 50%
    ),
    var(--void);

  canvas {
    width: 100%;
    height: 100%;
  }
`;

const NEURON_DENSITY = 1 / 16000;
const MAX_NEURONS = 120;
const LINK_DISTANCE = 170;

function createNeurons(width, height) {
  const count = Math.min(
    MAX_NEURONS,
    Math.max(36, Math.round(width * height * NEURON_DENSITY))
  );
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    vx: (Math.random() - 0.5) * 0.16,
    vy: (Math.random() - 0.5) * 0.16,
    r: Math.random() * 1.4 + 0.6,
    phase: Math.random() * Math.PI * 2,
  }));
}

export default function ConsciousnessField() {
  const canvasRef = useRef(null);
  const pointer = useRef({ x: -9999, y: -9999 });

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return undefined;
    const ctx = canvas.getContext('2d');
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let neurons = [];
    let frame = 0;
    let raf = 0;
    let width = 0;
    let height = 0;

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      neurons = createNeurons(width, height);
    };

    const draw = () => {
      frame += 1;
      ctx.clearRect(0, 0, width, height);

      const { x: px, y: py } = pointer.current;

      for (let i = 0; i < neurons.length; i += 1) {
        const n = neurons[i];
        if (!reduced) {
          n.x += n.vx;
          n.y += n.vy;
        }
        if (n.x < 0) n.x = width;
        if (n.x > width) n.x = 0;
        if (n.y < 0) n.y = height;
        if (n.y > height) n.y = 0;

        for (let j = i + 1; j < neurons.length; j += 1) {
          const m = neurons[j];
          const dx = n.x - m.x;
          const dy = n.y - m.y;
          const dist = Math.hypot(dx, dy);
          if (dist < LINK_DISTANCE) {
            const strength = 1 - dist / LINK_DISTANCE;
            ctx.strokeStyle = `rgba(47, 155, 255, ${strength * 0.16})`;
            ctx.lineWidth = 0.6;
            ctx.beginPath();
            ctx.moveTo(n.x, n.y);
            ctx.lineTo(m.x, m.y);
            ctx.stroke();
          }
        }

        const nearPointer = Math.hypot(n.x - px, n.y - py) < 190;
        const pulse = reduced ? 0.5 : (Math.sin(frame * 0.02 + n.phase) + 1) / 2;
        const alpha = 0.25 + pulse * 0.45 + (nearPointer ? 0.3 : 0);
        ctx.fillStyle = `rgba(127, 220, 255, ${Math.min(alpha, 1)})`;
        ctx.beginPath();
        ctx.arc(n.x, n.y, n.r + pulse * 0.9, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = window.requestAnimationFrame(draw);
    };

    const handlePointer = (e) => {
      pointer.current = { x: e.clientX, y: e.clientY };
    };

    resize();
    draw();
    window.addEventListener('resize', resize);
    window.addEventListener('pointermove', handlePointer);

    return () => {
      window.cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointer);
    };
  }, []);

  return (
    <FieldStyles aria-hidden="true">
      <canvas ref={canvasRef} />
    </FieldStyles>
  );
}
