import { motion } from 'framer-motion';
import styled from 'styled-components';
import Reveal from './Reveal';

const SkillsStyles = styled.section`
  padding: 12rem 0;

  .skills__head {
    max-width: 60ch;
    margin-bottom: 7rem;
  }

  .skills__head h2 {
    font-family: var(--display-bold);
    font-size: clamp(3rem, 5vw, 5.2rem);
    color: var(--white);
    margin: 1.6rem 0 2rem;
  }

  .skills__rows {
    border-top: 1px solid var(--line);
  }

  .skills__row {
    display: grid;
    grid-template-columns: 4rem 1fr 1.6fr;
    gap: 3rem;
    align-items: baseline;
    padding: 3.4rem 0;
    border-bottom: 1px solid var(--line);
    transition: background 0.4s ease, padding-left 0.4s ease;
  }

  .skills__row:hover {
    background: linear-gradient(
      to right,
      rgba(47, 155, 255, 0.08),
      rgba(0, 0, 0, 0)
    );
    padding-left: 1.4rem;
  }

  .skills__index {
    font-size: 1.2rem;
    color: var(--blue);
    letter-spacing: 0.2em;
  }

  .skills__name {
    font-family: var(--display);
    font-size: clamp(1.8rem, 2.4vw, 2.6rem);
    color: var(--white);
  }

  .skills__meta {
    font-size: 1.4rem;
    color: var(--mist);
  }

  .skills__meta strong {
    display: block;
    font-weight: 400;
    color: var(--blue-bright);
    font-size: 1.2rem;
    letter-spacing: 0.2em;
    text-transform: uppercase;
    margin-bottom: 0.8rem;
  }

  @media only screen and (max-width: 768px) {
    padding: 8rem 0;
    .skills__row {
      grid-template-columns: 3rem 1fr;
    }
    .skills__meta {
      grid-column: 2 / -1;
    }
  }
`;

const skills = [
  {
    name: 'Neural Signal Decoding',
    layer: 'Brain–Computer Interfaces',
    detail:
      'EEG preprocessing, Riemannian geometry on covariance manifolds, transfer learning across subjects, stochastic weight averaging, calibration-free inference.',
  },
  {
    name: 'Machine Learning for Medicine',
    layer: 'Research',
    detail:
      'PyTorch, deep sequence models, unsupervised anomaly detection on physiological time series, evaluation under clinical constraints.',
  },
  {
    name: 'Data Engineering',
    layer: 'Seven Years in Industry',
    detail:
      'Python, SQL, ETL architecture, MySQL, Power BI, pipeline design and orchestration for enterprise-scale datasets at Schneider Electric.',
  },
  {
    name: 'Applied Computer Vision',
    layer: 'Perception',
    detail:
      'OpenCV, CNNs, OCR and detection pipelines — from drone-mapped farmland to document understanding.',
  },
  {
    name: 'Systems & Delivery',
    layer: 'Engineering Craft',
    detail:
      'Agile SDLC, API and backend services, React front-ends, deployment and the unglamorous work that makes research usable.',
  },
];

export default function Skills() {
  return (
    <SkillsStyles>
      <div className="container">
        <div className="skills__head">
          <Reveal>
            <p className="eyebrow">Instruments</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h2>What I work with.</h2>
          </Reveal>
          <Reveal delay={0.16}>
            <p>
              Ascending layers, the way cortex is built: from raw signal at the
              bottom to the systems that carry a model to the people it is
              meant to serve.
            </p>
          </Reveal>
        </div>

        <div className="skills__rows">
          {skills.map((skill, index) => (
            <motion.div
              className="skills__row"
              key={skill.name}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{
                duration: 0.7,
                delay: index * 0.05,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <span className="skills__index">
                {String(index + 1).padStart(2, '0')}
              </span>
              <h3 className="skills__name">{skill.name}</h3>
              <p className="skills__meta">
                <strong>{skill.layer}</strong>
                {skill.detail}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </SkillsStyles>
  );
}
