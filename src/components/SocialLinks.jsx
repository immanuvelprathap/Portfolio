import { motion } from 'framer-motion';
import styled from 'styled-components';
import { FaGithub, FaLinkedinIn, FaXTwitter } from 'react-icons/fa6';
import { SiGooglescholar } from 'react-icons/si';
import profile from '../data/profile';

const icons = {
  linkedin: FaLinkedinIn,
  x: FaXTwitter,
  github: FaGithub,
  scholar: SiGooglescholar,
};

const SocialStyles = styled(motion.ul)`
  display: flex;
  flex-wrap: wrap;
  gap: 1.4rem;

  li a {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 1rem 1.8rem 1rem 1.2rem;
    border: 1px solid var(--line);
    border-radius: 999px;
    background: rgba(5, 7, 12, 0.6);
    color: var(--white);
    font-size: 1.4rem;
    letter-spacing: 0.04em;
    backdrop-filter: blur(6px);
    transition: border-color 0.3s ease, box-shadow 0.3s ease,
      transform 0.3s ease, color 0.3s ease;
  }

  li a svg {
    width: 1.8rem;
    height: 1.8rem;
    color: var(--blue);
    transition: color 0.3s ease, transform 0.3s ease;
  }

  li a:hover {
    border-color: var(--blue);
    color: var(--blue-bright);
    box-shadow: 0 0 24px var(--blue-glow);
    transform: translateY(-3px);
  }

  li a:hover svg {
    color: var(--blue-bright);
    transform: scale(1.15);
  }

  @media only screen and (max-width: 560px) {
    gap: 1rem;
    li a {
      font-size: 1.2rem;
      padding: 0.8rem 1.4rem 0.8rem 1rem;
    }
  }
`;

const container = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.09, delayChildren: 0.15 } },
};

const item = {
  hidden: { opacity: 0, y: 18 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
};

export default function SocialLinks({ showHandles = false }) {
  return (
    <SocialStyles
      variants={container}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, amount: 0.4 }}
    >
      {profile.socials.map((social) => {
        const Icon = icons[social.icon];
        return (
          <motion.li key={social.name} variants={item}>
            <a href={social.url} target="_blank" rel="noreferrer">
              <Icon aria-hidden="true" />
              <span>{showHandles ? social.handle : social.name}</span>
            </a>
          </motion.li>
        );
      })}
    </SocialStyles>
  );
}
