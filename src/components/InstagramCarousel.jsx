import { useEffect, useRef, useState, useCallback } from 'react';
import styled from 'styled-components';
import { MdChevronLeft, MdChevronRight } from 'react-icons/md';
import InstagramEmbed from './InstagramEmbed';

const CarouselStyles = styled.div`
  margin: 12rem 0 10rem;

  .insta__head {
    text-align: center;
    max-width: 60ch;
    margin: 0 auto 6rem;
  }

  .insta__head h2 {
    font-family: var(--display);
    font-size: clamp(2.6rem, 5vw, 4.6rem);
    color: var(--white);
    margin-bottom: 1.4rem;
  }

  .insta__head h2 em {
    font-style: normal;
    color: var(--blue);
  }

  .insta__head p {
    font-size: 1.65rem;
    line-height: 1.8;
    color: var(--mist);
  }

  .insta__stage {
    position: relative;
  }

  .insta__counter {
    text-align: center;
    font-family: var(--mono);
    font-size: 1.2rem;
    letter-spacing: 0.2em;
    color: var(--blue);
    margin-bottom: 2.4rem;
    text-transform: uppercase;
  }

  .insta__track {
    display: flex;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    scroll-behavior: smooth;
    scrollbar-width: none;
    -ms-overflow-style: none;
  }

  .insta__track::-webkit-scrollbar {
    display: none;
  }

  .insta__slide {
    flex: 0 0 100%;
    scroll-snap-align: start;
    padding: 0 1rem;
  }

  .insta__card {
    position: relative;
    max-width: 540px;
    margin: 0 auto;
    border: 1px solid var(--line);
    border-radius: 24px;
    overflow: hidden;
    background: var(--white);
  }

  .insta__caption {
    padding: 1.6rem 2rem;
    border-bottom: 1px solid rgba(0, 0, 0, 0.08);
    text-align: center;
  }

  .insta__caption h3 {
    font-family: var(--display);
    font-size: 1.7rem;
    color: #000;
    margin-bottom: 0.3rem;
    line-height: 1.3;
  }

  .insta__caption p {
    font-size: 1.3rem;
    line-height: 1.5;
    color: rgba(0, 0, 0, 0.6);
  }

  .insta__embed {
    min-height: 460px;
  }

  .insta__controls {
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 1.6rem;
    margin-top: 3rem;
  }

  .insta__arrow,
  .insta__dot {
    background: transparent;
    border: 1px solid var(--line);
    color: var(--white);
    border-radius: 50%;
    display: grid;
    place-items: center;
    transition: border-color 0.3s ease, box-shadow 0.3s ease, color 0.3s ease;
  }

  .insta__arrow {
    width: 5.2rem;
    height: 5.2rem;
    cursor: pointer;
  }

  .insta__arrow svg {
    width: 2.8rem;
    height: 2.8rem;
  }

  .insta__arrow:hover:not(:disabled),
  .insta__dot:hover:not(.is-active),
  .insta__dot.is-active {
    border-color: var(--blue);
    color: var(--blue-bright);
    box-shadow: 0 0 22px var(--blue-glow);
  }

  .insta__arrow:disabled {
    opacity: 0.35;
    cursor: not-allowed;
  }

  .insta__dots {
    display: flex;
    gap: 1rem;
    flex-wrap: wrap;
    justify-content: center;
    max-width: min(80%, 520px);
  }

  .insta__dot {
    width: 1.2rem;
    height: 1.2rem;
    padding: 0;
    cursor: pointer;
  }

  .insta__dot.is-active {
    background: var(--blue);
  }
`;

export default function InstagramCarousel({ posts, title }) {
  const trackRef = useRef(null);
  const [active, setActive] = useState(0);

  const count = posts.length;

  const scrollTo = useCallback((index) => {
    const clamped = Math.max(0, Math.min(count - 1, index));
    const slide = trackRef.current?.children?.[clamped];
    if (slide) {
      slide.scrollIntoView({ behavior: 'smooth', inline: 'start', block: 'nearest' });
    }
    setActive(clamped);
  }, [count]);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return undefined;

    const onScroll = () => {
      const slideWidth = track.children[0]?.getBoundingClientRect().width || 1;
      const index = Math.round(track.scrollLeft / slideWidth);
      setActive(Math.max(0, Math.min(count - 1, index)));
    };

    track.addEventListener('scroll', onScroll, { passive: true });
    return () => track.removeEventListener('scroll', onScroll);
  }, [count]);

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'ArrowLeft') scrollTo(active - 1);
      if (e.key === 'ArrowRight') scrollTo(active + 1);
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [active, scrollTo]);

  if (!count) return null;

  return (
    <CarouselStyles>
      <div className="insta__head">
        {title ? (
          <>
            <p className="eyebrow">From the field</p>
            <h2>{title}</h2>
          </>
        ) : null}
      </div>

      <div className="insta__counter">
        {String(active + 1).padStart(2, '0')} / {String(count).padStart(2, '0')}
      </div>

      <div className="insta__stage">
        <div className="insta__track" ref={trackRef}>
          {posts.map((post) => (
            <div className="insta__slide" key={post.id || post.shortcode}>
              <div className="insta__card">
                <div className="insta__caption">
                  <h3>{post.title}</h3>
                  {post.location ? <p>{post.location}</p> : null}
                </div>
                <div className="insta__embed">
                  <InstagramEmbed
                    shortcode={post.shortcode}
                    caption="View this post on Instagram"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="insta__controls">
          <button
            className="insta__arrow"
            type="button"
            aria-label="Previous post"
            disabled={active === 0}
            onClick={() => scrollTo(active - 1)}
          >
            <MdChevronLeft />
          </button>

          <div className="insta__dots" role="tablist" aria-label="Instagram posts">
            {posts.map((post, i) => (
              <button
                key={post.id || post.shortcode}
                className={`insta__dot ${i === active ? 'is-active' : ''}`}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Go to post ${i + 1}`}
                onClick={() => scrollTo(i)}
              />
            ))}
          </div>

          <button
            className="insta__arrow"
            type="button"
            aria-label="Next post"
            disabled={active === count - 1}
            onClick={() => scrollTo(active + 1)}
          >
            <MdChevronRight />
          </button>
        </div>
      </div>
    </CarouselStyles>
  );
}
