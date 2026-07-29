import { motion } from 'framer-motion';
import styled from 'styled-components';

const MandalaStyles = styled.div`
  position: relative;
  width: 100%;
  max-width: 520px;
  aspect-ratio: 1 / 1;
  margin: 0 auto;

  svg {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    overflow: visible;
  }
`;

const petals = Array.from({ length: 16 }, (_, i) => (i * 360) / 16);
const spokes = Array.from({ length: 32 }, (_, i) => (i * 360) / 32);

// Upward and downward triangles of the Sri Yantra, drawn as a single lattice.
const triangles = [
  { points: '100,26 168,150 32,150', up: true },
  { points: '100,44 152,138 48,138', up: true },
  { points: '100,174 168,50 32,50', up: false },
  { points: '100,158 152,62 48,62', up: false },
];

export default function Mandala() {
  return (
    <MandalaStyles aria-hidden="true">
      <motion.svg
        viewBox="0 0 200 200"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 220, repeat: Infinity, ease: 'linear' }}
      >
        {spokes.map((angle) => (
          <line
            key={angle}
            x1="100"
            y1="100"
            x2="100"
            y2="4"
            stroke="rgba(47, 155, 255, 0.13)"
            strokeWidth="0.4"
            transform={`rotate(${angle} 100 100)`}
          />
        ))}
        <circle
          cx="100"
          cy="100"
          r="96"
          fill="none"
          stroke="rgba(47, 155, 255, 0.28)"
          strokeWidth="0.6"
          strokeDasharray="2 6"
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 200 200"
        initial={{ rotate: 0 }}
        animate={{ rotate: -360 }}
        transition={{ duration: 140, repeat: Infinity, ease: 'linear' }}
      >
        {petals.map((angle) => (
          <path
            key={angle}
            d="M100 22 C 112 44, 112 58, 100 74 C 88 58, 88 44, 100 22 Z"
            fill="none"
            stroke="rgba(127, 220, 255, 0.22)"
            strokeWidth="0.6"
            transform={`rotate(${angle} 100 100)`}
          />
        ))}
        <circle
          cx="100"
          cy="100"
          r="78"
          fill="none"
          stroke="rgba(47, 155, 255, 0.22)"
          strokeWidth="0.5"
        />
      </motion.svg>

      <motion.svg
        viewBox="0 0 200 200"
        initial={{ rotate: 0 }}
        animate={{ rotate: 360 }}
        transition={{ duration: 90, repeat: Infinity, ease: 'linear' }}
      >
        {triangles.map((tri) => (
          <polygon
            key={tri.points}
            points={tri.points}
            fill="none"
            stroke={
              tri.up ? 'rgba(47, 155, 255, 0.45)' : 'rgba(127, 220, 255, 0.35)'
            }
            strokeWidth="0.7"
          />
        ))}
      </motion.svg>

      <svg viewBox="0 0 200 200">
        <motion.circle
          cx="100"
          cy="100"
          r="16"
          fill="none"
          stroke="rgba(127, 220, 255, 0.5)"
          strokeWidth="0.8"
          animate={{ r: [14, 22, 14], opacity: [0.5, 0.15, 0.5] }}
          transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut' }}
        />
        <motion.circle
          cx="100"
          cy="100"
          r="5"
          fill="var(--blue-bright)"
          animate={{ opacity: [0.55, 1, 0.55], scale: [1, 1.25, 1] }}
          transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          style={{ transformOrigin: '100px 100px' }}
        />
      </svg>
    </MandalaStyles>
  );
}
