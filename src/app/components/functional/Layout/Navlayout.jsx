import { Link, NavLink } from "react-router";
import { useState } from "react";
import { Outlet } from "react-router";
import "./Navlayout.css";

const NAV_LINKS = [
  { to: "/", label: "Home" },
  { to: "/vfx", label: "Vfx" },
  { to: "/coding", label: "Coding" },
  { to: "/about", label: "About" },
  { to: "/contact", label: "Contact" },
];

const HamburgerIcon = () => (
  <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M9.5 12.5C9.5 11.6703 10.1703 11 11 11H29C29.8297 11 30.5 11.6703 30.5 12.5C30.5 13.3297 29.8297 14 29 14H11C10.1703 14 9.5 13.3297 9.5 12.5ZM9.5 20C9.5 19.1703 10.1703 18.5 11 18.5H29C29.8297 18.5 30.5 19.1703 30.5 20C30.5 20.8297 29.8297 21.5 29 21.5H11C10.1703 21.5 9.5 20.8297 9.5 20ZM30.5 27.5C30.5 28.3297 29.8297 29 29 29H11C10.1703 29 9.5 28.3297 9.5 27.5C9.5 26.6703 10.1703 26 11 26H29C29.8297 26 30.5 26.6703 30.5 27.5Z" />
  </svg>
);

const Navlayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const openMenu = () => setIsOpen(true);
  const closeMenu = () => setIsOpen(false);

  return (
    <div className={isOpen ? "layout open" : "layout"}>
      <nav className="navbar">
        <Link className="navbar__logo" to="/" aria-label="Home">
          LiTo
        </Link>

        <div className="navbar__list-wrapper">
          <ul className="navbar__list">
            {NAV_LINKS.map(({ to, label }) => (
              <li key={to} className="navbar__list-item">
                <NavLink
                  className={({ isActive }) => isActive ? "navbar__list-link navbar__list-link--active" : "navbar__list-link"}
                  to={to}
                  aria-label={label}
                  end={to === "/"}
                  onClick={closeMenu}
                >
                  {label}
                </NavLink>
              </li>
            ))}
          </ul>

          <button className="button navbar__hamburger" onClick={openMenu} aria-label="Open menu">
            <HamburgerIcon />
          </button>

          <button className="button btn-close" onClick={closeMenu} aria-label="Close menu">
            &#x2715;
          </button>
        </div>
      </nav>

      <Outlet />
    </div>
  );
};

export default Navlayout;
