import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MdChevronLeft, MdChevronRight, MdOpenInNew } from 'react-icons/md';
import styled from 'styled-components';

const CarouselStyles = styled.div`
  position: relative;
  margin-top: 4rem;

  .carousel__controls {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 3rem;
  }

  .carousel__count {
    font-family: var(--mono);
    font-size: 1.4rem;
    letter-spacing: 0.2em;
    color: var(--blue);
  }

  .carousel__nav {
    display: flex;
    gap: 1.2rem;
  }

  .carousel__nav button {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.6rem;
    padding: 0.9rem 1.6rem;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: var(--white);
    font-size: 1.35rem;
    letter-spacing: 0.12em;
    text-transform: uppercase;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
  }

  .carousel__nav button:hover:not(:disabled) {
    border-color: var(--blue);
    box-shadow: 0 0 22px var(--blue-glow);
    color: var(--blue-bright);
  }

  .carousel__nav button:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .carousel__stage {
    position: relative;
    min-height: 420px;
  }

  .carousel__card {
    padding: 3.2rem;
    border: 1px solid var(--line);
    border-radius: 24px;
    background: rgba(5, 7, 12, 0.72);
    backdrop-filter: blur(10px);
  }

  .carousel__card .year {
    display: inline-block;
    font-family: var(--mono);
    font-size: 1.2rem;
    letter-spacing: 0.2em;
    color: var(--void);
    background: var(--blue);
    padding: 0.35rem 0.9rem;
    border-radius: 999px;
    margin-bottom: 1.6rem;
  }

  .carousel__card h3 {
    font-family: var(--display-bold);
    font-size: clamp(2rem, 3.4vw, 3rem);
    color: var(--white);
    line-height: 1.25;
    margin-bottom: 1.4rem;
  }

  .carousel__card .authors {
    font-size: 1.4rem;
    color: var(--mist);
    margin-bottom: 0.8rem;
  }

  .carousel__card .venue {
    font-size: 1.35rem;
    color: var(--blue-bright);
    margin-bottom: 1.6rem;
  }

  .carousel__card .summary {
    font-size: 1.55rem;
    line-height: 1.85;
    color: var(--mist);
    max-width: 76ch;
    margin-bottom: 2.4rem;
  }

  .carousel__card .link {
    display: inline-flex;
    align-items: center;
    gap: 0.8rem;
    font-size: 1.35rem;
    color: var(--blue);
  }

  .carousel__card .link:hover {
    color: var(--blue-bright);
  }

  .carousel__empty {
    text-align: center;
    padding: 8rem 0;
    font-size: 1.6rem;
    color: var(--mist-dim);
  }

  @media only screen and (max-width: 600px) {
    .carousel__card {
      padding: 2.2rem;
    }

    .carousel__nav button {
      padding: 0.7rem 1.2rem;
      font-size: 1.2rem;
    }
  }
`;

export default function ScholarCarousel({ items = [] }) {
  const [index, setIndex] = useState(0);

  if (items.length === 0) {
    return (
      <CarouselStyles>
        <p className="carousel__empty">No publications loaded yet.</p>
      </CarouselStyles>
    );
  }

  const prev = () => setIndex((i) => Math.max(0, i - 1));
  const next = () => setIndex((i) => Math.min(items.length - 1, i + 1));

  const current = items[index];

  return (
    <CarouselStyles>
      <div className="carousel__controls">
        <span className="carousel__count">
          {String(index + 1).padStart(2, '0')} / {String(items.length).padStart(2, '0')}
        </span>
        <div className="carousel__nav">
          <button type="button" onClick={prev} disabled={index === 0} aria-label="Previous">
            <MdChevronLeft size={20} />
            Prev
          </button>
          <button type="button" onClick={next} disabled={index === items.length - 1} aria-label="Next">
            Next
            <MdChevronRight size={20} />
          </button>
        </div>
      </div>

      <div className="carousel__stage">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.id}
            className="carousel__card"
            initial={{ opacity: 0, x: 60 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -60 }}
            transition={{ duration: 0.45, ease: [0.22, 1, 0.36, 1] }}
          >
            <span className="year">{current.year}</span>
            <h3>{current.title}</h3>
            <p className="authors">{current.authors}</p>
            <p className="venue">
              {current.venue} · {current.status}
            </p>
            <p className="summary">{current.summary}</p>
            {current.link ? (
              <a
                className="link"
                href={current.link}
                target="_blank"
                rel="noreferrer"
              >
                View source <MdOpenInNew size={18} />
              </a>
            ) : null}
          </motion.div>
        </AnimatePresence>
      </div>
    </CarouselStyles>
  );
}
