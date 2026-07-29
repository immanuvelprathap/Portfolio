import { createGlobalStyle } from 'styled-components';

const GlobalStyles = createGlobalStyle`
  *,
  *::before,
  *::after {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  :root {
    --void: #000000;
    --ink: #05070c;
    --ink-2: #0a0e16;
    --line: rgba(120, 190, 255, 0.18);

    --blue: #2f9bff;
    --blue-bright: #7fdcff;
    --blue-deep: #0b3f7a;
    --blue-glow: rgba(47, 155, 255, 0.45);

    --white: #ffffff;
    --mist: rgba(255, 255, 255, 0.74);
    --mist-dim: rgba(255, 255, 255, 0.48);

    --mono: 'RobotoMono Regular', 'Roboto Mono', ui-monospace, monospace;
    --display: 'Montserrat SemiBold', 'Segoe UI', sans-serif;
    --display-bold: 'Montserrat Bold', 'Segoe UI', sans-serif;
  }

  html {
    font-size: 62.5%;
    scroll-behavior: smooth;
  }

  body {
    min-height: 100vh;
    background-color: var(--void);
    color: var(--mist);
    font-family: var(--mono);
    font-size: 1.6rem;
    line-height: 1.7;
    overflow-x: hidden;
    -webkit-font-smoothing: antialiased;
  }

  h1, h2, h3, h4, h5, h6 {
    font-family: var(--display);
    color: var(--blue);
    line-height: 1.1;
    font-weight: 400;
  }

  p {
    color: var(--mist);
  }

  ul, li {
    list-style: none;
  }

  a {
    text-decoration: none;
    color: var(--blue);
    transition: color 0.3s ease;
  }

  a:hover {
    color: var(--blue-bright);
  }

  img, svg {
    display: block;
    max-width: 100%;
  }

  button {
    font-family: inherit;
    outline: none;
    border: none;
    background: none;
    cursor: pointer;
  }

  ::selection {
    background: var(--blue);
    color: var(--void);
  }

  .container {
    max-width: 1240px;
    width: min(92%, 1240px);
    margin: 0 auto;
  }

  .sanskrit {
    font-family: 'Nirmala UI', 'Noto Sans Devanagari', serif;
    color: var(--blue-bright);
  }

  .eyebrow {
    font-family: var(--mono);
    font-size: 1.3rem;
    letter-spacing: 0.45em;
    text-transform: uppercase;
    color: var(--blue);
  }

  ::-webkit-scrollbar {
    width: 8px;
  }
  ::-webkit-scrollbar-track {
    background: var(--void);
  }
  ::-webkit-scrollbar-thumb {
    background: var(--blue-deep);
    border-radius: 4px;
  }
  ::-webkit-scrollbar-thumb:hover {
    background: var(--blue);
  }

  @media (prefers-reduced-motion: reduce) {
    *, *::before, *::after {
      animation-duration: 0.001ms !important;
      animation-iteration-count: 1 !important;
      transition-duration: 0.001ms !important;
      scroll-behavior: auto !important;
    }
  }
`;

export default GlobalStyles;
