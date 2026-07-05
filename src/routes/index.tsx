import { createFileRoute } from "@tanstack/react-router";
import footballImg from "@/assets/football.jpg";
import drawingImg from "@/assets/drawing.jpg";
import scienceFairImg from "@/assets/science-fair.jpg";

export const Route = createFileRoute("/")({
  component: Index,
});

const navLinks = [
  { label: "Home", target: "hero" },
  { label: "About", target: "about" },
  { label: "Interests", target: "interests" },
  { label: "Science Fair", target: "science-fair" },
  { label: "Connect", target: "connect" },
];

function StickyNav() {
  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, target: string) => {
    e.preventDefault();
    const el = document.getElementById(target);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="fixed top-0 left-0 z-50 w-full bg-background/80 backdrop-blur-md border-b border-border">
      <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-3 md:px-12">
        <a
          href="#hero"
          onClick={(e) => handleClick(e, "hero")}
          className="text-lg font-bold tracking-tight text-foreground hover:text-primary transition-colors"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Ayman.
        </a>
        <div className="flex items-center gap-1 md:gap-2">
          {navLinks.map((link) => (
            <a
              key={link.target}
              href={`#${link.target}`}
              onClick={(e) => handleClick(e, link.target)}
              className="rounded-md px-2 py-1.5 text-xs font-medium text-muted-foreground transition-colors hover:bg-accent hover:text-accent-foreground md:px-3 md:text-sm"
              style={{ fontFamily: "var(--font-body)" }}
            >
              {link.label}
            </a>
          ))}
        </div>
      </div>
    </nav>
  );
}

function Index() {
  return (
    <div className="min-h-screen bg-background">
      <StickyNav />
      <HeroSection />
      <AboutSection />
      <InterestsSection />
      <ScienceFairSection />
      <FooterSection />
    </div>
  );
}

function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-[90vh] flex-col items-start justify-center px-6 pt-16 md:px-12 lg:px-20">
      <div className="max-w-5xl">
        <p
          className="mb-2 text-lg font-medium tracking-widest uppercase text-primary md:text-xl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          Grade 6 Student
        </p>
        <h1
          className="text-[18vw] leading-[0.85] tracking-tight text-foreground md:text-[14vw] lg:text-[12vw]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          Hi.
        </h1>
        <h2
          className="mt-2 text-[10vw] leading-[0.9] tracking-tight text-foreground md:text-[7vw] lg:text-[6vw]"
          style={{ fontFamily: "var(--font-display)" }}
        >
          I&apos;m Ayman.
        </h2>
        <p
          className="mt-8 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl"
          style={{ fontFamily: "var(--font-body)" }}
        >
          I play football, draw everything I imagine, and build cool science
          projects. Welcome to my corner of the internet.
        </p>
      </div>
      <div className="absolute bottom-8 left-6 md:left-12 lg:left-20">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="h-px w-8 bg-primary" />
          <span>Scroll to explore</span>
        </div>
      </div>
    </section>
  );
}

function AboutSection() {
  return (
    <section id="about" className="bg-cream px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 md:grid-cols-2 md:items-center">
          <div>
            <p
              className="mb-4 text-sm font-semibold tracking-widest uppercase text-primary"
              style={{ fontFamily: "var(--font-body)" }}
            >
              About Me
            </p>
            <h2
              className="text-5xl leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Curious.
              <br />
              Creative.
              <br />
              Competitive.
            </h2>
          </div>
          <div className="space-y-6">
            <p
              className="text-lg leading-relaxed text-foreground md:text-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              I&apos;m a Grade 6 student who loves exploring new ideas. Whether
              it&apos;s scoring goals on the football field, sketching my
              favorite characters, or experimenting at the science fair — I
              always bring my full energy.
            </p>
            <p
              className="text-lg leading-relaxed text-muted-foreground md:text-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              I believe the best way to learn is by doing. Every drawing, every
              match, and every experiment teaches me something new.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function InterestsSection() {
  return (
    <section id="interests" className="px-6 py-24 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <p
          className="mb-4 text-sm font-semibold tracking-widest uppercase text-primary"
          style={{ fontFamily: "var(--font-body)" }}
        >
          What I Love
        </p>
        <h2
          className="mb-16 text-5xl leading-[0.95] tracking-tight text-foreground md:text-6xl lg:text-7xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          My Interests.
        </h2>

        <div className="grid gap-8 md:grid-cols-2">
          <InterestCard
            title="Football"
            description="I live for the game. The rush of a perfect pass, the thrill of a goal — football teaches me teamwork, discipline, and how to get back up after every fall."
            image={footballImg}
            accent="coral"
            stats={[
              { label: "Position", value: "Midfielder" },
              { label: "Experience", value: "4 Years" },
              { label: "Favorite Team", value: "Real Madrid" },
            ]}
          />
          <InterestCard
            title="Drawing"
            description="Give me a pencil and paper and I&apos;ll create entire worlds. From comic characters to realistic portraits, drawing is how I express what words can&apos;t."
            image={drawingImg}
            accent="teal"
            stats={[
              { label: "Style", value: "Mixed Media" },
              { label: "Experience", value: "5 Years" },
              { label: "Favorite", value: "Portraits" },
            ]}
          />
        </div>
      </div>
    </section>
  );
}

function InterestCard({
  title,
  description,
  image,
  accent,
  stats,
}: {
  title: string;
  description: string;
  image: string;
  accent: "coral" | "teal";
  stats: { label: string; value: string }[];
}) {
  const accentColor = accent === "coral" ? "text-coral" : "text-teal";
  const accentBg = accent === "coral" ? "bg-coral" : "bg-teal";

  return (
    <div className="group overflow-hidden rounded-2xl bg-card shadow-sm transition-shadow hover:shadow-lg">
      <div className="relative aspect-[4/3] overflow-hidden">
        <img
          src={image}
          alt={title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
          width={1024}
          height={768}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
        <h3
          className="absolute bottom-4 left-4 text-5xl tracking-tight text-white md:text-6xl"
          style={{ fontFamily: "var(--font-display)" }}
        >
          {title}
        </h3>
      </div>
      <div className="p-6 md:p-8">
        <p
          className="mb-6 text-base leading-relaxed text-card-foreground md:text-lg"
          style={{ fontFamily: "var(--font-body)" }}
        >
          {description}
        </p>
        <div className="grid grid-cols-3 gap-4">
          {stats.map((stat) => (
            <div key={stat.label}>
              <p
                className={`text-xs font-semibold uppercase tracking-wider ${accentColor}`}
                style={{ fontFamily: "var(--font-body)" }}
              >
                {stat.label}
              </p>
              <p
                className="mt-1 text-lg font-bold text-foreground"
                style={{ fontFamily: "var(--font-body)" }}
              >
                {stat.value}
              </p>
            </div>
          ))}
        </div>
        <div className={`mt-6 h-1 w-16 rounded-full ${accentBg}`} />
      </div>
    </div>
  );
}

function ScienceFairSection() {
  return (
    <section className="bg-ink px-6 py-24 text-primary-foreground md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
          <div className="order-2 lg:order-1">
            <p
              className="mb-4 text-sm font-semibold tracking-widest uppercase text-coral"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Science Fair
            </p>
            <h2
              className="mb-6 text-5xl leading-[0.95] tracking-tight md:text-6xl lg:text-7xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Experiment.
              <br />
              Discover.
              <br />
              Present.
            </h2>
            <p
              className="mb-6 text-lg leading-relaxed text-white/80 md:text-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              My science fair project was one of the most exciting things
              I&apos;ve ever done. I chose a topic I was genuinely curious about,
              researched it thoroughly, designed experiments, and presented my
              findings to judges and classmates.
            </p>
            <p
              className="mb-8 text-lg leading-relaxed text-white/60 md:text-xl"
              style={{ fontFamily: "var(--font-body)" }}
            >
              The best part? Seeing people get excited about science because of
              something I built. That feeling of sharing knowledge and sparking
              curiosity is what drives me.
            </p>
            <div className="flex flex-wrap gap-6">
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider text-coral"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Project Type
                </p>
                <p
                  className="mt-1 text-lg font-bold"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Research & Experiment
                </p>
              </div>
              <div>
                <p
                  className="text-xs font-semibold uppercase tracking-wider text-coral"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Grade
                </p>
                <p
                  className="mt-1 text-lg font-bold"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  Grade 6
                </p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <div className="overflow-hidden rounded-2xl">
              <img
                src={scienceFairImg}
                alt="Ayman presenting at the science fair"
                className="h-full w-full object-cover"
                width={1024}
                height={768}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function FooterSection() {
  return (
    <footer className="bg-cream px-6 py-16 md:px-12 lg:px-20">
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col items-start justify-between gap-8 md:flex-row md:items-center">
          <div>
            <h3
              className="text-4xl tracking-tight text-foreground md:text-5xl"
              style={{ fontFamily: "var(--font-display)" }}
            >
              Let&apos;s Connect.
            </h3>
            <p
              className="mt-2 text-muted-foreground"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Thanks for stopping by my portfolio.
            </p>
          </div>
          <div className="flex flex-col gap-3 text-right md:text-right">
            <p
              className="text-sm text-muted-foreground"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Grade 6 Student
            </p>
            <p
              className="text-sm text-muted-foreground"
              style={{ fontFamily: "var(--font-body)" }}
            >
              Footballer &bull; Artist &bull; Scientist
            </p>
          </div>
        </div>
        <div className="mt-12 h-px bg-border" />
        <div className="mt-8 flex flex-col items-start justify-between gap-4 md:flex-row md:items-center">
          <p
            className="text-sm text-muted-foreground"
            style={{ fontFamily: "var(--font-body)" }}
          >
            &copy; {new Date().getFullYear()} Ayman. Built with curiosity.
          </p>
          <p
            className="text-xs uppercase tracking-widest text-muted-foreground"
            style={{ fontFamily: "var(--font-body)" }}
          >
            Young Founder Energy
          </p>
        </div>
      </div>
    </footer>
  );
}
