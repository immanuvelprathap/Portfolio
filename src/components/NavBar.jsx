import { useEffect, useState } from 'react';
import { NavLink } from 'react-router-dom';
import { motion } from 'framer-motion';
import styled from 'styled-components';
import { MdClose, MdMenu } from 'react-icons/md';

const NavBarStyles = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  z-index: 100;
  transition: background 0.4s ease, backdrop-filter 0.4s ease,
    border-color 0.4s ease, padding 0.4s ease;
  border-bottom: 1px solid transparent;
  padding: 2.4rem 0;

  &.is-scrolled {
    padding: 1.4rem 0;
    background: rgba(0, 0, 0, 0.72);
    backdrop-filter: blur(14px);
    border-bottom-color: var(--line);
  }

  .nav__inner {
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 2rem;
  }

  .nav__brand {
    display: flex;
    align-items: center;
    gap: 1.2rem;
    color: var(--white);
    font-size: 1.5rem;
    letter-spacing: 0.28em;
    text-transform: uppercase;
  }

  .nav__brand svg {
    width: 3.2rem;
    height: 3.2rem;
  }

  .nav__links {
    display: flex;
    align-items: center;
    gap: 0.6rem;
  }

  .nav__links a {
    position: relative;
    display: inline-block;
    padding: 0.8rem 1.8rem;
    font-size: 1.35rem;
    letter-spacing: 0.22em;
    text-transform: uppercase;
    color: var(--mist);
  }

  .nav__links a::after {
    content: '';
    position: absolute;
    left: 1.8rem;
    right: 1.8rem;
    bottom: 0.2rem;
    height: 1px;
    background: var(--blue);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 0.35s ease;
  }

  .nav__links a:hover,
  .nav__links a.active {
    color: var(--blue-bright);
  }

  .nav__links a:hover::after,
  .nav__links a.active::after {
    transform: scaleX(1);
  }

  .nav__toggle,
  .nav__close {
    display: none;
    color: var(--blue);
  }

  .nav__toggle svg {
    width: 3.2rem;
    height: 3.2rem;
  }

  @media only screen and (max-width: 768px) {
    .nav__toggle {
      display: block;
    }

    .nav__links {
      position: fixed;
      inset: 0 0 0 auto;
      width: min(78vw, 320px);
      flex-direction: column;
      justify-content: center;
      gap: 2.4rem;
      background: rgba(0, 0, 0, 0.94);
      backdrop-filter: blur(18px);
      border-left: 1px solid var(--line);
      transform: translateX(100%);
      transition: transform 0.45s cubic-bezier(0.22, 1, 0.36, 1);
    }

    .nav__links.is-open {
      transform: translateX(0);
    }

    .nav__links a {
      font-size: 1.8rem;
    }

    .nav__close {
      display: block;
      position: absolute;
      top: 2rem;
      right: 2rem;
      color: var(--blue);
    }

    .nav__close svg {
      width: 3rem;
      height: 3rem;
    }
  }
`;

const links = [
  { to: '/', label: 'Home' },
  { to: '/about', label: 'About' },
  { to: '/projects', label: 'Projects' },
  { to: '/publications', label: 'Publications' },
  { to: '/contact', label: 'Contact' },
];

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <NavBarStyles className={scrolled ? 'is-scrolled' : ''}>
      <nav className="container nav__inner">
        <NavLink className="nav__brand" to="/">
          <motion.svg
            viewBox="0 0 40 40"
            animate={{ rotate: 360 }}
            transition={{ duration: 40, repeat: Infinity, ease: 'linear' }}
          >
            <circle
              cx="20"
              cy="20"
              r="18"
              fill="none"
              stroke="var(--blue)"
              strokeWidth="0.8"
              strokeDasharray="2 4"
            />
            <circle
              cx="20"
              cy="20"
              r="11"
              fill="none"
              stroke="rgba(127,220,255,0.6)"
              strokeWidth="0.8"
            />
            <circle cx="20" cy="20" r="4" fill="var(--blue-bright)" />
          </motion.svg>
          <span>Immanuvel</span>
        </NavLink>

        <button
          type="button"
          className="nav__toggle"
          aria-label="Open menu"
          onClick={() => setOpen(true)}
        >
          <MdMenu />
        </button>

        <div className={open ? 'nav__links is-open' : 'nav__links'}>
          <button
            type="button"
            className="nav__close"
            aria-label="Close menu"
            onClick={() => setOpen(false)}
          >
            <MdClose />
          </button>
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              onClick={() => setOpen(false)}
            >
              {link.label}
            </NavLink>
          ))}
        </div>
      </nav>
    </NavBarStyles>
  );
}
