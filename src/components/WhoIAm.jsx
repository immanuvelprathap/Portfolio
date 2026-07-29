import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import styled from 'styled-components';
import SocialLinks from './SocialLinks';
import Reveal from './Reveal';
import profile from '../data/profile';
import PortraitImg from '../assets/images/me4.jpg';

const WhoStyles = styled.section`
  position: relative;
  padding: 16rem 0 12rem;

  .who__grid {
    display: grid;
    grid-template-columns: minmax(0, 0.85fr) minmax(0, 1.15fr);
    gap: 8rem;
    align-items: center;
  }

  .who__portrait {
    position: relative;
    aspect-ratio: 1 / 1;
  }

  .who__portrait__img {
    position: absolute;
    inset: 8%;
    border-radius: 50%;
    overflow: hidden;
    filter: grayscale(1) contrast(1.15) brightness(0.85);
    box-shadow: 0 0 90px rgba(47, 155, 255, 0.22) inset,
      0 0 60px rgba(47, 155, 255, 0.18);
  }

  .who__portrait__img img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .who__portrait__ring {
    position: absolute;
    inset: 0;
  }

  .who__eyebrow {
    display: flex;
    align-items: center;
    gap: 1.6rem;
    margin-bottom: 2.4rem;
  }

  .who__eyebrow span {
    font-size: 1.2rem;
    letter-spacing: 0.45em;
    text-transform: uppercase;
    color: var(--blue);
  }

  .who__eyebrow i {
    display: block;
    height: 1px;
    width: 8rem;
    background: linear-gradient(
      to right,
      var(--blue),
      rgba(47, 155, 255, 0)
    );
  }

  .who__heading {
    font-family: var(--display-bold);
    font-size: clamp(3.4rem, 6vw, 6.4rem);
    color: var(--white);
    margin-bottom: 1.2rem;
  }

  .who__heading em {
    font-style: normal;
    color: var(--blue);
  }

  .who__sanskrit {
    font-size: 1.6rem;
    letter-spacing: 0.3em;
    color: var(--blue-bright);
    margin-bottom: 3.4rem;
  }

  .who__body p {
    font-size: 1.7rem;
    line-height: 1.9;
    margin-bottom: 2.2rem;
    color: var(--mist);
  }

  .who__body p:first-of-type {
    color: var(--white);
    font-size: 1.9rem;
  }

  .who__social {
    margin-top: 4rem;
  }

  @media only screen and (max-width: 950px) {
    padding: 10rem 0 8rem;
    .who__grid {
      grid-template-columns: 1fr;
      gap: 5rem;
    }
    .who__portrait {
      max-width: 340px;
      margin: 0 auto;
    }
  }
`;

export default function WhoIAm() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start end', 'end start'],
  });
  const portraitY = useTransform(scrollYProgress, [0, 1], [70, -70]);

  return (
    <WhoStyles id="who-i-am" ref={ref}>
      <div className="container who__grid">
        <motion.div className="who__portrait" style={{ y: portraitY }}>
          <Reveal y={70}>
            <div className="who__portrait__img">
              <img src={PortraitImg} alt={profile.name} />
            </div>
          </Reveal>
          <motion.svg
            className="who__portrait__ring"
            viewBox="0 0 200 200"
            animate={{ rotate: 360 }}
            transition={{ duration: 60, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              cx="100"
              cy="100"
              r="96"
              fill="none"
              stroke="rgba(47,155,255,0.45)"
              strokeWidth="0.6"
              strokeDasharray="1 5"
            />
            <circle
              cx="100"
              cy="100"
              r="88"
              fill="none"
              stroke="rgba(127,220,255,0.25)"
              strokeWidth="0.5"
            />
            <circle cx="100" cy="4" r="2.6" fill="var(--blue-bright)" />
          </motion.svg>
        </motion.div>

        <div className="who__text">
          <Reveal>
            <div className="who__eyebrow">
              <i />
              <span>Who I am</span>
            </div>
          </Reveal>
          <Reveal delay={0.08}>
            <h2 className="who__heading">
              A mind studying <em>minds</em>.
            </h2>
          </Reveal>
          <Reveal delay={0.14}>
            <p className="who__sanskrit">Cidākāśa</p>
          </Reveal>
          <div className="who__body">
            {profile.whoIAm.map((para, index) => (
              <Reveal key={para.slice(0, 24)} delay={0.18 + index * 0.08}>
                <p>{para}</p>
              </Reveal>
            ))}
          </div>
          <Reveal delay={0.3} className="who__social">
            <SocialLinks />
          </Reveal>
        </div>
      </div>
    </WhoStyles>
  );
}
