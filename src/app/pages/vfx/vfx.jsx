import { useState } from "react";
import "./vfx.css";
import { PROJECTS } from "@lib/descriptions";
import MovieIcon from "@design/CustomIcons/MovieIcon";
import SeriesIcon from "@design/CustomIcons/SeriesIcon";

const FILTERS = [
  { label: "All", value: "all" },
  { label: "Movies", value: "movies" },
  { label: "Series", value: "series" },
];

const typeMatchesFilter = (type, filter) => {
  if (filter === "all") return true;
  if (filter === "movies") return type === "Movie";
  if (filter === "series") return type === "Series";
  return false;
};

const activeStyle = {
  textDecoration: "underline",
  textDecorationColor: "var(--main-color-muted)",
  textUnderlineOffset: "4px",
  fontWeight: "700",
};

export const Vfx = () => {
  const [activeFilter, setActiveFilter] = useState("all");
  const filtered = PROJECTS.filter((p) => typeMatchesFilter(p.type, activeFilter));

  return (
    <>
      <header className="container-80 title-wrapper">
        <h1 className="title title--center title--projects">VFX_Projects</h1>
        <small className="title__subtitle">Across the years</small>
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
                {project.type === "Movie" ? <MovieIcon /> : <SeriesIcon />}
                <small>{project.type}</small>
                <br />
                <a className="description__link" href="details.html" aria-label={`Details for ${project.title}`} />
              </div>
              <strong>{project.title}</strong>
              <p>{project.description}</p>
            </div>
          </article>
        ))}
      </section>
    </>
  );
};
export default Vfx;
