import { useState } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { SiGooglescholar } from 'react-icons/si';
import { MdOpenInNew } from 'react-icons/md';
import publications, { researchStreams } from '../data/publications';
import ScholarCarousel from '../components/ScholarCarousel';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';

const PageStyles = styled.div`
  padding: 18rem 0 0;

  .pub__head {
    text-align: center;
    max-width: 74ch;
    margin: 0 auto 6rem;
  }

  .pub__head h1 {
    font-family: var(--display-bold);
    font-size: clamp(3.4rem, 7vw, 7rem);
    color: var(--white);
    margin: 1.8rem 0 2.4rem;
    text-transform: uppercase;
  }

  .pub__tabs {
    display: flex;
    justify-content: center;
    gap: 1.2rem;
    flex-wrap: wrap;
    margin-bottom: 4rem;
  }

  .pub__tabs button {
    display: flex;
    align-items: center;
    gap: 0.8rem;
    padding: 1rem 2rem;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: var(--mist);
    font-size: 1.35rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    background: transparent;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease,
      background 0.3s ease;
  }

  .pub__tabs button:hover,
  .pub__tabs button.is-active {
    border-color: var(--blue);
    color: var(--blue-bright);
    background: rgba(47, 155, 255, 0.08);
    box-shadow: 0 0 22px var(--blue-glow);
  }

  .pub__panel {
    min-height: 520px;
  }

  .pub__scholar-cta {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.4rem;
    color: var(--blue);
    margin-bottom: 2.4rem;
  }

  .pub__scholar-cta:hover {
    color: var(--blue-bright);
  }

  .pub__list {
    display: grid;
    gap: 2.4rem;
  }

  .pub__item {
    padding: 2.4rem;
    border: 1px solid var(--line);
    border-radius: 20px;
    background: rgba(5, 7, 12, 0.6);
    transition: border-color 0.3s ease, transform 0.3s ease;
  }

  .pub__item:hover {
    border-color: var(--blue);
    transform: translateY(-4px);
  }

  .pub__item .year {
    font-family: var(--mono);
    font-size: 1.2rem;
    letter-spacing: 0.18em;
    color: var(--blue);
    margin-bottom: 0.8rem;
  }

  .pub__item h3 {
    font-family: var(--display-bold);
    font-size: clamp(1.7rem, 2.4vw, 2.2rem);
    color: var(--white);
    line-height: 1.3;
    margin-bottom: 0.8rem;
  }

  .pub__item .meta {
    font-size: 1.35rem;
    color: var(--blue-bright);
    margin-bottom: 1.2rem;
  }

  .pub__item p {
    font-size: 1.5rem;
    line-height: 1.8;
    color: var(--mist);
    max-width: 78ch;
    margin-bottom: 1.4rem;
  }

  .pub__item a {
    font-size: 1.35rem;
    color: var(--blue);
  }

  .research__grid {
    display: grid;
    grid-template-columns: repeat(auto-fit, minmax(320px, 1fr));
    gap: 2.4rem;
  }

  .research__card {
    padding: 2.6rem;
    border: 1px solid var(--line);
    border-radius: 20px;
    background: rgba(5, 7, 12, 0.6);
    transition: border-color 0.3s ease, transform 0.3s ease;
  }

  .research__card:hover {
    border-color: var(--blue);
    transform: translateY(-4px);
  }

  .research__card .status {
    display: inline-block;
    font-family: var(--mono);
    font-size: 1.1rem;
    letter-spacing: 0.15em;
    text-transform: uppercase;
    color: var(--void);
    background: var(--blue);
    padding: 0.3rem 0.8rem;
    border-radius: 999px;
    margin-bottom: 1.4rem;
  }

  .research__card h3 {
    font-family: var(--display-bold);
    font-size: 2rem;
    color: var(--white);
    margin-bottom: 1rem;
  }

  .research__card p {
    font-size: 1.45rem;
    line-height: 1.8;
    color: var(--mist);
    margin-bottom: 1.6rem;
  }

  .research__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
  }

  .research__tags span {
    font-family: var(--mono);
    font-size: 1.1rem;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--blue-bright);
    border: 1px solid var(--line);
    padding: 0.4rem 0.9rem;
    border-radius: 999px;
  }
`;

const tabs = [
  { id: 'publications', label: 'Publications' },
  { id: 'scholar', label: 'Google Scholar' },
  { id: 'ongoing', label: 'Ongoing Research' },
];

export default function Publications() {
  const [active, setActive] = useState('publications');

  return (
    <>
      <PageStyles>
        <div className="container">
          <div className="pub__head">
            <Reveal>
              <p className="eyebrow">Research output</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1>Publications</h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                Work that has passed through peer review, preprint servers and the
                workshop bench — indexed by the questions that started it.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <div className="pub__tabs">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  type="button"
                  className={active === tab.id ? 'is-active' : ''}
                  onClick={() => setActive(tab.id)}
                >
                  {tab.label === 'Google Scholar' ? (
                    <SiGooglescholar size={16} />
                  ) : null}
                  {tab.label}
                </button>
              ))}
            </div>
          </Reveal>

          <AnimatePresence mode="wait">
            <motion.div
              key={active}
              className="pub__panel"
              initial={{ opacity: 0, y: 24 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -24 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            >
              {active === 'publications' && (
                <div className="pub__list">
                  {publications.map((pub) => (
                    <article className="pub__item" key={pub.id}>
                      <p className="year">{pub.year}</p>
                      <h3>{pub.title}</h3>
                      <p className="meta">
                        {pub.venue} · {pub.status}
                      </p>
                      <p>{pub.summary}</p>
                      {pub.link ? (
                        <a href={pub.link} target="_blank" rel="noreferrer">
                          View source <MdOpenInNew style={{ verticalAlign: 'middle' }} size={16} />
                        </a>
                      ) : null}
                    </article>
                  ))}
                </div>
              )}

              {active === 'scholar' && (
                <div>
                  <a
                    className="pub__scholar-cta"
                    href="https://scholar.google.com/scholar?q=Immanuvel+Prathap+Sagayaraju"
                    target="_blank"
                    rel="noreferrer"
                  >
                    <SiGooglescholar size={18} />
                    Search on Google Scholar
                    <MdOpenInNew size={16} />
                  </a>
                  <ScholarCarousel items={publications} />
                </div>
              )}

              {active === 'ongoing' && (
                <div className="research__grid">
                  {researchStreams.map((r) => (
                    <article className="research__card" key={r.id}>
                      <span className="status">{r.status}</span>
                      <h3>{r.title}</h3>
                      <p>{r.summary}</p>
                      <div className="research__tags">
                        {r.tags.map((tag) => (
                          <span key={tag}>{tag}</span>
                        ))}
                      </div>
                    </article>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </PageStyles>
      <Footer />
    </>
  );
}
