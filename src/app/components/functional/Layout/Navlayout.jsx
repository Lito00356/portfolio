import { Outlet } from "react-router";
import "./Navlayout.css";

const Navlayout = () => {
  return (
    <>
      <nav className="nav-container">
        <ul className="navbar">
          <li className="navbar__list-item">
            <a href="/">Home</a>
          </li>
          <li className="navbar__list-item">
            <a href="/vfx">Vfx</a>
          </li>
          <li className="navbar__list-item">
            <a href="/coding">Coding</a>
          </li>
          <li className="navbar__list-item">
            <a href="/about">About</a>
          </li>
          <li className="navbar__list-item">
            <a href="/contact">Contact</a>
          </li>
        </ul>
      </nav>
      <Outlet />
    </>
  );
};

export default Navlayout;
