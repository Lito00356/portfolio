import { useState } from "react";
import { Link } from "react-router";
import "./coding.css";
import { CODING_PROJECTS } from "@lib/descriptions";

const WebAppIcon = () => (
  <svg className="grid__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect x="2" y="3" width="20" height="15" rx="2" stroke="#e2e2e2" strokeWidth="1.5" />
    <path d="M8 21h8M12 18v3" stroke="#e2e2e2" strokeWidth="1.5" strokeLinecap="round" />
    <path d="M2 7h20" stroke="#e2e2e2" strokeWidth="1.5" />
    <circle cx="5" cy="5" r="0.75" fill="#e2e2e2" />
    <circle cx="8" cy="5" r="0.75" fill="#e2e2e2" />
    <circle cx="11" cy="5" r="0.75" fill="#e2e2e2" />
  </svg>
);

const PhoneAppIcon = () => (
  <svg className="grid__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect x="6" y="2" width="12" height="20" rx="2" stroke="#e2e2e2" strokeWidth="1.5" />
    <path d="M10.5 19h3" stroke="#e2e2e2" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const ConfiguratorIcon = () => (
  <svg className="grid__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
    <path d="M12 2 3 7v10l9 5 9-5V7l-9-5Z" stroke="#e2e2e2" strokeWidth="1.5" strokeLinejoin="round" />
    <path d="M3 7l9 5 9-5M12 12v10" stroke="#e2e2e2" strokeWidth="1.5" strokeLinejoin="round" />
  </svg>
);

const ICONS = {
  "Web App": <WebAppIcon />,
  "Phone App": <PhoneAppIcon />,
  Configurator: <ConfiguratorIcon />,
};

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Web App", value: "webapp" },
  { label: "App", value: "phoneapp" },
  { label: "Configurator", value: "configurator" },
];

const typeMatchesFilter = (type, filter) => {
  if (filter === "all") return true;
  if (filter === "webapp") return type === "Web App";
  if (filter === "phoneapp") return type === "App";
  if (filter === "configurator") return type === "Configurator";
  return false;
};

const activeStyle = {
  textDecoration: "underline",
  textDecorationColor: "var(--main-color)",
  textUnderlineOffset: "4px",
  fontWeight: "700",
};

const Coding = () => {
  const [activeFilter, setActiveFilter] = useState("all");

  const filtered = CODING_PROJECTS.filter((p) => typeMatchesFilter(p.type, activeFilter));

  return (
    <>
      <header className="container-80 title-wrapper">
        <h1 className="title title--center title--projects">Coding</h1>
        <small className="title__subtitle">Side projects & experiments</small>
      </header>

      <nav className="navbar-filter" aria-label="Project Categories">
        <ul className="navbar-filter__list">
          {FILTERS.map(({ label, value }) => (
            <li key={value} className="navbar-filter__list-button">
              <button
                className="button"
                type="button"
                style={activeFilter === value ? activeStyle : undefined}
                onClick={() => setActiveFilter(value)}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <section className="grid--projects">
        {filtered.map((project) => (
          <Link key={project.id} to={`/coding/${project.slug}`} className="grid__item grid__item--projects">
            <picture className="grid__media">
              <img className="media__image" src={project.cover} alt={project.alt} loading="lazy" />
            </picture>

            <div className="grid__item-description">
              <div className="description__wrapper">
                {ICONS[project.type]}
                <small>{project.type}</small>
              </div>
              <strong>{project.title}</strong>
              <p>{project.description}</p>
            </div>
          </Link>
        ))}
      </section>
    </>
  );
};

export default Coding;
