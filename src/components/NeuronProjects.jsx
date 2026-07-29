import { useMemo, useRef } from 'react';
import { motion, useScroll, useSpring } from 'framer-motion';
import styled from 'styled-components';
import Reveal from './Reveal';
import useMediaQuery from '../hooks/useMediaQuery';
import projectsData from '../data/projects';

const VB_W = 1000;
const TOP = 220;
const ROW_H = 360;
const BOTTOM = 260;
const NODE_R = 78;

const NeuronStyles = styled.section`
  position: relative;
  padding: 10rem 0 14rem;

  .neuron__head {
    max-width: 70ch;
    margin: 0 auto 8rem;
    text-align: center;
  }

  .neuron__head h2 {
    font-family: var(--display-bold);
    font-size: clamp(3rem, 5.4vw, 5.6rem);
    color: var(--white);
    margin: 1.6rem 0 2rem;
  }

  .neuron__head h2 em {
    font-style: normal;
    color: var(--blue);
  }

  .neuron__stage {
    position: relative;
    width: min(94%, 1400px);
    margin: 0 auto;
  }

  .neuron__svg {
    width: 100%;
    height: auto;
    display: block;
    overflow: visible;
  }

  .neuron__overlay {
    position: absolute;
    inset: 0;
  }

  .neuron__item {
    position: absolute;
    width: 32%;
    margin-left: -16%;
    text-align: center;
  }

  .neuron__soma {
    position: relative;
    width: 48.5%;
    margin: 0 auto;
    aspect-ratio: 1 / 1;
    border-radius: 50%;
    display: grid;
    place-items: center;
    overflow: hidden;
    border: 1px solid rgba(127, 220, 255, 0.55);
    background: radial-gradient(
      circle at 32% 28%,
      rgba(47, 155, 255, 0.35),
      rgba(0, 0, 0, 0.92) 70%
    );
    box-shadow: 0 0 60px rgba(47, 155, 255, 0.25);
    transition: box-shadow 0.5s ease, border-color 0.5s ease;
  }

  .neuron__soma img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    opacity: 0.55;
    filter: grayscale(1) contrast(1.1) brightness(0.75);
    transition: opacity 0.6s ease, transform 0.8s ease, filter 0.6s ease;
  }

  .neuron__soma__glyph {
    position: relative;
    font-size: clamp(2.4rem, 3.4vw, 4rem);
    color: var(--blue-bright);
    text-shadow: 0 0 26px rgba(47, 155, 255, 0.8);
  }

  .neuron__item a:hover .neuron__soma {
    box-shadow: 0 0 90px rgba(47, 155, 255, 0.55);
    border-color: var(--blue-bright);
  }

  .neuron__item a:hover .neuron__soma img {
    opacity: 0.85;
    transform: scale(1.08);
    filter: grayscale(0.2) contrast(1.15) brightness(0.95);
  }

  .neuron__branchLabel {
    margin-top: 2.4rem;
    font-size: 1.1rem;
    letter-spacing: 0.34em;
    text-transform: uppercase;
    color: var(--blue);
  }

  .neuron__title {
    font-family: var(--display);
    font-size: clamp(1.9rem, 2.2vw, 2.6rem);
    color: var(--white);
    margin: 0.8rem 0 1.4rem;
  }

  .neuron__desc {
    font-size: 1.35rem;
    line-height: 1.75;
    color: var(--mist);
  }

  .neuron__tags {
    display: flex;
    flex-wrap: wrap;
    gap: 0.8rem;
    justify-content: center;
    margin-top: 1.8rem;
  }

  .neuron__tags span {
    font-size: 1.05rem;
    letter-spacing: 0.14em;
    text-transform: uppercase;
    padding: 0.5rem 1.2rem;
    border: 1px solid var(--line);
    border-radius: 999px;
    color: var(--mist-dim);
  }

  .neuron__open {
    display: inline-block;
    margin-top: 1.8rem;
    font-size: 1.2rem;
    letter-spacing: 0.24em;
    text-transform: uppercase;
    color: var(--blue);
    border-bottom: 1px solid transparent;
  }

  .neuron__item a:hover .neuron__open {
    border-bottom-color: var(--blue);
  }

  /* Stacked dendrite for small screens */
  .neuron__stack {
    position: relative;
    width: min(94%, 640px);
    margin: 0 auto;
    padding-left: 5.4rem;
  }

  .neuron__stack::before {
    content: '';
    position: absolute;
    left: 1.6rem;
    top: 0;
    bottom: 0;
    width: 1px;
    background: linear-gradient(
      to bottom,
      rgba(47, 155, 255, 0),
      rgba(47, 155, 255, 0.7) 12%,
      rgba(47, 155, 255, 0.7) 88%,
      rgba(47, 155, 255, 0)
    );
  }

  .neuron__stackItem {
    position: relative;
    margin-bottom: 6rem;
    text-align: left;
  }

  .neuron__stackItem::before {
    content: '';
    position: absolute;
    left: -3.8rem;
    top: 1.4rem;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
    border: 1px solid rgba(127, 220, 255, 0.6);
    background: radial-gradient(
      circle at 35% 30%,
      rgba(47, 155, 255, 0.5),
      rgba(0, 0, 0, 0.9)
    );
    box-shadow: 0 0 26px rgba(47, 155, 255, 0.4);
  }

  .neuron__stackItem .neuron__tags {
    justify-content: flex-start;
  }

  @media only screen and (max-width: 900px) {
    padding: 8rem 0 10rem;
    .neuron__head {
      margin-bottom: 5rem;
    }
  }
`;

function smoothPath(points) {
  if (points.length < 2) return '';
  let d = `M ${points[0].x} ${points[0].y}`;
  for (let i = 0; i < points.length - 1; i += 1) {
    const p0 = points[i - 1] || points[i];
    const p1 = points[i];
    const p2 = points[i + 1];
    const p3 = points[i + 2] || p2;
    const c1x = p1.x + (p2.x - p0.x) / 6;
    const c1y = p1.y + (p2.y - p0.y) / 6;
    const c2x = p2.x - (p3.x - p1.x) / 6;
    const c2y = p2.y - (p3.y - p1.y) / 6;
    d += ` C ${c1x} ${c1y}, ${c2x} ${c2y}, ${p2.x} ${p2.y}`;
  }
  return d;
}

export default function NeuronProjects({
  projects = projectsData,
  heading = true,
}) {
  const stageRef = useRef(null);
  const isCompact = useMediaQuery('(max-width: 900px)');

  const { scrollYProgress } = useScroll({
    target: stageRef,
    offset: ['start 0.85', 'end 0.65'],
  });
  const spineLength = useSpring(scrollYProgress, {
    stiffness: 90,
    damping: 26,
    restDelta: 0.001,
  });

  const geometry = useMemo(() => {
    const vbH = TOP + (projects.length - 1) * ROW_H + BOTTOM;
    const nodes = projects.map((project, i) => {
      const side = i % 2 === 0 ? -1 : 1;
      return {
        project,
        side,
        x: VB_W / 2 + side * 232,
        y: TOP + i * ROW_H,
      };
    });

    const spinePoints = [
      { x: VB_W / 2, y: 0 },
      ...nodes.map((node, i) => ({
        x: VB_W / 2 + (i % 2 === 0 ? -34 : 34),
        y: node.y - 40,
      })),
      { x: VB_W / 2, y: vbH },
    ];

    const branches = nodes.map((node) => {
      const start = { x: VB_W / 2 + node.side * 24, y: node.y - 150 };
      const end = { x: node.x - node.side * NODE_R * 0.95, y: node.y - 8 };
      const c1 = { x: start.x + node.side * 20, y: start.y + 90 };
      const c2 = { x: end.x - node.side * 120, y: end.y - 70 };
      return {
        node,
        d: `M ${start.x} ${start.y} C ${c1.x} ${c1.y}, ${c2.x} ${c2.y}, ${end.x} ${end.y}`,
      };
    });

    const twigs = nodes.flatMap((node, i) =>
      [-0.75, -0.15, 0.5].map((angle, j) => {
        const dir = node.side;
        const len = 90 + j * 26;
        const ex = node.x + dir * (NODE_R + len) * Math.cos(angle);
        const ey = node.y + (NODE_R + len) * Math.sin(angle);
        const cx = node.x + dir * (NODE_R + len * 0.45) * Math.cos(angle - 0.4);
        const cy = node.y + (NODE_R + len * 0.5) * Math.sin(angle - 0.25);
        return {
          key: `${i}-${j}`,
          d: `M ${node.x + dir * NODE_R * 0.9} ${node.y} Q ${cx} ${cy}, ${ex} ${ey}`,
        };
      })
    );

    return { vbH, nodes, branches, twigs, spineD: smoothPath(spinePoints) };
  }, [projects]);

  const head = heading ? (
    <div className="neuron__head">
      <Reveal>
        <p className="eyebrow">Projects as dendrites</p>
      </Reveal>
      <Reveal delay={0.08}>
        <h2>
          One axon, many <em>branches</em>.
        </h2>
      </Reveal>
      <Reveal delay={0.16}>
        <p>
          Work does not arrive in neat rectangles. It grows the way a neuron
          does — a single line of enquiry throwing out branches until one of
          them finds a signal worth keeping.
        </p>
      </Reveal>
    </div>
  ) : null;

  if (isCompact) {
    return (
      <NeuronStyles>
        <div className="container">{head}</div>
        <div className="neuron__stack">
          {projects.map((project, index) => (
            <motion.div
              className="neuron__stackItem"
              key={project.id}
              initial={{ opacity: 0, y: 60 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.25 }}
              transition={{
                duration: 0.75,
                delay: index * 0.03,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a href={project.link} target="_blank" rel="noreferrer">
                <p className="neuron__branchLabel">{project.branch}</p>
                <h3 className="neuron__title">{project.name}</h3>
                <p className="neuron__desc">{project.desc}</p>
                <div className="neuron__tags">
                  {project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <span className="neuron__open">Open synapse →</span>
              </a>
            </motion.div>
          ))}
        </div>
      </NeuronStyles>
    );
  }

  return (
    <NeuronStyles>
      <div className="container">{head}</div>

      <div className="neuron__stage" ref={stageRef}>
        <svg
          className="neuron__svg"
          viewBox={`0 0 ${VB_W} ${geometry.vbH}`}
          aria-hidden="true"
        >
          <defs>
            <linearGradient id="axonGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#0b3f7a" />
              <stop offset="45%" stopColor="#2f9bff" />
              <stop offset="100%" stopColor="#7fdcff" />
            </linearGradient>
            <filter id="axonGlow" x="-50%" y="-50%" width="200%" height="200%">
              <feGaussianBlur stdDeviation="6" result="blur" />
              <feMerge>
                <feMergeNode in="blur" />
                <feMergeNode in="SourceGraphic" />
              </feMerge>
            </filter>
          </defs>

          <path
            d={geometry.spineD}
            fill="none"
            stroke="rgba(47, 155, 255, 0.14)"
            strokeWidth="2"
          />
          <motion.path
            d={geometry.spineD}
            fill="none"
            stroke="url(#axonGradient)"
            strokeWidth="2.6"
            strokeLinecap="round"
            filter="url(#axonGlow)"
            style={{ pathLength: spineLength }}
          />

          {geometry.twigs.map((twig) => (
            <motion.path
              key={twig.key}
              d={twig.d}
              fill="none"
              stroke="rgba(127, 220, 255, 0.22)"
              strokeWidth="1"
              strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              whileInView={{ pathLength: 1, opacity: 1 }}
              viewport={{ once: true, amount: 0.4 }}
              transition={{ duration: 1.6, ease: 'easeOut' }}
            />
          ))}

          {geometry.branches.map((branch, index) => (
            <g key={branch.node.project.id}>
              <motion.path
                id={`branch-${index}`}
                d={branch.d}
                fill="none"
                stroke="var(--blue)"
                strokeWidth="1.8"
                strokeLinecap="round"
                initial={{ pathLength: 0, opacity: 0.2 }}
                whileInView={{ pathLength: 1, opacity: 1 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
              />
              <circle r="4.5" fill="#7fdcff" opacity="0.9">
                <animateMotion
                  dur={`${3 + (index % 3) * 0.7}s`}
                  repeatCount="indefinite"
                  begin={`${index * 0.4}s`}
                >
                  <mpath href={`#branch-${index}`} />
                </animateMotion>
              </circle>
              <circle
                cx={branch.node.x}
                cy={branch.node.y}
                r={NODE_R + 14}
                fill="none"
                stroke="rgba(47, 155, 255, 0.25)"
                strokeWidth="0.8"
                strokeDasharray="2 8"
              />
            </g>
          ))}
        </svg>

        <div className="neuron__overlay">
          {geometry.nodes.map((node, index) => (
            <motion.div
              className="neuron__item"
              key={node.project.id}
              style={{
                left: `${(node.x / VB_W) * 100}%`,
                top: `${((node.y - NODE_R) / geometry.vbH) * 100}%`,
              }}
              initial={{ opacity: 0, y: 90, scale: 0.86 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true, amount: 0.35 }}
              transition={{
                duration: 0.9,
                delay: 0.1 + (index % 2) * 0.06,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <a href={node.project.link} target="_blank" rel="noreferrer">
                <div className="neuron__soma">
                  {node.project.img && (
                    <img src={node.project.img} alt={node.project.name} />
                  )}
                  <span className="neuron__soma__glyph">
                    {node.project.glyph}
                  </span>
                </div>
                <p className="neuron__branchLabel">{node.project.branch}</p>
                <h3 className="neuron__title">{node.project.name}</h3>
                <p className="neuron__desc">{node.project.desc}</p>
                <div className="neuron__tags">
                  {node.project.tags.map((tag) => (
                    <span key={tag}>{tag}</span>
                  ))}
                </div>
                <span className="neuron__open">Open synapse →</span>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </NeuronStyles>
  );
}
