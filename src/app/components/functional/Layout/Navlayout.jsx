import { Link, NavLink, Outlet } from "react-router";
import { useEffect, useRef, useState } from "react";
import { SOCIALS } from "@lib/socials";
import "./Navlayout.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/vfx", label: "Vfx" },
  { to: "/coding", label: "Coding" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const SOCIAL_ICONS = {
  github: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M12 .5a11.5 11.5 0 0 0-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.05-.71.08-.7.08-.7 1.16.08 1.77 1.19 1.77 1.19 1.03 1.77 2.7 1.26 3.36.96.1-.75.4-1.26.73-1.55-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.17 1.18a11 11 0 0 1 5.77 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.41-2.69 5.38-5.25 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 12 .5Z" />
    </svg>
  ),
  linkedin: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.13 2.06 2.06 0 0 1 0 4.13ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.73v20.54C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.73V1.73C24 .77 23.2 0 22.22 0Z" />
    </svg>
  ),
  imdb: (
    <svg viewBox="0 0 24 24" aria-hidden="true">
      <path d="M22.3781 0H1.6218C.7411.0583.0587.7437.0018 1.5953l-.001 20.783c.0585.8761.7125 1.543 1.5559 1.6191A.337.337 0 0 0 1.6016 24h20.7971a.4579.4579 0 0 0 .0437-.002c.8727-.0768 1.5568-.8271 1.5568-1.7085V1.7098c0-.8914-.696-1.6416-1.584-1.7078A.3294.3294 0 0 0 22.3781 0zm0 .496a1.2144 1.2144 0 0 1 1.1252 1.2139v20.5797c0 .6377-.4875 1.1602-1.1045 1.2145H1.6016c-.5967-.0543-1.0645-.5297-1.1053-1.1258V1.6284C.5371 1.0185 1.0184.5364 1.6217.496h20.7564zM4.7954 8.2603v7.3636H2.8899V8.2603h1.9055zm6.5367 0v7.3636H9.6707v-4.9704l-.6711 4.9704H7.813l-.6986-4.8618-.0066 4.8618h-1.668V8.2603h2.468c.0748.4476.1492.9694.2307 1.5734l.2712 1.8713.4407-3.4447h2.4817zm2.9772 1.3289c.0742.0404.122.108.1417.2034.0279.0953.0345.3118.0345.6442v2.8548c0 .4881-.0345.7867-.0955.8954-.0609.1152-.2304.1695-.5018.1695V9.5211c.204 0 .3457.0205.4211.0681zm-.0211 6.0347c.4543 0 .8006-.0265 1.0245-.0742.2304-.0477.4204-.1357.5694-.2648.1556-.1218.2642-.298.3251-.5219.0611-.2238.1021-.6648.1021-1.3224v-2.5832c0-.6986-.0271-1.1668-.0742-1.4039-.041-.237-.1431-.4543-.3126-.6437-.1695-.1973-.4198-.3324-.7456-.421-.3191-.0808-.8542-.1285-1.7694-.1285h-1.4244v7.3636h2.3051zm5.14-1.7827c0 .3523-.0199.5762-.0544.6708-.033.0947-.1894.1424-.3046.1424-.1086 0-.19-.0477-.2238-.1351-.041-.0887-.0609-.2986-.0609-.6238v-1.9469c0-.3324.0199-.5423.0543-.6237.0338-.0808.1086-.122.2171-.122.1153 0 .2709.0412.3114.1425.041.0947.0609.2986.0609.6032v1.8926zm-2.4747-5.5809v7.3636h1.7157l.1152-.4675c.1556.1894.3251.3324.5152.4271.1828.0881.4608.1357.678.1357.3047 0 .5629-.0748.7802-.237.2165-.1562.3589-.3462.4198-.5628.0543-.2173.0887-.543.0887-.9841v-2.0675c0-.4409-.0139-.7324-.0344-.8681-.0199-.1357-.0742-.2781-.1695-.4204-.1021-.1425-.2437-.251-.4272-.3325-.1834-.0742-.3999-.1152-.6576-.1152-.2172 0-.4952.0477-.6846.1285-.1835.0887-.353.2238-.5086.4007V8.2603h-1.8309z" />
    </svg>
  ),
};

const Navlayout = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuButtonRef = useRef(null);
  const closeButtonRef = useRef(null);
  const wasOpen = useRef(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  // Escape closes, lock scroll, move focus
  useEffect(() => {
    if (isOpen) {
      wasOpen.current = true;
      document.body.style.overflow = "hidden";
      closeButtonRef.current?.focus({ preventScroll: true });

      const onKey = (e) => e.key === "Escape" && setIsOpen(false);
      window.addEventListener("keydown", onKey);
      return () => {
        window.removeEventListener("keydown", onKey);
        document.body.style.overflow = "";
      };
    }
    if (wasOpen.current) menuButtonRef.current?.focus({ preventScroll: true });
  }, [isOpen]);

  return (
    <div className={isOpen ? "layout layout--open" : "layout"}>
      <div className="layout__page" inert={isOpen}>
        <header className="topbar">
          <Link className="topbar__logo" to="/" aria-label="LiTo, go to home">
            <span className="topbar__logo-mark" aria-hidden="true">
              L
            </span>
            <span className="topbar__logo-rest" aria-hidden="true">
              iTo
            </span>
          </Link>

          <button
            ref={menuButtonRef}
            className="button menu-toggle"
            onClick={openMenu}
            aria-expanded={isOpen}
            aria-controls="site-drawer"
          >
            <span className="menu-toggle__label" data-text="Menu">
              Menu
            </span>
            <span className="menu-toggle__bars" aria-hidden="true">
              <span />
              <span />
              <span />
            </span>
          </button>
        </header>

        <Outlet />
      </div>

      <div className="layout__scrim" onClick={closeMenu} aria-hidden="true" />

      <aside
        id="site-drawer"
        className="drawer"
        aria-label="Main menu"
        aria-hidden={!isOpen}
        inert={!isOpen}
      >
        <div className="drawer__head">
          <span className="drawer__eyebrow">Navigation</span>
          <button ref={closeButtonRef} className="button drawer__close" onClick={closeMenu} aria-label="Close menu">
            <span aria-hidden="true" />
          </button>
        </div>

        <nav className="drawer__nav">
          <ul className="drawer__list">
            {NAV_LINKS.map(({ to, label }, i) => (
              <li key={to} className="drawer__item" style={{ "--i": i }}>
                <NavLink
                  className={({ isActive }) => (isActive ? "drawer__link drawer__link--active" : "drawer__link")}
                  to={to}
                  end={to === "/"}
                  onClick={closeMenu}
                >
                  <span className="drawer__index">{String(i + 1).padStart(2, "0")}</span>
                  <span className="drawer__label" data-text={label}>
                    {label}
                  </span>
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="drawer__foot">
          <span className="drawer__eyebrow">Socials</span>
          <ul className="drawer__socials">
            {SOCIALS.map(({ id, label, href }) => (
              <li key={id}>
                <a className="social-btn" href={href} target="_blank" rel="noopener noreferrer" aria-label={label}>
                  {SOCIAL_ICONS[id]}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>
    </div>
  );
};

export default Navlayout;
