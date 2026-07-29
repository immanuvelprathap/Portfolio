import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';

const GateOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 2.6rem;
  background: var(--void);
  color: var(--white);
  text-align: center;
  padding: 2.4rem;

  .gate-ring {
    width: 12rem;
    height: 12rem;
    border-radius: 50%;
    border: 1px solid var(--line);
    display: grid;
    place-items: center;

    svg {
      width: 4.2rem;
      height: 4.2rem;
      color: var(--blue);
    }
  }

  .gate-eyebrow {
    font-family: var(--mono);
    font-size: 1.2rem;
    letter-spacing: 0.45em;
    text-transform: uppercase;
    color: var(--blue-bright);
  }

  .gate-title {
    font-family: var(--display);
    font-size: clamp(2.8rem, 7vw, 5.2rem);
    color: var(--blue);
    letter-spacing: 0.08em;
    line-height: 1.05;
  }

  .gate-sub {
    max-width: 44ch;
    font-size: 1.45rem;
    color: var(--mist);
    line-height: 1.7;
  }

  .gate-btn {
    margin-top: 0.8rem;
    padding: 1.4rem 3.2rem;
    border: 1px solid var(--blue);
    background: transparent;
    color: var(--blue-bright);
    font-family: var(--mono);
    font-size: 1.3rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    transition: background 0.35s ease, color 0.35s ease, transform 0.35s ease;

    &:hover {
      background: var(--blue);
      color: var(--void);
      transform: translateY(-2px);
    }
  }

  @media only screen and (max-width: 768px) {
    .gate-ring {
      width: 9rem;
      height: 9rem;

      svg {
        width: 3.2rem;
        height: 3.2rem;
      }
    }
  }
`;

export default function SoundGate() {
  const [entered, setEntered] = useState(false);

  const enter = () => {
    window.dispatchEvent(new CustomEvent('damru:enter'));
    setEntered(true);
  };

  return (
    <AnimatePresence>
      {!entered && (
        <GateOverlay
          key="sound-gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, ease: 'easeInOut' }}
        >
          <motion.div
            className="gate-ring"
            animate={{ scale: [1, 1.08, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <svg viewBox="0 0 24 24" fill="currentColor">
              <path d="M12 3v9.28a4.39 4.39 0 0 0-1.5-.28C8.57 12 7 13.57 7 15.5S8.57 19 10.5 19c1.87 0 3.4-1.46 3.49-3.3L14 15.6V7h3V3h-5z" />
            </svg>
          </motion.div>
          <div className="gate-eyebrow">Ō Namaḥ Śivāya</div>
          <h1 className="gate-title">Enter the field</h1>
          <p className="gate-sub">
            A continuous damru drone accompanies this space. Click below to enter
            with sound.
          </p>
          <button type="button" className="gate-btn" onClick={enter}>
            Enter with damru
          </button>
        </GateOverlay>
      )}
    </AnimatePresence>
  );
}
