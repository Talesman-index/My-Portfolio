import sys

with open("src/App.tsx", "r") as f:
    text = f.read()

# 1. EN Hero translation
text = text.replace(
    "hero: {\n        title: <>Your product deserves",
    "contact: {\n        label: '07 / Contact',\n        title: <>Ready to create<br /><span className=\"highlight\">together?</span></>,\n        subtitle: '30 minutes to discuss your project, your needs, and see how I can help.',\n        bookCall: 'Book a call',\n        availability: 'Available for new projects',\n        emailText: 'Let\\'s turn your idea into reality.',\n        rights: 'All rights reserved.'\n      },\n      hero: {\n        label: '00 / Home',\n        title: <>Your product deserves"
)

# 2. FR Hero translation
text = text.replace(
    "hero: {\n        title: <>Votre produit mérite",
    "contact: {\n        label: '07 / Contact',\n        title: <>Prêt à créer<br /><span className=\"highlight\">ensemble ?</span></>,\n        subtitle: '30 minutes pour discuter de votre projet, de vos besoins et voir comment je peux vous aider.',\n        bookCall: 'Réserver un appel',\n        availability: 'Disponible pour de nouveaux projets',\n        emailText: 'Transformons votre idée en réalité.',\n        rights: 'Tous droits réservés.'\n      },\n      hero: {\n        label: '00 / Accueil',\n        title: <>Votre produit mérite"
)

# 3. Rewrite Hero Section DOM
old_hero = """      {/* Hero Section */}
      <section id="home" className="hero-new" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="hero-gradient-overlay"></div>
        <div className="container hero-container-new">
          <div className="hero-content-new">
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t.hero.title}
            </motion.h1>
            <motion.p 
              className="hero-subtitle-new"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.div 
              className="hero-actions-new"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a href="#projects" className="btn-primary-new">{t.hero.viewProjects}</a>
              <button onClick={openCalendly} className="btn-secondary-new">{t.hero.contactMe}</button>
            </motion.div>
          </div>
        </div>

      </section>"""

new_hero = """      {/* Hero Section */}
      <section id="home" className="hero-new left-aligned" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="hero-gradient-overlay"></div>
        <div className="container hero-container-new">
          <div className="hero-content-new">
            <span className="hero-label-new">{t.hero.label}</span>
            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8 }}
            >
              {t.hero.title}
            </motion.h1>
            <motion.p 
              className="hero-subtitle-new"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
            >
              {t.hero.subtitle}
            </motion.p>
            <motion.div 
              className="hero-actions-new"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
            >
              <a href="#projects" className="btn-primary-new">{t.hero.viewProjects}</a>
              <button onClick={openCalendly} className="btn-secondary-new">{t.hero.contactMe}</button>
            </motion.div>
          </div>
        </div>
      </section>"""

text = text.replace(old_hero, new_hero)

# 4. Extract Contact section to replace Book Call + Footer
contact_start = text.find("{/* Book a Call Section */}")
if contact_start != -1:
    footer_end = text.find("</footer>", contact_start)
    if footer_end != -1:
        new_contact = """      {/* Contact Section */}
      <section id="contact" className="contact-section-new" style={{ 
        '--mouse-x': `${mousePos.x}%`, 
        '--mouse-y': `${mousePos.y}%` 
      } as any}>
        <div className="contact-gradient-overlay"></div>
        <div className="container contact-container-new">
          <div className="contact-header-new">
            <span className="contact-label-new">{t.contact.label}</span>
            <motion.h2 
              className="contact-title-large"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              {t.contact.title}
            </motion.h2>
          </div>
          
          <div className="contact-grid-new">
            <div className="book-card-premium" onClick={openCalendly}>
              <div className="book-card-left">
                <div className="book-icon-wrapper">
                  <Calendar size={24} />
                </div>
                <h3>{t.contact.bookCall}</h3>
                <p>{t.contact.subtitle}</p>
              </div>
              <div className="book-card-right">
                <div className="book-cta-circle">
                  <ArrowRight size={40} style={{ transform: 'rotate(-45deg)' }} />
                </div>
              </div>
            </div>

            <div className="contact-info-new">
              <div className="availability-row">
                <span className="dot"></span>
                <span className="availability-text">{t.contact.availability}</span>
              </div>
              <div className="email-wrapper-new">
                <p>{t.contact.emailText}</p>
                <a href="mailto:dafiashalom@gmail.com" className="email-link-huge">
                  dafiashalom@gmail.com 
                </a>
              </div>
            </div>
          </div>

          <div className="footer-bottom-bar">
            <div className="footer-bottom-left">
              <span className="footer-brand-logo">SACCA DAFIA.</span>
              <div className="social-simple-links">
                <a href="https://www.linkedin.com/in/dafia-s-860290218/" target="_blank" rel="noopener noreferrer">
                  <Linkedin size={20} />
                </a>
                <a href="https://www.behance.net/shalomsacca" target="_blank" rel="noopener noreferrer" className="social-icon">
                  <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
                    <path d="M22 7h-7v-2h7v2zm1.726 10c-.442 1.297-2.029 3-5.101 3-3.074 0-5.564-1.729-5.564-5.675 0-3.91 2.325-5.92 5.466-5.92 3.082 0 4.964 1.782 5.375 4.426.078.506.109 1.188.095 2.14h-8.027c.13 3.211 3.483 3.312 4.588 2.029h3.168zm-7.686-4h4.965c-.105-1.547-1.136-2.219-2.477-2.219-1.466 0-2.277.768-2.488 2.219zm-9.574 6.988h-6.466v-14.967h6.953c5.476.081 5.58 5.444 2.72 6.906 3.461 1.26 3.577 8.061-3.207 8.061zm-3.466-8.988h3.584c2.508 0 2.906-3-.312-3h-3.272v3zm3.391 3h-3.391v3.016h3.341c3.011.022 3.038-2.998.05-3.016z"/>
                  </svg>
                </a>
              </div>
            </div>
            
            <div className="footer-bottom-right">
              <nav className="footer-nav-simple">
                <a href="#projects" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("projects")?.scrollIntoView({ behavior: "smooth" });
                }}>{t.nav.projects}</a>
                <a href="#experience" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("experience")?.scrollIntoView({ behavior: "smooth" });
                }}>{t.nav.experience}</a>
                <a href="#about" onClick={(e) => {
                  e.preventDefault();
                  document.getElementById("about")?.scrollIntoView({ behavior: "smooth" });
                }}>{t.nav.about}</a>
              </nav>
              <span className="copyright">© 2026 Sacca Dafia. {t.contact.rights}</span>
            </div>
          </div>
        </div>
      </section>"""
        
        text = text[:contact_start] + new_contact + text[footer_end + 9:]

with open("src/App.tsx", "w") as f:
    f.write(text)

print("Updated App.tsx successfully.")
