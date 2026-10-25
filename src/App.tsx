import { useEffect, useRef, useState, type FormEvent, type ReactNode } from "react";
import {
  AnimatePresence,
  motion,
  useInView,
  useMotionValue,
  useReducedMotion,
  useSpring,
  useTransform,
} from "framer-motion";
import {
  ArrowRight,
  ArrowUpRight,
  BriefcaseBusiness,
  Check,
  ChevronDown,
  CircleHelp,
  Code2,
  GitBranch,
  Globe,
  House,
  Infinity,
  Layers,
  LifeBuoy,
  Menu,
  PanelTop,
  Quote,
  Search,
  Smartphone,
  Sparkles,
  UserRound,
  X,
  type LucideIcon,
} from "lucide-react";
import { portfolioContent } from "./data/portfolio";

const navigationIcons: Record<string, LucideIcon> = {
  home: House,
  about: UserRound,
  services: Layers,
  works: BriefcaseBusiness,
  process: GitBranch,
  faqs: CircleHelp,
  testimonials: Quote,
  support: LifeBuoy,
};

const toolIcons: Record<string, LucideIcon> = {
  code: Code2,
  notion: PanelTop,
  meta: Infinity,
  copilot: Sparkles,
};

const serviceIcons: Record<string, LucideIcon> = {
  web: Globe,
  research: Search,
  mobile: Smartphone,
  brand: Sparkles,
};

const ui = portfolioContent.ui;

function SocialMark({ icon }: { icon: string }) {
  if (icon === "linkedin") {
    return <span className="social-mark-linkedin" aria-hidden="true">in</span>;
  }

  if (icon === "dribbble") {
    return (
      <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
        <circle cx="12" cy="12" r="8.3" />
        <path d="M7.3 5.1c4.2 3.8 7.1 8.1 9 13.7M4.4 14.1c4.6-2.5 10.7-3.6 15.1-1.4M6.3 8.2c4.3.3 9.1-1.4 11.4-4" />
      </svg>
    );
  }

  return (
    <svg aria-hidden="true" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6">
      <rect x="3.8" y="3.8" width="16.4" height="16.4" rx="4.7" />
      <circle cx="12" cy="12" r="3.7" />
      <circle cx="17.4" cy="6.8" r="0.7" fill="currentColor" stroke="none" />
    </svg>
  );
}

function Reveal({
  children,
  className,
  delay = 0,
}: {
  children: ReactNode;
  className?: string;
  delay?: number;
}) {
  const reducedMotion = useReducedMotion();

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { opacity: 0, y: 18 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.12 }}
      transition={{ duration: 0.58, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

function NavigationLinks({
  activeSection,
  onNavigate,
}: {
  activeSection: string;
  onNavigate?: () => void;
}) {
  return (
    <>
      {portfolioContent.navigation.map((item) => {
        const Icon = navigationIcons[item.icon];
        const sectionId = item.href.slice(1);

        return (
          <a
            key={item.href}
            className={`navigation-link${activeSection === sectionId ? " is-active" : ""}`}
            href={item.href}
            aria-current={activeSection === sectionId ? "page" : undefined}
            onClick={onNavigate}
          >
            <Icon aria-hidden="true" size={17} strokeWidth={1.7} />
            <span>{item.label}</span>
            {activeSection === sectionId && <span className="nav-active-dot" aria-hidden="true" />}
          </a>
        );
      })}
    </>
  );
}

function ProfileSidebar({ activeSection }: { activeSection: string }) {
  return (
    <aside className="sidebar-panel" aria-label={ui.aria.profileNavigation}>
      <a className="profile-block" href="#home" aria-label={ui.aria.homeLink}>
        <span className="profile-avatar" aria-hidden="true">
          <UserRound size={31} strokeWidth={1.35} />
          <span className="avatar-glow" />
        </span>
        <span className="profile-role">{portfolioContent.profile.role}</span>
        <span className="profile-name">{portfolioContent.profile.name}</span>
      </a>

      <div className="social-row" aria-label={ui.aria.socials}>
        {portfolioContent.profile.socials.map((social) => {
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noreferrer"
              aria-label={`${ui.aria.socialLinkPrefix} ${social.name}`}
            >
              <SocialMark icon={social.icon} />
            </a>
          );
        })}
      </div>

      <div className="sidebar-actions">
        <a className="button button-primary sidebar-hire" href="#support">
          {ui.buttons.hire} <ArrowUpRight aria-hidden="true" size={15} />
        </a>
        <a className="button button-outline" href="#support">
          {ui.buttons.contact}
        </a>
      </div>

      <div className="navigation-caption">{ui.sidebar.explore}</div>
      <nav className="sidebar-navigation" aria-label={ui.aria.primaryNavigation}>
        <NavigationLinks activeSection={activeSection} />
      </nav>
      <div className="sidebar-location">
        <span className="location-indicator" aria-hidden="true" />
        {portfolioContent.profile.location}
      </div>
    </aside>
  );
}

function MobileHeader({
  activeSection,
}: {
  activeSection: string;
}) {
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    document.body.classList.toggle("menu-open", menuOpen);
    return () => document.body.classList.remove("menu-open");
  }, [menuOpen]);

  return (
    <header className="mobile-header">
      <a className="mobile-brand" href="#home" onClick={() => setMenuOpen(false)}>
        <span className="mobile-monogram" aria-hidden="true">{portfolioContent.profile.monogram}</span>
        <span>
          <strong>{portfolioContent.profile.name}</strong>
          <small>{portfolioContent.profile.role}</small>
        </span>
      </a>
      <button
        className="mobile-menu-toggle"
        type="button"
        aria-label={menuOpen ? ui.aria.closeMenu : ui.aria.openMenu}
        aria-expanded={menuOpen}
        aria-controls="mobile-navigation"
        onClick={() => setMenuOpen((open) => !open)}
      >
        {menuOpen ? <X size={19} /> : <Menu size={19} />}
      </button>
      <AnimatePresence>
        {menuOpen && (
          <motion.nav
            id="mobile-navigation"
            className="mobile-navigation"
            aria-label={ui.aria.mobileNavigation}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.18 }}
          >
            <NavigationLinks
              activeSection={activeSection}
              onNavigate={() => setMenuOpen(false)}
            />
            <a className="button button-primary mobile-hire" href="#support" onClick={() => setMenuOpen(false)}>
              {ui.buttons.hire} <ArrowUpRight aria-hidden="true" size={15} />
            </a>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}

function HeroSection() {
  const reducedMotion = useReducedMotion();
  const [firstName, lastName] = portfolioContent.profile.name.split(" ");

  return (
    <motion.section
      id="home"
      className="hero-panel panel"
      aria-labelledby="hero-title"
      initial={reducedMotion ? false : { opacity: 0, y: 14 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.72, ease: [0.22, 1, 0.36, 1] }}
    >
      <div
        className="hero-portrait"
        role="img"
        aria-label={ui.aria.portrait}
      >
        <div className="portrait-light portrait-light-one" />
        <div className="portrait-light portrait-light-two" />
        <div className="portrait-orbit portrait-orbit-one" />
        <div className="portrait-orbit portrait-orbit-two" />
        <div className="portrait-silhouette">
          <span className="portrait-head" />
          <span className="portrait-shoulders" />
          <UserRound className="portrait-icon" aria-hidden="true" strokeWidth={0.8} />
        </div>
        <div className="portrait-fade" />
      </div>

      <div className="hero-copy">
        <p className="hero-eyebrow">{portfolioContent.profile.heroEyebrow}</p>
        <h1 id="hero-title">
          <span>{firstName}</span>
          <span>{lastName}<span className="name-period">.</span></span>
        </h1>
        <p className="hero-description">{portfolioContent.profile.heroDescription}</p>
        <p className="hero-meta">
          <span>{portfolioContent.profile.specialty}</span>
          <span>{portfolioContent.profile.location}</span>
        </p>
        <div className="hero-actions">
          <a className="button button-primary" href="#support">
            {ui.buttons.hire} <ArrowUpRight aria-hidden="true" size={16} />
          </a>
          <a className="round-button" href="#works" aria-label={ui.aria.exploreWork}>
            <ArrowRight aria-hidden="true" size={17} />
          </a>
        </div>
      </div>
    </motion.section>
  );
}

function MarqueeSection() {
  const brands = [...portfolioContent.marquee.brands, ...portfolioContent.marquee.brands];

  return (
    <Reveal>
      <section className="panel marquee-panel" aria-labelledby="marquee-heading">
        <div className="marquee-heading-row">
          <h2 className="eyebrow-heading" id="marquee-heading">{portfolioContent.marquee.title}</h2>
          <span className="marquee-rule" aria-hidden="true" />
          <span className="marquee-note">{ui.marquee.note}</span>
        </div>
        <div
          className="marquee-window"
          role="region"
          aria-label={`${ui.aria.seenAcross} ${portfolioContent.marquee.brands.join(", ")}`}
        >
          <div className="marquee-track" aria-hidden="true">
            {brands.map((brand, index) => (
              <span className={`brand-word brand-word-${brand.toLowerCase()}`} key={`${brand}-${index}`}>
                {brand}
              </span>
            ))}
          </div>
        </div>
      </section>
    </Reveal>
  );
}

function ToolsSection() {
  return (
    <Reveal>
      <section className="panel tools-panel" aria-labelledby="tools-heading">
        <div className="section-heading compact-heading">
          <div>
            <p className="section-kicker">{ui.tools.kicker}</p>
            <h2 id="tools-heading">{ui.tools.title}</h2>
          </div>
          <p className="section-aside">{ui.tools.description}</p>
        </div>
        <div className="tools-grid">
          {portfolioContent.tools.map((tool) => {
            const Icon = toolIcons[tool.mark];
            return (
              <article className="tool-card" key={tool.name}>
                <span className={`tool-icon tool-icon-${tool.mark}`} aria-hidden="true">
                  <Icon size={22} strokeWidth={1.65} />
                </span>
                <span className="tool-name">{tool.name}</span>
                <span className="tool-level">{tool.level}</span>
              </article>
            );
          })}
        </div>
      </section>
    </Reveal>
  );
}

function CountUp({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const counterRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(counterRef, { once: true, amount: 0.65 });
  const reducedMotion = useReducedMotion();
  const count = useMotionValue(0);
  const spring = useSpring(count, { damping: 24, stiffness: 70, mass: 0.7 });
  const formattedCount = useTransform(spring, (current) => `${Math.round(current)}${suffix}`);

  useEffect(() => {
    if (inView) count.set(value);
  }, [count, inView, value]);

  return (
    <article className="stat-card">
      <span className="stat-value" aria-label={`${value}${suffix}`}>
        {reducedMotion ? `${value}${suffix}` : <motion.span ref={counterRef}>{formattedCount}</motion.span>}
      </span>
      <span className="stat-label">{label}</span>
    </article>
  );
}

function BiographySection() {
  return (
    <Reveal>
      <section className="panel biography-panel" id="about" aria-labelledby="biography-heading">
        <div className="biography-copy">
          <p className="section-kicker">{portfolioContent.biography.tag}</p>
          <h2 className="biography-title" id="biography-heading">{portfolioContent.biography.title}</h2>
        </div>
        <div className="stats-grid" aria-label={ui.biography.statsLabel}>
          {portfolioContent.stats.map((stat) => (
            <CountUp key={stat.label} {...stat} />
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function ServiceArtwork({ type }: { type: string }) {
  const Icon = serviceIcons[type];
  return (
    <div className={`service-artwork service-artwork-${type}`} role="img" aria-label={ui.aria.servicePreview}>
      <span className="service-art-orbit" />
      <span className="service-art-orbit service-art-orbit-two" />
      <span className="service-art-icon"><Icon aria-hidden="true" size={34} strokeWidth={1.35} /></span>
      <span className="service-art-label">{ui.services.previewLabel}</span>
    </div>
  );
}

function ServicesSection() {
  const [openService, setOpenService] = useState("001");

  return (
    <Reveal>
      <section className="panel services-panel" id="services" aria-labelledby="services-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{ui.services.kicker}</p>
            <h2 id="services-heading">{ui.services.title}</h2>
          </div>
          <p className="section-aside">{ui.services.description}</p>
        </div>
        <div className="service-list">
          {portfolioContent.services.map((service) => {
            const isOpen = openService === service.number;
            const detailId = `service-detail-${service.number}`;

            return (
              <article className={`service-row${isOpen ? " is-open" : ""}`} key={service.number}>
                <div className="service-row-main">
                  <span className="service-number">{service.number}</span>
                  <div className="service-name-block">
                    <h3>{service.title}</h3>
                    <div className="service-categories">
                      <span className="category-label">{ui.services.categoryLabel}</span>
                      {service.categories.map((category) => (
                        <span className="category-item" key={category}>{category}</span>
                      ))}
                    </div>
                  </div>
                  <button
                    className="service-toggle"
                    type="button"
                    aria-label={`${isOpen ? ui.buttons.collapse : ui.buttons.expand} ${service.title}`}
                    aria-expanded={isOpen}
                    aria-controls={detailId}
                    onClick={() => setOpenService(isOpen ? "" : service.number)}
                  >
                    <ArrowUpRight aria-hidden="true" size={17} />
                  </button>
                </div>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      className="service-detail"
                      id={detailId}
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{service.detail}</p>
                      <ServiceArtwork type={service.visual} />
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </section>
    </Reveal>
  );
}

function CreativeToolkitSection() {
  const reducedMotion = useReducedMotion();

  return (
    <Reveal>
      <section className="panel toolkit-panel" aria-labelledby="toolkit-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{ui.toolkit.kicker}</p>
            <h2 id="toolkit-heading">{ui.toolkit.title}</h2>
          </div>
          <p className="section-aside">{ui.toolkit.description}</p>
        </div>
        <div className="creative-tools-grid">
          {portfolioContent.creativeTools.map((tool, index) => (
            <article className="creative-tool" key={tool.name}>
              <div className="progress-ring-wrap" aria-label={`${tool.name}: ${tool.progress}%`}>
                <svg className="progress-ring" viewBox="0 0 100 100" aria-hidden="true">
                  <circle className="progress-ring-track" cx="50" cy="50" r="43" />
                  <motion.circle
                    className="progress-ring-value"
                    cx="50"
                    cy="50"
                    r="43"
                    initial={reducedMotion ? { pathLength: tool.progress / 100 } : { pathLength: 0 }}
                    whileInView={{ pathLength: tool.progress / 100 }}
                    viewport={{ once: true, amount: 0.7 }}
                    transition={{ duration: 1.05, delay: index * 0.11, ease: "easeOut" }}
                  />
                </svg>
                <span className="progress-ring-label">{tool.progress}<small>%</small></span>
              </div>
              <h3>{tool.name}</h3>
            </article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function ProjectArtwork({ project }: { project: (typeof portfolioContent.work)[number] }) {
  return (
    <div className={`project-art project-art-${project.visual}`} aria-hidden="true">
      <div className="project-art-orb" />
      <div className="project-browser">
        <div className="browser-bar">
          <span /><span /><span />
          <b>{project.wordmark}</b>
          <i />
        </div>
        <div className="browser-content">
          <span className="browser-kicker">{ui.works.artKicker}</span>
          <strong>{project.wordmark}</strong>
          <span className="browser-lines"><i /><i /></span>
          <span className="browser-action">{ui.works.artAction} <ArrowUpRight size={10} /></span>
          <span className="browser-shape"><Layers size={34} strokeWidth={1.2} /></span>
        </div>
      </div>
    </div>
  );
}

function WorksSection() {
  return (
    <Reveal>
      <section className="panel works-panel" id="works" aria-labelledby="works-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{ui.works.kicker}</p>
            <h2 id="works-heading">{ui.works.title}</h2>
          </div>
          <p className="section-aside">{ui.works.description}</p>
        </div>
        <div className="projects-grid">
          {portfolioContent.work.map((project, index) => (
            <motion.article
              className="project-card"
              key={project.name}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.48, delay: index * 0.09, ease: [0.22, 1, 0.36, 1] }}
            >
              <ProjectArtwork project={project} />
              <div className="project-info">
                <div>
                  <h3>{project.name}</h3>
                  <p>{project.category}</p>
                </div>
                <span className="project-year">{project.year}</span>
              </div>
              <p className="project-summary">{project.summary}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function ProcessSection() {
  return (
    <Reveal>
      <section className="panel process-panel" id="process" aria-labelledby="process-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{ui.process.kicker}</p>
            <h2 id="process-heading">{ui.process.title}</h2>
          </div>
          <p className="section-aside">{ui.process.description}</p>
        </div>
        <ol className="process-list">
          {portfolioContent.process.map((step) => (
            <li className="process-step" key={step.number}>
              <span className="process-number">{step.number}</span>
              <div>
                <h3>{step.title}</h3>
                <p>{step.copy}</p>
              </div>
            </li>
          ))}
        </ol>
      </section>
    </Reveal>
  );
}

function PricingSection({ onChoosePlan }: { onChoosePlan: (plan: string) => void }) {
  return (
    <Reveal>
      <section className="panel pricing-panel" id="pricing" aria-labelledby="pricing-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{ui.pricing.kicker}</p>
            <h2 id="pricing-heading">{ui.pricing.title}</h2>
          </div>
          <p className="section-aside">{ui.pricing.description}</p>
        </div>
        <div className="pricing-grid">
          {portfolioContent.pricing.map((plan, index) => (
            <motion.article
              className={`plan-card${plan.popular ? " plan-card-featured" : ""}`}
              key={`${plan.name}-${plan.price}`}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12 }}
              transition={{ duration: 0.5, delay: index * 0.12 }}
            >
              {plan.popular && <span className="popular-label">{ui.pricing.popular}</span>}
              <div className="plan-header">
                <div>
                  <h3>{plan.name}</h3>
                  <p>{plan.description}</p>
                </div>
                <span className="plan-spark" aria-hidden="true"><Sparkles size={18} /></span>
              </div>
              <div className="plan-price">
                <strong>{plan.price}</strong>
                <span>{ui.pricing.perMonth}</span>
              </div>
              <p className="plan-user-price">{ui.pricing.plus} {plan.perUser}</p>
              <a
                className={plan.popular ? "button button-primary plan-button" : "button button-outline plan-button"}
                href="#support"
                onClick={() => onChoosePlan(`${plan.name}${ui.pricing.interestConnector}${plan.price}${ui.pricing.perMonth}`)}
              >
                {ui.buttons.send} <ArrowUpRight aria-hidden="true" size={15} />
              </a>
              <div className="plan-features">
                <h4>{ui.pricing.planDetails}</h4>
                <ul>
                  {plan.features.map((feature) => (
                    <li key={feature}>
                      <Check aria-hidden="true" size={15} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function FaqSection() {
  const [openFaq, setOpenFaq] = useState(0);

  return (
    <Reveal>
      <section className="panel faq-panel" id="faqs" aria-labelledby="faq-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{ui.faqs.kicker}</p>
            <h2 id="faq-heading">{ui.faqs.title}</h2>
          </div>
          <p className="section-aside">{ui.faqs.description}</p>
        </div>
        <div className="faq-list">
          {portfolioContent.faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            const answerId = `faq-answer-${index}`;

            return (
              <article className={`faq-item${isOpen ? " is-open" : ""}`} key={faq.question}>
                <h3>
                  <button
                    className="faq-trigger"
                    type="button"
                    aria-expanded={isOpen}
                    aria-controls={answerId}
                    onClick={() => setOpenFaq(isOpen ? -1 : index)}
                  >
                    <span>{faq.question}</span>
                    <ChevronDown aria-hidden="true" size={18} />
                  </button>
                </h3>
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      id={answerId}
                      className="faq-answer-wrap"
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
                    >
                      <p>{faq.answer}</p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </article>
            );
          })}
        </div>
      </section>
    </Reveal>
  );
}

function TestimonialsSection() {
  return (
    <Reveal>
      <section className="panel testimonials-panel" id="testimonials" aria-labelledby="testimonials-heading">
        <div className="section-heading">
          <div>
            <p className="section-kicker">{ui.testimonials.kicker}</p>
            <h2 id="testimonials-heading">{ui.testimonials.title}</h2>
          </div>
          <p className="section-aside">{ui.testimonials.description}</p>
        </div>
        <div className="testimonials-grid">
          {portfolioContent.testimonials.map((testimonial, index) => (
            <motion.article
              className="testimonial-card"
              key={testimonial.name}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.18 }}
              transition={{ duration: 0.46, delay: index * 0.1 }}
            >
              <span className="quote-mark" aria-hidden="true">“</span>
              <blockquote>{testimonial.quote}</blockquote>
              <div className="testimonial-person">
                <span className="testimonial-initials" aria-hidden="true">{testimonial.initials}</span>
                <span>
                  <strong>{testimonial.name}</strong>
                  <small>{testimonial.title}</small>
                </span>
              </div>
            </motion.article>
          ))}
        </div>
      </section>
    </Reveal>
  );
}

function SupportSection({
  inquiry,
  onInquiryChange,
}: {
  inquiry: string;
  onInquiryChange: (value: string) => void;
}) {
  const [sent, setSent] = useState(false);

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSent(true);
  }

  return (
    <Reveal>
      <section className="panel support-panel" id="support" aria-labelledby="support-heading">
        <div className="support-copy">
          <p className="section-kicker">{portfolioContent.support.tag}</p>
          <h2 id="support-heading">{portfolioContent.support.title}</h2>
          <p className="support-description">{portfolioContent.support.description}</p>
          <a className="support-email" href={`mailto:${portfolioContent.profile.email}`}>
            {portfolioContent.profile.email} <ArrowUpRight aria-hidden="true" size={15} />
          </a>
        </div>
        <form className="contact-form" onSubmit={handleSubmit}>
          <h3>{portfolioContent.support.formTitle}</h3>
          <div className="form-row">
            <label>
              <span>{ui.support.nameLabel}</span>
              <input name="name" type="text" autoComplete="name" placeholder={ui.support.namePlaceholder} required />
            </label>
            <label>
              <span>{ui.support.emailLabel}</span>
              <input name="email" type="email" autoComplete="email" placeholder={ui.support.emailPlaceholder} required />
            </label>
          </div>
          <label>
            <span>{ui.support.messageLabel}</span>
            <textarea
              name="message"
              rows={4}
              placeholder={ui.support.messagePlaceholder}
              value={inquiry}
              onChange={(event) => {
                onInquiryChange(event.target.value);
                setSent(false);
              }}
              required
            />
          </label>
          <div className="form-bottom">
            <button className="button button-primary" type="submit">
              {portfolioContent.support.submitLabel} <ArrowUpRight aria-hidden="true" size={15} />
            </button>
            <span className="form-note">{ui.support.formNote}</span>
          </div>
          {sent && (
            <p className="form-feedback" role="status">
              {ui.support.formSuccess}
            </p>
          )}
        </form>
      </section>
    </Reveal>
  );
}

function Footer() {
  return (
    <footer className="site-footer">
      <a className="footer-mark" href="#home" aria-label={ui.aria.backToTop}>{portfolioContent.profile.monogram}<span>.</span></a>
      <p>{portfolioContent.footer.note}</p>
      <span>{portfolioContent.footer.copyright}</span>
    </footer>
  );
}

export default function App() {
  const [activeSection, setActiveSection] = useState("home");
  const [inquiry, setInquiry] = useState("");

  useEffect(() => {
    const sections = portfolioContent.navigation
      .map((item) => document.querySelector<HTMLElement>(item.href))
      .filter((section): section is HTMLElement => section !== null);

    if (!("IntersectionObserver" in window)) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const current = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (current) setActiveSection(current.target.id);
      },
      { rootMargin: "-22% 0px -62% 0px", threshold: [0, 0.1, 0.35, 0.65] },
    );

    sections.forEach((section) => observer.observe(section));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="portfolio-site">
      <div className="ambient-shape ambient-shape-one" aria-hidden="true" />
      <div className="ambient-shape ambient-shape-two" aria-hidden="true" />
      <MobileHeader activeSection={activeSection} />
      <div className="app-shell">
        <ProfileSidebar activeSection={activeSection} />
        <main className="main-content">
          <HeroSection />
          <MarqueeSection />
          <ToolsSection />
          <BiographySection />
          <ServicesSection />
          <CreativeToolkitSection />
          <WorksSection />
          <ProcessSection />
          <PricingSection
            onChoosePlan={(plan) => setInquiry(`${ui.pricing.interestPrefix}${plan}${ui.pricing.interestSuffix}`)}
          />
          <FaqSection />
          <TestimonialsSection />
          <SupportSection inquiry={inquiry} onInquiryChange={setInquiry} />
          <Footer />
        </main>
      </div>
    </div>
  );
}