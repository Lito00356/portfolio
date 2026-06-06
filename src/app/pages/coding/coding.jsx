import { useState } from "react";
import "./coding.css";

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

const ApiIcon = () => (
  <svg className="grid__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
    <rect x="3" y="3" width="7" height="7" rx="1" stroke="#e2e2e2" strokeWidth="1.5" />
    <rect x="14" y="3" width="7" height="7" rx="1" stroke="#e2e2e2" strokeWidth="1.5" />
    <rect x="3" y="14" width="7" height="7" rx="1" stroke="#e2e2e2" strokeWidth="1.5" />
    <path d="M17.5 14v7M14 17.5h7" stroke="#e2e2e2" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
);

const GameIcon = () => (
  <svg className="grid__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
    <path
      d="M6 12h4M8 10v4M15 12h2M17 10v1M14 13v1M5.5 7h13a2 2 0 0 1 2 2l-1 7a2 2 0 0 1-2 2h-11a2 2 0 0 1-2-2l-1-7a2 2 0 0 1 2-2Z"
      stroke="#e2e2e2"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const ICONS = {
  "Web App": <WebAppIcon />,
  API: <ApiIcon />,
  Game: <GameIcon />,
};

const projects = [
  {
    id: 1,
    title: "Portfolio 3D",
    type: "Web App",
    stack: "React · Three.js · Vite",
    description: "Interactieve 3D portfolio met animaties en een eigen karakter gerenderd in WebGL.",
    image: "https://placehold.co/400x600/090109/e2e2e2?text=Portfolio+3D",
    alt: "Portfolio 3D project",
  },
  {
    id: 2,
    title: "Weather Dashboard",
    type: "Web App",
    stack: "Vue 3 · Pinia · OpenWeather API",
    description: "Real-time weer dashboard met meerdaagse voorspelling en locatiedetectie.",
    image: "https://placehold.co/400x600/090109/e2e2e2?text=Weather+Dashboard",
    alt: "Weather Dashboard project",
  },
  {
    id: 3,
    title: "TaskFlow API",
    type: "API",
    stack: "Node.js · Express · PostgreSQL",
    description: "REST API voor taakbeheer met gebruikersbeheer, teams en prioriteiten.",
    image: "https://placehold.co/400x600/090109/e2e2e2?text=TaskFlow+API",
    alt: "TaskFlow API project",
  },
  {
    id: 4,
    title: "Auth Service",
    type: "API",
    stack: "JWT · Redis · Docker",
    description: "Microservice voor authenticatie en autorisatie met refresh tokens en rate limiting.",
    image: "https://placehold.co/400x600/090109/e2e2e2?text=Auth+Service",
    alt: "Auth Service project",
  },
  {
    id: 5,
    title: "Pixel Run",
    type: "Game",
    stack: "Unity · C#",
    description: "2D platformer met procedureel gegenereerde levels, powerups en een lokaal scorebord.",
    image: "https://placehold.co/400x600/090109/e2e2e2?text=Pixel+Run",
    alt: "Pixel Run game project",
  },
  {
    id: 6,
    title: "ShopNest",
    type: "Web App",
    stack: "Next.js · Stripe · Prisma",
    description: "Volledig e-commerce platform met betalingen, productbeheer en een admin dashboard.",
    image: "https://placehold.co/400x600/090109/e2e2e2?text=ShopNest",
    alt: "ShopNest e-commerce project",
  },
];

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Web App", value: "webapp" },
  { label: "API", value: "api" },
  { label: "Game", value: "game" },
];

const typeMatchesFilter = (type, filter) => {
  if (filter === "all") return true;
  if (filter === "webapp") return type === "Web App";
  if (filter === "api") return type === "API";
  if (filter === "game") return type === "Game";
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

  const filtered = projects.filter((p) => typeMatchesFilter(p.type, activeFilter));

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
          <article key={project.id} className="grid__item grid__item--projects">
            <picture className="grid__media">
              <img className="media__image" src={project.image} alt={project.alt} loading="lazy" />
            </picture>

            <div className="grid__item-description">
              <div className="description__wrapper">
                {ICONS[project.type]}
                <small>{project.type}</small>
              </div>
              <strong>{project.title}</strong>
              <small>{project.stack}</small>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};

export default Coding;
