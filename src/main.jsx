import React, { useEffect, useMemo, useRef, useState } from "react";
import { createRoot } from "react-dom/client";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowLeft, ArrowRight, ArrowUpRight, ChevronDown, Instagram, Linkedin, Menu, X } from "lucide-react";
import {
  capabilities,
  clientLogos,
  heroFilmstrip,
  leadership,
  navLinks,
  proofMetrics,
  processSteps,
  projectPlaceholders,
  videoUrl,
  workingPrinciples,
} from "./content";
import "./styles.css";

const ease = [0.22, 1, 0.36, 1];
const heroCapabilities = [
  "Brand Activations",
  "Influencer Marketing",
  "Content Production",
  "Events & Launches",
  "Livestream Commerce",
  "Media Strategy & Buying",
];
const heroCapabilityLine = heroCapabilities.join(" — ");

function getPath() {
  return window.location.pathname.replace(/\/+$/, "") || "/";
}

function useRoute() {
  const [path, setPath] = useState(getPath);

  useEffect(() => {
    const onPop = () => setPath(getPath());
    window.addEventListener("popstate", onPop);
    return () => window.removeEventListener("popstate", onPop);
  }, []);

  const navigate = (href) => {
    if (href === path) return;
    window.history.pushState({}, "", href);
    setPath(getPath());
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return { path, navigate };
}

function useMotionSettings() {
  const reduceMotion = useReducedMotion();
  return {
    reduceMotion,
    fade: {
      initial: reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 24 },
      whileInView: { opacity: 1, y: 0 },
      viewport: { once: true, amount: 0.22 },
      transition: { duration: reduceMotion ? 0 : 0.62, ease },
    },
  };
}

function Link({ href, navigate, className = "", children, onClick, ...props }) {
  return (
    <a
      href={href}
      className={className}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
        event.preventDefault();
        navigate(href);
      }}
      {...props}
    >
      {children}
    </a>
  );
}

function Logo({ navigate }) {
  return (
    <Link
      href="/"
      navigate={navigate}
      className="inline-flex rounded-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5E0ED7]"
      aria-label="Planova Creative home"
    >
      <img src="/logo-transparent.png" alt="Planova" className="h-auto w-[118px] sm:w-[138px]" />
    </Link>
  );
}

function CtaLink({ href = "/contact", navigate, children = "Start A Project", className = "" }) {
  return (
    <Link
      href={href}
      navigate={navigate}
      className={`group inline-flex min-h-11 items-center justify-center gap-2 rounded-full font-semibold text-[#5E0ED7] underline-offset-4 transition hover:underline focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5E0ED7] ${className}`}
    >
      <span>{children}</span>
      <ArrowUpRight className="h-4 w-4 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />
    </Link>
  );
}

function Header({ path, navigate }) {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => setIsOpen(false), [path]);

  return (
    <>
      <header className="fixed left-0 right-0 top-0 z-40 border-b border-black/10 bg-[#f8f3eb]/88 px-4 py-3 backdrop-blur-md sm:px-7 lg:px-10">
        <div className="mx-auto flex max-w-[1680px] items-center justify-between gap-4">
          <Logo navigate={navigate} />

          <nav className="hidden items-center gap-7 text-sm font-semibold text-black/72 lg:flex" aria-label="Primary navigation">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                navigate={navigate}
                className={`rounded-sm transition hover:text-[#5E0ED7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5E0ED7] ${
                  path === link.href || path.startsWith(`${link.href}/`) ? "text-[#5E0ED7]" : ""
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <CtaLink navigate={navigate} className="px-1 text-sm uppercase tracking-[0.16em]">
              Start A Project
            </CtaLink>
          </div>

          <div className="flex items-center gap-2 lg:hidden">
            <CtaLink navigate={navigate} className="px-3 text-[11px] uppercase tracking-[0.12em] sm:text-xs">
              Start
            </CtaLink>
            <button
              type="button"
              onClick={() => setIsOpen(true)}
              className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white transition hover:bg-[#5E0ED7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5E0ED7]"
              aria-label="Open navigation menu"
              aria-expanded={isOpen}
            >
              <Menu className="h-5 w-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {isOpen ? (
          <motion.div
            className="fixed inset-0 z-50 flex min-h-screen flex-col bg-[#f8f3eb] px-5 py-5 text-black lg:hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.22, ease }}
          >
            <div className="flex items-center justify-between">
              <Logo navigate={navigate} />
              <button
                type="button"
                onClick={() => setIsOpen(false)}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-black text-white focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5E0ED7]"
                aria-label="Close navigation menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <nav className="mt-14 flex flex-col gap-6 text-4xl font-semibold leading-none" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <Link key={link.href} href={link.href} navigate={navigate}>
                  {link.label}
                </Link>
              ))}
            </nav>

            <CtaLink navigate={navigate} className="mt-auto w-full border border-[#5E0ED7] px-5 py-4 text-base uppercase tracking-[0.18em]">
              Start A Project
            </CtaLink>
          </motion.div>
        ) : null}
      </AnimatePresence>
    </>
  );
}

function OrbitField({ dark = false }) {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <span className={`orbit orbit-one ${dark ? "text-black/12" : ""}`} />
      <span className={`orbit orbit-two ${dark ? "text-[#5E0ED7]/20" : ""}`} />
      <span className="orbit-node orbit-node-a" />
      <span className="orbit-node orbit-node-b" />
    </div>
  );
}

function ResponsiveVideo({ className = "" }) {
  const reduceMotion = useReducedMotion();
  return (
    <video
      className={`h-full w-full object-cover ${className}`}
      autoPlay={!reduceMotion}
      loop
      muted
      playsInline
      preload="metadata"
      poster="/logo.jpg"
      aria-label="Planova campaign footage placeholder"
    >
      <source src={videoUrl} media="(min-width: 768px)" type="video/mp4" />
      <source src={videoUrl} media="(max-width: 767px)" type="video/mp4" />
    </video>
  );
}

function HeroFilmstrip() {
  const reduceMotion = useReducedMotion();

  return (
    <div className="hero-filmstrip" aria-label="Planova campaign media montage">
      {heroFilmstrip.map((panel, index) => (
        <div key={panel.label} className={`hero-film-panel ${panel.className}`}>
          <video
            className="h-full w-full object-cover"
            autoPlay={!reduceMotion}
            loop
            muted
            playsInline
            preload={index === 0 ? "metadata" : "none"}
            aria-label={panel.label}
          >
            <source src={videoUrl} type="video/mp4" />
          </video>
        </div>
      ))}
    </div>
  );
}

function PlaceholderMedia({ item, aspect = "aspect-[4/5] md:aspect-[16/10]", children }) {
  return (
    <picture className={`relative block overflow-hidden bg-gradient-to-br ${item.tone} ${aspect}`}>
      <source media="(max-width: 767px)" srcSet="/logo-transparent.png" />
      <img
        src="/logo-transparent.png"
        alt={`${item.name} project media placeholder pending approved photography`}
        loading="lazy"
        className="absolute left-1/2 top-1/2 z-10 w-[58%] -translate-x-1/2 -translate-y-1/2 opacity-70 mix-blend-multiply"
      />
      <div className="absolute inset-0 grain opacity-25" aria-hidden="true" />
      <OrbitField />
      {children}
    </picture>
  );
}

function SectionLabel({ children, light = false }) {
  return (
    <p className={`text-xs font-semibold uppercase tracking-[0.18em] ${light ? "text-white/60" : "text-[#5E0ED7]"}`}>
      {children}
    </p>
  );
}

function ClientLogoItem({ client, navigate, duplicate = false }) {
  const logoStyle = {
    "--logo-scale": client.scale || 1,
    "--logo-x": `${client.offsetX || 0}px`,
    "--logo-y": `${client.offsetY || 0}px`,
  };
  const content = client.src ? (
    <img
      src={client.src}
      alt={duplicate ? "" : client.alt}
      loading="lazy"
      className="client-logo-image"
      style={logoStyle}
    />
  ) : (
    <span className="client-logo-missing" style={logoStyle}>
      <span className="client-logo-name">{client.name}</span>
      <span className="client-logo-status">{client.assetStatus}</span>
    </span>
  );

  if (client.href && !duplicate) {
    return (
      <Link
        href={client.href}
        navigate={navigate}
        className="client-logo-link"
        aria-label={`${client.name} case study`}
      >
        {content}
      </Link>
    );
  }

  return <span className="client-logo-link">{content}</span>;
}

function ClientLogoMarquee({ navigate }) {
  return (
    <section className="bg-[#f8f3eb] px-4 py-8 text-[#2f2119] sm:px-7 md:py-10 lg:px-10" aria-labelledby="client-logo-marquee-title">
      <div className="mx-auto max-w-[1680px] border-y border-[#2f2119]/16 py-8">
        <div className="mb-7 text-center">
          <h2 id="client-logo-marquee-title" className="text-xs font-semibold uppercase tracking-[0.2em] text-[#2f2119]/64">
            BRANDS IN OUR ORBIT
          </h2>
        </div>

        <div className="client-logo-marquee" tabIndex={0} aria-label="Verified Planova clients">
          <div className="client-logo-track">
            <ul className="client-logo-sequence">
              {clientLogos.map((client) => (
                <li key={client.name}>
                  <ClientLogoItem client={client} navigate={navigate} />
                </li>
              ))}
            </ul>
            <ul className="client-logo-sequence client-logo-duplicates" aria-hidden="true">
              {clientLogos.map((client) => (
                <li key={`duplicate-${client.name}`}>
                  <ClientLogoItem client={client} navigate={navigate} duplicate />
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}

function ProofMetric({ metric }) {
  const hasPlus = metric.value.endsWith("+");
  const valueWithoutPlus = hasPlus ? metric.value.slice(0, -1) : metric.value;
  const hasCurrency = valueWithoutPlus.startsWith("$");
  const currency = hasCurrency ? "$" : "";
  const number = hasCurrency ? valueWithoutPlus.slice(1) : valueWithoutPlus;

  return (
    <li className="proof-metric">
      <p className="proof-metric-number" aria-label={metric.value}>
        {currency ? <span className="proof-metric-currency">{currency}</span> : null}
        <span className="proof-metric-main">{number}</span>
        {hasPlus ? (
          <span className="proof-metric-plus" aria-hidden="true">
            +
          </span>
        ) : null}
      </p>
      <p className="proof-metric-label">{metric.label}</p>
    </li>
  );
}

function ProofMetricsGrid() {
  const { fade } = useMotionSettings();

  return (
    <section className="proof-stats-section chapter" aria-labelledby="proof-metrics-title">
      <div className="proof-orbit" aria-hidden="true">
        <span className="proof-orbit-line" />
      </div>

      <motion.div className="relative z-10 mx-auto max-w-[1320px]" {...fade}>
        <div className="mb-10 md:mb-14">
          <SectionLabel>Why Planova</SectionLabel>
          <h2 id="proof-metrics-title" className="mt-3 max-w-4xl text-[clamp(2.7rem,6.5vw,6.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-[#1d1511]">
            Proof at scale.
          </h2>
        </div>

        <ul className="proof-stats-grid" aria-label="Planova agency proof points">
          {proofMetrics.map((metric) => (
            <ProofMetric key={metric.label} metric={metric} />
          ))}
        </ul>
      </motion.div>
    </section>
  );
}

function Homepage({ navigate }) {
  const { fade, reduceMotion } = useMotionSettings();
  const featured = projectPlaceholders.filter((item) => item.featured);

  return (
    <>
      <section className="relative min-h-[100svh] overflow-hidden bg-[#f8f3eb] pt-20 text-[#111111] md:pt-24">
        <div className="mx-auto flex min-h-[calc(100svh-5rem)] max-w-[1680px] flex-col px-4 pb-6 pt-8 sm:px-7 md:px-10 md:pb-8 md:pt-8">
          <div className="grid flex-1 gap-8 md:grid-cols-[0.45fr_0.55fr] md:items-center md:gap-10 xl:gap-16">
            <div className="order-2 flex min-h-[34svh] items-center md:order-1 md:min-h-0" aria-hidden="true">
              <div className="hero-visual">
                <div className="hero-orbit-stage">
                  <div className="hero-orbit-object">
                    <span className="hero-orbit-ring hero-orbit-ring-a" />
                    <span className="hero-orbit-ring hero-orbit-ring-b" />
                    <span className="hero-orbit-ring hero-orbit-ring-c" />
                    <span className="hero-orbit-core" />
                    <span className="hero-orbit-glint" />
                  </div>
                </div>
              </div>
            </div>

          <motion.div
            className="order-1 w-full justify-self-end md:order-2 md:max-w-[920px] xl:max-w-[1040px]"
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 22 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.7, ease }}
          >
            <div className="grid gap-1 text-xs font-semibold uppercase tracking-[0.18em] text-[#343434] sm:text-sm">
              <span>Integrated Marketing Agency</span>
              <span className="text-[#686868]">Los Angeles, CA</span>
            </div>
            <h1 className="mt-5 text-[clamp(3.4rem,14.4vw,8rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em] text-[#111111] md:mt-6 md:text-[clamp(5rem,7vw,8.9rem)]">
              <span className="block max-w-[9ch] md:hidden">
                IDEAS IN ORBIT.
                <span className="block">IMPACT IN MOTION.</span>
              </span>
              <span className="hidden max-w-[12ch] md:block">
                IDEAS IN ORBIT.
                <span className="block">IMPACT IN MOTION.</span>
              </span>
            </h1>
            <p className="mt-5 max-w-[620px] text-lg font-semibold leading-snug text-[#343434] sm:text-xl md:mt-6">
              We connect strategy, experiences, creators, content and media to build campaigns people notice, join and share.
            </p>
            <div className="mt-6 flex flex-col gap-3 sm:flex-row md:mt-7">
              <Link
                href="/work"
                navigate={navigate}
                className="inline-flex min-h-12 items-center justify-center rounded-full bg-[#5E0ED7] px-6 text-sm font-semibold uppercase tracking-[0.14em] text-white transition hover:bg-[#111111] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5E0ED7]"
              >
                Selected Work
              </Link>
            </div>
          </motion.div>
          </div>

          <motion.div
            className="mt-8 border-y border-[#2f2119]/18 py-4 md:mt-4 md:py-5"
            initial={{ opacity: reduceMotion ? 1 : 0, y: reduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: reduceMotion ? 0 : 0.12, duration: reduceMotion ? 0 : 0.6, ease }}
          >
            <p className="hidden text-center text-xs font-semibold uppercase tracking-[0.18em] text-[#2f2119]/72 md:block">
              {heroCapabilityLine}
            </p>
            <div className="grid grid-cols-2 gap-x-4 gap-y-2 text-xs font-semibold uppercase tracking-[0.14em] text-[#2f2119]/74 min-[430px]:grid-cols-3 md:hidden">
              {heroCapabilities.map((capability) => (
                <span key={capability}>{capability}</span>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      <ClientLogoMarquee navigate={navigate} />

      <section className="chapter bg-white px-4 py-16 text-black sm:px-7 md:py-24 lg:px-10">
        <div className="mx-auto max-w-[1680px]">
          <motion.div className="mb-9 flex flex-col justify-between gap-5 md:mb-12 md:flex-row md:items-end" {...fade}>
            <div>
              <SectionLabel>Selected Work</SectionLabel>
              <h2 className="mt-3 max-w-4xl text-[clamp(2.5rem,6.4vw,6.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em]">
                Work that moves beyond the moment.
              </h2>
            </div>
            <p className="max-w-md text-base font-semibold leading-relaxed text-black/62">
              Selected campaigns across experiences, creators, content and media.
            </p>
            <CtaLink href="/work" navigate={navigate} className="self-start px-1 text-sm uppercase tracking-[0.16em]">
              All Work
            </CtaLink>
          </motion.div>

          <div className="work-masonry-grid">
            {featured.map((item) => (
              <ProjectPreviewCard
                key={item.slug}
                item={item}
                navigate={navigate}
              />
            ))}
          </div>
        </div>
      </section>

      <section className="chapter overflow-hidden bg-black px-4 py-16 text-white sm:px-7 md:py-24 lg:px-10">
        <div className="mx-auto grid max-w-[1680px] gap-10 lg:grid-cols-[0.75fr_1fr] lg:items-start">
          <motion.div className="lg:sticky lg:top-28" {...fade}>
            <SectionLabel light>Capabilities</SectionLabel>
            <h2 className="mt-3 text-[clamp(2.6rem,6.2vw,6.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em]">
              One team. Every touchpoint.
            </h2>
            <p className="mt-5 max-w-xl text-lg font-semibold leading-relaxed text-white/66">
              From the first idea to the final impression, Planova brings strategy, production, talent, content, media and commerce into one connected marketing ecosystem.
            </p>
            <CtaLink href="/capabilities" navigate={navigate} className="mt-7 px-1 text-sm uppercase tracking-[0.16em]">
              Explore Capabilities
            </CtaLink>
          </motion.div>

          <div className="hidden grid-cols-2 gap-4 md:grid">
            {capabilities.map((item) => (
              <article key={item.title} className="min-h-[230px] border border-white/16 p-5">
                <p className="text-sm font-semibold text-[#b891ff]">{item.number}</p>
                <h3 className="mt-8 text-3xl font-semibold uppercase leading-none tracking-[-0.03em]">{item.title}</h3>
                <p className="mt-4 text-base font-semibold leading-relaxed text-white/62">{item.body}</p>
              </article>
            ))}
          </div>
          <CapabilityAccordion className="md:hidden" />
        </div>
      </section>

      <ProofMetricsGrid />

      <FinalCta navigate={navigate} />
    </>
  );
}

function ProjectPreviewCard({ item, navigate, className = "", compact = false }) {
  const coverImage = item.cover || item.gallery?.[0];
  const dateline = [item.city, item.year].filter(Boolean).join(" · ");

  return (
    <article className={`group relative overflow-hidden border border-black/12 bg-[#fbf7f0] ${className}`}>
      <Link href={`/work/${item.slug}`} navigate={navigate} className="block focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5E0ED7]">
        {coverImage?.type === "video" ? (
          <div className="work-card-media">
            <video
              key={coverImage.src}
              src={coverImage.src}
              className="work-card-image"
              style={{ objectPosition: coverImage.focalPoint || "center" }}
              muted
              playsInline
              loop
              autoPlay
              preload="metadata"
              aria-label={coverImage.alt}
            />
          </div>
        ) : coverImage ? (
          <picture className="work-card-media">
            <source media="(max-width: 767px)" srcSet={coverImage.mobileSrc || coverImage.src} />
            <img
              src={coverImage.src}
              alt={coverImage.alt}
              className="work-card-image"
              style={{ objectPosition: coverImage.focalPoint || "center" }}
              loading={compact ? "lazy" : "eager"}
            />
          </picture>
        ) : (
          <div className="work-card-media work-card-media-empty" aria-hidden="true" />
        )}
        <div className="p-5 md:p-6">
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5E0ED7]">{item.category}</p>
          <h3 className="mt-3 text-[clamp(1.8rem,3vw,3.35rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#1d1511]">{item.name}</h3>
          {dateline ? (
            <p className="mt-4 text-xs font-semibold uppercase tracking-[0.14em] text-[#2f2119]/58">
              {dateline}
            </p>
          ) : null}
          <p className="mt-5 inline-flex items-center gap-2 text-sm font-semibold text-[#5E0ED7]">
            View case study <ArrowRight className="h-4 w-4" />
          </p>
        </div>
      </Link>
    </article>
  );
}

function WorkPage({ navigate }) {
  const featured = projectPlaceholders.filter((item) => item.featured);
  const archive = projectPlaceholders
    .filter((item) => !item.featured)
    .sort((a, b) => (a.slug === "genye-opening-ceremony" ? 1 : b.slug === "genye-opening-ceremony" ? -1 : 0));
  return (
    <PageShell eyebrow="Selected + Archived Projects" title="Work built for real-world attention." intro="From Times Square takeovers to creator-led launches and campus campaigns, our work turns brand moments into experiences people show up for, share, and remember.">
      <div className="work-masonry-grid">
        {featured.map((item, index) => (
          <ProjectPreviewCard key={item.slug} item={item} navigate={navigate} />
        ))}
      </div>
      <section className="mt-16 border-t border-black/14 pt-8">
        <div className="mb-6">
          <h2 className="text-4xl font-semibold uppercase tracking-[-0.035em] md:text-6xl">Archive</h2>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {archive.map((item) => (
            <ProjectPreviewCard key={item.slug} item={item} navigate={navigate} compact />
          ))}
        </div>
      </section>
    </PageShell>
  );
}

function ProjectImageCarousel({ gallery = [], title }) {
  const trackRef = useRef(null);
  const dragState = useRef({ active: false, startX: 0, scrollLeft: 0 });
  const [activeIndex, setActiveIndex] = useState(0);
  const [imageMeta, setImageMeta] = useState({});
  const reduceMotion = useReducedMotion();

  const updateMediaMeta = (src, mediaElement) => {
    const width = mediaElement.naturalWidth || mediaElement.videoWidth;
    const height = mediaElement.naturalHeight || mediaElement.videoHeight;
    if (!width || !height) return;

    setImageMeta((current) => {
      const existing = current[src];
      if (existing?.width === width && existing?.height === height) return current;
      return {
        ...current,
        [src]: {
          width,
          height,
          ratio: width / height,
        },
      };
    });
  };

  const updateActiveSlide = () => {
    const track = trackRef.current;
    if (!track) return;
    const slides = Array.from(track.querySelectorAll(".case-carousel-slide"));
    const trackLeft = track.getBoundingClientRect().left;
    const closest = slides.reduce(
      (best, slide, index) => {
        const distance = Math.abs(slide.getBoundingClientRect().left - trackLeft);
        return distance < best.distance ? { distance, index } : best;
      },
      { distance: Number.POSITIVE_INFINITY, index: 0 }
    );
    setActiveIndex(closest.index);
  };

  const goToSlide = (nextIndex) => {
    const track = trackRef.current;
    if (!track || gallery.length === 0) return;
    const normalizedIndex = (nextIndex + gallery.length) % gallery.length;
    const slide = track.querySelectorAll(".case-carousel-slide")[normalizedIndex];
    slide?.scrollIntoView({ behavior: reduceMotion ? "auto" : "smooth", block: "nearest", inline: "start" });
    setActiveIndex(normalizedIndex);
  };

  const handlePointerDown = (event) => {
    if (event.pointerType === "touch") return;
    const track = trackRef.current;
    if (!track) return;
    dragState.current = { active: true, startX: event.clientX, scrollLeft: track.scrollLeft };
    track.setPointerCapture?.(event.pointerId);
    track.classList.add("is-dragging");
  };

  const handlePointerMove = (event) => {
    const track = trackRef.current;
    if (!track || !dragState.current.active) return;
    event.preventDefault();
    track.scrollLeft = dragState.current.scrollLeft - (event.clientX - dragState.current.startX);
  };

  const endPointerDrag = (event) => {
    const track = trackRef.current;
    if (!track) return;
    dragState.current.active = false;
    try {
      track.releasePointerCapture?.(event.pointerId);
    } catch {
      // Pointer capture can already be released when the cursor leaves the track.
    }
    track.classList.remove("is-dragging");
    updateActiveSlide();
  };

  if (!gallery.length) {
    return <PlaceholderMedia item={{ name: title, tone: "from-[#111111] via-[#5E0ED7] to-[#f7f1e8]" }} aspect="aspect-[4/5] lg:aspect-[16/10]" />;
  }

  return (
    <section className="case-carousel" aria-label={`${title} project image carousel`}>
      <div className="case-carousel-toolbar">
        <p className="case-carousel-counter" aria-live="polite">
          {String(activeIndex + 1).padStart(2, "0")} / {String(gallery.length).padStart(2, "0")}
        </p>
        <div className="hidden gap-2 md:flex">
          <button type="button" className="case-carousel-button" onClick={() => goToSlide(activeIndex - 1)} aria-label="Previous project image">
            <ArrowLeft className="h-4 w-4" />
          </button>
          <button type="button" className="case-carousel-button" onClick={() => goToSlide(activeIndex + 1)} aria-label="Next project image">
            <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="case-carousel-track"
        onScroll={updateActiveSlide}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={endPointerDrag}
        onPointerCancel={endPointerDrag}
        onPointerLeave={endPointerDrag}
      >
        {gallery.map((image, index) => {
          const meta = imageMeta[image.src];
          const isPortrait = meta ? meta.ratio < 0.92 : false;
          const isLowResolution = meta ? Math.max(meta.width, meta.height) < 900 : false;
          const slideClass = [
            "case-carousel-slide",
            isPortrait ? "case-carousel-slide-portrait" : "case-carousel-slide-landscape",
            isLowResolution ? "case-carousel-slide-lowres" : "",
          ]
            .filter(Boolean)
            .join(" ");

          return (
          <figure
            key={image.src}
            className={slideClass}
            aria-label={`Slide ${index + 1} of ${gallery.length}`}
            style={{
              "--image-natural-width": meta ? `${meta.width}px` : undefined,
              "--image-natural-height": meta ? `${meta.height}px` : undefined,
              "--image-aspect": meta ? `${meta.ratio}` : undefined,
            }}
          >
            <div className="case-carousel-media">
              {image.type === "video" ? (
                <video
                  key={image.src}
                  src={image.src}
                  className="case-carousel-image case-carousel-video"
                  style={{ objectPosition: image.focalPoint || "center" }}
                  controls
                  muted
                  playsInline
                  preload="metadata"
                  aria-label={image.alt}
                  onPointerDown={(event) => event.stopPropagation()}
                  onLoadedMetadata={(event) => updateMediaMeta(image.src, event.currentTarget)}
                />
              ) : (
                <picture className="case-carousel-picture">
                  <source media="(max-width: 767px)" srcSet={image.mobileSrc || image.src} />
                  <img
                    src={image.src}
                    alt={image.alt}
                    className="case-carousel-image"
                    style={{ objectPosition: image.focalPoint || "center" }}
                    loading="eager"
                    decoding={index === 0 ? "sync" : "async"}
                    width={meta?.width}
                    height={meta?.height}
                    sizes="(max-width: 767px) calc(100vw - 2rem), 100vw"
                    onLoad={(event) => updateMediaMeta(image.src, event.currentTarget)}
                  />
                </picture>
              )}
            </div>
          </figure>
          );
        })}
      </div>
    </section>
  );
}

function CaseStudyMetadata({ project }) {
  const baseServices = Array.isArray(project.services) && project.services.length ? project.services : [project.category];
  const services = [
    ...baseServices,
    ...(Array.isArray(project.secondaryServices) ? project.secondaryServices : []),
  ]
    .filter(Boolean)
    .map((service) => String(service).trim())
    .filter((service, index, list) => service && list.indexOf(service) === index);

  const primaryItems = [
    { label: "Location", value: project.city },
    { label: "Year", value: project.year },
  ].filter((item) => item.value);

  return (
    <dl className="case-study-meta">
      {primaryItems.length ? (
        <div className={`case-study-meta-row case-study-meta-primary ${primaryItems.length === 1 ? "case-study-meta-single" : ""}`}>
          {primaryItems.map((item) => (
            <div className="case-study-meta-item" key={item.label}>
              <dt>{item.label}</dt>
              <dd>{item.value}</dd>
            </div>
          ))}
        </div>
      ) : null}

      {services.length ? (
        <div className="case-study-meta-row case-study-meta-service">
          <div className="case-study-meta-item">
            <dt>{services.length > 1 ? "Services" : "Service"}</dt>
            <dd>{services.join(" / ")}</dd>
          </div>
        </div>
      ) : null}
    </dl>
  );
}

function CaseStudyPage({ project, navigate }) {
  if (!project) return <NotFound navigate={navigate} />;
  const sections = "sections" in project ? project.sections : [
    {
      label: "Objective",
      body: "Verified case-study copy needed from Planova before publication.",
    },
    {
      label: "Experience System",
      body: "Verified case-study copy needed from Planova before publication.",
    },
    {
      label: "Amplification",
      body: "Verified case-study copy needed from Planova before publication.",
    },
  ];
  const nextProject = projectPlaceholders.find((item) => item.slug !== project.slug && item.featured) || projectPlaceholders.find((item) => item.slug !== project.slug);

  return (
    <main className="bg-[#f8f3eb] px-4 pb-16 pt-28 text-[#1d1511] sm:px-7 md:pb-24 md:pt-36 lg:px-10">
      <div className="mx-auto max-w-[1680px]">
        <header>
          <SectionLabel>{project.client}</SectionLabel>
          <div className="mt-5 grid gap-8 lg:grid-cols-[1fr_0.48fr] lg:items-end">
            <div>
              <h1 className="max-w-5xl text-[clamp(3.4rem,9vw,9rem)] font-semibold uppercase leading-[0.86] tracking-[-0.055em]">
                {project.slug === "ritfit-experiential-activation" ? (
                  <>
                    RITFIT
                    <br />
                    TO EVERY WOMAN
                  </>
                ) : (
                  project.name
                )}
              </h1>
              {project.descriptor ? <p className="mt-6 text-sm font-semibold uppercase tracking-[0.16em] text-[#8b6f74] md:text-base">{project.descriptor}</p> : null}
            </div>
            <CaseStudyMetadata project={project} />
          </div>
        </header>

        {project.gallery?.length ? (
          <div className="mt-12 md:mt-16">
            <ProjectImageCarousel gallery={project.gallery} title={project.name} />
          </div>
        ) : null}

        <section className="mt-14 max-w-4xl md:mt-20" aria-labelledby="case-context-title">
          <SectionLabel>{project.overviewLabel || "Context"}</SectionLabel>
          <div id="case-context-title" className="mt-5 space-y-5 text-xl font-semibold leading-relaxed text-[#2f2119]/76 md:text-[1.65rem] md:leading-[1.35]">
            {(project.context || project.detail).split("\n\n").map((paragraph) => (
              <p key={paragraph}>{paragraph}</p>
            ))}
          </div>
        </section>

        {sections.length ? (
          <section className="mt-14 grid gap-7 border-t border-[#2f2119]/18 pt-8 md:mt-20 md:grid-cols-3 md:gap-6">
            {sections.map((section) => (
              <article key={section.label} className="border-t border-[#2f2119]/16 pt-5 md:border-t-0 md:pt-0">
                <h2 className="text-[1.65rem] font-semibold uppercase leading-[0.95] tracking-[-0.025em] text-[#1d1511]">{section.label}</h2>
                <p className="mt-4 text-base font-semibold leading-relaxed text-[#2f2119]/64">{section.body}</p>
              </article>
            ))}
          </section>
        ) : null}

        {project.results?.length ? (
          <section className="mt-14 border-y border-[#2f2119]/18 py-7 md:mt-20 md:py-9" aria-label="Verified project results">
            <div className="grid gap-7 md:grid-cols-3">
              {project.results.map((result) => (
                <article key={result.label}>
                  <p className="max-w-full whitespace-nowrap text-[clamp(2.5rem,5vw,4.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.05em] text-[#1d1511]">{result.value}</p>
                  <p className="mt-3 text-xs font-semibold uppercase leading-snug tracking-[0.14em] text-[#2f2119]/66">{result.label}</p>
                </article>
              ))}
            </div>
          </section>
        ) : null}

        <nav className="mt-12 flex flex-col gap-4 border-t border-[#2f2119]/18 pt-8 sm:flex-row sm:items-center sm:justify-between" aria-label="Case study navigation">
          <CtaLink href="/work" navigate={navigate} className="px-1 text-sm uppercase tracking-[0.16em]">
            Back To Work
          </CtaLink>
          {nextProject ? (
            <CtaLink href={`/work/${nextProject.slug}`} navigate={navigate} className="px-1 text-sm uppercase tracking-[0.16em]">
              Next Project
            </CtaLink>
          ) : null}
        </nav>
      </div>
    </main>
  );
}

function CapabilityAccordion({ className = "", theme = "dark" }) {
  const [openIndex, setOpenIndex] = useState(0);
  const isDark = theme === "dark";
  return (
    <div className={`${isDark ? "divide-y divide-white/16 border-y border-white/16" : "divide-y divide-black/14 border-y border-black/14"} ${className}`}>
      {capabilities.map((item, index) => {
        const isOpen = openIndex === index;
        return (
          <article key={item.title}>
            <button
              type="button"
              className="flex min-h-16 w-full items-center justify-between gap-4 py-4 text-left"
              onClick={() => setOpenIndex(isOpen ? -1 : index)}
              aria-expanded={isOpen}
            >
              <span className="text-lg font-semibold uppercase tracking-[-0.01em]">
                <span className={`mr-3 ${isDark ? "text-[#b891ff]" : "text-[#5E0ED7]"}`}>{item.number}</span>
                {item.title}
              </span>
              <ChevronDown className={`h-5 w-5 shrink-0 transition ${isOpen ? "rotate-180" : ""}`} />
            </button>
            <AnimatePresence initial={false}>
              {isOpen ? (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease }}
                  className="overflow-hidden"
                >
                  <p className={`pb-5 text-sm font-semibold leading-relaxed md:text-base ${isDark ? "text-white/68" : "text-black/62"}`}>{item.detail}</p>
                </motion.div>
              ) : null}
            </AnimatePresence>
          </article>
        );
      })}
    </div>
  );
}

function CapabilitiesPage() {
  const { fade } = useMotionSettings();
  const [activeCapability, setActiveCapability] = useState("Media Strategy & Buying");

  return (
    <main className="bg-[#f8f3eb] px-4 pb-16 pt-28 text-black sm:px-7 md:pb-24 md:pt-36 lg:px-10">
      <motion.header className="mx-auto max-w-[1680px]" {...fade}>
        <SectionLabel>Capabilities</SectionLabel>
        <h1 className="mt-7 max-w-[980px] text-[clamp(3rem,6.7vw,7rem)] font-semibold uppercase leading-[0.9] tracking-[-0.045em] text-[#1d1511]">
          ONE TEAM.
          <br />
          EVERY TOUCHPOINT.
        </h1>
        <div className="mt-10 max-w-[760px] md:mt-14">
          <p className="text-lg font-semibold leading-relaxed text-[#2f2119]/72 md:text-xl">
            From the first idea to the final impression, Planova brings strategy, production, talent, content, media and commerce into one connected marketing ecosystem.
          </p>
          <p className="mt-5 text-sm font-semibold uppercase leading-relaxed tracking-[0.13em] text-[#8b6f74] md:text-base">
            One strategy. One accountable team. More impact at every stage.
          </p>
        </div>
      </motion.header>

      <div className="mx-auto mt-14 max-w-[1680px] md:mt-20">
        <div className="grid gap-3 md:grid-cols-2 md:gap-5 xl:grid-cols-3">
          {capabilities.map((item) => {
            const isActive = activeCapability === item.title;
            return (
              <article
                key={item.title}
                className={`min-h-0 border px-5 py-6 transition duration-300 md:min-h-[310px] md:p-6 xl:px-[26px] xl:pb-[26px] xl:pt-7 ${
                  isActive ? "border-[#1d1511]/55 bg-[#1d1511] text-white shadow-[0_26px_80px_rgba(29,21,17,0.16)]" : "border-[#2f2119]/14 bg-white/58 text-[#1d1511]"
                }`}
              >
                <button
                  type="button"
                  className="flex h-full w-full flex-col text-left"
                  onClick={() => setActiveCapability(isActive ? "" : item.title)}
                  aria-expanded={isActive}
                >
                  <span className={`mb-7 text-[13px] font-semibold leading-none md:mb-10 ${isActive ? "text-[#d6b26f]" : "text-[#7f54b8]"}`}>{item.number}</span>
                  <span className="mb-[18px] flex items-start justify-between gap-5">
                    <span className="max-w-[95%] text-[28px] font-semibold uppercase leading-[1] tracking-[-0.035em] md:text-[clamp(27px,2.1vw,34px)]">
                      {item.title}
                    </span>
                    <ArrowUpRight className={`mt-1 h-5 w-5 shrink-0 transition ${isActive ? "rotate-45 text-[#d6b26f]" : "text-[#5E0ED7]"}`} />
                  </span>
                  <span className={`block max-w-[44ch] text-[15px] font-normal leading-[1.42] tracking-normal ${isActive ? "text-white/76" : "text-[#2f2119]/80"}`}>
                    {item.detail}
                  </span>
                  <AnimatePresence initial={false}>
                    {isActive && item.items?.length ? (
                      <motion.span
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.24, ease }}
                        className="mt-7 block overflow-hidden"
                      >
                        <span className="grid gap-2 sm:grid-cols-2">
                          {item.items.map((service) => (
                            <span key={service} className="border border-white/18 bg-white/8 px-3 py-2 text-xs font-semibold uppercase tracking-[0.12em] text-white/82">
                              {service}
                            </span>
                          ))}
                        </span>
                      </motion.span>
                    ) : null}
                  </AnimatePresence>
                </button>
              </article>
            );
          })}
        </div>
        <section className="mt-16">
          <SectionLabel>Process</SectionLabel>
          <div className="mt-6 grid gap-5 lg:grid-cols-4">
            {processSteps.map((step) => (
              <article key={step.title} className="border-t border-black/16 pt-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-[#5E0ED7]">{step.label}</p>
                <h2 className="mt-3 text-3xl font-semibold uppercase tracking-[-0.025em]">{step.title}</h2>
                <p className="mt-4 text-base font-semibold leading-relaxed text-black/64">{step.body}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}

function AboutPage({ navigate }) {
  const { fade, reduceMotion } = useMotionSettings();

  return (
    <main className="overflow-hidden bg-[#f8f3eb] text-[#221712]">
      <section className="relative px-4 pb-20 pt-32 sm:px-7 md:pb-28 md:pt-40 lg:px-10" aria-labelledby="about-title">
        <div className="about-pearl-orbit" aria-hidden="true">
          <div className={reduceMotion ? "about-pearl-orbit-object motion-reduce-static" : "about-pearl-orbit-object"}>
            <span />
            <span />
            <span />
          </div>
        </div>

        <motion.div className="relative z-10 mx-auto grid max-w-[1680px] gap-14 lg:grid-cols-[0.62fr_0.38fr] lg:gap-10" {...fade}>
          <div>
            <SectionLabel>About Planova</SectionLabel>
            <h1 id="about-title" className="mt-8 max-w-5xl text-[clamp(2.75rem,8.2vw,8.6rem)] font-semibold uppercase leading-[0.88] tracking-[-0.045em] text-[#1d1511]">
              BUILT TO BRING
              <br />
              EVERY PART
              <br />
              INTO ORBIT.
            </h1>
          </div>
          <div className="max-w-xl self-end lg:pb-5">
            <p className="text-lg font-semibold leading-relaxed text-[#2f2119]/78 md:text-xl">
              Planova is an integrated marketing agency connecting strategy, experiences, creators, content and media through one collaborative team.
            </p>
            <p className="mt-5 text-base font-semibold leading-relaxed text-[#2f2119]/62 md:text-lg">
              Based in Los Angeles, we help brands navigate the U.S. market with culturally fluent thinking, hands-on production and one connected path from idea to impact.
            </p>
          </div>
        </motion.div>
      </section>

      <ProofMetricsGrid />

      <section className="px-4 py-16 sm:px-7 md:py-24 lg:px-10" aria-labelledby="leadership-title">
        <div className="mx-auto max-w-[1320px]">
          <motion.div className="grid gap-5 md:grid-cols-[0.46fr_0.54fr] md:items-end" {...fade}>
            <SectionLabel>Meet Our Leadership</SectionLabel>
            <h2 id="leadership-title" className="text-[clamp(2.7rem,6.2vw,6.8rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em] text-[#1d1511]">
              THE PEOPLE
              <br />
              BEHIND THE ORBIT.
            </h2>
          </motion.div>

          <div className="relative mt-14 md:mt-20">
            <div className="leadership-orbit-line hidden md:block" aria-hidden="true" />
            <div className="grid gap-16 md:grid-cols-2 md:gap-10 lg:gap-12">
              {leadership.map((person, index) => (
                <motion.article
                  key={person.name}
                  className="leader-profile"
                  initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.24 }}
                  transition={{ duration: reduceMotion ? 0 : 0.68, delay: reduceMotion ? 0 : index * 0.12, ease }}
                >
                  <picture>
                    <source media="(max-width: 767px)" srcSet={`${person.mobileImage} 1200w`} sizes="(max-width: 767px) calc(100vw - 2rem), 440px" />
                    <img
                      src={person.image}
                      srcSet={`${person.image} 1200w`}
                      sizes="(min-width: 1280px) 460px, (min-width: 768px) 44vw, calc(100vw - 2rem)"
                      alt={person.alt}
                      className="leader-portrait"
                      style={{ objectPosition: person.objectPosition }}
                      loading={index === 0 ? "eager" : "lazy"}
                    />
                  </picture>
                  <div className="mt-5 flex items-start gap-4 border-t border-[#2f2119]/18 pt-5">
                    <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[#8b6f74]">{person.number}</span>
                    <div>
                      <h3 className="text-[1.65rem] font-semibold uppercase leading-none tracking-[-0.015em] text-[#1d1511] md:text-[clamp(1.65rem,2.15vw,2rem)]">
                        {person.name}
                      </h3>
                      <p className="mt-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#6f4f45] md:text-sm">{person.title}</p>
                      <p className="mt-4 max-w-md text-sm font-semibold leading-relaxed text-[#2f2119]/58 md:text-base">{person.biography}</p>
                    </div>
                  </div>
                </motion.article>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="px-4 py-16 sm:px-7 md:py-24 lg:px-10" aria-labelledby="work-principles-title">
        <div className="mx-auto max-w-[1320px]">
          <motion.div className="mb-10 md:mb-14" {...fade}>
            <SectionLabel>How We Work</SectionLabel>
            <h2 id="work-principles-title" className="mt-5 max-w-4xl text-[clamp(2.55rem,5.6vw,6.2rem)] font-semibold uppercase leading-[0.9] tracking-[-0.04em]">
              REAL RESOURCES BEHIND EVERY PROMISE.
            </h2>
            <p className="mt-5 max-w-3xl text-base font-semibold leading-relaxed text-[#2f2119]/66 md:text-xl">
              Planova connects strategy with the people, production infrastructure and vetted U.S. network needed to turn ambitious ideas into visible market impact.
            </p>
          </motion.div>

          <div className="border-t border-[#2f2119]/28">
            {workingPrinciples.map((principle, index) => (
              <motion.article
                key={principle.title}
                className="grid gap-5 border-b border-[#2f2119]/28 py-7 md:grid-cols-[0.18fr_0.42fr_0.4fr] md:items-baseline md:gap-8 md:py-9"
                initial={reduceMotion ? { opacity: 1, y: 0 } : { opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.22 }}
                transition={{ duration: reduceMotion ? 0 : 0.58, delay: reduceMotion ? 0 : index * 0.08, ease }}
              >
                <p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#8b6f74]">{principle.number}</p>
                <h3 className="text-3xl font-semibold uppercase leading-none tracking-[-0.02em] text-[#1d1511] md:text-[clamp(2rem,3vw,3.35rem)]">{principle.title}</h3>
                <p className="text-base font-semibold leading-relaxed text-[#2f2119]/68 md:text-xl">{principle.body}</p>
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section className="px-4 py-20 sm:px-7 md:py-28 lg:px-10" aria-labelledby="about-contact-title">
        <motion.div className="mx-auto flex max-w-[1320px] flex-col gap-8 border-t border-[#2f2119]/22 pt-10 md:flex-row md:items-end md:justify-between md:gap-12" {...fade}>
          <h2 id="about-contact-title" className="max-w-4xl text-[clamp(3rem,7.4vw,7.6rem)] font-semibold uppercase leading-[0.88] tracking-[-0.045em] text-[#1d1511]">
            LET’S PUT THE
            <br />
            NEXT IDEA IN MOTION.
          </h2>
          <CtaLink navigate={navigate} className="w-fit border border-[#5E0ED7] px-5 py-3 text-sm uppercase tracking-[0.16em] md:text-base">
            Start A Project
          </CtaLink>
        </motion.div>
      </section>
    </main>
  );
}

function ContactPage() {
  return (
    <PageShell eyebrow="Project Inquiry" title="Start with the shape of the moment." intro="Tell us what you are building, where it needs to show up, and what kind of momentum you want to create. You can also contact us directly at hello@planovamedia.com.">
      <form action="https://formspree.io/f/mrevylgv" method="POST" className="grid gap-5 rounded-none border border-black/12 bg-white p-5 md:grid-cols-2 md:p-8">
        {["Name", "Email", "Company", "Timeline"].map((label) => (
          <label key={label} className="grid gap-2 text-sm font-semibold text-black/62">
            {label}
            <input
              className="min-h-12 border border-black/18 bg-[#f8f3eb] px-4 text-base text-black outline-none focus:border-[#5E0ED7]"
              name={label === "Email" ? "email" : label.toLowerCase()}
              type={label === "Email" ? "email" : "text"}
              required={label === "Name" || label === "Email"}
            />
          </label>
        ))}
        <label className="grid gap-2 text-sm font-semibold text-black/62 md:col-span-2">
          What are you building?
          <textarea name="message" className="min-h-36 border border-black/18 bg-[#f8f3eb] p-4 text-base text-black outline-none focus:border-[#5E0ED7]" required />
        </label>
        <button type="submit" className="inline-flex min-h-12 items-center justify-center gap-2 rounded-full bg-black px-6 text-sm font-semibold uppercase tracking-[0.16em] text-white transition hover:bg-[#5E0ED7] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-[#5E0ED7]">
          Submit Inquiry <ArrowUpRight className="h-4 w-4" />
        </button>
        <p className="self-center text-sm font-semibold text-black/50">We will get back to you shortly.</p>
      </form>
    </PageShell>
  );
}

function PageShell({ eyebrow, title, intro, children }) {
  const { fade } = useMotionSettings();
  return (
    <main className="bg-[#f8f3eb] px-4 pb-16 pt-28 text-black sm:px-7 md:pb-24 md:pt-36 lg:px-10">
      <motion.header className="mx-auto max-w-[1680px]" {...fade}>
        <SectionLabel>{eyebrow}</SectionLabel>
        <h1 className="mt-4 max-w-6xl text-[clamp(3rem,8vw,8.5rem)] font-semibold uppercase leading-[0.88] tracking-[-0.05em]">{title}</h1>
        <p className="mt-6 max-w-2xl text-lg font-semibold leading-relaxed text-black/68 md:text-xl">{intro}</p>
      </motion.header>
      <div className="mx-auto mt-12 max-w-[1680px] md:mt-16">{children}</div>
    </main>
  );
}

function FinalCta({ navigate }) {
  return (
    <section className="chapter bg-black px-4 py-16 text-white sm:px-7 md:py-24 lg:px-10">
      <div className="mx-auto max-w-[1680px]">
        <div className="relative overflow-hidden border border-white/18 p-5 sm:p-8 lg:p-12">
          <OrbitField />
          <div className="relative z-10 grid gap-8 md:grid-cols-[1fr_0.42fr] md:items-end">
            <h2 className="text-[clamp(2.8rem,7.6vw,8rem)] font-semibold uppercase leading-[0.87] tracking-[-0.05em]">
              Have an idea in orbit? Let’s bring it down to earth.
            </h2>
            <div>
              <CtaLink navigate={navigate} className="border border-[#5E0ED7] px-5 py-3 text-base uppercase tracking-[0.16em] md:text-xl">
                Start A Project
              </CtaLink>
            </div>
          </div>
        </div>
        <Footer navigate={navigate} />
      </div>
    </section>
  );
}

function Footer({ navigate }) {
  return (
    <footer className="mt-8 flex flex-col gap-5 border-t border-white/16 pt-7 text-sm font-semibold text-white/60 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <span>Los Angeles</span>
        <span>New York</span>
        <a href="mailto:hello@planovamedia.com">hello@planovamedia.com</a>
      </div>
      <div className="flex flex-wrap gap-x-6 gap-y-2">
        <a href="https://www.linkedin.com/company/planova-media/" target="_blank" rel="noreferrer" aria-label="Planova Media on LinkedIn" title="LinkedIn">
          <Linkedin className="h-4 w-4" aria-hidden="true" />
        </a>
        <a href="https://www.instagram.com/planovamedia?stkn=NTc4MTIwNjQ2YQ%3D%3D&utm_source=qr" target="_blank" rel="noreferrer" aria-label="Planova Media on Instagram" title="Instagram">
          <Instagram className="h-4 w-4" aria-hidden="true" />
        </a>
        <a href="https://xhslink.cn/o/7UpBHIbb4zz" target="_blank" rel="noreferrer" aria-label="Planova Media on Xiaohongshu" title="Xiaohongshu">
          <img src="/social-icons/xiaohongshu.png" alt="" className="h-4 w-4 rounded-[3px]" aria-hidden="true" />
        </a>
        <Link href="/" navigate={navigate}>© 2026 Planova Media</Link>
      </div>
    </footer>
  );
}

function NotFound({ navigate }) {
  return (
    <PageShell eyebrow="Not Found" title="This page is outside the orbit." intro="The page you requested does not exist yet.">
      <CtaLink href="/" navigate={navigate} className="px-1 text-sm uppercase tracking-[0.16em]">
        Return Home
      </CtaLink>
    </PageShell>
  );
}

function App() {
  const { path, navigate } = useRoute();
  const project = useMemo(() => {
    const slug = path.startsWith("/work/") ? path.split("/work/")[1] : "";
    return projectPlaceholders.find((item) => item.slug === slug);
  }, [path]);

  useEffect(() => {
    const base = "Planova Creative";
    const meta = {
      "/": [
        `${base} — Where Ideas Orbit`,
        "U.S.-based experiential marketing agency for activations, launches, creator campaigns, production, and amplification.",
      ],
      "/work": [
        `Work — ${base}`,
        "Selected and archived Planova Creative experiential marketing project placeholders awaiting verified case-study content.",
      ],
      "/capabilities": [
        `Capabilities — ${base}`,
        "Experiential, creative production, creator content, and integrated reach capabilities from Planova Creative.",
      ],
      "/about": [
        `About — ${base}`,
        "Planova Creative positioning, story, cross-cultural fluency, and U.S. local execution advantage.",
      ],
      "/contact": [
        `Contact — ${base}`,
        "Start a project inquiry with Planova Creative for experiential campaigns, launches, activations, and content.",
      ],
    };
    const [title, description] = project
      ? [`${project.name} — ${base}`, project.summary]
      : meta[path] || [`${base}`, "Planova Creative experiential marketing agency."];
    document.title = title;
    document.querySelector("meta[name='description']")?.setAttribute("content", description);
    document.querySelector("meta[property='og:title']")?.setAttribute("content", title);
    document.querySelector("meta[property='og:description']")?.setAttribute("content", description);
  }, [path, project]);

  let page;
  if (path === "/") page = <Homepage navigate={navigate} />;
  else if (path === "/work") page = <WorkPage navigate={navigate} />;
  else if (path.startsWith("/work/")) page = <CaseStudyPage project={project} navigate={navigate} />;
  else if (path === "/capabilities") page = <CapabilitiesPage />;
  else if (path === "/about") page = <AboutPage navigate={navigate} />;
  else if (path === "/contact") page = <ContactPage />;
  else page = <NotFound navigate={navigate} />;

  return (
    <div className="planova-cinematic min-h-screen overflow-x-hidden bg-[#f8f3eb] font-inter text-black antialiased">
      <Header path={path} navigate={navigate} />
      <AnimatePresence mode="wait">
        <motion.div
          key={path}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
        >
          {page}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
);
