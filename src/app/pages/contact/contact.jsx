import { useRef, useState } from "react";
import { useForm } from "react-hook-form";
import emailjs from "@emailjs/browser";
import { SOCIALS } from "@lib/socials";
import { useReveal } from "@lib/useReveal";
import "./contact.css";

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

// Only show profiles that already have a real URL
const PROFILES = SOCIALS.filter(({ href }) => href && href !== "#");

const Contact = () => {
  const rootRef = useRef(null);
  useReveal(rootRef);

  const [status, setStatus] = useState("idle");

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm();

  const onValid = (data) =>
    emailjs
      .send(SERVICE_ID, TEMPLATE_ID, data, PUBLIC_KEY)
      .then(() => {
        setStatus("success");
        reset();
      })
      .catch(() => setStatus("error"));

  return (
    <div className="contact-page" ref={rootRef}>
      {/* ── Hero ─────────────────────────────────────────── */}
      <section className="container-80 contact-hero">
        <span className="eyebrow" data-reveal>
          Contact
        </span>
        <h1 className="contact-hero__title" data-reveal>
          Let&rsquo;s <em className="contact-hero__word contact-hero__word--outline">create</em>
          <br />
          something <em className="contact-hero__word contact-hero__word--accent">together</em>.
        </h1>
        <p className="contact-hero__lead" data-reveal>
          Questions, or just want to have a chat? Feel free to send a message!
        </p>
      </section>

      {/* ── Body ─────────────────────────────────────────── */}
      <section className="container-80 contact-body">
        <aside className="contact-info">
          <h2 className="section-label" data-reveal>
            <span className="section-label__index">01</span> Find me
          </h2>

          <div className="contact-card" data-reveal>
            <span className="contact-card__avatar" aria-hidden="true">
              TL
            </span>
            <div>
              <strong className="contact-card__name">Tomasz Liksza</strong>
              <span className="contact-card__role">Full-stack developer</span>
            </div>
          </div>

          <ul className="profile-list">
            {PROFILES.map(({ id, label, href }, i) => (
              <li key={id} style={{ "--i": i }} data-reveal>
                <a className="profile-list__link" href={href} target="_blank" rel="noopener noreferrer">
                  <span className="profile-list__index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="profile-list__label">{label}</span>
                  <span className="profile-list__arrow" aria-hidden="true">
                    ↗
                  </span>
                </a>
              </li>
            ))}
          </ul>

          <div data-reveal>
            <a className="pill-btn" href="/cv/Tomasz-Liksza-CV.pdf" download>
              <span>Download resume</span>
              <span className="pill-btn__icon" aria-hidden="true">
                ↓
              </span>
            </a>
          </div>
        </aside>

        <div className="contact-form-wrap">
          <h2 className="section-label" data-reveal>
            <span className="section-label__index">02</span> Send a message
          </h2>

          <form className="contact-form" onSubmit={handleSubmit(onValid)} noValidate data-reveal>
            <label className={errors.from_name ? "field field--error" : "field"}>
              <span className="field__label">
                <span className="field__index">01</span> Name
              </span>
              <input
                className="field__control"
                type="text"
                placeholder="What should I call you?"
                autoComplete="name"
                aria-invalid={!!errors.from_name}
                {...register("from_name", { required: true })}
              />
              {errors.from_name && <small className="field__error">Please add a name, so I know how to call you!</small>}
            </label>

            <label className={errors.reply_to ? "field field--error" : "field"}>
              <span className="field__label">
                <span className="field__index">02</span> E-mail
              </span>
              <input
                className="field__control"
                type="email"
                placeholder="you@example.com"
                autoComplete="email"
                aria-invalid={!!errors.reply_to}
                {...register("reply_to", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })}
              />
              {errors.reply_to && <small className="field__error">Add a valid e-mail</small>}
            </label>

            <label className={errors.message ? "field field--error" : "field"}>
              <span className="field__label">
                <span className="field__index">03</span> Message
              </span>
              <textarea
                className="field__control field__control--area"
                rows={6}
                placeholder="Tell me about your project, idea or just say hi."
                aria-invalid={!!errors.message}
                {...register("message", { required: true, minLength: 10 })}
              />
              {errors.message && <small className="field__error">At least say hello.. (min. 10 characters)</small>}
            </label>

            <div className="contact-form__footer">
              <button className="pill-btn" type="submit" disabled={isSubmitting}>
                <span>{isSubmitting ? "Sending…" : "Send message"}</span>
                <span className="pill-btn__icon" aria-hidden="true">
                  →
                </span>
              </button>

              <p className="contact-form__status" role="status" aria-live="polite">
                {status === "success" && (
                  <span className="status status--success">Message sent! I&rsquo;ll reply soon enough</span>
                )}
                {status === "error" && (
                  <span className="status status--error">
                    Something went wrong, definitely not my code.. Please try again
                  </span>
                )}
              </p>
            </div>
          </form>
        </div>
      </section>
    </div>
  );
};

export default Contact;
