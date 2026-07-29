import { useState } from 'react';
import styled from 'styled-components';
import Footer from '../components/Footer';
import Reveal from '../components/Reveal';
import SocialLinks from '../components/SocialLinks';
import profile from '../data/profile';

const ContactStyles = styled.div`
  padding: 18rem 0 10rem;

  .contact__grid {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 7rem;
    margin-top: 6rem;
  }

  h1 {
    font-family: var(--display-bold);
    font-size: clamp(3.4rem, 7vw, 7rem);
    color: var(--white);
    margin: 1.8rem 0 2.4rem;
    text-transform: uppercase;
  }

  .contact__lead {
    font-size: 1.7rem;
    line-height: 1.9;
    max-width: 56ch;
  }

  .contact__detail {
    margin-bottom: 3rem;
  }

  .contact__detail span {
    display: block;
    font-size: 1.2rem;
    letter-spacing: 0.3em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 0.8rem;
  }

  .contact__detail a,
  .contact__detail p {
    font-size: 1.7rem;
    color: var(--white);
  }

  form .field {
    margin-bottom: 2.4rem;
  }

  form label {
    display: block;
    font-size: 1.2rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
    color: var(--blue);
    margin-bottom: 1rem;
  }

  form input,
  form textarea {
    width: 100%;
    padding: 1.4rem 1.6rem;
    font-family: var(--mono);
    font-size: 1.5rem;
    color: var(--white);
    background: rgba(5, 7, 12, 0.8);
    border: 1px solid var(--line);
    border-radius: 12px;
    outline: none;
    transition: border-color 0.3s ease, box-shadow 0.3s ease;
  }

  form textarea {
    min-height: 180px;
    resize: vertical;
  }

  form input:focus,
  form textarea:focus {
    border-color: var(--blue);
    box-shadow: 0 0 24px var(--blue-glow);
  }

  form button {
    padding: 1.3rem 3.4rem;
    border-radius: 999px;
    border: 1px solid var(--blue);
    background: var(--blue);
    color: var(--void);
    font-size: 1.3rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    transition: box-shadow 0.35s ease, transform 0.35s ease;
  }

  form button:hover {
    box-shadow: 0 0 32px var(--blue-glow);
    transform: translateY(-3px);
  }

  @media only screen and (max-width: 900px) {
    padding: 12rem 0 8rem;
    .contact__grid {
      grid-template-columns: 1fr;
      gap: 5rem;
    }
  }
`;

export default function Contact() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Portfolio enquiry from ${name}`);
    const body = encodeURIComponent(`${message}\n\n— ${name} (${email})`);
    window.location.href = `mailto:${profile.email}?subject=${subject}&body=${body}`;
  };

  return (
    <>
      <ContactStyles>
        <div className="container">
          <Reveal>
            <p className="eyebrow">Send a signal</p>
          </Reveal>
          <Reveal delay={0.08}>
            <h1>Contact</h1>
          </Reveal>
          <Reveal delay={0.16}>
            <p className="contact__lead">
              Research collaborations, brain-computer interface work, or an
              argument about whether Spanda and gamma oscillations are the same
              claim — all welcome.
            </p>
          </Reveal>

          <div className="contact__grid">
            <Reveal delay={0.2}>
              <div>
                <div className="contact__detail">
                  <span>Email</span>
                  <a href={`mailto:${profile.email}`}>{profile.email}</a>
                </div>
                <div className="contact__detail">
                  <span>Based in</span>
                  <p>{profile.location}</p>
                </div>
                <div className="contact__detail">
                  <span>Elsewhere</span>
                  <SocialLinks showHandles />
                </div>
              </div>
            </Reveal>

            <Reveal delay={0.26}>
              <form onSubmit={handleSubmit}>
                <div className="field">
                  <label htmlFor="name">Your name</label>
                  <input
                    id="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="email">Your email</label>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>
                <div className="field">
                  <label htmlFor="message">Message</label>
                  <textarea
                    id="message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    required
                  />
                </div>
                <button type="submit">Transmit</button>
              </form>
            </Reveal>
          </div>
        </div>
      </ContactStyles>
      <Footer />
    </>
  );
}
