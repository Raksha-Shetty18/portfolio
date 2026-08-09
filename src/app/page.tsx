import prisma from '@/lib/prisma';
import Navbar from '@/components/Navbar';
import BackgroundParticles from '@/components/BackgroundParticles';
import TypingAnimation from '@/components/TypingAnimation';
import SkillsSection from '@/components/SkillsSection';
import ProjectCard from '@/components/ProjectCard';
import ContactForm from '@/components/ContactForm';
import PortfolioCounters from '@/components/PortfolioCounters';
import BackToTop from '@/components/BackToTop';
import LoadingScreen from '@/components/LoadingScreen';
import ScrollRevealInit from '@/components/ScrollRevealInit';

import { Project, Skill, Certificate } from '@prisma/client';
import { Mail, MapPin, Github, Linkedin, Download, GraduationCap, Target, Cpu, Award } from 'lucide-react';

export const revalidate = 0; // Disable caching to fetch live updates from Admin panel

export default async function PortfolioHome() {
  // Fetch data with robust fallbacks
  let projects: Project[] = [];
  let skills: Skill[] = [];
  let certificates: Certificate[] = [];
  let contentMap: Record<string, string> = {
    name: 'Raksha',
    title: 'Full Stack Developer',
    tagline: 'Building elegant, high-performance web applications that bridge the gap between robust backends and premium user interfaces.',
    resumeUrl: '/uploads/Raksha_Resume.pdf',
    introduction: 'Hello! I am Raksha, a passionate Full Stack Developer with a keen eye for clean aesthetics and high-performance code. I specialize in the Javascript/Typescript ecosystem, constructing complete web systems from schema design to smooth pixel-perfect animations.',
    education: 'Bachelor of Engineering in Computer Science',
    careerObjective: 'Seeking a challenging Full Stack Developer position where I can utilize my engineering skills to build scalable, interactive web solutions and contribute to product-driven growth.',
    interests: 'System Architecture, UI/UX Design, Web Animation, Cloud Infrastructure',
  };

  try {
    const dbProjects = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });
    if (dbProjects.length > 0) {
      projects = dbProjects;
    }

    const dbSkills = await prisma.skill.findMany({
      orderBy: { category: 'asc' },
    });
    if (dbSkills.length > 0) {
      skills = dbSkills;
    }

    const dbCertificates = await prisma.certificate.findMany({
      orderBy: { createdAt: 'desc' },
    });
    if (dbCertificates.length > 0) {
      certificates = dbCertificates;
    }

    const dbContent = await prisma.portfolioContent.findMany();
    dbContent.forEach((item) => {
      contentMap[item.key] = item.value;
    });
  } catch (err) {
    console.error('Error loading data from database, using seeded fallback content:', err);
  }

  // Fallback projects if db query returned empty and didn't fall back to seed
  if (projects.length === 0) {
    projects = [
      {
        id: '1',
        title: 'Hotel Management System',
        description: 'A comprehensive full-stack solution for managing hotel operations, including room bookings, billing, guest check-in/out, and staff allocation. Features an interactive dashboard with real-time statistics.',
        technologies: 'React.js, Node.js, Express.js, MongoDB, Chart.js',
        githubUrl: 'https://github.com/Raksha-Shetty18',
        liveUrl: 'https://github.com/Raksha-Shetty18',
        imageUrl: '/hotel-management.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'WeatherNow',
        description: 'A dynamic weather forecasting application that provides real-time weather details, 7-day forecasts, air quality indices, and severe weather alerts. Features a sleek responsive design with auto-updating backgrounds.',
        technologies: 'HTML5, CSS3, JavaScript, OpenWeatherMap API, Geolocation API',
        githubUrl: 'https://github.com/Raksha-Shetty18',
        liveUrl: 'https://github.com/Raksha-Shetty18',
        imageUrl: '/weathernow.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '3',
        title: 'Daily Planner',
        description: 'An elegant task management app to organize daily schedules. Includes priority labels, categorization, calendar sync, recurring tasks, drag-and-drop ordering, and progress visualizers.',
        technologies: 'React.js, LocalStorage API, CSS Grid, HTML5 Drag and Drop',
        githubUrl: 'https://github.com/Raksha-Shetty18',
        liveUrl: 'https://github.com/Raksha-Shetty18',
        imageUrl: '/daily-planner.jpg',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  // Fallback skills if db query returned empty
  if (skills.length === 0) {
    skills = [
      { id: '1', name: 'HTML5 / CSS3', category: 'Frontend', iconName: 'Layout', proficiency: 95, createdAt: new Date(), updatedAt: new Date() },
      { id: '2', name: 'JavaScript (ES6+)', category: 'Frontend', iconName: 'Layout', proficiency: 90, createdAt: new Date(), updatedAt: new Date() },
      { id: '3', name: 'TypeScript', category: 'Frontend', iconName: 'Layout', proficiency: 85, createdAt: new Date(), updatedAt: new Date() },
      { id: '4', name: 'React.js / Next.js', category: 'Frontend', iconName: 'Layout', proficiency: 90, createdAt: new Date(), updatedAt: new Date() },
      { id: '5', name: 'Node.js', category: 'Backend', iconName: 'Server', proficiency: 88, createdAt: new Date(), updatedAt: new Date() },
      { id: '6', name: 'Express.js', category: 'Backend', iconName: 'Server', proficiency: 85, createdAt: new Date(), updatedAt: new Date() },
      { id: '7', name: 'REST APIs', category: 'Backend', iconName: 'Server', proficiency: 90, createdAt: new Date(), updatedAt: new Date() },
      { id: '8', name: 'PostgreSQL', category: 'Database', iconName: 'Database', proficiency: 80, createdAt: new Date(), updatedAt: new Date() },
      { id: '9', name: 'MongoDB', category: 'Database', iconName: 'Database', proficiency: 85, createdAt: new Date(), updatedAt: new Date() },
      { id: '10', name: 'Git / GitHub', category: 'Tools', iconName: 'Settings', proficiency: 90, createdAt: new Date(), updatedAt: new Date() },
    ];
  }

  // Fallback certificates if db query returned empty
  if (certificates.length === 0) {
    certificates = [
      {
        id: '1',
        title: 'Full Stack Web Development Certification',
        issuer: 'Udemy Academic Program',
        date: '2025',
        credentialUrl: 'https://github.com/Raksha-Shetty18',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      {
        id: '2',
        title: 'AWS Certified Cloud Practitioner',
        issuer: 'Amazon Web Services',
        date: '2026',
        credentialUrl: 'https://github.com/Raksha-Shetty18',
        createdAt: new Date(),
        updatedAt: new Date(),
      },
    ];
  }

  return (
    <>
      {/* Ambient background glows */}
      <div className="ambient-glow-1" />
      <div className="ambient-glow-2" />

      {/* Visual Components */}
      <LoadingScreen />
      <BackgroundParticles />
      <ScrollRevealInit />
      <Navbar />

      {/* Main Container */}
      <main style={{ minHeight: '100vh', position: 'relative', zIndex: 1, paddingBottom: '3rem' }}>
        
        {/* HERO SECTION */}
        <section
          id="home"
          style={{
            minHeight: '100vh',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '7rem 0 3rem',
            position: 'relative',
          }}
        >
          <div className="container" style={{ textAlign: 'center', maxWidth: '900px' }}>
            <span
              style={{
                fontSize: '1.15rem',
                fontWeight: 600,
                letterSpacing: '0.15em',
                color: 'var(--color-secondary)',
                textTransform: 'uppercase',
                display: 'inline-block',
                marginBottom: '1rem',
                animation: 'fadeInUp 0.6s ease-out forwards',
              }}
            >
              Welcome to my portfolio
            </span>
            <h1
              style={{
                fontSize: 'clamp(3rem, 7.5vw, 5.5rem)',
                fontWeight: 800,
                lineHeight: 1.1,
                marginBottom: '1.25rem',
                letterSpacing: '-0.02em',
                animation: 'fadeInUp 0.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              }}
            >
              Hi, I am <span className="text-gradient">{contentMap.name}</span>
            </h1>
            <h2
              style={{
                fontSize: 'clamp(1.75rem, 4vw, 2.75rem)',
                fontWeight: 600,
                color: 'var(--text-primary)',
                marginBottom: '1.75rem',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '0.5rem',
                animation: 'fadeInUp 1s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              }}
            >
              I am a <TypingAnimation words={[contentMap.title, 'Full Stack Engineer', 'Software Developer']} />
            </h2>
            <p
              style={{
                fontSize: 'clamp(1.15rem, 2.2vw, 1.35rem)',
                lineHeight: 1.65,
                color: 'var(--text-secondary)',
                marginBottom: '2.5rem',
                animation: 'fadeInUp 1.2s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              }}
            >
              {contentMap.tagline}
            </p>

            {/* Hero Buttons */}
            <div
              style={{
                display: 'flex',
                gap: '1rem',
                justifyContent: 'center',
                flexWrap: 'wrap',
                animation: 'fadeInUp 1.4s cubic-bezier(0.25, 1, 0.5, 1) forwards',
              }}
            >
              <a href="#projects" className="btn btn-primary">
                View Projects
              </a>
              <a href={contentMap.resumeUrl} target="_blank" rel="noopener noreferrer" className="btn btn-secondary">
                <Download size={16} />
                Download Resume
              </a>
              <a href="#contact" className="btn btn-secondary">
                Contact Me
              </a>
            </div>
          </div>

          {/* Mouse Scroll Indicator */}
          <div
            style={{
              position: 'absolute',
              bottom: '2.5rem',
              left: '50%',
              transform: 'translateX(-50%)',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            <div
              style={{
                width: '1.5rem',
                height: '2.5rem',
                border: '2px solid var(--text-muted)',
                borderRadius: '9999px',
                display: 'flex',
                justifyContent: 'center',
                paddingTop: '6px',
              }}
            >
              <div
                style={{
                  width: '4px',
                  height: '8px',
                  background: 'var(--color-secondary)',
                  borderRadius: '2px',
                  animation: 'scrollBlink 1.5s ease infinite',
                }}
              />
            </div>
          </div>
        </section>

        {/* SECTIONS WRAPPER */}
        <div className="sections-grid">
          
          {/* ABOUT ME SECTION */}
          <section id="about" style={{ scrollMarginTop: '100px' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="scroll-reveal">
                <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  About <span className="text-gradient">Me</span>
                </h2>
                <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '0 auto', borderRadius: '2px' }} />
              </div>

              {/* Bio card */}
              <div
                className="glass scroll-reveal"
                style={{
                  padding: '2.5rem',
                  borderRadius: 'var(--radius-lg)',
                  border: '1px solid var(--border-glass)',
                  marginBottom: '2.5rem',
                  lineHeight: '1.7',
                  fontSize: '1.05rem',
                  color: 'var(--text-secondary)',
                }}
              >
                <p>{contentMap.introduction}</p>
              </div>

              {/* Cards layout grid */}
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(3, 1fr)',
                  gap: '1.5rem',
                }}
                className="about-cards-grid"
              >
                <div className="glass-card scroll-reveal" style={{ padding: '2rem' }}>
                  <div style={{ color: 'var(--color-primary)', marginBottom: '1rem' }}>
                    <GraduationCap size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>Education</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {contentMap.education}
                  </p>
                </div>

                <div className="glass-card scroll-reveal" style={{ padding: '2rem' }}>
                  <div style={{ color: 'var(--color-secondary)', marginBottom: '1rem' }}>
                    <Target size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>Objective</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {contentMap.careerObjective}
                  </p>
                </div>

                <div className="glass-card scroll-reveal" style={{ padding: '2rem' }}>
                  <div style={{ color: 'var(--color-accent)', marginBottom: '1rem' }}>
                    <Cpu size={32} />
                  </div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.75rem' }}>Technical Interests</h3>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.95rem', lineHeight: '1.5' }}>
                    {contentMap.interests}
                  </p>
                </div>
              </div>


            </div>
          </section>

          {/* SKILLS SECTION */}
          <section id="skills" style={{ scrollMarginTop: '100px' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="scroll-reveal">
                <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  My <span className="text-gradient">Skills</span>
                </h2>
                <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '0 auto', borderRadius: '2px' }} />
              </div>

              <SkillsSection skills={skills} />
            </div>
          </section>

          {/* FEATURED PROJECTS SECTION */}
          <section id="projects" style={{ scrollMarginTop: '100px' }}>
            <div className="container">
              <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="scroll-reveal">
                <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Featured <span className="text-gradient">Projects</span>
                </h2>
                <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '0 auto', borderRadius: '2px' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }} className="projects-grid">
                {projects.map((project) => (
                  <ProjectCard key={project.id} project={project} />
                ))}
              </div>
            </div>
          </section>

          {/* CERTIFICATES SECTION */}
          <section id="certificates" style={{ scrollMarginTop: '100px' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="scroll-reveal">
                <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Licenses & <span className="text-gradient">Certifications</span>
                </h2>
                <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '0 auto', borderRadius: '2px' }} />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
                  gap: '1.5rem',
                }}
                className="certificates-grid"
              >
                {certificates.map((cert) => (
                  <div
                    key={cert.id}
                    className="glass-card scroll-reveal"
                    style={{
                      padding: '2rem',
                      borderRadius: 'var(--radius-lg)',
                      border: '1px solid var(--border-glass)',
                      display: 'flex',
                      flexDirection: 'column',
                      justifyContent: 'space-between',
                      gap: '1.5rem',
                      transition: 'all 0.3s ease',
                      position: 'relative',
                      overflow: 'hidden',
                    }}
                  >
                    {/* Abstract glowing bubble behind the card */}
                    <div
                      className="glow-bubble"
                      style={{
                        position: 'absolute',
                        top: '-30px',
                        right: '-30px',
                        width: '90px',
                        height: '90px',
                        borderRadius: '50%',
                        background: 'radial-gradient(circle, rgba(167, 139, 250, 0.1) 0%, transparent 70%)',
                        zIndex: 0,
                      }}
                    />

                    <div style={{ position: 'relative', zIndex: 1 }}>
                      <div
                        style={{
                          width: '3.2rem',
                          height: '3.2rem',
                          borderRadius: '12px',
                          background: 'rgba(167, 139, 250, 0.1)',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: '1px solid rgba(167, 139, 250, 0.15)',
                          color: '#a78bfa',
                          marginBottom: '1.25rem',
                        }}
                      >
                        <Award size={26} />
                      </div>

                      <h3 style={{ fontSize: '1.2rem', fontWeight: 600, marginBottom: '0.5rem', color: '#fff', lineHeight: '1.3' }}>
                        {cert.title}
                      </h3>
                      <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', fontWeight: 500 }}>
                        {cert.issuer}
                      </p>
                    </div>

                    <div
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        borderTop: '1px solid rgba(255, 255, 255, 0.05)',
                        paddingTop: '1rem',
                        marginTop: '0.5rem',
                        position: 'relative',
                        zIndex: 1,
                      }}
                    >
                      <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>
                        Issued: {cert.date}
                      </span>
                      {cert.credentialUrl && (
                        <a
                          href={cert.credentialUrl}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="link-hover"
                          style={{
                            fontSize: '0.8rem',
                            color: 'var(--color-secondary)',
                            fontWeight: 600,
                            textDecoration: 'none',
                          }}
                        >
                          Verify Credential ↗
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* CONTACT SECTION */}
          <section id="contact" style={{ scrollMarginTop: '100px' }}>
            <div className="container" style={{ maxWidth: '1000px' }}>
              <div style={{ textAlign: 'center', marginBottom: '4rem' }} className="scroll-reveal">
                <h2 style={{ fontSize: '2.25rem', fontWeight: 700, marginBottom: '0.75rem' }}>
                  Get in <span className="text-gradient">Touch</span>
                </h2>
                <div style={{ width: '60px', height: '4px', background: 'var(--accent-gradient)', margin: '0 auto', borderRadius: '2px' }} />
              </div>

              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 3fr',
                  gap: '2.5rem',
                }}
                className="contact-layout-grid"
              >
                {/* Contact Info */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }} className="scroll-reveal">
                  <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(6, 182, 212, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(6, 182, 212, 0.15)', color: 'var(--color-secondary)', padding: '0.75rem' }}>
                      <Mail size={24} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Email</h4>
                      <a href="mailto:shettyraksha2006@gmail.com" style={{ fontSize: '1.05rem', fontWeight: 500 }}>
                        shettyraksha2006@gmail.com
                      </a>
                    </div>
                  </div>

                  <div className="glass-card" style={{ padding: '2rem', display: 'flex', alignItems: 'center', gap: '1.25rem' }}>
                    <div style={{ width: '3rem', height: '3rem', borderRadius: '50%', background: 'rgba(139, 92, 246, 0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(139, 92, 246, 0.15)', color: 'var(--color-primary)', padding: '0.75rem' }}>
                      <MapPin size={24} />
                    </div>
                    <div>
                      <h4 style={{ fontSize: '0.85rem', fontWeight: 500, color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '0.05em' }}>Location</h4>
                      <span style={{ fontSize: '1.05rem', fontWeight: 500 }}>Karnataka, India</span>
                    </div>
                  </div>

                  <div className="glass-card" style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1rem', justifyContent: 'center' }}>
                    <h4 style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--text-primary)', textAlign: 'center' }}>Social Connect</h4>
                    <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
                      <a
                        href="https://github.com/Raksha-Shetty18"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', padding: 0 }}
                      >
                        <Github size={20} />
                      </a>
                      <a
                        href="https://www.linkedin.com/in/raksha-shetty-921750328"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-secondary"
                        style={{ width: '2.75rem', height: '2.75rem', borderRadius: '50%', padding: 0 }}
                      >
                        <Linkedin size={20} />
                      </a>
                    </div>
                  </div>
                </div>

                {/* Form */}
                <div className="scroll-reveal">
                  <ContactForm />
                </div>
              </div>
            </div>
          </section>

        </div>
      </main>

      {/* FOOTER */}
      <footer
        style={{
          borderTop: '1px solid var(--border-glass)',
          background: 'rgba(8, 11, 17, 0.9)',
          padding: '2.5rem 0',
          position: 'relative',
          zIndex: 1,
          textAlign: 'center',
        }}
      >
        <div className="container">
          <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.75rem' }}>
            © {new Date().getFullYear()} Raksha. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-muted)', fontSize: '0.85rem' }}>
            Designed & Built with Next.js, Prisma, and Vanilla CSS
          </p>
        </div>
      </footer>

      {/* Back to Top */}
      <BackToTop />

    </>
  );
}
