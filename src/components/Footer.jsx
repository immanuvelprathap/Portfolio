import { Link } from 'react-router-dom';
import styled from 'styled-components';
import SocialLinks from './SocialLinks';
import profile from '../data/profile';

const FooterStyles = styled.footer`
  position: relative;
  padding: 8rem 0 4rem;
  border-top: 1px solid var(--line);
  background: linear-gradient(to bottom, rgba(5, 7, 12, 0.6), var(--void));

  .footer__grid {
    display: grid;
    grid-template-columns: 1.4fr 1fr 1fr;
    gap: 5rem;
  }

  .footer__mantra {
    font-size: 1.4rem;
    letter-spacing: 0.4em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 1.6rem;
  }

  .footer__line {
    font-family: var(--display);
    font-size: 2.4rem;
    color: var(--white);
    margin-bottom: 2.4rem;
    max-width: 26ch;
  }

  h3 {
    font-size: 1.3rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 2.4rem;
  }

  li {
    margin-bottom: 1.2rem;
  }

  li a,
  li span {
    font-size: 1.45rem;
    color: var(--mist);
    transition: color 0.3s ease;
  }

  li a:hover {
    color: var(--blue-bright);
  }

  .footer__bottom {
    margin-top: 7rem;
    padding-top: 2.4rem;
    border-top: 1px solid var(--line);
    display: flex;
    justify-content: space-between;
    gap: 2rem;
    flex-wrap: wrap;
    font-size: 1.2rem;
    color: var(--mist-dim);
    letter-spacing: 0.12em;
  }

  @media only screen and (max-width: 768px) {
    .footer__grid {
      grid-template-columns: 1fr;
      gap: 4rem;
    }
  }
`;

export default function Footer() {
  return (
    <FooterStyles>
      <div className="container">
        <div className="footer__grid">
          <div>
            <p className="footer__mantra">{profile.mantra}</p>
            <p className="footer__line">
              Consciousness first, then the code that measures it.
            </p>
            <SocialLinks />
          </div>

          <div>
            <h3>Navigate</h3>
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/about">About</Link>
              </li>
              <li>
                <Link to="/projects">Projects</Link>
              </li>
              <li>
                <Link to="/publications">Publications</Link>
              </li>
              <li>
                <Link to="/adventures">Adventures</Link>
              </li>
              <li>
                <Link to="/contact">Contact</Link>
              </li>
            </ul>
          </div>

          <div>
            <h3>Signal</h3>
            <ul>
              <li>
                <a href={`mailto:${profile.email}`}>{profile.email}</a>
              </li>
              <li>
                <span>{profile.location}</span>
              </li>
              <li>
                <span>University of Bern · AI in Medicine</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="footer__bottom">
          <span>© {new Date().getFullYear()} {profile.name}</span>
          <span>Śiva · Spanda · Synapse</span>
        </div>
      </div>
    </FooterStyles>
  );
}
