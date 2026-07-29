import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import styled from 'styled-components';
import gateImage from '../assets/images/gate-bg.jpg';

const GateOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 1000;
  display: grid;
  place-items: center;
  background: var(--void);
  color: var(--white);
  text-align: center;
  overflow: hidden;

  .gate-bg {
    position: absolute;
    inset: 0;
    background: url(${gateImage}) center 22% / cover no-repeat;
    opacity: 0.55;
  }

  .gate-vignette {
    position: absolute;
    inset: 0;
    background: radial-gradient(circle at center, rgba(0, 0, 0, 0.1) 0%, rgba(0, 0, 0, 0.82) 75%);
  }

  .gate-content {
    position: relative;
    z-index: 1;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 2.4rem;
    padding: 2.4rem;
    max-width: 70rem;
  }

  .gate-eye {
    width: 7rem;
    height: auto;
    color: var(--blue-bright);
    filter: drop-shadow(0 0 1.2rem rgba(0, 118, 255, 0.55));
  }

  .gate-eyebrow {
    font-family: var(--mono);
    font-size: 1.2rem;
    letter-spacing: 0.45em;
    text-transform: uppercase;
    color: var(--blue-bright);
    text-shadow: 0 0 1.2rem rgba(0, 118, 255, 0.35);
  }

  .gate-title {
    font-family: var(--display);
    font-size: clamp(3.2rem, 8vw, 6rem);
    color: var(--blue);
    letter-spacing: 0.08em;
    line-height: 1.05;
    text-shadow: 0 0 2rem rgba(0, 118, 255, 0.25);
  }

  .gate-sub {
    max-width: 46ch;
    font-size: 1.5rem;
    color: var(--mist);
    line-height: 1.7;
  }

  .gate-btn {
    padding: 1.6rem 4rem;
    border: 1px solid var(--blue);
    background: rgba(0, 0, 0, 0.45);
    color: var(--blue-bright);
    font-family: var(--mono);
    font-size: 1.4rem;
    letter-spacing: 0.35em;
    text-transform: uppercase;
    backdrop-filter: blur(10px);
    transition: background 0.35s ease, color 0.35s ease, transform 0.35s ease;

    &:hover {
      background: var(--blue);
      color: var(--void);
      transform: translateY(-2px);
    }
  }
`;

export default function SoundGate() {
  const [entered, setEntered] = useState(false);
  const navigate = useNavigate();

  const enter = () => {
    window.dispatchEvent(new CustomEvent('damru:enter'));
    setEntered(true);
    setTimeout(() => {
      navigate('/', { replace: true });
    }, 600);
  };

  return (
    <AnimatePresence>
      {!entered && (
        <GateOverlay
          key="sound-gate"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.6, ease: 'easeInOut' }}
          onClick={enter}
        >
          <div className="gate-bg" />
          <div className="gate-vignette" />
          <div
            className="gate-content"
            onClick={(e) => e.stopPropagation()}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') enter();
            }}
          >
            <svg className="gate-eye" viewBox="0 0 64 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path
                d="M2 20C18 2 46 2 62 20C46 38 18 38 2 20Z"
                stroke="currentColor"
                strokeWidth="2"
              />
              <circle cx="32" cy="20" r="7" fill="currentColor" />
              <path d="M32 4V12M32 28V36" stroke="currentColor" strokeWidth="2" />
            </svg>
            <div className="gate-eyebrow">Ō Namaḥ Śivāya</div>
            <h1 className="gate-title">Enter the neural temple</h1>
            <p className="gate-sub">
              A continuous OM drone accompanies this space. Click below to
              enter with sound and continue to the home page.
            </p>
            <button type="button" className="gate-btn" onClick={enter}>
              Enter with sound
            </button>
          </div>
        </GateOverlay>
      )}
    </AnimatePresence>
  );
}
