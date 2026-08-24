import "./about.css";

const About = () => {
  return (
    <section className="container-80 about">
      <div className="about__media">
        <picture>
          <source srcSet="/images/webp/Portret_me.webp" type="image/webp" />
          <img className="about__image" src="/images/Portret_me.jpg" alt="Portret van Tomasz Liksza" />
        </picture>
      </div>

      <div className="about__content">
        <h1 className="title">About me</h1>
        <p className="about__text">
          I always like to say that I went from pushing pixels to writing pixels. The good thing is that I&rsquo;ve stayed in
          the business of creating. It&rsquo;s just the way I do it that has changed. Before getting into development, I
          spent many years working in the film and advertising industry as a compositor in visual effects (VFX). I was lucky
          enough to work on a wide range of projects, from feature films and TV to high end commercials. It was during those
          years that I developed a strong eye for detail, problem solving, and creative collaboration. After a decent run in
          VFX, and with some outside pressure encouraging me to try something new, I felt the urge to take on a different
          challenge. That&rsquo;s what eventually led me to programming. I successfully completed a two year study at
          Arteveldehogeschool in Ghent, which gave me the foundation to become a full stack developer. Along the way, I also
          developed a stronger interest in specific areas of the development world. For me, the transition from film to
          development feels quite natural. I still get to use the technical skills I built over the years, while also
          bringing my creative background into the mix to build engaging digital experiences.
        </p>
      </div>
    </section>
  );
};

export default About;
