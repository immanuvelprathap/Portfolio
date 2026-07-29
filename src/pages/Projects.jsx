import { useMemo, useState } from 'react';
import styled from 'styled-components';
import { MdSearch } from 'react-icons/md';
import NeuronProjects from '../components/NeuronProjects';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import projectsData from '../data/projects';

const ProjectsStyles = styled.div`
  padding: 18rem 0 0;

  .projects__head {
    text-align: center;
    max-width: 72ch;
    margin: 0 auto;
  }

  .projects__head h1 {
    font-family: var(--display-bold);
    font-size: clamp(3.4rem, 7vw, 7rem);
    color: var(--white);
    margin: 1.8rem 0 2.4rem;
    text-transform: uppercase;
  }

  .projects__search {
    position: relative;
    width: min(100%, 380px);
    margin: 5rem auto 0;
  }

  .projects__search input {
    width: 100%;
    padding: 1.4rem 4.4rem 1.4rem 1.8rem;
    font-family: var(--mono);
    font-size: 1.5rem;
    color: var(--white);
    background: rgba(5, 7, 12, 0.8);
    border: 1px solid var(--line);
    border-radius: 999px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  .projects__search input:focus {
    border-color: var(--blue);
    box-shadow: 0 0 26px var(--blue-glow);
  }

  .projects__search svg {
    position: absolute;
    right: 1.8rem;
    top: 50%;
    transform: translateY(-50%);
    width: 2rem;
    height: 2rem;
    color: var(--blue);
  }

  .projects__empty {
    text-align: center;
    padding: 10rem 0;
    font-size: 1.6rem;
    color: var(--mist-dim);
  }
`;

export default function Projects() {
  const [query, setQuery] = useState('');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return projectsData;
    return projectsData.filter((project) =>
      [project.name, project.branch, project.desc, ...project.tags]
        .join(' ')
        .toLowerCase()
        .includes(q)
    );
  }, [query]);

  return (
    <>
      <ProjectsStyles>
        <div className="container projects__head">
          <Reveal>
            <p className="eyebrow">The dendritic field</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1>Projects</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p>
              Research, industry and the experiments in between — grown along a
              single axon. Follow a branch to its source.
            </p>
          </Reveal>
          <Reveal delay={0.24}>
            <div className="projects__search">
              <input
                type="text"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search a branch…"
                aria-label="Search projects"
              />
              <MdSearch aria-hidden="true" />
            </div>
          </Reveal>
        </div>

        {filtered.length > 0 ? (
          <NeuronProjects projects={filtered} heading={false} />
        ) : (
          <p className="projects__empty">No branch grew that way. Try again.</p>
        )}
      </ProjectsStyles>
      <Footer />
    </>
  );
}
