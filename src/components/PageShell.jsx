import { motion, useScroll, useSpring } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import styled from 'styled-components';

const ShellStyles = styled.main`
  position: relative;
  z-index: 1;

  .shell__progress {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    height: 2px;
    transform-origin: left;
    background: linear-gradient(to right, var(--blue-deep), var(--blue-bright));
    box-shadow: 0 0 14px var(--blue-glow);
    z-index: 200;
  }
`;

export default function PageShell({ children }) {
  const { pathname } = useLocation();
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 30,
    restDelta: 0.001,
  });

  return (
    <ShellStyles>
      <motion.div className="shell__progress" style={{ scaleX: progress }} />
      <motion.div
        key={pathname}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
      >
        {children}
      </motion.div>
    </ShellStyles>
  );
}
