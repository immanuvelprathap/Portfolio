import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaInstagram } from 'react-icons/fa6';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import InstagramEmbed from '../components/InstagramEmbed';
import PeakImg from '../assets/images/adventure-peak.jpg';
import MistImg from '../assets/images/adventure-mist.jpg';
import LakeImg from '../assets/images/adventure-lake.jpg';
import profile from '../data/profile';

const PageStyles = styled.div`
  padding: 18rem 0 0;

  .adv__head {
    max-width: 70ch;
    margin: 0 auto 8rem;
    text-align: center;
  }

  .adv__head h1 {
    font-family: var(--display-bold);
    font-size: clamp(3.4rem, 7vw, 7rem);
    color: var(--white);
    text-transform: uppercase;
    margin: 1.8rem 0 2.4rem;
  }

  .adv__head h1 em {
    font-style: normal;
    color: var(--blue);
  }

  .adv__head p {
    font-size: 1.7rem;
    line-height: 1.9;
    color: var(--mist);
  }

  .adv__quote {
    max-width: 60ch;
    margin: 0 auto 10rem;
    padding: 3rem 2rem;
    border: 1px solid var(--line);
    border-radius: 20px;
    text-align: center;
    background: rgba(5, 7, 12, 0.5);
  }

  .adv__quote p {
    font-family: var(--display);
    font-size: clamp(2rem, 3vw, 3rem);
    color: var(--white);
    line-height: 1.5;
    margin-bottom: 1.4rem;
  }

  .adv__quote span {
    font-size: 1.3rem;
    letter-spacing: 0.25em;
    text-transform: uppercase;
    color: var(--blue);
  }

  .adv__grid {
    display: grid;
    grid-template-columns: repeat(12, 1fr);
    gap: 2.4rem;
    margin-bottom: 10rem;
  }

  .adv__card {
    position: relative;
    border-radius: 24px;
    overflow: hidden;
    border: 1px solid var(--line);
    min-height: 340px;
  }

  .adv__card img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    filter: grayscale(0.35) contrast(1.1) brightness(0.8);
    transition: transform 0.8s ease, filter 0.6s ease;
  }

  .adv__card:hover img {
    transform: scale(1.05);
    filter: grayscale(0.1) contrast(1.1) brightness(0.85);
  }

  .adv__card:nth-child(1) {
    grid-column: span 7;
  }

  .adv__card:nth-child(2) {
    grid-column: span 5;
  }

  .adv__card:nth-child(3) {
    grid-column: span 12;
    min-height: 460px;
  }

  .adv__card__caption {
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    padding: 2rem;
    background: linear-gradient(to top, rgba(0, 0, 0, 0.92), transparent);
  }

  .adv__card__caption h3 {
    font-family: var(--display);
    font-size: clamp(1.8rem, 2.4vw, 2.6rem);
    color: var(--white);
    margin-bottom: 0.6rem;
  }

  .adv__card__caption p {
    font-size: 1.35rem;
    color: var(--mist);
  }

  .adv__cta {
    text-align: center;
    margin-bottom: 10rem;
  }

  .adv__cta a {
    display: inline-flex;
    align-items: center;
    gap: 1rem;
    padding: 1.4rem 2.8rem;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: var(--white);
    font-size: 1.45rem;
    letter-spacing: 0.1em;
    text-transform: uppercase;
    background: rgba(5, 7, 12, 0.6);
    transition: border-color 0.3s ease, box-shadow 0.3s ease, transform 0.3s ease;
  }

  .adv__cta a svg {
    width: 2rem;
    height: 2rem;
    color: var(--blue);
  }

  .adv__cta a:hover {
    border-color: var(--blue);
    color: var(--blue-bright);
    box-shadow: 0 0 28px var(--blue-glow);
    transform: translateY(-3px);
  }

  .adv__embeds {
    margin: 12rem 0 10rem;
  }

  .adv__embed__head {
    text-align: center;
    max-width: 60ch;
    margin: 0 auto 6rem;
  }

  .adv__embed__head h2 {
    font-family: var(--display);
    font-size: clamp(2.6rem, 5vw, 4.6rem);
    color: var(--white);
    margin-bottom: 1.4rem;
  }

  .adv__embed__head h2 em {
    font-style: normal;
    color: var(--blue);
  }

  .adv__embed__head p {
    font-size: 1.65rem;
    line-height: 1.8;
    color: var(--mist);
  }

  .adv__embed__grid {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 3.6rem 3rem;
    align-items: start;
  }

  .adv__embed__cell {
    background: rgba(5, 7, 12, 0.4);
    border: 1px solid var(--line);
    border-radius: 24px;
    padding: 1.4rem;
  }

  .adv__embed__cell .instagram-media {
    width: 100% !important;
    max-width: 100% !important;
    min-width: unset !important;
  }

  .adv__embed__caption {
    margin-top: 1.6rem;
    text-align: center;
  }

  .adv__embed__caption h3 {
    font-family: var(--display);
    font-size: 1.9rem;
    color: var(--white);
    margin-bottom: 0.4rem;
  }

  .adv__embed__caption p {
    font-size: 1.35rem;
    color: var(--mist);
  }

  @media only screen and (max-width: 768px) {
    padding: 12rem 0 0;

    .adv__card,
    .adv__card:nth-child(1),
    .adv__card:nth-child(2),
    .adv__card:nth-child(3) {
      grid-column: span 12;
      min-height: 320px;
    }

    .adv__card:nth-child(3) {
      min-height: 360px;
    }

    .adv__embed__grid {
      grid-template-columns: 1fr;
    }
  }
`;

const items = [
  {
    img: MistImg,
    title: 'Above the cloud line',
    location: 'Somewhere the mist has not yet named',
  },
  {
    img: PeakImg,
    title: 'Back to the source',
    location: 'The city behind, the mountain ahead',
  },
  {
    img: LakeImg,
    title: 'Stillness at altitude',
    location: 'A bench, a lake, and the same silence the lab chases',
  },
];

const advPosts = [
  {
    shortcode: 'C_X23g-yMpq',
    title: 'Mighty Kalu',
    location: 'Monsoon trek, India',
  },
  {
    shortcode: 'DXwx8Z6MYxZ',
    title: 'Lake Luzern',
    location: 'Switzerland',
  },
  {
    shortcode: 'DTtMHNRjKZH',
    title: 'Mdina overlook',
    location: 'Malta',
  },
  {
    shortcode: 'DTtKqwoDP1c',
    title: 'Laguna Blu',
    location: 'Malta',
  },
  {
    shortcode: 'DTtKRaVjJp4',
    title: 'Blue Lagoon',
    location: 'Comino, Malta',
  },
  {
    shortcode: 'DXBvxx6DJF6',
    title: 'Bern',
    location: 'Switzerland',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: [0.22, 1, 0.36, 1] } },
};

export default function Adventures() {
  const instagram = profile.socials.find((s) => s.icon === 'instagram');

  return (
    <>
      <PageStyles>
        <div className="container">
          <div className="adv__head">
            <Reveal>
              <p className="eyebrow">Beyond the bench</p>
            </Reveal>
            <Reveal delay={0.08}>
              <h1>
                Consciousness in <em>motion</em>
              </h1>
            </Reveal>
            <Reveal delay={0.16}>
              <p>
                The same awareness I chase in EEG traces and Sanskrit verses I
                meet on the trail — in altitude, weather, and the quiet that
                arrives only after a long climb.
              </p>
            </Reveal>
          </div>

          <Reveal delay={0.24}>
            <div className="adv__quote">
              <p>Śiva is stillness. Spanda is the tremor of a windmill in the mountains.</p>
              <span>Field notes from the road</span>
            </div>
          </Reveal>

          <motion.div
            className="adv__grid"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.15 }}
            transition={{ staggerChildren: 0.15 }}
          >
            {items.map((item) => (
              <motion.article
                className="adv__card"
                key={item.title}
                variants={cardVariants}
              >
                <img src={item.img} alt={item.title} loading="lazy" />
                <div className="adv__card__caption">
                  <h3>{item.title}</h3>
                  <p>{item.location}</p>
                </div>
              </motion.article>
            ))}
          </motion.div>

          <Reveal delay={0.1}>
            <section className="adv__embeds">
              <div className="adv__embed__head">
                <p className="eyebrow">From the field</p>
                <h2>
                  Peaks, <em>lagoons</em> and monsoon trails
                </h2>
                <p>
                  A few dispatches from the road — mountain treks, alpine lakes,
                  and the blue lagoons that look like consciousness made liquid.
                </p>
              </div>

              <motion.div
                className="adv__embed__grid"
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.1 }}
                transition={{ staggerChildren: 0.12 }}
              >
                {advPosts.map((post) => (
                  <motion.article
                    className="adv__embed__cell"
                    key={post.shortcode}
                    variants={cardVariants}
                  >
                    <InstagramEmbed
                      shortcode={post.shortcode}
                      caption={`${post.title} — ${post.location}`}
                    />
                    <div className="adv__embed__caption">
                      <h3>{post.title}</h3>
                      <p>{post.location}</p>
                    </div>
                  </motion.article>
                ))}
              </motion.div>
            </section>
          </Reveal>

          {instagram ? (
            <Reveal delay={0.1}>
              <div className="adv__cta">
                <a href={instagram.url} target="_blank" rel="noreferrer">
                  <FaInstagram aria-hidden="true" />
                  <span>Follow {instagram.handle}</span>
                </a>
              </div>
            </Reveal>
          ) : null}
        </div>
      </PageStyles>
      <Footer />
    </>
  );
}
