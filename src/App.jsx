import { HashRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import About from './pages/About';
import Projects from './pages/Projects';
import Publications from './pages/Publications';
import Contact from './pages/Contact';
import NavBar from './components/NavBar';
import ScrollToTop from './components/ScrollToTop';
import SmoothScroll from './components/SmoothScroll';
import ConsciousnessField from './components/ConsciousnessField';
import PageShell from './components/PageShell';

export default function App() {
  return (
    <Router>
      <ConsciousnessField />
      <SmoothScroll />
      <ScrollToTop />
      <NavBar />
      <PageShell>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/publications" element={<Publications />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </PageShell>
    </Router>
  );
}
