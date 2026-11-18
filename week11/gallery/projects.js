// Real coursework, newest first. Screenshots live in app/public/shots.
const LIVE = 'https://sabhyatachhetri45-dev.github.io/web-programming/';
const CODE = 'https://github.com/sabhyatachhetri45-dev/web-programming/tree/master/';
const shot = (file) => `${import.meta.env.BASE_URL}shots/${file}`;

export const TECH_FILTERS = ['All', 'React', 'JavaScript', 'HTML', 'CSS', 'API'];

export const PROJECTS = [
  {
    id: 'dalbit-shop',
    week: 'Week 12',
    kind: 'React app',
    title: 'Dalbit Shopping Cart',
    description:
      'A small desk-goods store with a live cart — quantity steppers, free-shipping progress, undo and a mobile drawer, all driven by useState.',
    tech: ['React', 'JavaScript', 'CSS'],
    demoUrl: `${LIVE}week12/`,
    codeUrl: `${CODE}week12`,
    image: shot('dalbit-shop.jpg'),
    tone: 'rose',
  },
  {
    id: 'react-lab',
    week: 'Week 11',
    kind: 'Component exercises',
    title: 'React Component Lab',
    description:
      'Six exercises on props, list rendering, conditional output and state: student cards, a course catalogue and an interactive practice board.',
    tech: ['React', 'JavaScript', 'CSS'],
    demoUrl: `${LIVE}week11/coursework.html`,
    codeUrl: `${CODE}week11`,
    image: shot('react-lab.jpg'),
    tone: 'butter',
  },
  {
    id: 'dev-notebook',
    week: 'Week 10',
    kind: 'Portfolio site',
    title: 'Development Notebook',
    description:
      'A personal portfolio covering technical skills, a project timeline and the Git and GitHub Pages workflow I use to deploy.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: `${LIVE}week10/index.html`,
    codeUrl: `${CODE}week10`,
    image: shot('dev-notebook.jpg'),
    tone: 'sky',
  },
  {
    id: 'student-registration',
    week: 'Week 8',
    kind: 'Form',
    title: 'Student Registration',
    description:
      'A registration form with grouped fields, validation states and a progress hint that tells you what is still missing.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: `${LIVE}week8(fri)/homework%20registration.html`,
    codeUrl: `${CODE}week8(fri)`,
    image: shot('registration.jpg'),
    tone: 'lilac',
  },
  {
    id: 'book-search',
    week: 'Week 7',
    kind: 'API project',
    title: 'Book Search',
    description:
      'A six-step build that grows from a first search box into a complete Open Library search experience.',
    tech: ['JavaScript', 'API', 'HTML'],
    demoUrl: `${LIVE}week%207/index.html`,
    codeUrl: `${CODE}week%207`,
    image: shot('book-search.jpg'),
    tone: 'sage',
  },
  {
    id: 'api-projects',
    week: 'Week 6',
    kind: 'API dashboards',
    title: 'API Projects',
    description:
      'Six small apps on public APIs — weather, country demographics, GitHub repositories, crypto prices, random dogs and a data stream.',
    tech: ['JavaScript', 'API'],
    demoUrl: `${LIVE}week6(fri)/index.html`,
    codeUrl: `${CODE}week6(fri)`,
    image: shot('api-projects.jpg'),
    tone: 'peach',
  },
  {
    id: 'scrapbook-portfolio',
    week: 'Personal',
    kind: 'Portfolio site',
    title: 'Scrapbook Portfolio',
    description:
      'My personal site, styled like a Korean stationery notebook with taped photos, stickers and hand-labelled pages.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    demoUrl: 'https://sabhyatachhetri45-dev.github.io/portfolio/',
    codeUrl: 'https://github.com/sabhyatachhetri45-dev/portfolio',
    image: shot('scrapbook-portfolio.jpg'),
    tone: 'rose',
  },
  {
    id: 'find-the-cookie',
    week: 'Personal',
    kind: 'Game',
    title: 'Find the Cookie',
    description:
      'A hot-and-cold guessing game: a cookie hides under one of 100 tiles, and each tile changes colour to show how close you are.',
    tech: ['JavaScript', 'HTML', 'CSS'],
    demoUrl: `${LIVE}my%20projects/number%20game.html`,
    codeUrl: `${CODE}my%20projects`,
    image: shot('find-the-cookie.jpg'),
    tone: 'butter',
  },
];
