import { Link } from 'react-router-dom';
import styled from 'styled-components';
import Hero from '../components/Hero';
import WhoIAm from '../components/WhoIAm';
import Pillars from '../components/Pillars';
import Research from '../components/Research';
import NeuronProjects from '../components/NeuronProjects';
import Skills from '../components/Skills';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import projects from '../data/projects';

const MoreStyles = styled.div`
  text-align: center;
  padding: 0 0 10rem;

  a {
    display: inline-block;
    padding: 1.4rem 3.6rem;
    border: 1px solid var(--blue);
    border-radius: 999px;
    font-size: 1.3rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--white);
    transition: box-shadow 0.35s ease, transform 0.35s ease, color 0.35s ease;
  }

  a:hover {
    color: var(--blue-bright);
    box-shadow: 0 0 32px var(--blue-glow);
    transform: translateY(-3px);
  }
`;

export default function Home() {
  return (
    <>
      <Hero />
      <WhoIAm />
      <Pillars />
      <Research />
      <NeuronProjects projects={projects.slice(0, 4)} />
      <MoreStyles>
        <Reveal>
          <Link to="/projects">Grow the full network</Link>
        </Reveal>
      </MoreStyles>
      <Skills />
      <Footer />
    </>
  );
}
