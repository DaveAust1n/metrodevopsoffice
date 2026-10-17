import { useEffect, useState } from 'react';
import {
  ArrowDownRight, ArrowRight, ArrowUpRight, Check, ChevronRight, Code2,
  Compass, Layers3, Menu, MonitorSmartphone, MoveRight, PanelsTopLeft,
  ShieldCheck, Sparkles, Workflow, X, Zap
} from 'lucide-react';
import { loadWebsiteServices } from './lib/websiteContent';
import { applySavedVisualEdits, installVisualEditorBridge, type VisualEdit } from './visualEditorBridge';

type Service = { name: string; description: string | null };
const WHATSAPP = 'https://wa.me/2349163197774';
const HUB = 'https://metrodevopshub.vercel.app';

const serviceGroups = [
  {
    number: '01',
    title: 'Digital foundations',
    intro: 'A clear, credible online home for your business — built to work on the phones your customers already use.',
    icon: PanelsTopLeft,
    items: [
      ['Business websites', 'Professional websites designed around your customers and your next business goal.'],
      ['Online stores', 'Product catalogues, categories, enquiry flows and shopping experiences that can grow with you.'],
      ['Website refreshes', 'Make an existing site clearer, faster, more useful and easier to maintain.'],
      ['Domains & business email', 'Move beyond temporary links and give your business a more professional identity.'],
    ],
  },
  {
    number: '02',
    title: 'Business systems',
    intro: 'Useful software that fits how your business actually operates — not another dashboard for the sake of it.',
    icon: Workflow,
    items: [
      ['Website management', 'Give owners a place to update copy, images, services and products without touching code.'],
      ['Custom web applications', 'Build focused tools for real workflows, from operations to customer requests.'],
      ['Bookings & enquiries', 'Make it easier for customers to ask questions, request appointments and take the next step.'],
      ['Integrations & automation', 'Connect repetitive steps and compatible tools to reduce avoidable manual work.'],
    ],
  },
  {
    number: '03',
    title: 'Practical AI',
    intro: 'Apply AI where it saves time, improves support or helps a team handle work more consistently.',
    icon: Sparkles,
    items: [
      ['WhatsApp automation', 'Support repeat customer questions and suitable messaging workflows.'],
      ['Customer-service agents', 'Help visitors find information and understand what to do next.'],
      ['AI integrations', 'Connect AI capabilities to a website or workflow when there is a clear use case.'],
      ['Lead capture', 'Collect useful enquiry details and organize follow-up.'],
    ],
  },
] as const;

const projects = [
  {
    label: 'Commerce · Website systems',
    name: 'August Products',
    description: 'A product-led online presence built to help customers explore a catalogue and find the right next step.',
    url: 'https://augustproducts.com',
    tag: 'Commerce',
    mark: 'AP',
    tone: 'project-blue',
  },
  {
    label: 'Operations · Product concept',
    name: 'WareTrack',
    description: 'A spatial warehouse concept focused on zones, inventory movement and operational visibility.',
    url: 'https://github.com/DaveAust1n/new-work',
    tag: 'Operations',
    mark: 'WT',
    tone: 'project-green',
  },
  {
    label: 'Digital tools · Web application',
    name: 'SetupPlug',
    description: 'A focused web product exploring how practical digital tools can make setup and workflows simpler.',
    url: 'https://setupplug.vercel.app',
    tag: 'Web product',
    mark: 'SP',
    tone: 'project-clay',
  },
];

function Brand({ light = false }: { light?: boolean }) {
  return (
    <a href="#home" className={`brand ${light ? 'brand-light' : ''}`} aria-label="MetroDEVOPS home">
      <span className="brand-mark">M<span>.</span></span>
      <span className="brand-name">Metro<span>DEVOPS</span></span>
    </a>
  );
}

function Header() {
  const [open, setOpen] = useState(false);
  const links = [['Approach', '#approach'], ['Services', '#services'], ['Work', '#work'], ['Contact', '#contact']];
  return (
    <header className="site-header">
      <div className="nav-shell">
        <Brand />
        <nav className={`main-nav ${open ? 'main-nav-open' : ''}`} aria-label="Main navigation">
          {links.map(([label, href]) => <a key={label} href={href} onClick={() => setOpen(false)}>{label}</a>)}
          <a className="nav-mobile-cta" href="#contact" onClick={() => setOpen(false)}>Start a project <ArrowUpRight size={16} /></a>
        </nav>
        <a className="nav-cta" href="#contact">Start a project <ArrowUpRight size={16} /></a>
        <button className="menu-toggle" onClick={() => setOpen(!open)} aria-label={open ? 'Close menu' : 'Open menu'}>
          {open ? <X /> : <Menu />}
        </button>
      </div>
    </header>
  );
}

function WebsiteSystemVisual() {
  return (
    <div className="system-visual" aria-label="Illustration of a website being edited and published">
      <div className="visual-topbar">
        <div className="window-dots"><i /><i /><i /></div>
        <span>YOUR BUSINESS SITE</span>
        <span className="live-pill"><i /> LIVE</span>
      </div>
      <div className="visual-body">
        <aside className="visual-sidebar">
          <div className="sidebar-brand"><span className="mini-brand">M</span><span>Site editor</span></div>
          <div className="sidebar-item active"><PanelsTopLeft size={15} /> Page sections</div>
          <div className="sidebar-item"><Layers3 size={15} /> Products & services</div>
          <div className="sidebar-item"><Compass size={15} /> Site settings</div>
          <div className="sidebar-note"><ShieldCheck size={16} /><span>Your content. Your control.</span></div>
        </aside>
        <div className="visual-preview">
          <div className="preview-toolbar"><span>Home page</span><span className="preview-device"><MonitorSmartphone size={14} /> Responsive</span></div>
          <div className="preview-site">
            <div className="preview-nav"><span className="preview-logo">YOUR BRAND</span><span>About&nbsp;&nbsp; Services&nbsp;&nbsp; Contact</span></div>
            <div className="preview-hero">
              <span className="preview-eyebrow">MADE FOR YOUR BUSINESS</span>
              <strong>A better way to<br />show up online.</strong>
              <p>Keep your website up to date as your business grows.</p>
              <span className="preview-button">Explore services <ArrowRight size={12} /></span>
              <div className="preview-orbit orbit-one" /><div className="preview-orbit orbit-two" />
            </div>
            <div className="preview-cards"><i /><i /><i /></div>
          </div>
          <div className="edit-cursor"><span>Text block</span><i /></div>
        </div>
      </div>
      <div className="visual-footer"><span><Check size={14} /> Draft saved</span><span className="publish-label"><span /> Publish changes <ArrowUpRight size={13} /></span></div>
    </div>
  );
}

function Hero() {
  return (
    <section id="home" className="hero">
      <div className="hero-grid" />
      <div className="hero-inner">
        <div className="hero-copy">
          <div className="eyebrow"><span className="eyebrow-line" /> DIGITAL INFRASTRUCTURE FOR AFRICAN BUSINESS</div>
          <h1>Build your digital presence.<br /><span>Keep control of it.</span></h1>
          <p className="hero-description">We build websites and business systems that do more than look good — they give you a practical foundation to grow, adapt and serve your customers.</p>
          <div className="hero-actions">
            <a className="button button-primary" href="#contact">Let's build something <ArrowUpRight size={18} /></a>
            <a className="button button-quiet" href="#work">Explore our work <ArrowDownRight size={17} /></a>
          </div>
          <div className="hero-proof"><span className="proof-icon"><Check size={14} /></span><span>Built for your business. Designed to be maintained.</span></div>
        </div>
        <div className="hero-art"><div className="art-orbit art-orbit-a" /><div className="art-orbit art-orbit-b" /><WebsiteSystemVisual /><div className="floating-label floating-label-one"><span className="floating-dot blue-dot" /> One shared system</div><div className="floating-label floating-label-two"><span className="floating-dot green-dot" /> Owner-friendly editing</div></div>
      </div>
      <div className="hero-bottom"><span>WE BUILD FOR THE LONG TERM</span><a href="#approach">See how we work <ChevronRight size={15} /></a></div>
    </section>
  );
}

function Approach() {
  const steps = [
    { number: '01', title: 'Start with a strong foundation', text: 'We build on reusable, responsive components instead of treating every page as a disconnected one-off.', icon: Layers3 },
    { number: '02', title: 'Make everyday edits simple', text: 'The goal is for owners to update text, images, services and products without waiting for a developer.', icon: PanelsTopLeft },
    { number: '03', title: 'Publish with confidence', text: 'Drafts, previews and published content should be distinct, so changes are intentional and easier to manage.', icon: ShieldCheck },
  ];
  return (
    <section id="approach" className="section approach-section">
      <div className="section-shell">
        <div className="section-heading">
          <p className="section-kicker">A better way to build</p>
          <h2>A website should be a tool you <span>own</span> — not a problem you inherit.</h2>
          <p>Our approach is built around a simple idea: business owners should be able to keep their digital presence current without learning how to code.</p>
        </div>
        <div className="approach-grid">
          {steps.map(({ number, title, text, icon: Icon }) => <article className="approach-card" key={number}>
            <div className="approach-card-top"><span>{number}</span><Icon size={21} strokeWidth={1.7} /></div>
            <h3>{title}</h3><p>{text}</p><div className="card-rule" />
          </article>)}
        </div>
        <div className="architecture-strip">
          <div className="architecture-icon"><Code2 size={22} /></div>
          <div><strong>One shared architecture. Different kinds of business.</strong><p>Reusable page sections, structured content and a consistent editing experience — tailored to each website.</p></div>
          <a href={HUB} target="_blank" rel="noreferrer">Explore the Hub <ArrowUpRight size={16} /></a>
        </div>
      </div>
    </section>
  );
}

function Services() {
  const [hubServices, setHubServices] = useState<Service[]>([]);
  useEffect(() => {
    let active = true;
    loadWebsiteServices().then((rows) => { if (active) setHubServices(rows); }).catch((error: unknown) => {
      console.info('Using MetroDEVOPS service catalogue fallback.', error);
    });
    return () => { active = false; };
  }, []);
  const groups = serviceGroups.map((group) => ({
    ...group,
    items: group.items.map(([name, description]) => {
      const match = hubServices.find((item) => item.name.toLowerCase() === name.toLowerCase());
      return [name, match?.description || description] as [string, string];
    }),
  }));
  const extraServices = hubServices.filter((service) => !groups.some((group) => group.items.some(([name]) => name.toLowerCase() === service.name.toLowerCase())));
  return (
    <section id="services" className="section services-section">
      <div className="section-shell">
        <div className="section-heading section-heading-row"><div><p className="section-kicker">What we do</p><h2>Technology that <span>moves work forward.</span></h2></div><p>Start with the challenge in front of you. We’ll help you choose the right digital solution — without making it more complicated than it needs to be.</p></div>
        <div className="service-groups">
          {groups.map(({ number, title, intro, icon: Icon, items }) => <div className="service-group" key={number}>
            <div className="service-group-head"><span className="service-number">{number}</span><div className="service-group-title"><div className="service-title-line"><Icon size={19} /><h3>{title}</h3></div><p>{intro}</p></div></div>
            <div className="service-list">{items.map(([name, description]) => <article className="service-item" key={name}><span className="service-check"><Check size={14} /></span><div><h4>{name}</h4><p>{description}</p></div><ArrowUpRight className="service-arrow" size={16} /></article>)}</div>
          </div>)}
        </div>
        {extraServices.length > 0 && <div className="extra-services"><span>MORE FROM OUR HUB CATALOGUE</span>{extraServices.slice(0, 6).map((item) => <span key={item.name}>{item.name}</span>)}</div>}
      </div>
    </section>
  );
}

function Work() {
  return (
    <section id="work" className="section work-section">
      <div className="section-shell">
        <div className="section-heading section-heading-row"><div><p className="section-kicker">Selected work & experiments</p><h2>Ideas made <span>useful.</span></h2></div><p>We explore practical digital experiences — from product-led websites to tools that help businesses organize their operations.</p></div>
        <div className="project-grid">
          {projects.map((project, index) => <a className="project-card" href={project.url} target="_blank" rel="noreferrer" key={project.name}>
            <div className={`project-art ${project.tone}`}><div className="project-art-grid" /><span className="project-index">0{index + 1} / 03</span><span className="project-monogram">{project.mark}</span><span className="project-open"><ArrowUpRight size={18} /></span><span className="project-art-label">{project.tag}</span></div>
            <div className="project-copy"><span className="project-label">{project.label}</span><h3>{project.name}</h3><p>{project.description}</p><span className="project-link">Explore project <MoveRight size={15} /></span></div>
          </a>)}
        </div>
        <p className="work-note">A mix of shipped work and product explorations. Scope and capabilities vary by project.</p>
      </div>
    </section>
  );
}

function Process() {
  const items = [
    ['Listen', 'Understand the business, the customer and the actual problem to solve.'],
    ['Shape', 'Agree the right scope, structure and priorities before building.'],
    ['Build', 'Create, test and refine a responsive solution around those priorities.'],
    ['Hand over & improve', 'Explain how to use it, then keep improving where ongoing support is needed.'],
  ];
  return <section className="process-section"><div className="section-shell process-inner"><div className="process-intro"><p className="section-kicker">How we work</p><h2>Clear steps.<br /><span>Useful outcomes.</span></h2><p>No mystery process. You know what we’re building, why it matters and what happens next.</p></div><div className="process-steps">{items.map(([title, text], i) => <div className="process-step" key={title}><span className="process-number">0{i + 1}</span><div><h3>{title}</h3><p>{text}</p></div></div>)}</div></div></section>;
}

function Contact() {
  return (
    <section id="contact" className="contact-section">
      <div className="section-shell">
        <div className="contact-panel"><div className="contact-grid" /><div className="contact-copy"><p className="section-kicker section-kicker-light">Your next step starts here</p><h2>Let's build something<br /><span>your business can grow with.</span></h2><p>Tell us what you’re trying to improve. We’ll talk through the best next step and a sensible scope for your business.</p><div className="contact-actions"><a className="button button-light" href={WHATSAPP} target="_blank" rel="noreferrer">Talk to MetroDEVOPS <ArrowUpRight size={18} /></a><a className="contact-email" href="mailto:hello@metrodevops.com">Prefer email? Get in touch</a></div></div><div className="contact-stamp"><Zap size={23} /><span>Build with purpose.</span><span>Grow with control.</span></div></div>
      </div>
    </section>
  );
}

function Footer() {
  return <footer className="site-footer"><div className="section-shell footer-main"><div className="footer-brand"><Brand light /><p>Helping African businesses build useful digital foundations and grow into technology.</p></div><div className="footer-links"><span>EXPLORE</span><a href="#approach">Our approach</a><a href="#services">Services</a><a href="#work">Selected work</a></div><div className="footer-links"><span>CONNECT</span><a href="https://instagram.com/m6tr_0" target="_blank" rel="noreferrer">Instagram <ArrowUpRight size={13} /></a><a href="https://tiktok.com/@metrothedeveloper" target="_blank" rel="noreferrer">TikTok <ArrowUpRight size={13} /></a><a href="https://github.com/DaveAust1n" target="_blank" rel="noreferrer">GitHub <ArrowUpRight size={13} /></a></div><div className="footer-links"><span>METRODEVOPS HUB</span><a href={HUB} target="_blank" rel="noreferrer">Open the Hub <ArrowUpRight size={13} /></a><a href={`${HUB}/templates`} target="_blank" rel="noreferrer">Browse templates <ArrowUpRight size={13} /></a></div></div><div className="section-shell footer-bottom"><span>© {new Date().getFullYear()} MetroDEVOPS. Built with purpose.</span><a href="#home">Back to top ↑</a></div></footer>;
}

export default function App() {
  useEffect(() => {
    installVisualEditorBridge();
    let active = true;
    import('./lib/websiteContent').then(({ loadWebsiteContent }) => loadWebsiteContent()).then(({ content }) => {
      if (!active || !content?.social_links?._visualEdits) return;
      try { applySavedVisualEdits(JSON.parse(content.social_links._visualEdits) as VisualEdit[]); }
      catch (error) { console.warn('Saved visual website edits could not be applied:', error); }
    }).catch((error: unknown) => console.info('Hub content connection is not available; using site defaults.', error));
    return () => { active = false; };
  }, []);

  return <><Header /><main><Hero /><Approach /><Services /><Work /><Process /><Contact /></main><Footer /></>;
}
