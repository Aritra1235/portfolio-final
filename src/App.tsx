import { useEffect, useState, type FormEvent, type MouseEvent, type ReactNode } from 'react'
import { projects, skillGroups, type Project } from './content'

type FormStatus = '' | 'success' | 'error'
type Route =
  | { kind: 'home' }
  | { kind: 'projects' }
  | { kind: 'project'; project: Project }
  | { kind: 'about' }
  | { kind: 'contact' }
  | { kind: 'privacy' }
  | { kind: 'not-found' }

const normalizePath = (pathname: string) => pathname.replace(/\/+$/, '') || '/'

const getRoute = (pathname: string): Route => {
  const path = normalizePath(pathname)
  if (path === '/') return { kind: 'home' }
  if (path === '/projects') return { kind: 'projects' }
  if (path === '/about') return { kind: 'about' }
  if (path === '/contact') return { kind: 'contact' }
  if (path === '/privacy') return { kind: 'privacy' }
  if (path.startsWith('/projects/')) {
    const project = projects.find((item) => item.slug === path.slice('/projects/'.length))
    if (project) return { kind: 'project', project }
  }
  return { kind: 'not-found' }
}

function Link({ to, children, className = '' }: { to: string; children: ReactNode; className?: string }) {
  const handleClick = (event: MouseEvent<HTMLAnchorElement>) => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return
    event.preventDefault()
    window.history.pushState({}, '', to)
    window.dispatchEvent(new PopStateEvent('popstate'))
    window.scrollTo({ top: 0 })
  }
  return <a href={to} onClick={handleClick} className={className}>{children}</a>
}

function Arrow() {
  return (
    <svg viewBox="0 0 16 16" aria-hidden="true">
      <path d="M4 12 12 4M6 4h6v6" />
    </svg>
  )
}

function Mark() {
  return (
    <span className="brand-mark" aria-hidden="true">
      <span />
      <span />
    </span>
  )
}

function Eyebrow({ children }: { children: ReactNode }) {
  return <p className="eyebrow">{children}</p>
}

function SiteNav() {
  return (
    <header className="site-header">
      <div className="shell">
        <nav className="site-nav" aria-label="Primary navigation">
          <Link to="/" className="site-nav__brand"><Mark /><span>Aritra Bhattacharya</span></Link>
          <div className="site-nav__links">
            <Link to="/projects">Work</Link>
            <Link to="/about">About</Link>
            <a href="/resume.pdf" target="_blank">Résumé</a>
            <Link to="/contact" className="nav-cta">Let’s talk <Arrow /></Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

function Footer() {
  return (
    <footer className="site-footer">
      <div className="shell footer-grid">
        <div className="footer-lede">
          <Mark />
          <p>Independent software developer building useful products from interface to infrastructure.</p>
        </div>
        <div className="footer-column">
          <span>Navigate</span>
          <Link to="/projects">Selected work</Link>
          <Link to="/about">About</Link>
          <Link to="/contact">Contact</Link>
        </div>
        <div className="footer-column">
          <span>Elsewhere</span>
          <a href="https://github.com/Aritra1235" target="_blank" rel="noreferrer">GitHub ↗</a>
          <a href="mail@aritra.ovh">Email ↗</a>
          <Link to="/privacy">Privacy</Link>
        </div>
        <p className="footer-meta">© {new Date().getFullYear()} Aritra Bhattacharya · India</p>
      </div>
    </footer>
  )
}

function ProjectVisual({ project, compact = false }: { project: Project; compact?: boolean }) {
  return (
    <div className={`project-visual project-visual--${project.slug} ${compact ? 'project-visual--compact' : ''}`} aria-hidden="true">
      <div className="visual-topbar"><i /><i /><i /><span>{project.type}</span></div>
      {project.slug === 'music-platform' && (
        <div className="real-shot real-shot--music">
          <img className="real-shot__desktop" src="/images/music-platform-web-01.webp" alt="" />
          <div className="real-shot__phone real-shot__phone--one"><img src="/images/music-platform-android-01.webp" alt="" /></div>
          <div className="real-shot__phone real-shot__phone--two"><img src="/images/music-platform-android-02.webp" alt="" /></div>
        </div>
      )}
      {project.slug === 'scream' && (
        <div className="real-shot real-shot--scream">
          <img className="real-shot__desktop" src="/images/scream-01.webp" alt="" />
          <img className="real-shot__detail" src="/images/scream-04.webp" alt="" />
        </div>
      )}
      {project.slug === 'apple-music-art-downloader' && (
        <div className="real-shot real-shot--apple">
          <img className="real-shot__desktop" src="/images/apple-music-covers-01.webp" alt="" />
          <img className="real-shot__detail" src="/images/apple-music-covers-02.webp" alt="" />
        </div>
      )}
      {project.slug === 'ocr-text-extraction-tool' && (
        <div className="real-shot real-shot--ocr">
          <img className="real-shot__desktop" src="/images/ocr-01.webp" alt="" />
        </div>
      )}
    </div>
  )
}

function ProjectCard({ project, featured = false }: { project: Project; featured?: boolean }) {
  return (
    <article className={`project-card ${featured ? 'project-card--featured' : ''}`}>
      <Link to={`/projects/${project.slug}`} className="project-card__visual-link" aria-label={`Read ${project.title} case study`}>
        <ProjectVisual project={project} compact={!featured} />
      </Link>
      <div className="project-card__copy">
        <div className="project-card__meta"><span>{project.number} / {project.type}</span><span>{project.status}</span></div>
        <h3><Link to={`/projects/${project.slug}`}>{project.title}</Link></h3>
        <p>{project.summary}</p>
        <div className="project-card__bottom">
          <div className="tag-list">{project.stack.slice(0, featured ? 6 : 4).map((item) => <span key={item}>{item}</span>)}</div>
          <Link to={`/projects/${project.slug}`} className="circle-link" aria-label={`Read ${project.title} case study`}><Arrow /></Link>
        </div>
      </div>
    </article>
  )
}

function HomePage() {
  return (
    <main>
      <section className="hero shell">
        <div className="hero__grid">
          <div>
            <h1>I design and build software for web, mobile, and everything behind them.</h1>
            <p className="hero__lede">I’m Aritra, a computer science student and product-minded developer. I design interfaces, build the systems behind them, and document the decisions that make the whole thing work.</p>
          </div>
          <div className="hero__side">
            <div className="button-row">
              <Link to="/projects" className="button button--solid">Explore my work <Arrow /></Link>
              <Link to="/contact" className="button button--text">Start a conversation</Link>
            </div>
          </div>
        </div>
        <div className="hero__footer"><span className="scroll-cue">Scroll to explore ↓</span></div>
      </section>

      <section className="work-section shell">
        <div className="section-heading"><div><Eyebrow>01 — Selected work</Eyebrow><h2>Products, not just projects.</h2></div><p>Four case studies across streaming, social, media utilities, and OCR—each built around a real problem and the systems required to solve it.</p></div>
        <div className="project-grid">
          {projects.map((project, index) => <ProjectCard project={project} featured={index === 0} key={project.slug} />)}
        </div>
        <div className="center-action"><Link to="/projects" className="button button--outline">View the complete index <Arrow /></Link></div>
      </section>

      <section className="principles-section">
        <div className="shell principles-grid">
          <div><Eyebrow>02 — Approach</Eyebrow><h2>Useful software should feel considered.</h2></div>
          <div className="principles-list">
            <div><span>01</span><h3>Start with the job</h3><p>A clear user problem makes technical decisions easier to judge.</p></div>
            <div><span>02</span><h3>Own the whole path</h3><p>Interface, service, data, and operations are one experience.</p></div>
            <div><span>03</span><h3>Show the trade-offs</h3><p>Good case studies explain why, including what comes next.</p></div>
          </div>
        </div>
      </section>

      <section className="toolkit shell">
        <div className="section-heading"><div><Eyebrow>03 — Toolkit</Eyebrow><h2>Comfortable across the stack.</h2></div><p>TypeScript-first, product-focused, and happy moving between a polished client, a service boundary, and the infrastructure underneath it.</p></div>
        <div className="skill-grid">{skillGroups.map((group) => <div key={group.title}><h3>{group.title}</h3>{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>)}</div>
      </section>

      <ContactBand />
    </main>
  )
}

function ContactBand() {
  return (
    <section className="contact-band">
      <div className="shell contact-band__inner"><div><Eyebrow>Have something in mind?</Eyebrow><h2>Let’s build the useful version.</h2></div><Link to="/contact" className="button button--light">Tell me about it <Arrow /></Link></div>
    </section>
  )
}

function ProjectsPage() {
  return (
    <main>
      <section className="page-hero shell"><Eyebrow>Work / 2025—26</Eyebrow><h1>Selected projects and the decisions behind them.</h1><p>Not a wall of screenshots. Each entry covers the problem, the product loop, the architecture, and the next honest milestone.</p></section>
      <section className="project-index shell">{projects.map((project) => <ProjectCard key={project.slug} project={project} />)}</section>
      <ContactBand />
    </main>
  )
}

function ArticleRail({ side }: { side: 'left' | 'right' }) {
  return (
    <aside
      className={`article-rail article-rail--${side}`}
      aria-hidden="true"
    >
      <div className="article-rail__slot" data-rail={side} />
    </aside>
  )
}

function GalleryImage({ image, onOpen }: { image: NonNullable<Project['gallery']>[number]; onOpen: () => void }) {
  return (
    <figure
      className={`${image.portrait ? 'is-portrait' : ''} ${image.wide ? 'is-wide' : ''}`}
      role="button"
      tabIndex={0}
      onClick={onOpen}
      onKeyDown={(event) => {
        if (event.key === 'Enter' || event.key === ' ') {
          event.preventDefault()
          onOpen()
        }
      }}
    >
      <img src={image.src} alt={image.alt} loading="lazy" />
      <figcaption>{image.alt}</figcaption>
      <span className="gallery-zoom">Open image <Arrow /></span>
    </figure>
  )
}

function ProjectGallery({ project }: { project: Project }) {
  const gallery = project.gallery ?? []
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const selectedImage = selectedIndex === null ? null : gallery[selectedIndex]

  useEffect(() => {
    if (selectedIndex === null) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') setSelectedIndex(null)
      if (event.key === 'ArrowRight') setSelectedIndex((current) => current === null ? 0 : (current + 1) % gallery.length)
      if (event.key === 'ArrowLeft') setSelectedIndex((current) => current === null ? gallery.length - 1 : (current - 1 + gallery.length) % gallery.length)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [gallery.length, selectedIndex])

  if (!project.gallery) return null

  const renderImage = (image: NonNullable<Project['gallery']>[number], index: number) => (
    <GalleryImage image={image} onOpen={() => setSelectedIndex(index)} key={image.src} />
  )

  return (
    <>
      <section className={`project-gallery shell project-gallery--${project.slug}`}>
        <div className="project-gallery__heading"><Eyebrow>Inside the product</Eyebrow><h2>Selected interface views.</h2></div>
        {project.slug === 'music-platform' ? (
          <div className="project-gallery__masonry">
            <div className="gallery-stack">
              {renderImage(gallery[0], 0)}
              <div className="gallery-pair">
                {renderImage(gallery[2], 2)}
                {renderImage(gallery[3], 3)}
              </div>
            </div>
            <div className="gallery-stack">
              {renderImage(gallery[1], 1)}
              {renderImage(gallery[4], 4)}
              <div className="gallery-pair">
                {renderImage(gallery[5], 5)}
                {renderImage(gallery[6], 6)}
              </div>
            </div>
          </div>
        ) : (
          <div className="project-gallery__grid">
            {gallery.map((image, index) => renderImage(image, index))}
          </div>
        )}
      </section>
      {selectedImage && selectedIndex !== null && (
        <div className="image-lightbox" role="dialog" aria-modal="true" aria-label="Image viewer" onClick={(event) => { if (event.target === event.currentTarget) setSelectedIndex(null) }}>
          <button className="image-lightbox__close" type="button" onClick={() => setSelectedIndex(null)} aria-label="Close image viewer">×</button>
          <button className="image-lightbox__nav image-lightbox__nav--prev" type="button" onClick={() => setSelectedIndex((selectedIndex - 1 + gallery.length) % gallery.length)} aria-label="Previous image"><Arrow /></button>
          <div className="image-lightbox__content">
            <div className="image-lightbox__stage"><img src={selectedImage.src} alt={selectedImage.alt} /></div>
            <div className="image-lightbox__footer"><span>{selectedImage.alt}</span><strong>{selectedIndex + 1} / {gallery.length}</strong></div>
          </div>
          <button className="image-lightbox__nav image-lightbox__nav--next" type="button" onClick={() => setSelectedIndex((selectedIndex + 1) % gallery.length)} aria-label="Next image"><Arrow /></button>
        </div>
      )}
    </>
  )
}

function ProjectPage({ project }: { project: Project }) {
  const nextProject = projects[(projects.findIndex((item) => item.slug === project.slug) + 1) % projects.length]
  return (
    <main>
      <section className="case-hero shell">
        <Link to="/projects" className="back-link">← All projects</Link>
        <div className="case-hero__meta"><span>{project.number}</span><span>{project.type}</span><span>{project.status}</span></div>
        <h1>{project.title}</h1>
        <p>{project.description}</p>
        <div className="case-actions">
          {project.externalUrl && <a className="button button--solid" href={project.externalUrl} target="_blank" rel="noreferrer">{project.externalLabel} <Arrow /></a>}
          {project.sourceUrl && <a className="button button--outline" href={project.sourceUrl} target="_blank" rel="noreferrer">View source <Arrow /></a>}
        </div>
      </section>
      <div className="case-visual shell"><ProjectVisual project={project} /></div>
      <section className="case-facts shell">
        <div><span>Audience</span><strong>{project.audience}</strong></div>
        <div><span>Timeline</span><strong>{project.timeline}</strong></div>
        <div><span>Role</span><strong>Design & full-stack development</strong></div>
      </section>
      {project.metrics && <section className="metric-row shell">{project.metrics.map((metric) => <div key={metric.label}><strong>{metric.value}</strong><span>{metric.label}</span><small>{metric.detail}</small></div>)}</section>}
      {project.slug === 'apple-music-art-downloader' && <AppleMusicAnalytics />}
      <ProjectGallery project={project} />
      <div className="article-layout">
        <ArticleRail side="left" />
        <article className="case-article">
          <nav className="article-toc" aria-label="Article contents"><span>In this case study</span>{project.sections.map((section, index) => <a href={`#section-${index + 1}`} key={section.title}>{String(index + 1).padStart(2, '0')} {section.title}</a>)}</nav>
          {project.sections.map((section, index) => (
            <section id={`section-${index + 1}`} className="article-section" key={section.title}>
              <span className="article-number">{String(index + 1).padStart(2, '0')}</span>
              <h2>{section.title}</h2>
              {section.paragraphs.map((paragraph) => <p key={paragraph}>{paragraph}</p>)}
              {section.bullets && <ul>{section.bullets.map((bullet) => <li key={bullet}>{bullet}</li>)}</ul>}
              {section.note && <aside className="article-note"><span>Note</span><p>{section.note}</p></aside>}
            </section>
          ))}
          <div className="stack-block"><span>Built with</span><div className="tag-list">{project.stack.map((item) => <span key={item}>{item}</span>)}</div></div>
        </article>
        <ArticleRail side="right" />
      </div>
      <section className="next-project shell"><span>Next case study</span><Link to={`/projects/${nextProject.slug}`}><h2>{nextProject.title}</h2><i><Arrow /></i></Link></section>
    </main>
  )
}

function AppleMusicAnalytics() {
  const countries = [
    { name: 'United States', value: 363 },
    { name: 'Mexico', value: 197 },
    { name: 'Brazil', value: 124 },
    { name: 'Canada', value: 78 },
    { name: 'France', value: 78 },
    { name: 'India', value: 70 },
    { name: 'United Kingdom', value: 60 },
  ]
  const requests = [
    { month: 'Feb', value: 10762 },
    { month: 'Mar', value: 17943 },
    { month: 'Apr', value: 6441 },
    { month: 'May', value: 3623 },
    { month: 'Jun', value: 3437 },
    { month: 'Jul', value: 4355 },
  ]
  const requestPeak = Math.max(...requests.map((item) => item.value))
  const countryPeak = countries[0].value

  return (
    <section className="analytics-highlight shell" aria-labelledby="analytics-highlight-title">
      <header className="analytics-highlight__header">
        <div>
          <span className="analytics-kicker">Live utility · real usage</span>
          <h2 id="analytics-highlight-title">Used around the world.<br />Built to hold up.</h2>
        </div>
        <div className="analytics-total">
          <strong>46,561</strong>
          <span>requests handled</span>
          <small>February–July 2026</small>
        </div>
      </header>

      <div className="analytics-summary" aria-label="All-time analytics summary">
        <div><strong>5.8K</strong><span>all-time active users</span></div>
        <div><strong>84K</strong><span>all-time events</span></div>
        <div><strong>17,943</strong><span>peak requests · March</span></div>
      </div>

      <div className="analytics-grid">
        <section className="analytics-panel analytics-panel--requests" aria-labelledby="request-chart-title">
          <div className="analytics-panel__heading"><div><span>Request volume</span><h3 id="request-chart-title">Six months of traffic</h3></div><small>Feb–Jul ’26</small></div>
          <div className="request-chart" role="img" aria-label="Monthly requests: February 10,762; March 17,943; April 6,441; May 3,623; June 3,437; July 4,355">
            {requests.map((item) => (
              <div className={`request-bar${item.value === requestPeak ? ' request-bar--peak' : ''}`} key={item.month}>
                <span className="request-bar__value">{item.value.toLocaleString('en-US')}</span>
                <div className="request-bar__track"><i style={{ height: `${(item.value / requestPeak) * 100}%` }} /></div>
                <span className="request-bar__month">{item.month}</span>
              </div>
            ))}
          </div>
        </section>

        <section className="analytics-panel" aria-labelledby="country-chart-title">
          <div className="analytics-panel__heading"><div><span>Global reach</span><h3 id="country-chart-title">Top countries</h3></div><small>90 days</small></div>
          <ol className="country-chart">
            {countries.map((country, index) => (
              <li key={country.name}>
                <span className="country-rank">{String(index + 1).padStart(2, '0')}</span>
                <div><span className="country-name">{country.name}</span><i><b style={{ width: `${(country.value / countryPeak) * 100}%` }} /></i></div>
                <strong>{country.value}</strong>
              </li>
            ))}
          </ol>
        </section>
      </div>

      <p className="analytics-note"><span>About the data</span> Monthly metrics cover July 2026; all-time analytics cover July 1, 2023–July 31, 2026; country data covers the latest 90-day view supplied with this update.</p>
    </section>
  )
}

function AboutPage() {
  return (
    <main>
      <section className="page-hero page-hero--about shell"><Eyebrow>About</Eyebrow><h1>I build things when the problem is worth understanding.</h1></section>
      <section className="about-grid shell">
        <div className="about-statement"><p>I’m Aritra Bhattacharya, a computer science student at VIT-AP University and a full-stack developer based in India.</p><p>My projects usually start with friction I can feel: </p></div>
        <div className="about-detail"><Eyebrow>How I work</Eyebrow><p>I like owning the entire path—from the sentence on a button to the trace that explains why the request behind it failed. That means caring equally about typography, state transitions, schemas, background jobs, and deployment.</p><p>I’m most useful on teams that value direct communication, thoughtful iteration, and developers who can move between product and infrastructure without losing sight of the person using the software.</p><div className="fact-list"><span><b>Based</b> India</span><span><b>Studying</b> Computer Science</span><span><b>Off-screen</b> Football & Music</span><span><b>Favourite tool</b> TypeScript</span></div></div>
      </section>
      <section className="toolkit shell toolkit--about"><div className="section-heading"><div><Eyebrow>Capabilities</Eyebrow><h2>The working toolkit.</h2></div></div><div className="skill-grid">{skillGroups.map((group) => <div key={group.title}><h3>{group.title}</h3>{group.skills.map((skill) => <span key={skill}>{skill}</span>)}</div>)}</div></section>
      <ContactBand />
    </main>
  )
}

function ContactPage() {
  const [formStatus, setFormStatus] = useState<FormStatus>('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()
    setIsSubmitting(true)
    const form = event.currentTarget
    try {
      const response = await fetch('https://formbold.com/s/oeqMB', { method: 'POST', body: new FormData(form) })
      if (!response.ok) throw new Error('Request failed')
      form.reset()
      setFormStatus('success')
    } catch {
      setFormStatus('error')
    } finally {
      setIsSubmitting(false)
    }
  }
  return (
    <main className="contact-page shell">
      <div className="contact-copy"><Eyebrow>Contact</Eyebrow><h1>Tell me what you're trying to build.</h1><p>A useful first message includes the problem, the people it is for, and where the project is right now. Rough ideas are welcome.</p><a href="mailto:mail@aritra.ovh">mail@aritra.ovh <Arrow /></a></div>
      <form className="contact-form" onSubmit={handleSubmit}>
        <label><span>Your name</span><input name="name" autoComplete="name" required placeholder="Jane Smith" /></label>
        <label><span>Email address</span><input name="email" type="email" autoComplete="email" required placeholder="jane@company.com" /></label>
        <label><span>What are you working on?</span><textarea name="message" required rows={7} placeholder="A short version is perfect…" /></label>
        <button className="button button--solid" disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send message'} <Arrow /></button>
        {formStatus === 'success' && <p className="form-message form-message--success">Message sent. I’ll get back to you soon.</p>}
        {formStatus === 'error' && <p className="form-message">Something went wrong. Email me directly and I’ll pick it up there.</p>}
      </form>
    </main>
  )
}

function PrivacyPage() {
  return <main className="legal-page shell"><Eyebrow>Privacy</Eyebrow><h1>A short, human privacy note.</h1><div><h2>Analytics</h2><p>This site uses Vercel Analytics to understand aggregate visits and page performance. It is used to improve the portfolio, not to build advertising profiles.</p><h2>Contact</h2><p>If you submit the contact form, the information you provide is sent through Formbold so I can reply. Do not include sensitive information.</p><h2>Advertising</h2><p>Article pages reserve layout space for future advertisements. The placeholders do not currently load an ad network or set advertising cookies.</p></div></main>
}

function NotFoundPage() {
  return <main className="not-found shell"><span>404</span><h1>This page wandered off.</h1><p>The work is still here. The route is not.</p><Link to="/" className="button button--solid">Back home <Arrow /></Link></main>
}

function App() {
  const [route, setRoute] = useState<Route>(() => getRoute(window.location.pathname))
  useEffect(() => {
    const handlePopState = () => setRoute(getRoute(window.location.pathname))
    window.addEventListener('popstate', handlePopState)
    return () => window.removeEventListener('popstate', handlePopState)
  }, [])
  return (
    <div className="app-shell">
      <SiteNav />
      {route.kind === 'home' && <HomePage />}
      {route.kind === 'projects' && <ProjectsPage />}
      {route.kind === 'project' && <ProjectPage project={route.project} />}
      {route.kind === 'about' && <AboutPage />}
      {route.kind === 'contact' && <ContactPage />}
      {route.kind === 'privacy' && <PrivacyPage />}
      {route.kind === 'not-found' && <NotFoundPage />}
      <Footer />
    </div>
  )
}

export default App
