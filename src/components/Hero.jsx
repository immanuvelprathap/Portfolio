import { useEffect, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import Mandala from './Mandala';
import profile from '../data/profile';

const HeroStyles = styled.section`
  position: relative;
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16rem 0 16rem;
  overflow: hidden;

  .hero__mandala {
    position: absolute;
    inset: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    opacity: 0.85;
  }

  .hero__mandala > div {
    width: min(76vw, 560px);
    max-width: none;
  }

  .hero__content {
    position: relative;
    z-index: 2;
    text-align: center;
  }

  .hero__mantra {
    font-size: 1.4rem;
    letter-spacing: 0.6em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 2.4rem;
  }

  .hero__name {
    font-family: var(--display-bold);
    font-size: clamp(4rem, 9vw, 10.5rem);
    color: var(--white);
    letter-spacing: -0.02em;
    display: flex;
    justify-content: center;
    flex-wrap: wrap;
    gap: 0 0.24em;
  }

  .hero__name span.word {
    display: inline-flex;
  }

  .hero__name span.letter {
    display: inline-block;
    text-shadow: 0 0 42px rgba(47, 155, 255, 0.35);
  }

  .hero__role {
    margin-top: 2rem;
    height: 3.4rem;
    font-size: clamp(1.4rem, 2.2vw, 1.9rem);
    letter-spacing: 0.32em;
    text-transform: uppercase;
    color: var(--blue-bright);
  }

  .hero__line {
    width: 1px;
    height: 5rem;
    margin: 2.4rem auto 0;
    background: linear-gradient(
      to bottom,
      rgba(47, 155, 255, 0),
      rgba(47, 155, 255, 0.9)
    );
  }

  .hero__tagline {
    max-width: 62ch;
    margin: 2.4rem auto 0;
    font-size: clamp(1.5rem, 1.9vw, 1.8rem);
    color: var(--mist);
  }

  .hero__tagline em {
    color: var(--white);
    font-style: normal;
  }

  .hero__actions {
    margin-top: 3.2rem;
    display: flex;
    gap: 1.6rem;
    justify-content: center;
    flex-wrap: wrap;
  }

  .hero__cta {
    padding: 1.3rem 3.4rem;
    border-radius: 999px;
    font-size: 1.4rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    border: 1px solid var(--blue);
    color: var(--white);
    transition: all 0.35s ease;
  }

  .hero__cta--solid {
    background: var(--blue);
    color: var(--void);
  }

  .hero__cta:hover {
    box-shadow: 0 0 32px var(--blue-glow);
    transform: translateY(-3px);
  }

  .hero__scroll {
    position: absolute;
    bottom: 3rem;
    left: 50%;
    transform: translateX(-50%);
    z-index: 2;
    font-size: 1.1rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--mist-dim);
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 1.2rem;
  }

  .hero__scroll__rail {
    width: 1px;
    height: 6rem;
    background: rgba(47, 155, 255, 0.25);
    position: relative;
    overflow: hidden;
  }

  .hero__scroll__spark {
    position: absolute;
    left: 0;
    width: 100%;
    height: 2rem;
    background: linear-gradient(
      to bottom,
      rgba(127, 220, 255, 0),
      var(--blue-bright)
    );
  }

  @media only screen and (max-width: 768px) {
    padding: 12rem 0 12rem;
    .hero__mantra {
      letter-spacing: 0.4em;
    }
  }
`;

const nameVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.045, delayChildren: 0.35 } },
};

const letterVariants = {
  hidden: { opacity: 0, y: 60, filter: 'blur(12px)' },
  visible: {
    opacity: 1,
    y: 0,
    filter: 'blur(0px)',
    transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] },
  },
};

export default function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 700], [0, -120]);
  const contentOpacity = useTransform(scrollY, [0, 520], [1, 0]);
  const mandalaScale = useTransform(scrollY, [0, 700], [1, 1.35]);

  useEffect(() => {
    const id = window.setInterval(
      () => setRoleIndex((i) => (i + 1) % profile.roles.length),
      3200
    );
    return () => window.clearInterval(id);
  }, []);

  const words = profile.name.split(' ');

  return (
    <HeroStyles>
      <motion.div
        className="hero__mandala"
        style={{ scale: mandalaScale, opacity: contentOpacity }}
        initial={{ opacity: 0, scale: 0.82 }}
        animate={{ opacity: 0.85, scale: 1 }}
        transition={{ duration: 2.2, ease: 'easeOut' }}
      >
        <Mandala />
      </motion.div>

      <motion.div
        className="hero__content container"
        style={{ y: contentY, opacity: contentOpacity }}
      >
        <motion.p
          className="hero__mantra"
          initial={{ opacity: 0, letterSpacing: '1.2em' }}
          animate={{ opacity: 1, letterSpacing: '0.6em' }}
          transition={{ duration: 1.6, ease: 'easeOut' }}
        >
          {profile.mantra}
        </motion.p>

        <motion.h1
          className="hero__name"
          variants={nameVariants}
          initial="hidden"
          animate="visible"
          aria-label={profile.name}
        >
          {words.map((word) => (
            <span className="word" key={word} aria-hidden="true">
              {word.split('').map((char, i) => (
                <motion.span
                  className="letter"
                  key={`${word}-${i}`}
                  variants={letterVariants}
                >
                  {char}
                </motion.span>
              ))}
            </span>
          ))}
        </motion.h1>

        <div className="hero__role">
          <motion.span
            key={profile.roles[roleIndex]}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -14 }}
            transition={{ duration: 0.7, ease: 'easeOut' }}
            style={{ display: 'inline-block' }}
          >
            {profile.roles[roleIndex]}
          </motion.span>
        </div>

        <motion.div
          className="hero__line"
          initial={{ scaleY: 0 }}
          animate={{ scaleY: 1 }}
          transition={{ duration: 1.4, delay: 1.1, ease: 'easeOut' }}
          style={{ transformOrigin: 'top' }}
        />

        <motion.p
          className="hero__tagline"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.3, ease: 'easeOut' }}
        >
          Between <em>Śiva&apos;s stillness</em> and the storm of cortical
          spikes, I build systems that read intention directly from the brain —
          machine learning for medicine, tuned to the oldest question we have
          about awareness.
        </motion.p>

        <motion.div
          className="hero__actions"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 1.5, ease: 'easeOut' }}
        >
          <Link className="hero__cta hero__cta--solid" to="/projects">
            Enter the network
          </Link>
          <a className="hero__cta" href="#who-i-am">
            Who I am
          </a>
        </motion.div>
      </motion.div>

      <div className="hero__scroll">
        <span>Scroll</span>
        <div className="hero__scroll__rail">
          <motion.div
            className="hero__scroll__spark"
            initial={{ y: '-100%' }}
            animate={{ y: '300%' }}
            transition={{ duration: 2.4, repeat: Infinity, ease: 'easeInOut' }}
          />
        </div>
      </div>
    </HeroStyles>
  );
}
