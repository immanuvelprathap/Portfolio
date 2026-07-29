import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import Reveal from './Reveal';

const ResearchStyles = styled.section`
  position: relative;
  padding: 12rem 0;
  overflow: hidden;

  .research__wave {
    position: absolute;
    left: 0;
    top: 50%;
    width: 220%;
    height: 220px;
    transform: translateY(-50%);
    opacity: 0.35;
    pointer-events: none;
  }

  .research__card {
    position: relative;
    z-index: 2;
    max-width: 90ch;
    margin: 0 auto;
    padding: 6rem clamp(2.4rem, 5vw, 6rem);
    border: 1px solid var(--line);
    border-radius: 32px;
    background: rgba(5, 7, 12, 0.72);
    backdrop-filter: blur(10px);
    text-align: center;
  }

  .research__card h2 {
    font-family: var(--display);
    font-size: clamp(2.2rem, 3.4vw, 3.4rem);
    color: var(--white);
    margin: 2rem 0;
    line-height: 1.35;
  }

  .research__meta {
    font-size: 1.3rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    color: var(--blue-bright);
    margin-bottom: 2.4rem;
  }

  .research__card p.body {
    font-size: 1.6rem;
    line-height: 1.85;
    max-width: 68ch;
    margin: 0 auto;
  }

  .research__links {
    display: flex;
    justify-content: center;
    gap: 1.6rem;
    flex-wrap: wrap;
    margin-top: 3.4rem;
  }

  .research__links a {
    padding: 1.1rem 2.8rem;
    border: 1px solid var(--blue);
    border-radius: 999px;
    font-size: 1.2rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--white);
    transition: box-shadow 0.35s ease, transform 0.35s ease, color 0.35s ease;
  }

  .research__links a:hover {
    color: var(--blue-bright);
    box-shadow: 0 0 30px var(--blue-glow);
    transform: translateY(-3px);
  }

  @media only screen and (max-width: 768px) {
    padding: 8rem 0;
  }
`;

const wave =
  'M0 110 C 40 40, 80 180, 120 110 S 200 40, 240 110 S 320 180, 360 110 S 440 40, 480 110 S 560 180, 600 110 S 680 40, 720 110 S 800 180, 840 110 S 920 40, 960 110';

export default function Research() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const waveX = useTransform(scrollYProgress, [0, 1], ['0%', '-35%']);

  return (
    <ResearchStyles ref={ref}>
      <motion.svg
        className="research__wave"
        viewBox="0 0 960 220"
        preserveAspectRatio="none"
        style={{ x: waveX }}
        aria-hidden="true"
      >
        <motion.path
          d={wave}
          fill="none"
          stroke="var(--blue)"
          strokeWidth="1.4"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 2.6, ease: 'easeInOut' }}
        />
        <motion.path
          d={wave}
          fill="none"
          stroke="rgba(127,220,255,0.35)"
          strokeWidth="0.8"
          transform="translate(0 26)"
          initial={{ pathLength: 0 }}
          whileInView={{ pathLength: 1 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 3.2, delay: 0.2, ease: 'easeInOut' }}
        />
      </motion.svg>

      <div className="container">
        <Reveal>
          <div className="research__card">
            <p className="eyebrow">Current research</p>
            <p className="research__meta">
              University of Bern · Artificial Intelligence in Medicine
            </p>
            <h2>
              Overcoming the BCI calibration bottleneck: a clinically grounded
              architecture using Riemannian alignment and stochastic weight
              averaging.
            </h2>
            <p className="body">
              Every brain-computer interface asks its user to sit through a
              calibration ritual before it will listen. This work removes that
              ritual — aligning EEG covariance structure across subjects on a
              Riemannian manifold and averaging model weights along the
              training trajectory, so the decoder generalises to a brain it has
              never seen. Bindu: the first thought already counts.
            </p>
            <div className="research__links">
              <a
                href="https://github.com/immanuvelprathap/Zero-Calibration-BCI"
                target="_blank"
                rel="noreferrer"
              >
                Repository
              </a>
              <a
                href="https://www.linkedin.com/in/immanuvelprathaps/"
                target="_blank"
                rel="noreferrer"
              >
                Preprint announcement
              </a>
            </div>
          </div>
        </Reveal>
      </div>
    </ResearchStyles>
  );
}
