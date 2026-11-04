import { useRef, useState } from "react";
import { Link } from "react-router";
import { useReveal } from "@lib/useReveal";
import { DATABASES, FRAMEWORKS, LANGUAGES, VFX_SKILLS } from "@lib/lists";
import "./about.css";

const JOURNEY = [
  {
    tag: "Then",
    title: "VFX compositor",
    text: "Feature films, TV and high-end commercials. Years of pixel-level detail, problem solving and creative collaboration.",
  },
  {
    tag: "The switch",
    title: "Back to school",
    text: "A two-year programme at Arteveldehogeschool in Ghent that gave me the foundation to become a developer.",
  },
  {
    tag: "Now",
    title: "Full-stack developer",
    text: "Bringing my technical skills and creative background together to build engaging digital experiences.",
  },
];


const SKILL_GROUPS = [
  { title: "Frameworks & tools", items: FRAMEWORKS, wide: true },
  { title: "Languages", items: LANGUAGES },
  { title: "Databases & CMS", items: DATABASES },
  { title: "VFX software", items: VFX_SKILLS },
];

const ALL_SKILLS = [...LANGUAGES, ...FRAMEWORKS, ...DATABASES, ...VFX_SKILLS];

/* Before/after slider, like comparing a plate and a comp in VFX */
const CompareFrame = () => {
  const [split, setSplit] = useState(50);

  return (
    <figure className="compare" style={{ "--split": `${split}%` }}>
      <div className="compare__frame">
        <picture className="compare__layer">
          <source srcSet="/images/webp/Portret_me.webp" type="image/webp" />
          <img className="compare__image" src="/images/Portret_me.jpg" alt="Portrait of Tomasz Liksza" />
        </picture>

        <picture className="compare__layer compare__layer--comp" aria-hidden="true">
          <source srcSet="/images/webp/Portret_me.webp" type="image/webp" />
          <img className="compare__image" src="/images/Portret_me.jpg" alt="" />
        </picture>

        <span className="compare__tag compare__tag--left">Plate</span>
        <span className="compare__tag compare__tag--right">Comp</span>

        <span className="compare__divider" aria-hidden="true">
          <span className="compare__handle" />
        </span>

        <input
          className="compare__input"
          type="range"
          min="0"
          max="100"
          value={split}
          onChange={(e) => setSplit(Number(e.target.value))}
          aria-label="Compare the original and the graded portrait"
        />
      </div>

      <figcaption className="compare__caption">
        <span>Pushing pixels</span>
        <span className="compare__caption-hint">← drag →</span>
        <span>Writing pixels</span>
      </figcaption>
    </figure>
  );
};

const About = () => {
  const rootRef = useRef(null);
  useReveal(rootRef);

  return (
    <div className="about-page" ref={rootRef}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="container-80 about-hero">
        <div className="about-hero__content">
          <span className="eyebrow" data-reveal>
            About me
          </span>

          <h1 className="about-hero__title" data-reveal>
            From <em className="about-hero__word about-hero__word--outline">pushing</em> pixels
            <br />
            to <em className="about-hero__word about-hero__word--accent">writing</em> pixels.
          </h1>

          <p className="about-hero__lead" data-reveal>
            The good thing is that I&rsquo;ve stayed in the business of creating. It&rsquo;s just the way I do it that has
            changed.
          </p>

          <div className="about-hero__actions" data-reveal>
            <a className="pill-btn" href="/cv/Tomasz-Liksza-CV.pdf" download>
              <span>Download resume</span>
              <span className="pill-btn__icon" aria-hidden="true">
                ↓
              </span>
            </a>
            <Link className="text-link" to="/contact">
              Get in touch
            </Link>
          </div>
        </div>

        <div className="about-hero__media" data-reveal>
          <CompareFrame />
        </div>
      </section>

      {/* ── Story ────────────────────────────────────────── */}
      <section className="container-80 about-story">
        <h2 className="section-label" data-reveal>
          <span className="section-label__index">01</span> The story
        </h2>

        <div className="about-story__body">
          <p data-reveal>
            Before getting into development, I spent many years working in the film and advertising industry as a{" "}
            <strong>compositor in visual effects</strong>. I was lucky enough to work on a wide range of projects, from
            feature films and TV to high end commercials. It was during those years that I developed a strong eye for
            detail, problem solving, and creative collaboration.
          </p>
          <p data-reveal>
            After a decent run in VFX, and with some outside pressure encouraging me to try something new, I felt the urge
            to take on a different challenge. That&rsquo;s what eventually led me to programming. I successfully completed
            a two year study at <strong>Arteveldehogeschool in Ghent</strong>, which gave me the foundation to become a
            full stack developer.
          </p>
          <p data-reveal>
            Along the way, I also developed a stronger interest in specific areas of the development world. For me, the
            transition from film to development feels quite natural. I still get to use the technical skills I built over
            the years, while also bringing my creative background into the mix to build{" "}
            <strong>engaging digital experiences</strong>.
          </p>
        </div>
      </section>

      {/* ── Journey ──────────────────────────────────────── */}
      <section className="container-80 about-journey">
        <h2 className="section-label" data-reveal>
          <span className="section-label__index">02</span> The journey
        </h2>

        <ol className="journey">
          {JOURNEY.map(({ tag, title, text }, i) => (
            <li key={title} className="journey__step" style={{ "--i": i }} data-reveal>
              <span className="journey__tag">{tag}</span>
              <h3 className="journey__title">{title}</h3>
              <p className="journey__text">{text}</p>
            </li>
          ))}
        </ol>
      </section>

      {/* ── Marquee ──────────────────────────────────────── */}
      <div className="marquee" aria-hidden="true">
        {[0, 1].map((row) => (
          <div key={row} className={row ? "marquee__row marquee__row--reverse" : "marquee__row"}>
            <div className="marquee__track">
              {[...ALL_SKILLS, ...ALL_SKILLS].map((skill, i) => (
                <span key={`${skill}-${i}`} className="marquee__item">
                  {skill}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      {/* ── Skills ───────────────────────────────────────── */}
      <section className="container-80 about-skills">
        <h2 className="section-label" data-reveal>
          <span className="section-label__index">03</span> Familiar with
        </h2>

        <div className="bento">
          {SKILL_GROUPS.map(({ title, items, wide }, i) => (
            <article
              key={title}
              className={wide ? "bento__card bento__card--wide" : "bento__card"}
              style={{ "--i": i }}
              data-reveal
            >
              <header className="bento__head">
                <h3 className="bento__title">{title}</h3>
                <span className="bento__count">{String(items.length).padStart(2, "0")}</span>
              </header>
              <ul className="bento__badges">
                {items.map((item) => (
                  <li key={item} className="bento__badge">
                    {item}
                  </li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </section>
    </div>
  );
};

export default About;
