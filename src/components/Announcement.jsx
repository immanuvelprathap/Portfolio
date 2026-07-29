import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaLinkedinIn } from 'react-icons/fa6';
import { FiExternalLink } from 'react-icons/fi';

const AnnouncementStyles = styled.section`
  padding: 9rem 0 8rem;
  border-top: 1px solid var(--line);
  border-bottom: 1px solid var(--line);
  background: radial-gradient(
    ellipse at 50% 0%,
    rgba(47, 155, 255, 0.08),
    transparent 60%
  );

  .announcement__inner {
    display: grid;
    gap: 2.4rem;
    max-width: 980px;
    margin: 0 auto;
  }

  .announcement__eyebrow {
    font-family: var(--mono);
    font-size: 1.25rem;
    letter-spacing: 0.45em;
    text-transform: uppercase;
    color: var(--blue);
    display: inline-flex;
    align-items: center;
    gap: 1.2rem;
  }

  .announcement__eyebrow::before {
    content: '';
    display: inline-block;
    width: 0.8rem;
    height: 0.8rem;
    background: var(--blue);
    border-radius: 50%;
    box-shadow: 0 0 12px var(--blue-glow);
    animation: pulse 1.8s infinite ease-in-out;
  }

  @keyframes pulse {
    0%,
    100% {
      opacity: 1;
    }
    50% {
      opacity: 0.35;
    }
  }

  .announcement__title {
    font-family: var(--display);
    font-size: clamp(2.4rem, 5vw, 4.2rem);
    color: var(--white);
    line-height: 1.1;
    letter-spacing: -0.02em;
  }

  .announcement__summary {
    font-size: 1.6rem;
    color: var(--mist);
    max-width: 78ch;
  }

  .announcement__actions {
    display: flex;
    flex-wrap: wrap;
    gap: 1.4rem;
    margin-top: 1.2rem;
  }

  .announcement__link {
    display: inline-flex;
    align-items: center;
    gap: 0.9rem;
    padding: 1.2rem 2.6rem;
    border-radius: 999px;
    font-size: 1.3rem;
    letter-spacing: 0.18em;
    text-transform: uppercase;
    border: 1px solid var(--blue);
    color: var(--white);
    transition: all 0.35s ease;
  }

  .announcement__link svg {
    width: 1.7rem;
    height: 1.7rem;
  }

  .announcement__link--solid {
    background: var(--blue);
    color: var(--void);
  }

  .announcement__link:hover {
    box-shadow: 0 0 28px var(--blue-glow);
    transform: translateY(-2px);
    color: var(--blue-bright);
  }

  .announcement__link--solid:hover {
    color: var(--void);
  }
`;

export default function Announcement() {
  return (
    <AnnouncementStyles>
      <div className="container announcement__inner">
        <motion.p
          className="announcement__eyebrow"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          New preprint
        </motion.p>

        <motion.h2
          className="announcement__title"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.1 }}
        >
          Overcoming the BCI Calibration Bottleneck
        </motion.h2>

        <motion.p
          className="announcement__summary"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.2 }}
        >
          A clinically-grounded architecture using Riemannian Alignment and
          Stochastic Weight Averaging to remove the tedious per-patient
          recalibration step in EEG-based Brain-Computer Interfaces. Evaluated
          on the strict MOABB BNCI2014-001 benchmark with zero-calibration deep
          learning.
        </motion.p>

        <motion.div
          className="announcement__actions"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7, delay: 0.3 }}
        >
          <a
            className="announcement__link announcement__link--solid"
            href="https://arxiv.org/abs/2607.16225"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FiExternalLink />
            Read on arXiv
          </a>
          <a
            className="announcement__link"
            href="https://www.linkedin.com/posts/immanuvelprathaps_overcoming-the-bci-calibration-bottleneck-activity-7486168294807285760-oOuY"
            target="_blank"
            rel="noopener noreferrer"
          >
            <FaLinkedinIn />
            LinkedIn announcement
          </a>
        </motion.div>
      </div>
    </AnnouncementStyles>
  );
}
