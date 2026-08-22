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
        <h1 className="title title--center">Project niet gevonden</h1>
        <Link className="button" to="/coding">
          ← Terug naar Coding
        </Link>
      </section>
    );
  }

  const { images } = project;
  const goPrev = () => setIndex((i) => (i - 1 + images.length) % images.length);
  const goNext = () => setIndex((i) => (i + 1) % images.length);

  return (
    <>
      <section className="project-banner">
        <picture className="project-banner__media">
          {project.cover.webp && <source srcSet={project.cover.webp} type="image/webp" />}
          <img className="project-banner__image" src={project.cover.png} alt={project.alt} />
        </picture>
        <div className="project-banner__overlay" />
        <div className="container-80 project-banner__content">
          <small className="project-banner__type">{project.type}</small>
          <h1 className="title project-banner__title">{project.title}</h1>
        </div>
      </section>

      <section className="container-80 project-detail__body">
        <p className="project-detail__description">{project.description}</p>
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
            <button className="ps1-btn project-carousel__btn project-carousel__btn--left" onClick={goPrev} aria-label="Vorige screenshot">
              <span className="ps1-arrow" />
            </button>
            <button className="ps1-btn project-carousel__btn project-carousel__btn--right" onClick={goNext} aria-label="Volgende screenshot">
              <span className="ps1-arrow ps1-arrow--right" />
            </button>

            <div className="project-carousel__dots">
              {images.map((_, i) => (
                <button
                  key={i}
                  className={
                    i === index ? "project-carousel__dot project-carousel__dot--active" : "project-carousel__dot"
                  }
                  onClick={() => setIndex(i)}
                  aria-label={`Ga naar screenshot ${i + 1}`}
                />
              ))}
            </div>
          </>
        )}
      </section>

      <div className="container-80 project-detail__back">
        <Link className="button" to="/coding">
          ← Terug naar alle projecten
        </Link>
      </div>
    </>
  );
};

export default CodingDetail;
