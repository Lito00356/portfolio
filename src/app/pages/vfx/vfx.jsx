import { useState } from "react";
import "./vfx.css";

const MovieIcon = () => (
  <svg className="grid__icon" viewBox="0 0 24 24" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="none">
    <g fill="#e2e2e2" fillRule="nonzero">
      <path d="M19.7286477,3.91709009 L19.7796475,4.07673953 L20.3309222,5.99926292 C20.4355805,6.36424991 20.2508505,6.74366136 19.9126449,6.89230405 L19.8167039,6.92693721 L9.08979429,10.0020329 L20.2488588,10.0029698 C20.6285546,10.0029698 20.9423498,10.2851237 20.9920122,10.6511993 L20.9988588,10.7529698 L20.9988588,19.2509821 C20.9988588,20.713514 19.8571542,21.9093864 18.4163811,21.9959633 L18.2488588,22.0009821 L5.75,22.0009821 C4.28746816,22.0009821 3.09159572,20.8592775 3.00501879,19.4185045 L3,19.2509821 L2.99979429,10.8590329 L2.47803395,9.03789737 C2.07490554,7.63202154 2.84275532,6.16777873 4.20385145,5.68742476 L4.36350088,5.63642498 L16.3781751,2.19127259 C17.7840509,1.78814418 19.2482937,2.55599396 19.7286477,3.91709009 Z M19.498,11.502 L4.5,11.502 L4.5,19.2509821 C4.5,19.8550436 4.92847749,20.3590287 5.4980814,20.4755866 L5.62219476,20.4945285 L5.75,20.5009821 L18.2488588,20.5009821 C18.8960675,20.5009821 19.4283927,20.0091075 19.4924052,19.3787874 L19.4988588,19.2509821 L19.498,11.502 Z M6.27268011,6.6494258 L4.77695691,7.07831752 C4.15481999,7.25671241 3.7786565,7.8762725 3.89085867,8.49982068 L3.91988247,8.62445396 L4.26421826,9.82529556 L4.55930489,9.74043653 L6.27268011,6.6494258 Z M11.029003,5.28557216 L8.31151617,6.06479896 L6.59814094,9.15580969 L9.31562776,8.37658289 L11.029003,5.28557216 Z M15.7862871,3.92144289 L13.0688003,4.70066969 L11.3554251,7.79168042 L14.0719506,7.01272925 L15.7862871,3.92144289 Z M17.6334765,3.68788446 L16.1127092,6.42755115 L18.6812212,5.6912865 L18.3377549,4.49019556 C18.2305941,4.11648136 17.96425,3.83153666 17.6334765,3.68788446 Z" />
    </g>
  </svg>
);

const SeriesIcon = () => (
  <svg className="grid__icon" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" fill="none">
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M15.4881 1.43057C15.8026 1.70014 15.839 2.17361 15.5694 2.48811L13.2021 5.25001L16.0549 5.25001C17.4225 5.24999 18.5248 5.24997 19.3918 5.36653C20.2919 5.48755 21.0497 5.74644 21.6516 6.34836C22.2536 6.95028 22.5125 7.70815 22.6335 8.60826C22.75 9.47523 22.75 10.5776 22.75 11.9451V16.0549C22.75 17.4225 22.75 18.5248 22.6335 19.3918C22.5125 20.2919 22.2536 21.0497 21.6517 21.6517C21.0497 22.2536 20.2919 22.5125 19.3918 22.6335C18.5248 22.7501 17.4225 22.75 16.0549 22.75L7.94513 22.75C6.57754 22.75 5.47522 22.7501 4.60825 22.6335C3.70814 22.5125 2.95027 22.2536 2.34835 21.6517C1.74643 21.0497 1.48754 20.2919 1.36652 19.3918C1.24996 18.5248 1.24998 17.4225 1.25 16.0549L1.25 11.9451C1.24998 10.5775 1.24996 9.47523 1.36652 8.60826C1.48754 7.70815 1.74643 6.95028 2.34835 6.34836C2.95027 5.74645 3.70814 5.48755 4.60825 5.36654C5.47521 5.24998 6.57753 5.24999 7.94512 5.25001L10.7979 5.25001L8.43056 2.48811C8.16099 2.17361 8.19741 1.70014 8.51191 1.43057C8.8264 1.16101 9.29988 1.19743 9.56944 1.51192L12 4.34757L14.4306 1.51192C14.7001 1.19743 15.1736 1.161 15.4881 1.43057ZM16.75 6.75079L16.75 21.2492C17.7958 21.246 18.5756 21.2297 19.1919 21.1469C19.9257 21.0482 20.3142 20.8678 20.591 20.591C20.8678 20.3142 21.0482 19.9257 21.1469 19.1919C21.2484 18.4365 21.25 17.4354 21.25 16V12C21.25 10.5646 21.2484 9.56348 21.1469 8.80813C21.0482 8.07436 20.8678 7.68578 20.591 7.40902C20.3142 7.13226 19.9257 6.95181 19.1919 6.85316C18.5756 6.77031 17.7958 6.75399 16.75 6.75079ZM15.25 21.25L15.25 6.75001L8 6.75001C6.56458 6.75001 5.56347 6.75161 4.80812 6.85316C4.07435 6.95181 3.68577 7.13226 3.40901 7.40902C3.13225 7.68579 2.9518 8.07436 2.85315 8.80813C2.75159 9.56348 2.75 10.5646 2.75 12L2.75 16C2.75 17.4354 2.75159 18.4365 2.85315 19.1919C2.9518 19.9257 3.13225 20.3142 3.40901 20.591C3.68577 20.8678 4.07435 21.0482 4.80812 21.1469C5.56347 21.2484 6.56459 21.25 8 21.25L15.25 21.25Z"
      fill="#e2e2e2"
    />
    <circle cx="19" cy="16" r="1" fill="#e2e2e2" />
    <circle cx="19" cy="12" r="1" fill="#e2e2e2" />
  </svg>
);

const projects = [
  {
    id: 1,
    title: "John Wick 4",
    type: "Movie",
    description: "Action movie about John Wick",
    image: "/images/webp/john_wick4.webp",
    alt: "John Wick 4 movieposter",
  },
  {
    id: 2,
    title: "Heart Of Stone",
    type: "Movie",
    description: "Action movie about a spy",
    image: "/images/webp/heart_of_stone.webp",
    alt: "Heart of Stone movieposter",
  },
  {
    id: 3,
    title: "Freaks Out",
    type: "Movie",
    description: "Science-fiction and superpowers in WWII",
    image: "/images/webp/freaks_out.webp",
    alt: "Freaks Out movieposter",
  },
  {
    id: 4,
    title: "Vesper",
    type: "Movie",
    description: "A lost world where food is scarce! Thrilling sci-fi and great visuals",
    image: "/images/webp/vesper.webp",
    alt: "Vesper movieposter",
  },
  {
    id: 5,
    title: "The Witcher Season 4",
    type: "Series",
    description: "Series about Geralt Of Rivia trying to find his ward from the law of surprise",
    image: "/images/webp/the_witcher.webp",
    alt: "The Witcher season 4 series poster",
  },
  {
    id: 6,
    title: "Le Jardinier",
    type: "Movie",
    description: "Muscles from Brussels are back! Comedy packed with humor and nostalgia",
    image: "/images/webp/le_jardinier.webp",
    alt: "Le Jardinier movieposter",
  },
];

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

  const filtered = projects.filter((p) => typeMatchesFilter(p.type, activeFilter));

  return (
    <>
      <header className="container-80 title-wrapper">
        <h1 className="title title--center title--projects">Vfx</h1>
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

      <section className="grid grid--projects">
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
