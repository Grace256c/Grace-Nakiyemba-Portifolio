import playconnectScreenshot from './assets/playconnect.png';
import netsageScreenshot from './assets/Netsage.png';
import ConstellationBackground from './ConstellationBackground.jsx';
import Reveal from './Reveal.jsx';
import { useEffect, useState } from 'react';
import profilePhoto from './assets/Grace.jpeg';
import amaniCareImg from './assets/AmaniCare.png';
import farm2PlateImg from './assets/Farm2Plate.png';
import nyondoImg from './assets/Nyondo.png';
import videxImg from './assets/videx.png';

// Public social profile displayed in contact and footer.
const xProfileUrl = 'https://x.com/GospelGrace3';

const phrases = ['Software Engineer', 'Python & Backend Developer', 'AI Builder', 'Open Source Contributor'];

function App() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [projectFilter, setProjectFilter] = useState('All');
  const [formStatus, setFormStatus] = useState('idle'); // idle | sending | success | error

  const currentYear = new Date().getFullYear();

  useEffect(() => {
    const currentPhrase = phrases[phraseIndex];
    const speed = isDeleting ? 50 : 100;

    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(currentPhrase.substring(0, charIndex + 1));
        setCharIndex(charIndex + 1);
        if (charIndex + 1 === currentPhrase.length) {
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setText(currentPhrase.substring(0, charIndex - 1));
        setCharIndex(charIndex - 1);
        if (charIndex - 1 === 0) {
          setIsDeleting(false);
          setPhraseIndex((phraseIndex + 1) % phrases.length);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [charIndex, isDeleting, phraseIndex]);

  // Explicit dark mode toggle. avoids stale-class edge cases
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Netlify Forms processes submissions on the deployed site.
  const handleSubmit = async (event) => {
    event.preventDefault();
    const form = event.currentTarget;
    setFormStatus('sending');

    // Vite's development server does not process Netlify form submissions.
    if (window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1') {
      setFormStatus('local');
      return;
    }

    const data = new FormData(form);
    data.set('form-name', 'portfolio-contact');

    try {
      const response = await fetch('/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
        body: new URLSearchParams(data).toString(),
      });
      if (!response.ok) throw new Error('Form submission failed');
      setFormStatus('success');
      form.reset();
    } catch {
      setFormStatus('error');
    }
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#journey', label: 'Journey' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#open-source', label: 'Open Source' },
    { href: '#achievements', label: 'Achievements' },
    { href: '#contact', label: 'Contact' },
  ];

  const skillGroups = [
    { title: 'Backend Engineering', skills: ['Python', 'Django', 'FastAPI', 'REST APIs', 'SQL', 'SQLite', 'PostgreSQL'] },
    { title: 'Frontend Development', skills: ['JavaScript', 'React', 'HTML', 'CSS', 'Tailwind CSS'] },
    { title: 'AI & Data', skills: ['AI Integrations', 'Machine Learning Fundamentals', 'Data Analytics'] },
    { title: 'Tools & Integrations', skills: ['Git', 'GitHub', 'Linux', "Africa’s Talking APIs", 'SMS / USSD'] },
    { title: 'Administrative & Operations', skills: ['Virtual Assistance', 'Data Entry', 'Documentation', 'Microsoft Office', 'Email & Calendar Management', 'Customer Support', 'Writing & Editing'] },
    { title: 'Digital Communication & Community Engagement', skills: ['Professional Content Writing', 'Content Planning & Research', 'Community Engagement', 'Stakeholder Communication', 'Event Coordination', 'Workshop Facilitation', 'Digital Analytics Fundamentals', 'AI Assisted Content Workflows'] },
    { title: 'Currently Exploring', skills: ['Ethereum', 'Blockchain & Web3', 'IoT', 'Embedded Systems', 'C++', 'Cloud & Security'] },
  ];

  // Featured first: real world engineering depth, then impact and supporting work.
  const projects = [
    {
      name: 'NetSage',
      categories: ['Backend', 'Web Apps'],
      description: 'A network monitoring and incident response platform that turns telemetry and alerts into actionable incidents. Built with Django REST Framework, React, PostgreSQL, and Africa’s Talking SMS integrations.',
      tags: ['Django REST Framework', 'React', 'PostgreSQL', 'Monitoring'],
      githubLink: 'https://github.com/netsage-team/netsage',
      link: 'https://netsage-a5hw.onrender.com/',
      linkLabel: 'Live Demo',
      image: netsageScreenshot,
    },
    {
      name: 'Nyondo Hardware Management System',
      categories: ['Backend', 'Web Apps'],
      description: 'A Django management system for NYONDO General Hardware LTD, supporting stock, sales, supplier credit, customer deposits, and role based access.',
      tags: ['Python', 'Django', 'SQLite', 'Business Systems'],
      link: 'https://nyondo-hardware-management-system.onrender.com/',
      linkLabel: 'View Project',
      githubLink: 'https://github.com/Grace256c/nyondo-hardware-management-system',
      image: nyondoImg,
    },
    {
      name: 'Amani Care',
      categories: ['AI', 'Community Impact'],
      badge: '🏆',
      badgeLabel: '1st Place Winner',
      description: 'An AI powered women’s health companion exploring accessible guidance through USSD and SMS, designed with connectivity barriers in mind.',
      tags: ['AI', 'USSD / SMS', 'Inclusive Technology'],
      link: 'https://amanicare-every-woman.lovable.app',
      linkLabel: 'View Project',
      image: amaniCareImg,
    },
    {
      name: 'PlayConnect',
      categories: ['Web Apps', 'Community Impact'],
      description: 'An inclusive sports project focused on connecting people through accessible opportunities to participate in sports and community activities.',
      tags: ['Accessibility', 'Community', 'Sports Tech'],
      githubLink: 'https://github.com/Grace256c/Play_Connect',
      link: 'https://playconnect-africa.lovable.app/',
      linkLabel: 'Live Demo',
      image: playconnectScreenshot,
    },
    {
      name: 'Farm2Plate Connect',
      categories: ['Community Impact'],
      description: 'A mobile and SMS focused food security concept connecting participants across Uganda’s food system, including farmers, households, and organizations.',
      tags: ['SMS', 'Mobile', 'Food Security'],
      link: 'https://farmplate.netlify.app/',
      linkLabel: 'View Project',
      image: farm2PlateImg,
    },
    {
      name: 'Videx',
      categories: ['Backend', 'Web Apps'],
      description: 'A Django video platform with video uploads, playback, quality options, thumbnails, and upload validation.',
      tags: ['Django', 'Tailwind CSS', 'Video'],
      githubLink: 'https://github.com/Grace256c/CSE-26-03-ST-ASSESSMENT',
      image: videxImg,
    },
  ];

  const filters = ['All', 'Backend', 'AI', 'Web Apps', 'Community Impact'];
  const visibleProjects = projects.filter((project) => projectFilter === 'All' || project.categories.includes(projectFilter));

  return (
    <>
      {/* Animated Dot Grid Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute inset-[-100px] dot-grid animate-drift"></div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/70 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center max-w-[1280px] mx-auto px-5 md:px-8 xl:px-10 py-4">
          <div className="flex items-center gap-3">
            <a href="#home" aria-label="Grace Nakiyemba. back to home" className="flex items-center gap-3 group">
              <img src={profilePhoto} alt="" className="h-10 w-10 shrink-0 rounded-full object-cover border-2 border-primary shadow-sm transition-transform duration-300 group-hover:scale-105" />
              <span className="text-base sm:text-lg font-bold tracking-tight text-on-surface dark:text-slate-100">
                Grace <span className="text-primary">Nakiyemba</span>
              </span>
            </a>
          </div>

          <div className="hidden xl:flex items-center gap-4 2xl:gap-6">
            {navLinks.filter((link) => !['#open-source', '#achievements'].includes(link.href)).map((link) => (
              <a
                key={link.href}
                className="whitespace-nowrap text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors duration-200 font-body-md text-body-md"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
            <details className="relative group">
              <summary className="list-none cursor-pointer select-none whitespace-nowrap text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors duration-200 font-body-md text-body-md flex items-center gap-1 [&::-webkit-details-marker]:hidden">
                More <span className="material-symbols-outlined text-[18px]">expand_more</span>
              </summary>
              <div className="absolute right-0 top-full mt-3 min-w-44 rounded-xl border border-primary/15 bg-surface dark:bg-slate-900 shadow-xl p-2 flex flex-col gap-1">
                {navLinks.filter((link) => ['#open-source', '#achievements'].includes(link.href)).map((link) => (
                  <a key={link.href} href={link.href} onClick={(event) => event.currentTarget.closest('details').open = false} className="whitespace-nowrap rounded-lg px-3 py-2 text-on-surface-variant dark:text-slate-300 hover:text-primary hover:bg-primary/10 transition-colors">
                    {link.label}
                  </a>
                ))}
              </div>
            </details>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setDarkMode(!darkMode)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-primary-fixed/40 dark:bg-slate-700 text-primary dark:text-slate-100 hover:bg-primary-fixed dark:hover:bg-slate-600 transition-all"
              aria-label="Toggle dark mode"
            >
              <span className="material-symbols-outlined text-[20px]">
                {darkMode ? 'light_mode' : 'dark_mode'}
              </span>
            </button>
            <a
              href="/Grace_Nakiyemba_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className="hidden sm:block bg-primary-fixed hover:bg-primary-fixed/50 text-primary px-6 py-2 rounded-full font-label-md text-label-md transition-all active:scale-95 border border-primary/20"
            >
              Resume
            </a>

            <button
              className="xl:hidden text-on-surface dark:text-slate-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label={menuOpen ? "Close navigation menu" : "Open navigation menu"}
              aria-expanded={menuOpen}
            >
              <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="xl:hidden absolute top-full left-0 w-full bg-surface dark:bg-slate-900 flex flex-col gap-4 p-6 shadow-lg max-h-[75vh] overflow-y-auto">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={() => setMenuOpen(false)}
                className="text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors font-body-md text-body-md"
              >
                {link.label}
              </a>
            ))}
            <a
            href="/Grace_Nakiyemba_Resume.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-primary-fixed text-primary px-6 py-2 rounded-full font-label-md text-label-md w-full mt-2 block text-center"
          >
            Resume
          </a>
        </div>
      )}
    </nav >

      <main className="relative min-h-screen flex flex-col pt-24 bg-background dark:bg-slate-950 transition-colors">
        <div className="fixed top-[-10%] right-[-10%] w-[500px] h-[500px] bg-primary-fixed rounded-full opacity-40 dark:opacity-10 blur-3xl z-[-1]"></div>

        {/* Hero Section */}
        <section className="relative isolate flex-grow flex items-center max-w-[1200px] w-full mx-auto px-6 md:px-12 py-12" id="home">
          <ConstellationBackground />
          <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-4">
                <p className="inline-flex items-center gap-2 text-sm font-semibold text-primary tracking-wide">Kampala, Uganda · Open to opportunities</p>
                <h1 className="font-display text-[38px] sm:text-[50px] md:text-[60px] leading-[1.12] tracking-tight font-bold text-on-background dark:text-slate-100">
                  Hi, I'm <br />
                  <span className="text-primary">Grace Nakiyemba.</span>
                </h1>
                <div className="h-12 flex items-center">
                  <span className="font-code-sm text-body-lg text-primary whitespace-nowrap border-r-2 border-primary animate-blink pr-1">
                    {text}
                  </span>
                </div>
              </div>
              <p className="text-body-lg text-on-surface-variant dark:text-slate-300 max-w-lg leading-relaxed">
                I build practical, accessible software that solves real world problems. From backend systems for businesses to AI powered and mobile first applications, I turn ideas into technology that creates meaningful impact.
              </p>
              <p className="text-sm font-medium text-on-surface-variant dark:text-slate-400">Python · Django · FastAPI · React · AI · Open Source</p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a className="bg-primary text-on-primary px-8 py-4 rounded-xl font-body-md text-body-md font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg flex items-center gap-2" href="#projects">
                  View Projects
                </a>
                <a className="border-2 border-primary text-primary hover:bg-primary/5 px-8 py-4 rounded-xl font-body-md text-body-md font-bold transition-all active:scale-95" href="#contact">
                  Contact Me
                </a>
              </div>
              <div className="grid grid-cols-3 gap-3 pt-5" aria-label="Career highlights">
                {[
                  ['2', 'Hackathon wins'],
                  ['Open Source', 'Contributor'],
                  ['Real World', 'Projects'],
                ].map(([value, label]) => (
                  <div key={label} className="rounded-xl border border-primary/15 bg-white/65 dark:bg-slate-800/70 p-3 sm:p-4 shadow-sm backdrop-blur-sm">
                    <p className="font-bold text-primary text-sm sm:text-lg">{value}</p>
                    <p className="text-xs sm:text-sm text-on-surface-variant dark:text-slate-300">{label}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="relative flex justify-center lg:justify-end animate-slide-in-right">
              <div className="absolute inset-0 bg-primary/5 rounded-full scale-110 -z-10"></div>
              <div className="relative w-56 h-56 sm:w-64 sm:h-64 md:w-96 md:h-96">
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-primary-fixed/30 dark:bg-primary/20 rounded-3xl -z-10 rotate-12"></div>
                <div className="absolute -bottom-4 -left-4 w-32 h-32 bg-secondary-fixed/50 dark:bg-secondary-fixed/20 rounded-full -z-10"></div>
                <div className="w-full h-full rounded-full border-[8px] border-white dark:border-slate-800 shadow-2xl overflow-hidden bg-surface">
                  <img alt="Grace Nakiyemba professional headshot" className="w-full h-full object-cover" src={profilePhoto} />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* About Me Section */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24" id="about">
          <div className="max-w-3xl space-y-8">
            <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] leading-tight tracking-tighter text-on-background dark:text-slate-100 font-bold">
              About Me
            </h2>
            <div className="space-y-6 text-body-lg text-on-surface-variant dark:text-slate-300 leading-relaxed">
              <p>My path into tech wasn't a straight line. It was built one skill at a time, through Groundbreaker, Refactory, and Turing College. Each step took me deeper, from the fundamentals of programming to building real, working software.</p>
              <p>Today I work with Python, Django, React JS, and AI to build systems that solve real problems, from hackathon projects to applications designed for practical use. I care less about the tech itself and more about who it reaches. As a woman in STEM based in Kampala, Uganda, I'm also committed to making sure the path that opened for me stays open for the next person coming up behind me.</p>
              <p>I contribute to open source software, including work on Open Data Ensemble (ODE), and am exploring opportunities to collaborate with other projects. I'm also expanding my knowledge of Ethereum, blockchain, Web3, IoT and embedded systems. I value clear documentation, thoughtful collaboration, and building technology people can actually use.</p>
              <p>Alongside engineering, I have facilitated technology learning sessions, coordinated collaborative activities, and supported community engagement. These experiences strengthen my professional writing, content planning, stakeholder communication, and ability to help teams share ideas clearly. I enjoy bringing technical understanding and thoughtful communication together.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="bg-primary-fixed/40 dark:bg-slate-800 border border-primary/10 dark:border-slate-700 p-6 rounded-2xl flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary mb-3 text-[32px]">emoji_events</span>
                <span className="font-body-md font-bold text-on-surface dark:text-slate-100">2× Hackathon Winner</span>
              </div>
              <div className="bg-primary-fixed/40 dark:bg-slate-800 border border-primary/10 dark:border-slate-700 p-6 rounded-2xl flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary mb-3 text-[32px]">school</span>
                <span className="font-body-md font-bold text-on-surface dark:text-slate-100">Continuous Technical Learning</span>
              </div>
              <div className="bg-primary-fixed/40 dark:bg-slate-800 border border-primary/10 dark:border-slate-700 p-6 rounded-2xl flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary mb-3 text-[32px]">deployed_code</span>
                <span className="font-body-md font-bold text-on-surface dark:text-slate-100">Real Client Systems Shipped</span>
              </div>
            </div>
          </div>
        </section>

        {/* Engineering journey inspired by editorial timeline layouts. */}
        <section className="max-w-[1200px] w-full mx-auto px-6 md:px-12 py-20" id="journey">
          <div className="space-y-4 mb-10">
            <p className="text-primary text-sm font-bold uppercase tracking-[0.2em]">My engineering journey</p>
            <h2 className="font-display text-[36px] sm:text-[48px] font-bold tracking-tight text-on-background dark:text-slate-100">Learning. Building. Contributing.</h2>
            <p className="max-w-2xl text-on-surface-variant dark:text-slate-300 text-body-lg">A growing practice shaped by hands on development, collaboration, and curiosity about what technology can make possible.</p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {[
              { step: '01', title: 'Foundations', detail: 'Programming fundamentals, problem solving, Git, and web development.', focus: 'Python · JavaScript · Git' },
              { step: '02', title: 'Building real systems', detail: 'Backend applications, APIs, client workflows, and accessible digital products.', focus: 'Django · React · SMS / USSD' },
              { step: '03', title: 'Open source collaboration', detail: 'Investigating issues, improving code, and learning through review. ODE is one example.', focus: 'GitHub · Tests · Pull requests' },
              { step: '04', title: 'Emerging technologies', detail: 'Exploring AI, Ethereum and Web3, IoT, and embedded systems as my skills expand.', focus: 'AI · Ethereum · IoT' },
            ].map((stage) => (
              <article key={stage.step} className="rounded-2xl border border-primary/15 dark:border-slate-700 bg-surface-container-lowest dark:bg-slate-800 p-6 flex flex-col gap-4 shadow-sm">
                <span className="text-primary font-mono text-sm font-bold">{stage.step}</span>
                <h3 className="text-lg font-bold text-on-surface dark:text-slate-100">{stage.title}</h3>
                <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed flex-grow">{stage.detail}</p>
                <p className="border-t border-primary/10 dark:border-slate-700 pt-4 text-sm text-primary font-medium">{stage.focus}</p>
              </article>
            ))}
          </div>
        </section>

        {/* Skills Section */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24" id="skills">
          <div className="space-y-12">
            <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] leading-tight tracking-tighter text-on-background dark:text-slate-100 font-bold">
              Skills
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-12">
              {skillGroups.map((group) => (
                <div className="space-y-6" key={group.title}>
                  <h3 className="font-headline-lg text-body-lg font-bold text-on-surface dark:text-slate-100 flex items-center gap-2">
                    <span className="w-8 h-[2px] bg-primary"></span>
                    {group.title}
                  </h3>
                  <div className="flex flex-wrap gap-2">
                    {group.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-4 py-1.5 bg-primary-fixed/50 dark:bg-slate-800 rounded-full text-body-md font-code-sm border border-primary/10 dark:border-slate-700 text-on-surface-variant dark:text-slate-300"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Selected projects, with filters and real screenshots where available. */}
        <section className="max-w-[1200px] w-full mx-auto px-6 md:px-12 py-24" id="projects">
          <Reveal>
            <div className="space-y-3 mb-8">
              <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary">Selected work</p>
              <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] font-bold text-on-background dark:text-slate-100">Projects that solve real problems</h2>
              <p className="max-w-2xl text-on-surface-variant dark:text-slate-300 text-lg">A selection of backend systems, accessible applications, and collaborative projects. Explore the code or try a live demo where available.</p>
            </div>
          </Reveal>
          <div className="flex flex-wrap gap-2 mb-9" role="group" aria-label="Filter projects">
            {filters.map((filter) => (
              <button
                key={filter}
                type="button"
                aria-pressed={projectFilter === filter}
                onClick={() => setProjectFilter(filter)}
                className={`rounded-full px-4 py-2 text-sm font-semibold border transition-colors focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-primary ${projectFilter === filter ? 'bg-primary text-white border-primary shadow-sm' : 'border-primary/20 bg-white/70 dark:bg-slate-800 text-on-surface dark:text-slate-200 hover:border-primary'}`}
              >{filter}</button>
            ))}
          </div>
          <p className="sr-only" role="status">Showing {visibleProjects.length} projects</p>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-7">
            {visibleProjects.map((project) => (
              <Reveal key={project.name} className="h-full">
                <article className="group h-full bg-surface-container-lowest dark:bg-slate-800 border border-primary/10 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col">
                  <div className="relative w-full aspect-[16/10] overflow-hidden bg-primary-fixed/30 dark:bg-slate-700">
                    {project.image ? (
                      <img src={project.image} alt={`${project.name} application screenshot`} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.04] motion-reduce:transform-none" loading="lazy" />
                    ) : (
                      <div className="h-full flex flex-col items-center justify-center text-center gap-2 px-5 bg-gradient-to-br from-violet-100 via-purple-50 to-indigo-100 dark:from-slate-700 dark:to-slate-900">
                        <span className="material-symbols-outlined text-primary text-4xl" aria-hidden="true">deployed_code</span>
                        <p className="font-bold text-on-surface dark:text-slate-100">{project.name}</p>
                        <p className="text-sm text-on-surface-variant dark:text-slate-300">{project.imageLabel}</p>
                      </div>
                    )}
                    {project.badgeLabel && <span className="absolute top-3 left-3 bg-white/95 dark:bg-slate-900/95 text-primary rounded-full px-3 py-1 text-xs font-bold shadow">{project.badgeLabel}</span>}
                  </div>
                  <div className="p-6 flex flex-col flex-1 gap-4">
                    <h3 className="font-bold text-lg text-on-surface dark:text-slate-100">{project.name}</h3>
                    <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed text-sm flex-1">{project.description}</p>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => <span key={tag} className="rounded-full bg-primary-fixed/45 dark:bg-slate-700 text-on-surface-variant dark:text-slate-200 px-3 py-1 text-xs">{tag}</span>)}
                    </div>
                    <div className="border-t border-primary/10 dark:border-slate-700 pt-4 flex flex-wrap items-center gap-x-5 gap-y-3 text-sm font-semibold">
                      {project.link && <a className="text-primary hover:underline focus-visible:underline" href={project.link} target="_blank" rel="noopener noreferrer">Live demo <span aria-hidden="true">↗</span></a>}
                      {project.githubLink && <a className="text-on-surface dark:text-slate-200 hover:text-primary hover:underline" href={project.githubLink} target="_blank" rel="noopener noreferrer">View code <span aria-hidden="true">↗</span></a>}
                    </div>
                  </div>
                </article>
              </Reveal>
            ))}
          </div>
        </section>

        {/* Open source contributions and emerging technology interests. */}
        <section className="max-w-[1200px] w-full mx-auto px-6 md:px-12 py-24" id="open-source">
          <Reveal>
            <p className="text-sm font-bold uppercase tracking-[0.18em] text-primary mb-3">Collaboration and curiosity</p>
            <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] font-bold text-on-background dark:text-slate-100 mb-4">Open Source & Emerging Tech</h2>
            <p className="max-w-2xl text-lg text-on-surface-variant dark:text-slate-300 mb-9">Learning in public, improving real code, and exploring new technologies with practical applications.</p>
          </Reveal>
          <div className="grid md:grid-cols-2 gap-6">
            <Reveal>
              <article className="h-full p-7 rounded-2xl border border-primary/15 bg-surface-container-lowest dark:bg-slate-800 dark:border-slate-700 space-y-4 shadow-sm">
                <span className="text-primary text-xs font-bold uppercase tracking-wider">Open source engineering</span>
                <h3 className="text-2xl font-bold text-on-surface dark:text-slate-100">Contributing beyond my own projects</h3>
                <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed">I work on issues, investigate bugs, write improvements, and participate in code review. Open Data Ensemble (ODE) is one example of my growing open source experience, not the limit of the communities I want to support.</p>
                <div className="grid sm:grid-cols-2 gap-3">
                  <div className="rounded-xl bg-primary-fixed/30 dark:bg-slate-700 p-4"><p className="font-semibold text-on-surface dark:text-white">Issue investigation</p><p className="text-sm text-on-surface-variant dark:text-slate-300 mt-1">Reproduce problems and understand existing code</p></div>
                  <div className="rounded-xl bg-primary-fixed/30 dark:bg-slate-700 p-4"><p className="font-semibold text-on-surface dark:text-white">Review friendly changes</p><p className="text-sm text-on-surface-variant dark:text-slate-300 mt-1">Focused fixes, tests, and clear pull requests</p></div>
                </div>
                <div className="flex flex-wrap gap-4 pt-2 text-sm font-semibold">
                  <a className="text-primary hover:underline" href="https://github.com/OpenDataEnsemble/ode/pulls?q=author%3AGrace256c" target="_blank" rel="noopener noreferrer">ODE pull requests ↗</a>
                  <a className="text-primary hover:underline" href="https://github.com/Grace256c" target="_blank" rel="noopener noreferrer">My GitHub profile ↗</a>
                </div>
              </article>
            </Reveal>
            <Reveal>
              <article className="h-full p-7 rounded-2xl border border-primary/15 bg-surface-container-lowest dark:bg-slate-800 dark:border-slate-700 space-y-4 shadow-sm">
                <span className="text-primary text-xs font-bold uppercase tracking-wider">Learning in progress</span>
                <h3 className="text-2xl font-bold text-on-surface dark:text-slate-100">Blockchain, Ethereum & Web3</h3>
                <p className="text-on-surface-variant dark:text-slate-300 leading-relaxed">I am exploring Ethereum, smart contracts, decentralized applications, and blockchain fundamentals alongside IoT and embedded systems. My focus is understanding how these technologies can solve meaningful problems.</p>
                <div className="flex flex-wrap gap-2 pt-2">
                  {['Ethereum fundamentals', 'Web3 concepts', 'Smart contract learning', 'IoT and embedded systems'].map((topic) => <span key={topic} className="rounded-full bg-primary-fixed/40 dark:bg-slate-700 px-3 py-2 text-sm text-on-surface-variant dark:text-slate-200">{topic}</span>)}
                </div>
                <p className="text-sm text-on-surface-variant dark:text-slate-300">Exploration and learning, with projects to come.</p>
              </article>
            </Reveal>
          </div>
        </section>

        {/* Achievements Section */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24" id="achievements">
          <div className="space-y-12">
            <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] leading-tight tracking-tighter text-on-background dark:text-slate-100 font-bold">
              Achievements
            </h2>
            <div className="space-y-6 max-w-4xl">
              <div className="flex gap-6 items-start p-6 bg-surface-container-low dark:bg-slate-800 border border-primary/10 dark:border-slate-700 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[28px]">trophy</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-on-surface dark:text-slate-100 text-body-lg">Hackathon Winner</h3>
                  <p className="text-on-surface-variant dark:text-slate-300 text-body-md">Two hackathon wins, including Africa’s Talking Women in Tech and Code Queen, building technology for real world challenges.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start p-6 bg-surface-container-low dark:bg-slate-800 border border-primary/10 dark:border-slate-700 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[28px]">workspace_premium</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-on-surface dark:text-slate-100 text-body-lg">Groundbreaker Talents Learning Journey</h3>
                  <p className="text-on-surface-variant dark:text-slate-300 text-body-md">Building practical engineering skills through collaborative projects and technical training.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start p-6 bg-surface-container-low dark:bg-slate-800 border border-primary/10 dark:border-slate-700 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[28px]">school</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-on-surface dark:text-slate-100 text-body-lg">Refactory Academy &amp; Turing College</h3>
                  <p className="text-on-surface-variant dark:text-slate-300 text-body-md">Advanced technical training in full stack development and AI.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24 scroll-mt-24" id="contact" aria-labelledby="contact-heading">
          <Reveal>
            <div className="mx-auto max-w-3xl text-center mb-12 md:mb-16 space-y-4">
              <p className="text-primary text-xs sm:text-sm font-bold uppercase tracking-[0.18em]">Let's connect</p>
              <h2 id="contact-heading" className="font-display text-[36px] sm:text-[48px] md:text-[56px] leading-tight tracking-tight text-on-background dark:text-slate-100 font-bold">
                Let's build something meaningful.
              </h2>
              <p className="text-body-lg text-on-surface-variant dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
                I'm open to software engineering opportunities, technical collaborations, and open source projects. Have an idea or an opportunity? I'd love to hear from you.
              </p>
            </div>
          </Reveal>
          <div className="grid grid-cols-1 lg:grid-cols-[0.9fr_1.1fr] gap-8 lg:gap-12 items-start">
            <Reveal>
              <div className="rounded-3xl border border-primary/15 dark:border-slate-700 bg-surface-container-low/60 dark:bg-slate-800/60 p-6 sm:p-8 space-y-7">
                <div className="space-y-2">
                  <h3 className="text-2xl font-bold text-on-surface dark:text-slate-100">Reach me directly</h3>
                  <p className="text-on-surface-variant dark:text-slate-300">Choose whichever channel works best for you.</p>
                </div>
                <div className="space-y-3">
                  <a href="mailto:gracenakiyemba256@gmail.com" className="flex items-center gap-4 rounded-2xl p-3 hover:bg-primary/5 dark:hover:bg-slate-700 transition-colors group">
                    <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0" aria-hidden="true"><span className="material-symbols-outlined">mail</span></span>
                    <span className="min-w-0"><span className="block text-xs uppercase tracking-wide text-on-surface-variant dark:text-slate-400">Email</span><span className="block text-sm sm:text-base font-semibold text-on-surface dark:text-slate-100 break-all group-hover:text-primary">gracenakiyemba256@gmail.com</span></span>
                  </a>
                  <a href="tel:+256756339110" className="flex items-center gap-4 rounded-2xl p-3 hover:bg-primary/5 dark:hover:bg-slate-700 transition-colors group">
                    <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0" aria-hidden="true"><span className="material-symbols-outlined">call</span></span>
                    <span><span className="block text-xs uppercase tracking-wide text-on-surface-variant dark:text-slate-400">Phone</span><span className="block font-semibold text-on-surface dark:text-slate-100 group-hover:text-primary">+256 756 339 110</span></span>
                  </a>
                  <a href="https://www.linkedin.com/in/grace-nakiyemba" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl p-3 hover:bg-primary/5 dark:hover:bg-slate-700 transition-colors group">
                    <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0" aria-hidden="true"><span className="material-symbols-outlined">work</span></span>
                    <span className="flex-1"><span className="block text-xs uppercase tracking-wide text-on-surface-variant dark:text-slate-400">Professional network</span><span className="block font-semibold text-on-surface dark:text-slate-100 group-hover:text-primary">LinkedIn</span></span><span aria-hidden="true" className="text-primary">↗</span>
                  </a>
                  <a href="https://github.com/Grace256c" target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl p-3 hover:bg-primary/5 dark:hover:bg-slate-700 transition-colors group">
                    <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0" aria-hidden="true"><span className="material-symbols-outlined">code</span></span>
                    <span className="flex-1"><span className="block text-xs uppercase tracking-wide text-on-surface-variant dark:text-slate-400">Explore my work</span><span className="block font-semibold text-on-surface dark:text-slate-100 group-hover:text-primary">GitHub</span></span><span aria-hidden="true" className="text-primary">↗</span>
                  </a>
                  <a href={xProfileUrl} target="_blank" rel="noopener noreferrer" className="flex items-center gap-4 rounded-2xl p-3 hover:bg-primary/5 dark:hover:bg-slate-700 transition-colors group">
                    <span className="w-11 h-11 rounded-xl bg-primary/10 flex items-center justify-center text-primary shrink-0 font-bold text-lg" aria-hidden="true">𝕏</span>
                    <span className="flex-1"><span className="block text-xs uppercase tracking-wide text-on-surface-variant dark:text-slate-400">Follow along</span><span className="block font-semibold text-on-surface dark:text-slate-100 group-hover:text-primary">@GospelGrace3</span></span><span aria-hidden="true" className="text-primary">↗</span>
                  </a>
                </div>
                <a href="/Grace_Nakiyemba_Resume.pdf" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 font-semibold text-primary hover:underline">View my resume <span aria-hidden="true">↗</span></a>
              </div>
            </Reveal>
            <Reveal>
              <div className="bg-surface-container-lowest dark:bg-slate-800 p-6 sm:p-8 rounded-3xl border border-outline-variant/40 dark:border-slate-700 shadow-sm">
                <div className="mb-7 space-y-2">
                  <h3 className="text-2xl font-bold text-on-surface dark:text-slate-100">Send a message</h3>
                  <p className="text-on-surface-variant dark:text-slate-300">Tell me a little about what you have in mind.</p>
                </div>
              <form name="portfolio-contact" method="POST" data-netlify="true" className="space-y-6" onSubmit={handleSubmit}>
                <input type="hidden" name="form-name" value="portfolio-contact" />
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface dark:text-slate-200 block" htmlFor="name">Name</label>
                  <input
                    className="w-full bg-background dark:bg-slate-900 border border-outline-variant/50 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-background dark:text-slate-100"
                    id="name"
                    name="name"
                    placeholder="Your name"
                    type="text"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface dark:text-slate-200 block" htmlFor="email">Email</label>
                  <input
                    className="w-full bg-background dark:bg-slate-900 border border-outline-variant/50 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-background dark:text-slate-100"
                    id="email"
                    name="email"
                    placeholder="Your email"
                    type="email"
                    required
                  />
                </div>
                <div className="space-y-2">
                  <label className="font-label-md text-on-surface dark:text-slate-200 block" htmlFor="message">Message</label>
                  <textarea
                    className="w-full bg-background dark:bg-slate-900 border border-outline-variant/50 dark:border-slate-700 rounded-xl px-4 py-3 focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-on-background dark:text-slate-100 min-h-[120px]"
                    id="message"
                    name="message"
                    placeholder="How can I help?"
                    required
                  ></textarea>
                </div>
                <button
                  className="w-full bg-primary text-on-primary font-bold py-4 rounded-xl hover:shadow-lg hover:scale-[1.01] transition-all active:scale-95 disabled:opacity-60 disabled:cursor-not-allowed"
                  type="submit"
                  disabled={formStatus === 'sending'}
                >
                  {formStatus === 'sending' ? 'Sending...' : 'Send Message'}
                </button>
                {formStatus === 'success' && (
                  <p className="text-green-600 dark:text-green-400 font-bold text-center">
                    Message sent! I'll get back to you soon.
                  </p>
                )}
                {formStatus === 'local' && (
                  <p role="status" className="text-amber-700 dark:text-amber-300 text-center">
                    Form delivery can only be tested after deploying to Netlify. You can email me directly in the meantime.
                  </p>
                )}
                {formStatus === 'error' && (
                  <p className="text-red-600 dark:text-red-400 font-bold text-center">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
              </div>
            </Reveal>
          </div>
        </section>
      </main>

  {/* Footer */ }
  <footer className="bg-surface/80 dark:bg-slate-900 backdrop-blur-md border-t border-outline-variant/30 dark:border-slate-700 relative z-10">
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-[80px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="space-y-6">
          <a href="#home" className="inline-flex items-center gap-3 text-on-surface dark:text-slate-100 font-bold"><img src={profilePhoto} alt="" className="w-10 h-10 rounded-full object-cover border-2 border-primary" />Grace Nakiyemba</a>
          <p className="font-code-sm text-code-sm text-on-surface-variant dark:text-slate-400 max-w-xs">
            © {currentYear} Grace Nakiyemba. Built with precision and an elegant touch.
          </p>
          <div className="flex gap-4">
            <a className="text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors font-label-md text-label-md hover:-translate-y-1 transition-transform" href="https://www.linkedin.com/in/grace-nakiyemba" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors font-label-md text-label-md hover:-translate-y-1 transition-transform" href="https://github.com/Grace256c" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors font-label-md text-label-md hover:-translate-y-1 transition-transform" href="mailto:gracenakiyemba256@gmail.com">Email</a>
            {xProfileUrl && <a className="text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors font-label-md text-label-md" href={xProfileUrl} target="_blank" rel="noopener noreferrer">X</a>}
          </div>
        </div>
        <div className="space-y-4">
          <div className="font-bold text-on-surface dark:text-slate-100 font-label-md uppercase tracking-wider">Location</div>
          <div className="flex items-center gap-2 text-on-surface-variant dark:text-slate-300">
            <span className="material-symbols-outlined text-primary text-[20px]">location_on</span>
            <span className="text-body-md">Kampala, Uganda</span>
          </div>
        </div>
        <div className="space-y-4">
          <div className="font-bold text-on-surface dark:text-slate-100 font-label-md uppercase tracking-wider">Affiliations</div>
          <ul className="space-y-2 text-on-surface-variant dark:text-slate-300 text-body-md">
            <li className="hover:text-primary transition-colors cursor-default">Groundbreaker Talents</li>
            <li className="hover:text-primary transition-colors cursor-default">Refactory Academy</li>
            <li className="hover:text-primary transition-colors cursor-default">Turing College</li>
          </ul>
        </div>
      </div>
    </div>
  </footer>
    </>
  );
}

export default App;
