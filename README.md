# Portfolio — Immanuvel Prathap

A motion-first portfolio for research at the intersection of **consciousness** and
**neuroscience**: Śaiva metaphysics (Śiva as the source of awareness — Cidākāśa,
Spanda, Ajñā, Naṭarāja, Bindu, Ḍamaru) read alongside brain-computer interfaces,
EEG decoding and machine learning for medicine.

Black canvas, electric blue for symbols and headings, white for text.

## Stack

- React 18 + Vite
- styled-components for scoped styling and the design tokens in `src/styles/GlobalStyle.js`
- framer-motion for scroll-linked and in-view motion
- lenis for inertial smooth scrolling
- HashRouter, so the site works on GitHub Pages without server rewrites

## Structure

```
src/
  components/
    ConsciousnessField.jsx  animated neuron/synapse canvas behind every page
    Mandala.jsx             rotating Śrī Yantra lattice with a pulsing bindu
    Hero.jsx                name reveal, rotating roles, parallax mandala
    WhoIAm.jsx              "Who I am" narrative + social links
    Pillars.jsx             six Śaiva ↔ neuroscience correspondences
    Research.jsx            current research highlight with an EEG-style wave
    NeuronProjects.jsx      projects rendered as a dendritic tree (see below)
    Skills.jsx              instruments, as ascending cortical layers
  data/                     profile, pillars and projects content
  pages/                    Home, About, Projects, Contact
```

### The neuron branch

`NeuronProjects` computes an SVG dendrite from the project list: a wavy axon spine
whose `pathLength` is driven by scroll progress, a curved branch per project drawn
on entry, decorative twigs, and an action-potential dot travelling each branch via
`animateMotion`. Project cards are round somas — no rectangles — positioned over
the SVG in percentage coordinates so the overlay tracks the viewBox at any width.
Below 900px the same data renders as a single-rail stacked dendrite.

Content lives in `src/data/projects.js`; the geometry adapts to any number of
entries.

## Development

```bash
npm install
npm run dev      # http://localhost:5173
npm run lint
npm run build    # -> dist/
```

## Deployment

`.github/workflows/static.yml` lints, builds and publishes `dist/` to GitHub Pages
on every push to `main`.

To serve this repository at `immanuvelprathap.in`, first remove the custom domain
from the repository that currently claims it (`immanuvelprathap/immanuvelprathap`),
then set the custom domain in this repository's Pages settings and add a
`public/CNAME` file containing `immanuvelprathap.in`. GitHub allows a domain to be
attached to only one repository at a time.

## Accessibility and motion

Every animation respects `prefers-reduced-motion`: the canvas stops drifting, Lenis
is not initialised, and CSS transitions collapse to near-zero duration.
