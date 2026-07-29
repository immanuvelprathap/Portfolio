import manualProjects from './manualProjects';
import githubProjects from './auto/github.js';

const manualLinks = new Set(
  manualProjects.map((p) => p.link?.toLowerCase().replace(/\.git$/, ''))
);

const merged = [
  ...manualProjects,
  ...githubProjects.filter((p) => {
    if (!p.link) return false;
    return !manualLinks.has(p.link.toLowerCase().replace(/\.git$/, ''));
  }),
];

export default merged;
