/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect, useRef } from 'react';
import portfolioData from './data/portfolio.json';

const steps = [
  { title: 'Discover', text: 'Clarify the project type, audience, placement, constraints, timeline, and what proof can be shown publicly.' },
  { title: 'Design', text: 'Translate the need into a visual direction, scope, content requirements, and practical collaboration plan.' },
  { title: 'Produce', text: 'Create the work, document process, protect quality thresholds, and keep communication clear.' },
  { title: 'Publish', text: 'Deliver the finished piece or project presence, then add approved proof, images, captions, and links.' }
];

const getAssetPath = (path: string) => {
  return `${import.meta.env.BASE_URL}${path.replace(/^\/+/, '')}`;
};

export default function App() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [isBioModalOpen, setIsBioModalOpen] = useState(false);
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');
  const [isFiltering, setIsFiltering] = useState(false);
  const [lightboxImage, setLightboxImage] = useState<string | null>(null);
  const [activeSection, setActiveSection] = useState('home');
  const [scrollProgress, setScrollProgress] = useState(0);

  const menuButtonRef = useRef<HTMLButtonElement>(null);
  const navLinksRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isNavOpen && navLinksRef.current) {
      const firstLink = navLinksRef.current.querySelector('a');
      if (firstLink && window.innerWidth <= 768) {
        firstLink.focus();
      }
    }
  }, [isNavOpen]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 28);
      
      const totalScroll = document.documentElement.scrollTop;
      const windowHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      if (windowHeight > 0) {
        setScrollProgress((totalScroll / windowHeight) * 100);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll('section[id]');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    }, { rootMargin: '-20% 0px -80% 0px' });

    sections.forEach(section => observer.observe(section));
    return () => sections.forEach(section => observer.unobserve(section));
  }, []);

  useEffect(() => {
    document.body.style.overflow = isBioModalOpen || lightboxImage ? 'hidden' : '';
  }, [isBioModalOpen, lightboxImage]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        if (isNavOpen) {
          setIsNavOpen(false);
          menuButtonRef.current?.focus();
        }
        setIsBioModalOpen(false);
        setLightboxImage(null);
      }
      
      if (e.key === 'Tab' && isNavOpen && window.innerWidth <= 768) {
        if (navLinksRef.current && menuButtonRef.current) {
          const focusableElements = navLinksRef.current.querySelectorAll('a');
          if (focusableElements.length > 0) {
            const firstElement = focusableElements[0] as HTMLElement;
            const lastElement = focusableElements[focusableElements.length - 1] as HTMLElement;
            const menuButton = menuButtonRef.current;

            if (e.shiftKey) {
              if (document.activeElement === menuButton) {
                lastElement.focus();
                e.preventDefault();
              } else if (document.activeElement === firstElement) {
                menuButton.focus();
                e.preventDefault();
              }
            } else {
              if (document.activeElement === lastElement) {
                menuButton.focus();
                e.preventDefault();
              } else if (document.activeElement === menuButton) {
                firstElement.focus();
                e.preventDefault();
              }
            }
          }
        }
      }
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isNavOpen]);

  const handleNavClick = () => {
    setIsNavOpen(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    if (form.checkValidity()) {
      setIsFormSubmitted(true);
    }
  };

  const handleCategoryChange = (cat: string) => {
    if (cat === activeCategory || isFiltering) return;
    setIsFiltering(true);
    setTimeout(() => {
      setActiveCategory(cat);
      setIsFiltering(false);
    }, 450);
  };

  const categories = ['All', 'Spray + Acrylic', 'Mixed Media', 'Collage', 'Acrylic', 'Commission'];

  const works = portfolioData;

  const filteredWorks = activeCategory === 'All' ? works : works.filter(w => w.cat === activeCategory.toUpperCase());

  // --- SCROLL ANIMATION ---
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
      observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  const heroBgStyle = {
    background: `linear-gradient(90deg, rgba(11,15,20,.96), rgba(11,15,20,.72) 46%, rgba(11,15,20,.36)), linear-gradient(180deg, rgba(11,15,20,.1), rgba(11,15,20,.96)), url("${getAssetPath('/assets/hero/assets_hero_hero-v1.png')}") center / cover no-repeat`
  };

  const mediaBgStyle = {
    background: `linear-gradient(90deg, rgba(17,28,46,.96), rgba(17,28,46,.72) 46%, rgba(11,15,20,.6)), linear-gradient(180deg, rgba(11,15,20,.2), rgba(11,15,20,.96)), url("${getAssetPath('/assets/hero/assets_hero_hero-v3.png')}") center 30% / cover no-repeat`
  };

  return (
    <>
      <div className="scroll-progress-container" aria-hidden="true">
        <div className="scroll-progress-bar" style={{ width: `${scrollProgress}%` }}></div>
      </div>
      <header className={`site-header ${isScrolled ? 'scrolled' : ''}`} id="siteHeader">
        <div className="container nav-row">
          <a className="brand" href="#home" aria-label="Señor 808 home">
            <img src={getAssetPath("/assets/logos/Senor808_Wordmark_Primary_White.svg")} alt="Señor 808 wordmark" referrerPolicy="no-referrer" />
          </a>
          <nav aria-label="Primary navigation">
            <button 
              ref={menuButtonRef}
              className="btn small mobile-toggle" 
              type="button" 
              aria-label="Toggle navigation menu"
              aria-expanded={isNavOpen} 
              aria-controls="navLinks"
              onClick={() => setIsNavOpen(!isNavOpen)}
            >
              Menu
            </button>
            <div ref={navLinksRef} className={`nav-links ${isNavOpen ? 'open' : ''}`} id="navLinks">
              <a href="#home" aria-label="Navigate to Home section" className={activeSection === 'home' ? 'active' : ''} onClick={handleNavClick}>Home</a>
              <a href="#work" aria-label="Navigate to Work section" className={activeSection === 'work' ? 'active' : ''} onClick={handleNavClick}>Work</a>
              <a href="#media" aria-label="Navigate to Media section" className={activeSection === 'media' ? 'active' : ''} onClick={handleNavClick}>Media</a>
              <a href="#about" aria-label="Navigate to About section" className={activeSection === 'about' ? 'active' : ''} onClick={handleNavClick}>About</a>
            </div>
          </nav>
        </div>
      </header>

      <main>
        <section className="hero reveal-on-scroll" id="home" aria-labelledby="hero-title" style={heroBgStyle}>
          <div className="container hero-grid">
            <div className="hero-copy">
              <h1 id="hero-title">Visual Art And Audio Storytelling</h1>
              <p className="lead">San Antonio-based visual artist building high-contrast work in spray paint and acrylic layering, with a podcast lane in active development.</p>
              <div className="hero-actions">
                <a className="btn outline-primary" href="#start-project">Start A Project</a>
                <a className="btn" href="#work">View Portfolio</a>
              </div>
            </div>
          </div>
        </section>

        <section className="proof-strip reveal-on-scroll" aria-label="Quick proof points">
          <div className="container proof-grid">
            <div className="proof-item"><span>Location</span><strong>San Antonio, TX</strong></div>
            <div className="proof-item"><span>Primary Lane</span><strong>Visual Art</strong></div>
            <div className="proof-item"><span>Collaboration</span><strong>Commissions + Live Painting</strong></div>
            <div className="proof-item"><span>Standard</span><strong>Proof-Honest</strong></div>
          </div>
        </section>

        <section className="section reveal-on-scroll" id="work" aria-labelledby="work-title">
          <div className="container">
            <div className="section-head split-head">
              <div>
                <span className="eyebrow">Selected Work</span>
                <h2 id="work-title">High-contrast pieces built around motion, rhythm, and depth.</h2>
              </div>
              <p className="lead">A publish-now portfolio grid using the recovered visual assets. Dates, sale status, partners, and commission details remain proof-gated until confirmed.</p>
            </div>

            <div className="filter-list" role="tablist" aria-label="Work Categories">
              {categories.map(cat => (
                <button
                  key={cat}
                  role="tab"
                  aria-selected={activeCategory === cat}
                  className={`filter-btn ${activeCategory === cat ? 'active' : ''}`}
                  onClick={() => handleCategoryChange(cat)}
                >
                  {cat}
                </button>
              ))}
            </div>

            <div className="work-grid">
              {isFiltering ? (
                <>
                  <div className="work-card wide skeleton-card">
                    <div className="skeleton-image" />
                    <div className="work-meta skeleton-meta">
                      <div className="skeleton-title" />
                      <div className="skeleton-subtitle" />
                    </div>
                  </div>
                  <div className="work-card skeleton-card">
                    <div className="skeleton-image" />
                    <div className="work-meta skeleton-meta">
                      <div className="skeleton-title" />
                      <div className="skeleton-subtitle" />
                    </div>
                  </div>
                  <div className="work-card skeleton-card">
                    <div className="skeleton-image" />
                    <div className="work-meta skeleton-meta">
                      <div className="skeleton-title" />
                      <div className="skeleton-subtitle" />
                    </div>
                  </div>
                  <div className="work-card skeleton-card">
                    <div className="skeleton-image" />
                    <div className="work-meta skeleton-meta">
                      <div className="skeleton-title" />
                      <div className="skeleton-subtitle" />
                    </div>
                  </div>
                  <div className="work-card skeleton-card">
                    <div className="skeleton-image" />
                    <div className="work-meta skeleton-meta">
                      <div className="skeleton-title" />
                      <div className="skeleton-subtitle" />
                    </div>
                  </div>
                  <div className="work-card wide skeleton-card">
                    <div className="skeleton-image" />
                    <div className="work-meta skeleton-meta">
                      <div className="skeleton-title" />
                      <div className="skeleton-subtitle" />
                    </div>
                  </div>
                </>
              ) : (
                filteredWorks.map((work: any) => (
                  <button
                    key={work.id}
                    className={`work-card ${work.wide ? 'wide' : ''}`}
                    onClick={() => setLightboxImage(work.img)}
                    aria-label={`View full image of ${work.title}`}
                  >
                    <img src={getAssetPath(work.img)} loading="lazy" decoding="async" alt={work.alt || work.title} />
                    <div className="work-meta">
                      <strong>{work.title}</strong>
                      <span>{work.cat} | {work.year}</span>
                    </div>
                  </button>
                ))
              )}
            </div>
          </div>
        </section>

        <section className="section alt reveal-on-scroll media-hero" id="media" aria-labelledby="media-title" style={mediaBgStyle}>
          <div className="container">
            <div className="section-head split-head">
              <div>
                <span className="eyebrow">Studio And Stage</span>
                <h2 id="media-title">Media And Live Formats</h2>
              </div>
              <p className="lead">Publishing in phases: visual work and collaboration structure first, with on-air and media proof added only when publish-ready and permissioned.</p>
            </div>
            <div className="cards-3">
              <article className="info-card"><div className="icon-badge">01</div><h3>Visual Commissions</h3><p>Custom artwork, portfolio-led requests, and visual pieces scoped around use, timeline, and display needs.</p></article>
              <article className="info-card"><div className="icon-badge">02</div><h3>Live Painting + Venue</h3><p>Event-aligned visual presence and live creative moments for venues, community partners, and cultural programming.</p></article>
              <article className="info-card"><div className="icon-badge">03</div><h3>Audio / Podcast Lane</h3><p>A developing media presence for conversational storytelling. Episodes, clips, and proof will be added only when publish-ready and permissioned.</p></article>
            </div>
          </div>
        </section>

        <section className="section reveal-on-scroll" id="about" aria-labelledby="about-title">
          <div className="container about-grid">
            <div className="portrait-card"><img src={getAssetPath("/assets/headshots/assets_headshots_headshot-01.png")} loading="lazy" decoding="async" alt="Portrait of Señor 808" /></div>
            <div className="about-copy">
              <span className="eyebrow">Creative Focus</span>
              <h2 id="about-title">An artist-first brand with room to grow.</h2>
              <p className="lead">Señor 808 works where image meets voice. In the studio, he builds high-contrast compositions using spray paint, acrylic layering, and mixed-media mark-making.</p>
              <p>The work moves between portraiture, typography, and geometry—like signal breaking through noise. On-air, he carries that same discipline into conversation: clear rhythm, clean framing, and a point of view.</p>
              
              <div className="process-mini">
                <h3>Our Process</h3>
                <div className="process-mini-steps">
                  {steps.map((step, index) => (
                    <div key={index} className="process-mini-step">
                      <strong>{String(index + 1).padStart(2, '0')}. {step.title}</strong>
                      <p>{step.text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <button className="btn" type="button" onClick={() => setIsBioModalOpen(true)}>Read Full Bio</button>
            </div>
          </div>
        </section>

        <section className="section reveal-on-scroll" id="faq" aria-labelledby="faq-title">
          <div className="container">
            <div className="section-head split-head">
              <div>
                <span className="eyebrow">Details</span>
                <h2 id="faq-title">Process & Availability</h2>
              </div>
              <p className="lead">Answers to common questions about commissions, shipping, and studio availability.</p>
            </div>
            <div className="faq-grid">
              <div className="faq-item">
                <h3>How do commissions and shipping work?</h3>
                <p>Commission availability, scope, lead times, delivery method, and shipping requirements are confirmed during inquiry review.</p>
              </div>
            </div>
          </div>
        </section>

        <section className="section alt reveal-on-scroll" id="start-project" aria-labelledby="start-title">
          <div className="container">
            <div className="section-head split-head">
              <div>
                <span className="eyebrow">Project Inquiry</span>
                <h2 id="start-title">Start a conversation about artwork.</h2>
              </div>
              <p className="lead">Interested in original artwork or commissioning new work? Fill out the form below and I will respond to align on vision and timeline.</p>
            </div>
            <form className="form-shell" id="projectForm" onSubmit={handleFormSubmit}>
              <div className="field-grid">
                <label>Inquiry Type
                  <select name="project_type" required>
                    <option value="">Select one</option>
                    <option value="Original Artwork Inquiry">Original Artwork Inquiry</option>
                    <option value="Commission Custom Work">Commission Custom Work</option>
                    <option value="Venue Installation">Venue Installation</option>
                    <option value="General Inquiry">General Inquiry</option>
                  </select>
                </label>
                <label>Location
                  <input name="location" type="text" placeholder="City, State" />
                </label>
                <label>Full Name
                  <input name="name" autoComplete="name" required placeholder="Your name" />
                </label>
                <label>Email Address
                  <input name="email" type="email" autoComplete="email" required placeholder="Email Address" />
                </label>
              </div>
              <label style={{ marginTop: '24px' }}>Details
                <textarea name="notes" required placeholder="Tell me about what you are looking for..."></textarea>
              </label>
              
              <div style={{ marginTop: '32px', display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', gap: '24px', flexWrap: 'wrap' }}>
                <button className="btn primary" type="submit">Start a Project</button>
                <span className="form-note">I review inquiries weekly and will reach out if the project aligns with current studio capacity.</span>
              </div>
              
              <div className={`status ${isFormSubmitted ? 'active' : ''}`} role="status">
                <strong>Inquiry received.</strong> This prototype currently confirms form completion only; final delivery routing will be connected before public launch.
              </div>
            </form>
          </div>
        </section>
      </main>

      <footer className="site-footer">
        <div className="container footer-grid">
          <div className="footer-brand">
            <img src={getAssetPath("/assets/logos/Senor808_Wordmark_Primary_White.svg")} loading="lazy" decoding="async" alt="Señor 808 wordmark" referrerPolicy="no-referrer" />
            <p className="footer-tagline">Bold Visual Art.<br/>Clean Creative Presence.</p>
          </div>
          <div className="footer-links">
            <h4>Explore</h4>
            <nav aria-label="Footer navigation">
              <a href="#work" aria-label="Navigate to Work section" onClick={handleNavClick}>Work</a>
              <a href="#media" aria-label="Navigate to Media section" onClick={handleNavClick}>Media</a>
              <a href="#about" aria-label="Navigate to About section" onClick={handleNavClick}>About</a>
            </nav>
          </div>
          <div className="footer-contact">
            <h4>Connect</h4>
            <p>Project inquiries are handled through the Start A Project form.</p>
            <a href="#start-project" aria-label="Start a project inquiry" className="footer-btn">Start A Project</a>
            <p className="footer-location">San Antonio, Texas</p>
          </div>
        </div>
        <div className="container footer-bottom">
          <p>© {new Date().getFullYear()} Señor 808. Bob Garcia in formal/legal contexts.</p>
        </div>
      </footer>

      {/* Modal */}
      <div 
        className={`modal ${isBioModalOpen ? 'active' : ''}`} 
        aria-hidden={!isBioModalOpen} 
        role="dialog" 
        aria-labelledby="bioTitle"
        onClick={(e) => {
          if (e.target === e.currentTarget) setIsBioModalOpen(false);
        }}
      >
        <div className="modal-card">
          <div className="modal-top">
            <div>
              <span className="eyebrow">Full Bio</span>
              <h2 id="bioTitle">Señor 808</h2>
            </div>
            <button className="modal-close" type="button" aria-label="Close biography modal" onClick={() => setIsBioModalOpen(false)}>×</button>
          </div>
          <p>Señor 808 works where image meets voice. In the studio, he builds high-contrast compositions using spray paint, acrylic layering, and mixed-media mark-making. The work moves between portraiture, typography, and geometry—like signal breaking through noise.</p>
          <p style={{ marginTop: '16px' }}>On-air, he carries that same discipline into conversation: clear rhythm, clean framing, and a point of view. Both lanes are designed for impact now, with proof and credits added only when publish-ready and permissioned.</p>
          <p style={{ marginTop: '16px' }}>Additional project history, approved partner references, and media links will be added as they become publish-ready and permissioned.</p>
        </div>
      </div>
      {/* Lightbox Modal */}
      <div 
        className={`lightbox ${lightboxImage ? 'active' : ''}`} 
        aria-hidden={!lightboxImage} 
        role="dialog" 
        onClick={(e) => {
          if (e.target === e.currentTarget) setLightboxImage(null);
        }}
      >
        {lightboxImage && (
          <>
            <img src={getAssetPath(lightboxImage)} loading="lazy" decoding="async" alt="Expanded view" />
            <button className="lightbox-close" aria-label="Close image" onClick={() => setLightboxImage(null)}>×</button>
          </>
        )}
      </div>
    </>
  );
}
