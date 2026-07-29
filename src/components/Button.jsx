import { Link } from 'react-router-dom';
import styled from 'styled-components';

const ButtonStyle = styled.div`
  display: inline-block;
  margin-top: 2rem;

  .button {
    display: inline-block;
    padding: 1.2rem 3.2rem;
    border-radius: 999px;
    font-size: 1.3rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    border: 1px solid var(--blue);
    background: ${(props) => (props.$outline ? 'transparent' : 'var(--blue)')};
    color: ${(props) => (props.$outline ? 'var(--white)' : 'var(--void)')};
    transition: box-shadow 0.35s ease, transform 0.35s ease,
      background 0.35s ease, color 0.35s ease;
  }

  .button:hover {
    box-shadow: 0 0 32px var(--blue-glow);
    transform: translateY(-3px);
    color: ${(props) => (props.$outline ? 'var(--blue-bright)' : 'var(--void)')};
  }
`;

export default function Button({
  btnText = 'Open',
  btnLink = '/',
  outline = false,
  external = false,
}) {
  return (
    <ButtonStyle $outline={outline} className="button-wrapper">
      {external ? (
        <a className="button" href={btnLink} target="_blank" rel="noreferrer">
          {btnText}
        </a>
      ) : (
        <Link className="button" to={btnLink}>
          {btnText}
        </Link>
      )}
    </ButtonStyle>
  );
}
