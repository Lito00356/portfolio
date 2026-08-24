const buildImages = (folder, count, title) =>
  Array.from({ length: count }, (_, i) => {
    const n = String(i + 1).padStart(2, "0");
    return {
      webp: `/images/webp/${folder}_${n}.webp`,
      png: `/images/${folder}_${n}.png`,
      alt: `${title} screenshot ${i + 1}`,
    };
  });

export const CODING_PROJECTS = [
  {
    id: 1,
    slug: "seapark-lss",
    title: "Seapark LSS",
    type: "Web App",
    description:
      "Beheersysteem voor een zeepark. Crew, departments (Dolphins, Sea Lions, Seals, Aquasplash), taken en waterkwaliteitsmetingen worden centraal opgevolgd via dashboards en meldingen.",
    info: "You can login to all users with pin '0000'",
    cover: "/images/thumbnails/seapark.jpg",
    alt: "Seapark LSS dashboard met departments overzicht",
    images: buildImages("bwd_seapark", 9, "Seapark LSS"),
    web: "https://boudewijnseapark-server.onrender.com/",
  },
  {
    id: 2,
    slug: "roomcraft",
    title: "RoomCraft",
    type: "Configurator",
    description:
      "3D kamerconfigurator waarmee gebruikers een ruimte tekenen, meubels toevoegen en het resultaat meteen in 3D bekijken, van blueprint tot perspectiefweergave.",
    info: "You can create a new user and try out the app",
    cover: "/images/thumbnails/roomcraft.jpg",
    alt: "RoomCraft landingspagina",
    images: buildImages("configurate3D", 9, "RoomCraft"),
    web: "https://afstudeerproject-lito00356.onrender.com/",
  },
  {
    id: 3,
    slug: "kanbanana",
    title: "Kanbanana",
    type: "Web App",
    description:
      "Kanban-bord voor projectbeheer met To Do, In Progress, Ready For Review en Done kolommen, een backlog-overzicht en taakkaarten met tags en beschrijvingen.",
    info: "Play with current set up projects or add a new one",
    cover: "/images/thumbnails/kanbanana.jpg",
    alt: "Kanbanana bord met taken",
    images: buildImages("kanbanana", 5, "Kanbanana"),
    web: "https://kanbanana-r1kw.onrender.com/",
  },
  {
    id: 4,
    slug: "tracking-marker",
    title: "Tracking Marker",
    type: "Web App",
    description:
      "Persoonlijke takentracker met categorieën zoals Work, Hobby en Home, pending/done overzichten en een login systeem om overal te kunnen opvolgen.",
    info: "You can create a new user for this app",
    cover: "/images/thumbnails/todo.jpg",
    alt: "Tracking Marker takenoverzicht",
    images: buildImages("tracking_marker", 7, "Tracking Marker"),
    web: "https://todo-app-eydb.onrender.com/",
  },
  {
    id: 5,
    slug: "foosball",
    title: "Foosball",
    type: "Native App",
    description:
      "Companion app voor de tafelvoetbaltafel: scores bijhouden, matches loggen en een klein leaderboard. Nog in ontwikkeling, screenshots volgen binnenkort.",
    cover: "/images/thumbnails/foosball.jpg",
    alt: "Foosforce app kalender met wedstrijden",
    images: buildImages("foosball", 7, "Foosball"),
  },
];

export const VFX_PROJECTS = [
  {
    id: 1,
    title: "John Wick 4",
    type: "Movie",
    description: "Action movie about John Wick",
    image: "/images/webp/john_wick4.webp",
    alt: "John Wick 4 movieposter",
    imdb: "https://www.imdb.com/title/tt10366206/",
  },
  {
    id: 2,
    title: "Heart Of Stone",
    type: "Movie",
    description: "Action movie about a spy",
    image: "/images/webp/heart_of_stone.webp",
    alt: "Heart of Stone movieposter",
    imdb: "https://www.imdb.com/title/tt13603966/?ref_=nv_sr_srsg_0_tt_8_nm_0_in_0_q_heart%20of%20stone",
  },
  {
    id: 3,
    title: "Freaks Out",
    type: "Movie",
    description: "Science-fiction and superpowers in WWII",
    image: "/images/webp/freaks_out.webp",
    alt: "Freaks Out movieposter",
    imdb: "https://www.imdb.com/title/tt7270808/?ref_=fn_t_1",
  },
  {
    id: 4,
    title: "Vesper",
    type: "Movie",
    description: "A lost world where food is scarce! Thrilling sci-fi and great visuals",
    image: "/images/webp/vesper.webp",
    alt: "Vesper movieposter",
    imdb: "https://www.imdb.com/title/tt20225374/?ref_=nv_sr_srsg_0_tt_4_nm_4_in_0_q_vesper",
  },
  {
    id: 5,
    title: "The Witcher Season 3",
    type: "Series",
    description: "Series about Geralt Of Rivia trying to find his ward from the law of surprise",
    image: "/images/webp/the_witcher.webp",
    alt: "The Witcher season 3 series poster",
    imdb: "https://www.imdb.com/title/tt5180504/?ref_=nv_sr_srsg_0_tt_6_nm_1_in_1_q_the%20witcher",
  },
  {
    id: 6,
    title: "Le Jardinier",
    type: "Movie",
    description: "Muscles from Brussels are back! Comedy packed with humor and nostalgia",
    image: "/images/webp/le_jardinier.webp",
    alt: "Le Jardinier movieposter",
    imdb: "https://www.imdb.com/title/tt30973842/?ref_=fn_t_1",
  },
  {
    id: 7,
    title: "More will be added soon",
    type: "Soon",
    description: "The rest of my work will soon be visible!",
    image: "https://placehold.co/400x600/090109/e2e2e2?text=More+Soon",
    alt: "Placeholder for upcoming VFX projects",
    imdb: "",
  },
];
