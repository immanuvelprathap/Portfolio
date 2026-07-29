import { motion } from 'framer-motion';
import styled from 'styled-components';
import Reveal from './Reveal';
import pillars from '../data/pillars';

const PillarsStyles = styled.section`
  padding: 12rem 0;

  .pillars__head {
    max-width: 70ch;
    margin-bottom: 8rem;
  }

  .pillars__head h2 {
    font-family: var(--display-bold);
    font-size: clamp(3rem, 5vw, 5.2rem);
    color: var(--white);
    margin: 1.6rem 0 2rem;
  }

  .pillars__head h2 em {
    font-style: normal;
    color: var(--blue);
  }

  .pillars__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
    gap: 5rem 4rem;
  }

  .pillar {
    position: relative;
    padding-left: 8.5rem;
  }

  .pillar__glyph {
    position: absolute;
    left: 0;
    top: 0;
    width: 6rem;
    height: 6rem;
    display: grid;
    place-items: center;
    font-size: 2.4rem;
    color: var(--blue-bright);
    border: 1px solid var(--line);
    border-radius: 58% 42% 47% 53% / 45% 52% 48% 55%;
    background: radial-gradient(
      circle at 35% 30%,
      rgba(47, 155, 255, 0.22),
      rgba(0, 0, 0, 0.7)
    );
    transition: box-shadow 0.4s ease, border-radius 0.6s ease;
  }

  .pillar:hover .pillar__glyph {
    box-shadow: 0 0 40px var(--blue-glow);
    border-radius: 42% 58% 62% 38% / 58% 40% 60% 42%;
  }

  .pillar__sanskrit {
    font-size: 2.2rem;
    color: var(--blue);
    font-family: var(--display);
  }

  .pillar__translation {
    font-size: 1.4rem;
    color: var(--mist-dim);
    font-style: italic;
    margin-bottom: 1.2rem;
  }

  .pillar__science {
    font-size: 1.2rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    color: var(--white);
    padding-bottom: 1.4rem;
    margin-bottom: 1.4rem;
    border-bottom: 1px solid var(--line);
  }

  .pillar__text {
    font-size: 1.5rem;
    line-height: 1.8;
  }

  @media only screen and (max-width: 768px) {
    padding: 8rem 0;
    .pillars__head {
      margin-bottom: 5rem;
    }
  }
`;

export default function Pillars() {
  return (
    <PillarsStyles>
      <div className="container">
        <div className="pillars__head">
          <Reveal>
            <p className="eyebrow">Two languages, one question</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2>
              Śaiva metaphysics, read through an <em>electrode</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p>
              The Tantras describe consciousness as vibration, geometry and a
              point without dimension. Neuroscience arrived at oscillations,
              manifolds and the single moment a decision becomes measurable.
              These are the six correspondences my work lives inside.
            </p>
          </Reveal>
        </div>

        <div className="pillars__grid">
          {pillars.map((pillar, index) => (
            <motion.div
              className="pillar"
              key={pillar.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{
                duration: 0.8,
                delay: (index % 3) * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <div className="pillar__glyph">{pillar.glyph}</div>
              <h3 className="pillar__sanskrit">{pillar.sanskrit}</h3>
              <p className="pillar__translation">{pillar.translation}</p>
              <p className="pillar__science">{pillar.science}</p>
              <p className="pillar__text">{pillar.text}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </PillarsStyles>
  );
}
