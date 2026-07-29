import { useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import SocialLinks from '../components/SocialLinks';
import AboutImg from '../assets/images/about-page-img.jpeg';

const AboutStyles = styled.div`
  padding: 18rem 0 0;

  .about__top {
    display: grid;
    grid-template-columns: 1.25fr 0.85fr;
    gap: 7rem;
    align-items: start;
  }

  .about__top h1 {
    font-family: var(--display-bold);
    font-size: clamp(3.4rem, 6.4vw, 6.4rem);
    color: var(--white);
    margin: 1.8rem 0 3rem;
  }

  .about__top h1 em {
    font-style: normal;
    color: var(--blue);
  }

  .about__top p {
    font-size: 1.65rem;
    line-height: 1.9;
    margin-bottom: 2.2rem;
  }

  .about__portrait {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid var(--line);
    filter: grayscale(1) contrast(1.1) brightness(0.85);
  }

  .about__portrait img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .about__social {
    margin-top: 4rem;
  }

  .timeline {
    position: relative;
    margin: 14rem 0 10rem;
    padding-left: 6rem;
  }

  .timeline__rail {
    position: absolute;
    left: 1.6rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background: rgba(47, 155, 255, 0.16);
    transform-origin: top;
  }

  .timeline__progress {
    position: absolute;
    left: 1.6rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(to bottom, var(--blue), var(--blue-bright));
    transform-origin: top;
    box-shadow: 0 0 18px var(--blue-glow);
  }

  .timeline__group {
    margin-bottom: 8rem;
  }

  .timeline__group > h2 {
    font-size: 1.3rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 4rem;
  }

  .timeline__item {
    position: relative;
    margin-bottom: 4.5rem;
  }

  .timeline__item::before {
    content: '';
    position: absolute;
    left: -4.9rem;
    top: 0.8rem;
    width: 1.2rem;
    height: 1.2rem;
    border-radius: 50%;
    background: var(--blue);
    box-shadow: 0 0 20px var(--blue-glow);
  }

  .timeline__when {
    font-size: 1.2rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--blue-bright);
    margin-bottom: 0.8rem;
  }

  .timeline__what {
    font-family: var(--display);
    font-size: clamp(1.8rem, 2.4vw, 2.4rem);
    color: var(--white);
    margin-bottom: 0.6rem;
  }

  .timeline__where {
    font-size: 1.45rem;
    color: var(--mist);
  }

  @media only screen and (max-width: 950px) {
    padding: 12rem 0 0;
    .about__top {
      grid-template-columns: 1fr;
      gap: 4rem;
    }
    .timeline {
      margin: 8rem 0 6rem;
    }
  }
`;

const experience = [
  {
    when: '09/2025 — Present',
    what: 'Researcher, Artificial Intelligence in Medicine',
    where: 'University of Bern, Switzerland · Research Master\u2019s',
  },
  {
    when: '04/2023 — 03/2025',
    what: 'Senior Data Engineer',
    where: 'Schneider Electric via Cigres Technologies, Bangalore',
  },
  {
    when: '01/2023 — 04/2023',
    what: 'Senior Data Engineer',
    where: 'Schneider Electric via CIGNEX Datamatics, Bangalore',
  },
  {
    when: '2020 — 2022',
    what: 'Data Engineer',
    where: 'EdgeRock Software Solutions, Bangalore',
  },
  {
    when: '2019 — 2020',
    what: 'Design Student',
    where: 'Scuola Politecnica di Design, Milan',
  },
  {
    when: '2017 — 2019',
    what: 'Application Development Analyst',
    where: 'eSoftCube Technology, Tamil Nadu',
  },
];

const education = [
  {
    when: 'Present',
    what: 'MSc Research — Artificial Intelligence in Medicine',
    where: 'University of Bern, Switzerland',
  },
  {
    when: 'Bachelor',
    what: 'B.Tech, Mechanical Engineering',
    where: 'Jain University, Bangalore',
  },
  {
    when: 'Pre-University',
    what: 'Science',
    where: 'St. Joseph\u2019s Pre-University College, Bangalore',
  },
];

function Group({ title, items }) {
  return (
    <div className="timeline__group">
      <h2>{title}</h2>
      {items.map((item, index) => (
        <motion.div
          className="timeline__item"
          key={item.what + item.when}
          initial={{ opacity: 0, y: 44 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{
            duration: 0.7,
            delay: index * 0.04,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <p className="timeline__when">{item.when}</p>
          <h3 className="timeline__what">{item.what}</h3>
          <p className="timeline__where">{item.where}</p>
        </motion.div>
      ))}
    </div>
  );
}

export default function About() {
  const timelineRef = useRef(null);
  const { scrollYProgress } = useScroll({
    target: timelineRef,
    offset: ['start 0.75', 'end 0.6'],
  });
  const progress = useSpring(scrollYProgress, {
    stiffness: 80,
    damping: 24,
    restDelta: 0.001,
  });

  return (
    <>
      <AboutStyles>
        <div className="container">
          <div className="about__top">
            <div>
              <Reveal>
                <p className="eyebrow">About</p>
              </Reveal>
              <Reveal delay={0.08}>
                <h1>
                  From mechanical drawings to <em>cortical rhythms</em>.
                </h1>
              </Reveal>
              <Reveal delay={0.16}>
                <p>
                  I was trained to design machines and spent seven years making
                  data behave inside large industrial systems. Somewhere in
                  between, the question that would not leave me stopped being
                  about machines at all: what is the thing that is aware of all
                  of this?
                </p>
              </Reveal>
              <Reveal delay={0.22}>
                <p>
                  Śaiva philosophy answers with Cit — consciousness as the
                  substrate rather than the by-product, vibrating as Spanda,
                  contracting into form, dissolving again in Naṭarāja&apos;s
                  dance. Neuroscience answers with oscillations, manifolds and
                  populations of cells. I refuse to treat these as rival
                  answers. They are two descriptions of one event, written by
                  people who could not read each other&apos;s notation.
                </p>
              </Reveal>
              <Reveal delay={0.28}>
                <p>
                  So I build the translation layer: models that read EEG
                  without asking the brain to calibrate itself first,
                  physiological signals decoded into something a clinician can
                  act on, and the engineering discipline to make any of it
                  survive contact with the real world.
                </p>
              </Reveal>
              <Reveal delay={0.34}>
                <div className="about__social">
                  <SocialLinks showHandles />
                </div>
              </Reveal>
            </div>

            <Reveal delay={0.12}>
              <div className="about__portrait">
                <img src={AboutImg} alt="Immanuvel Prathap" />
              </div>
            </Reveal>
          </div>

          <div className="timeline" ref={timelineRef}>
            <div className="timeline__rail" />
            <motion.div
              className="timeline__progress"
              style={{ scaleY: progress }}
            />
            <Group title="Trajectory" items={experience} />
            <Group title="Formation" items={education} />
          </div>
        </div>
      </AboutStyles>
      <Footer />
    </>
  );
}
