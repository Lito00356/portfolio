const About = () => {
  return (
    <>
      <section class="image-card image-card--reverse">
        <picture class="content__wrapper" id="me">
          <source
            class="image-card__media image-card__media--no-mask"
            media="(max-width: 42rem)"
            srcset="./src/images/webp/Portret_me.webp"
            type="image/webp"
          />
          {/* HIER ONTBREEKT NOG DE JUISTE FOTO! */}
          <img class="image-card__media" src="./src/images/Portret_me.jpg" alt="my portrait" />
        </picture>
        <div class="content__wrapper">
          <h1 class="image-card__title">About me</h1>
          <p class="image-card__content">
            I always like to say that I went from pushing pixels to writing pixels. The good thing is that I’ve stayed in the
            business of creating. It’s just the way I do it that has changed. Before getting into development, I spent many
            years working in the film and advertising industry as a compositor in visual effects (VFX). I was lucky enough to
            work on a wide range of projects, from feature films and TV to high end commercials. It was during those years
            that I developed a strong eye for detail, problem solving, and creative collaboration. After a decent run in VFX,
            and with some outside pressure encouraging me to try something new, I felt the urge to take on a different
            challenge. That’s what eventually led me to programming. I successfully completed a two year study at
            Arteveldehogeschool in Ghent, which gave me the foundation to become a full stack developer. Along the way, I
            also developed a stronger interest in specific areas of the development world. For me, the transition from film
            to development feels quite natural. I still get to use the technical skills I built over the years, while also
            bringing my creative background into the mix to build engaging digital experiences.
          </p>
          <div class="button button-wrapper">
            <a class="button-link" href="#resume">
              Resume
            </a>
          </div>
        </div>
      </section>
    </>
  );
};

export default About;
