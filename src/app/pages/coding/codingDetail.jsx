import { useState } from "react";
import { Link, useParams } from "react-router";
import { CODING_PROJECTS } from "@lib/descriptions";
import "./codingDetail.css";

const CodingDetail = () => {
  const { slug } = useParams();
  const project = CODING_PROJECTS.find((p) => p.slug === slug);

  const [index, setIndex] = useState(0);

  if (!project) {
    return (
      <section className="container-80 title-wrapper project-detail__not-found">
        <h1 className="title title--center">Project not found</h1>
        <Link className="button" to="/coding">
          ← Back to Coding
        </Link>
      </section>
    );
  }

  const { images } = project;
  const banner = images[0];
  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  return (
    <>
      <section className="project-banner">
        <picture className="project-banner__media">
          {banner.webp && <source srcSet={banner.webp} type="image/webp" />}
          <img className="project-banner__image" src={banner.png} alt={banner.alt} />
        </picture>
        <div className="project-banner__overlay" />
        <div className="container-80 project-banner__content">
          <small className="project-banner__type">{project.type}</small>
          <h1 className="title project-banner__title">{project.title}</h1>
        </div>
      </section>

      <section className="container-80 project-detail__body">
        <p className="project-detail__description">{project.description}</p>
        {project.info && <small className="project-detail__info">{project?.info}</small>}

        {project.technologies?.length > 0 && (
          <ul className="project-detail__tech">
            {project.technologies.map((tech) => (
              <li key={tech} className="project-detail__tech-item">
                {tech}
              </li>
            ))}
          </ul>
        )}

        {project.web && (
          <a className="button project-detail__link" href={project.web} target="_blank" rel="noreferrer">
            Project
          </a>
        )}
      </section>

      <section className="project-carousel" aria-label={`${project.title} screenshots`}>
        <div className="project-carousel__viewport">
          <div className="project-carousel__track" style={{ transform: `translateX(-${index * 100}%)` }}>
            {images.map((img, i) => (
              <picture className="project-carousel__slide" key={i}>
                {img.webp && <source srcSet={img.webp} type="image/webp" />}
                <img className="project-carousel__image" src={img.png} alt={img.alt} loading="lazy" />
              </picture>
            ))}
          </div>
        </div>

        {images.length > 1 && (
          <>
            <button
              className="ps1-btn project-carousel__btn project-carousel__btn--left"
              onClick={goPrev}
              aria-label="Previous screenshot"
            >
              <span className="ps1-arrow" />
            </button>
            <button
              className="ps1-btn project-carousel__btn project-carousel__btn--right"
              onClick={goNext}
              aria-label="Next screenshot"
            >
              <span className="ps1-arrow ps1-arrow--right" />
            </button>

            <div className="project-carousel__dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={i === index ? "project-carousel__dot project-carousel__dot--active" : "project-carousel__dot"}
                  onClick={() => setIndex(i)}
                  aria-label={`Go to screenshot ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      <div className="container-80 project-detail__back">
        <Link className="button" to="/coding">
          ← Back to all projects
        </Link>
      </div>
    </>
  );
};

export default CodingDetail;
