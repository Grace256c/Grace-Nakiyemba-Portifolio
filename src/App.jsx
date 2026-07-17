import { useEffect, useState } from 'react';
import profilePhoto from './assets/Grace.jpeg';

const phrases = ["Software Engineer", "AI Builder", "Women in STEM Advocate"];

function App() {
  const [text, setText] = useState('');
  const [phraseIndex, setPhraseIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
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

  // Explicit dark mode toggle — avoids stale-class edge cases
  useEffect(() => {
    const root = document.documentElement;
    if (darkMode) {
      root.classList.add('dark');
    } else {
      root.classList.remove('dark');
    }
  }, [darkMode]);

  // Contact form wired to Formspree.
  // 1. Go to https://formspree.io, sign up free, create a new form.
  // 2. Copy your form endpoint (looks like https://formspree.io/f/xxxxxxxx)
  // 3. Paste it in place of YOUR_FORM_ID below.
  const handleSubmit = async (e) => {
    e.preventDefault();
    setFormStatus('sending');
    const form = e.target;
    const data = new FormData(form);

    try {
      const response = await fetch('https://formspree.io/f/mqerpbjw', {
        method: 'POST',
        body: data,
        headers: { Accept: 'application/json' },
      });

      if (response.ok) {
        setFormStatus('success');
        form.reset();
      } else {
        setFormStatus('error');
      }
    } catch (error) {
      setFormStatus('error');
    }
  };

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#skills', label: 'Skills' },
    { href: '#projects', label: 'Projects' },
    { href: '#achievements', label: 'Achievements' },
    { href: '#contact', label: 'Contact' },
  ];

  const skillGroups = [
    {
      title: 'Languages & Frameworks',
      skills: ['Python', 'JavaScript', 'HTML', 'CSS', 'React JS', 'Django', 'FastAPI', 'WordPress'],
    },
    {
      title: 'AI & Data',
      skills: ['AI & Machine Learning', 'Data Analytics', 'REST APIs'],
    },
    {
      title: 'Infrastructure & Security',
      skills: ['Cloud Computing', 'Cybersecurity'],
    },
    {
      title: 'Tools',
      skills: ['Git', 'GitHub', 'Node.js'],
    },
    {
      title: 'Administrative Skills',
      skills: [
        'Virtual Assistance',
        'Microsoft Office Suite',
        'Writing & Editing',
        'Social Media Management',
        'Data Entry',
        'Email & Calendar Management',
        'Customer Support',
      ],
    },
  ];

  const projects = [
    {
      name: 'Amani Care',
      badge: '🏆',
      badgeLabel: '1st Place Winner',
      description:
        "An AI-powered women's health companion delivering trusted guidance through USSD and SMS — built for women without internet access, covering menstruation, pregnancy, postpartum care, and menopause using Africa's Talking APIs.",
      tags: ['AI', 'USSD/SMS', "Women's Health"],
      link: 'https://amanicare-every-woman.lovable.app',
      linkLabel: 'View Project',
      screenshotNote: 'Add Amani Care screenshot here',
    },
    {
      name: 'Nyondo Hardware Management System',
      description:
        'A web-based management system for NYONDO General Hardware LTD, built with Django and SQLite — digitizing stock management, sales, supplier credit tracking, a salary-earner deposit scheme, and user/role management.',
      tags: ['Django', 'SQLite', 'Python'],
      link: 'https://nyondo-hardware-management-system.onrender.com/',
      linkLabel: 'View Project',
      githubLink: 'https://github.com/Grace256c/nyondo-hardware-management-system',
      screenshotNote: 'Add Nyondo Hardware screenshot here',
    },
    {
      name: 'Farm2Plate Connect',
      description:
        "A mobile and SMS-based food security platform connecting every actor in Uganda's food system — farmers, households, schools, NGOs, transporters, and donors. Works on any phone, with no smartphone or internet required.",
      tags: ['SMS Platform', 'Mobile', 'Food Security'],
      link: 'https://farmplate.netlify.app/',
      linkLabel: 'View Project',
      screenshotNote: 'Add Farm2Plate screenshot here',
    },
    {
      name: 'Videx',
      description:
        'A video streaming platform where users can upload, manage, and play their own videos — with quality selection (360p, 720p, 1080p), custom thumbnails, and a validated upload form.',
      tags: ['Django', 'Tailwind CSS', 'Video Streaming'],
      githubLink: 'https://github.com/Grace256c/CSE-26-03-ST-ASSESSMENT',
      linkLabel: 'GitHub Repository',
      screenshotNote: 'Add Videx screenshot here',
    },
    {
      name: 'GraceTech Solutions',
      description:
        'My own company site and personal brand — a home for the projects, services, and mission behind GraceTech: building purposeful technology and opening doors in tech for girls and communities left out of the conversation.',
      tags: ['Personal Brand', 'Full-Stack'],
      link: 'https://gracetechsolutions.netlify.app/',
      linkLabel: 'View Project',
      screenshotNote: 'Add GraceTech Solutions screenshot here',
    },
  ];

  return (
    <>
      {/* Animated Dot Grid Background */}
      <div className="fixed inset-0 z-[-1] pointer-events-none overflow-hidden">
        <div className="absolute inset-[-100px] dot-grid animate-drift"></div>
      </div>

      {/* Top Navigation Bar */}
      <nav className="fixed top-0 w-full z-50 bg-surface/70 dark:bg-slate-900/80 backdrop-blur-xl shadow-sm">
        <div className="flex justify-between items-center max-w-[1200px] mx-auto px-6 md:px-12 py-4">
          <div className="font-headline-lg text-headline-lg font-bold tracking-tight text-on-surface dark:text-slate-100">
            Grace Nakiyemba
          </div>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                className="text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors duration-200 font-body-md text-body-md cursor-pointer transition-all active:scale-95"
                href={link.href}
              >
                {link.label}
              </a>
            ))}
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
              className="md:hidden text-on-surface dark:text-slate-100"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
            >
              <span className="material-symbols-outlined">{menuOpen ? 'close' : 'menu'}</span>
            </button>
          </div>
        </div>

        {menuOpen && (
          <div className="md:hidden absolute top-full left-0 w-full bg-surface dark:bg-slate-900 flex flex-col gap-4 p-6 shadow-lg">
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
        <section className="flex-grow flex items-center max-w-[1200px] mx-auto px-6 md:px-12 py-12" id="home">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className="space-y-8 animate-slide-in-left">
              <div className="space-y-4">
                <h1 className="font-display text-[36px] sm:text-[48px] md:text-display leading-tight tracking-tighter text-on-background dark:text-slate-100">
                  Hi, I am <br />
                  <span className="text-primary">Grace Nakiyemba</span>
                </h1>
                <div className="h-12 flex items-center">
                  <span className="font-code-sm text-body-lg text-primary whitespace-nowrap border-r-2 border-primary animate-blink pr-1">
                    {text}
                  </span>
                </div>
              </div>
              <p className="text-body-lg text-on-surface-variant dark:text-slate-300 max-w-lg leading-relaxed">
                I build technology that reaches the people who need it most. From hackathon winning AI solutions to real client systems — I combine Python, Django, React JS and AI to solve problems that matter. Based in Kampala, Uganda.
              </p>
              <div className="flex flex-wrap gap-4 pt-4">
                <a className="bg-primary text-on-primary px-8 py-4 rounded-xl font-body-md text-body-md font-bold transition-all hover:scale-[1.02] active:scale-95 shadow-lg flex items-center gap-2" href="#projects">
                  View Projects
                </a>
                <a className="border-2 border-primary text-primary hover:bg-primary/5 px-8 py-4 rounded-xl font-body-md text-body-md font-bold transition-all active:scale-95" href="#contact">
                  Contact Me
                </a>
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
              <p>My path into tech wasn't a straight line — it was built one skill at a time, through Groundbreaker, Refactory, and Turing College. Each step took me deeper, from the fundamentals of programming to building real, working software.</p>
              <p>Today I work with Python, Django, React JS, and AI to build systems that solve real problems — from hackathon-winning AI solutions to production systems for real clients. I care less about the tech itself and more about who it reaches. As a woman in STEM based in Kampala, Uganda, I'm also committed to making sure the path that opened for me stays open for the next person coming up behind me.</p>
              <p>Alongside development, I also bring strong administrative and virtual support skills — from writing and social media management to data entry and productivity tools — making me equally reliable for technical and operational work.</p>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8">
              <div className="bg-primary-fixed/40 dark:bg-slate-800 border border-primary/10 dark:border-slate-700 p-6 rounded-2xl flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary mb-3 text-[32px]">emoji_events</span>
                <span className="font-body-md font-bold text-on-surface dark:text-slate-100">Hackathon Winner</span>
              </div>
              <div className="bg-primary-fixed/40 dark:bg-slate-800 border border-primary/10 dark:border-slate-700 p-6 rounded-2xl flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary mb-3 text-[32px]">school</span>
                <span className="font-body-md font-bold text-on-surface dark:text-slate-100">3 Training Programs Completed</span>
              </div>
              <div className="bg-primary-fixed/40 dark:bg-slate-800 border border-primary/10 dark:border-slate-700 p-6 rounded-2xl flex flex-col items-center text-center">
                <span className="material-symbols-outlined text-primary mb-3 text-[32px]">deployed_code</span>
                <span className="font-body-md font-bold text-on-surface dark:text-slate-100">Real Client Systems Shipped</span>
              </div>
            </div>
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

        {/* Projects Section */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24" id="projects">
          <div className="space-y-12">
            <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] leading-tight tracking-tighter text-on-background dark:text-slate-100 font-bold">
              Projects
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {projects.map((project) => (
                <div
                  key={project.name}
                  className="bg-surface-container-lowest dark:bg-slate-800 border border-outline-variant/30 dark:border-slate-700 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow flex flex-col"
                >
                  {/*
                    TO ADD A REAL SCREENSHOT:
                    1. Drop the image file into src/assets/ (e.g. src/assets/amanicare.png)
                    2. Add an import at the top of this file:
                       import amaniCareImg from './assets/amanicare.png';
                    3. Replace the placeholder div below with:
                       <img src={amaniCareImg} alt={project.name} className="w-full h-full object-cover" />
                  */}
                  <div className="aspect-video w-full overflow-hidden bg-primary-fixed/20 dark:bg-slate-700 flex items-center justify-center text-on-surface-variant dark:text-slate-400 text-sm text-center px-4">
                    📸 {project.screenshotNote}
                  </div>
                  <div className="p-6 flex flex-col flex-grow space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <h3 className="text-on-surface dark:text-slate-100 font-bold text-body-lg">{project.name}</h3>
                        {project.badge && <span className="text-amber-500 text-[18px]">{project.badge}</span>}
                      </div>
                      <p className="text-on-surface-variant dark:text-slate-300 text-body-md leading-relaxed">
                        {project.description}
                      </p>
                      {project.badgeLabel && (
                        <p className="text-primary font-bold text-[14px]">{project.badgeLabel}</p>
                      )}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {project.tags.map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 bg-primary-fixed/30 dark:bg-slate-700 rounded-full text-[12px] font-code-sm text-on-surface-variant dark:text-slate-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="pt-2 mt-auto flex flex-col gap-2">
                      {project.link && (
                        <a
                          className="text-primary font-bold text-body-md flex items-center gap-2 hover:underline"
                          href={project.link}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {project.linkLabel} <span className="material-symbols-outlined text-[18px]">arrow_forward</span>
                        </a>
                      )}
                      {project.githubLink && (
                        <a
                          className="text-on-surface-variant dark:text-slate-400 text-[14px] flex items-center gap-2 hover:text-primary transition-colors"
                          href={project.githubLink}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <span className="material-symbols-outlined text-[18px]">code</span> GitHub Repository
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
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
                  <p className="text-on-surface-variant dark:text-slate-300 text-body-md">Recognised for building an AI solution that solved a real-world problem.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start p-6 bg-surface-container-low dark:bg-slate-800 border border-primary/10 dark:border-slate-700 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[28px]">workspace_premium</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-on-surface dark:text-slate-100 text-body-lg">Groundbreaker Talents Graduate</h3>
                  <p className="text-on-surface-variant dark:text-slate-300 text-body-md">Completed training in software fundamentals.</p>
                </div>
              </div>
              <div className="flex gap-6 items-start p-6 bg-surface-container-low dark:bg-slate-800 border border-primary/10 dark:border-slate-700 rounded-2xl">
                <div className="w-12 h-12 rounded-xl bg-primary-fixed dark:bg-slate-700 flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined text-primary text-[28px]">school</span>
                </div>
                <div className="space-y-1">
                  <h3 className="font-bold text-on-surface dark:text-slate-100 text-body-lg">Refactory Academy &amp; Turing College</h3>
                  <p className="text-on-surface-variant dark:text-slate-300 text-body-md">Advanced technical training in full-stack development and AI.</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section className="max-w-[1200px] mx-auto px-6 md:px-12 py-24" id="contact">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            <div className="space-y-8">
              <div className="space-y-4">
                <h2 className="font-display text-[36px] sm:text-[48px] md:text-[56px] leading-tight tracking-tighter text-on-background dark:text-slate-100 font-bold">
                  Get In Touch
                </h2>
                <p className="text-body-lg text-on-surface-variant dark:text-slate-300 max-w-md">
                  Have a project in mind or just want to connect? I'd love to hear from you.
                </p>
              </div>
              <div className="space-y-6 pt-4">
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed/30 dark:bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <span className="material-symbols-outlined text-[20px]">mail</span>
                  </div>
                  <a className="text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors font-body-md" href="mailto:gracenakiyemba256@gmail.com">gracenakiyemba256@gmail.com</a>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed/30 dark:bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <span className="material-symbols-outlined text-[20px]">link</span>
                  </div>
                  <a className="text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors font-body-md" href="https://www.linkedin.com/in/grace-nakiyemba" target="_blank" rel="noopener noreferrer">LinkedIn</a>
                </div>
                <div className="flex items-center gap-4 group">
                  <div className="w-10 h-10 rounded-full bg-primary-fixed/30 dark:bg-slate-800 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-all">
                    <span className="material-symbols-outlined text-[20px]">code</span>
                  </div>
                  <a className="text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors font-body-md" href="https://github.com/Grace256c" target="_blank" rel="noopener noreferrer">GitHub</a>
                </div>
              </div>
            </div>

            <div className="bg-surface-container-lowest dark:bg-slate-800 p-8 rounded-3xl border border-outline-variant/30 dark:border-slate-700 shadow-xl">
              <form className="space-y-6" onSubmit={handleSubmit}>
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
                {formStatus === 'error' && (
                  <p className="text-red-600 dark:text-red-400 font-bold text-center">
                    Something went wrong. Please try again or email me directly.
                  </p>
                )}
              </form>
            </div>
          </div>
        </section>
      </main>

  {/* Footer */ }
  <footer className="bg-surface/80 dark:bg-slate-900 backdrop-blur-md border-t border-outline-variant/30 dark:border-slate-700 relative z-10">
    <div className="max-w-[1200px] mx-auto px-6 md:px-12 py-[80px]">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-12 items-start">
        <div className="space-y-6">
          <div className="font-headline-lg text-headline-lg font-bold text-primary">GN</div>
          <p className="font-code-sm text-code-sm text-on-surface-variant dark:text-slate-400 max-w-xs">
            © {currentYear} Grace Nakiyemba. Built with precision and an elegant touch.
          </p>
          <div className="flex gap-4">
            <a className="text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors font-label-md text-label-md hover:-translate-y-1 transition-transform" href="https://www.linkedin.com/in/grace-nakiyemba" target="_blank" rel="noopener noreferrer">LinkedIn</a>
            <a className="text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors font-label-md text-label-md hover:-translate-y-1 transition-transform" href="https://github.com/Grace256c" target="_blank" rel="noopener noreferrer">GitHub</a>
            <a className="text-on-surface-variant dark:text-slate-300 hover:text-primary transition-colors font-label-md text-label-md hover:-translate-y-1 transition-transform" href="mailto:gracenakiyemba256@gmail.com">Email</a>
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