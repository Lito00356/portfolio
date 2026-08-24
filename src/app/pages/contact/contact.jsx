import { useForm } from "react-hook-form";
import "./contact.css";

const CONTACT_INFO = {
  name: "Tomasz Liksza",
  role: "Full Stack Developer",
  email: "jouw.email@example.com",
  linkedin: "https://www.linkedin.com/in/jouw-profiel",
  github: "https://github.com/jouw-gebruikersnaam",
};

const Contact = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm();

  return (
    <section className="container-80 contact">
      <div className="contact__info">
        <h1 className="title">Contact</h1>
        <p className="contact__tagline">
          Heb je een project, vraag, of wil je gewoon eens praten? Stuur gerust een bericht.
        </p>

        <ul className="contact__list">
          <li className="contact__item">
            <strong>{CONTACT_INFO.name}</strong>
            <span>{CONTACT_INFO.role}</span>
          </li>
          <li className="contact__item">
            <a className="contact__link" href={`mailto:${CONTACT_INFO.email}`}>
              {CONTACT_INFO.email}
            </a>
          </li>
        </ul>

        <div className="contact__socials">
          <a
            className="contact__social-link"
            href={CONTACT_INFO.linkedin}
            target="_blank"
            rel="noreferrer"
            aria-label="LinkedIn"
          >
            <img className="contact__social-icon" src="/images/linkedin.svg" alt="" />
          </a>
          <a
            className="contact__social-link"
            href={CONTACT_INFO.github}
            target="_blank"
            rel="noreferrer"
            aria-label="GitHub"
          >
            <img className="contact__social-icon contact__social-icon--invert" src="/images/github.svg" alt="" />
          </a>
        </div>
      </div>

      <form className="contact__form">
        <label className="contact__field">
          <span>Naam</span>
          <input type="text" {...register("from_name", { required: true })} />
          {errors.from_name && <small>Please add a name, so I know how to call you!</small>}
        </label>
        <label className="contact__field">
          <span>E-mail</span>
          <input type="email" {...register("reply_to", { required: true, pattern: /^[^\s@]+@[^\s@]+\.[^\s@]+$/ })} />
          {errors.reply_to && <small>Add a valid e-mail</small>}
        </label>
        <label className="contact__field">
          <span>Bericht</span>
          <textarea rows={6} {...register("message", { required: true, minLength: 10 })} />
          {errors.message && <small>At least say hello.. (min. 10 tekens)</small>}
        </label>
        <button type="submit" disabled={isSubmitting}>
          Send
        </button>
      </form>
    </section>
  );
};

export default Contact;
