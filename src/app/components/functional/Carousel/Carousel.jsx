import Floppy from "@functional/FloppyDisk/Floppy";
import { STICKERS } from "@lib/paths";

const PAGES = [
  { title: "Vfx", key: "vfx", route: "/vfx" },
  { title: "Coding", key: "coding", route: "/coding" },
  { title: "About", key: "about", route: "/about" },
  { title: "Contact", key: "contact", route: "/contact" },
];

const RADIUS = 2;

const Carousel = () => {
  const floppyDisks = PAGES.map((page, index) => {
    const angle = index * ((2 * Math.PI) / PAGES.length);
    const x = Math.sin(angle) * RADIUS;
    const z = Math.cos(angle) * RADIUS;

    return <Floppy key={page.key} position={[x, 0, z]} rotation={[0, angle, 0]} texturePath={STICKERS[page.key]} />;
  });

  return floppyDisks;
};

export default Carousel;
