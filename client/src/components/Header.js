import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
import logo from "../assets/images/logo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [windowWidth, setWindowWidth] = useState(window.innerWidth);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => window.removeEventListener("resize", handleResize);
  }, []);
  const isMobile = windowWidth < 1024;

  return (
    <div>
      <header>
        <div className="logo">
          <Link to="/" onClick={() => setMenuOpen(false)}>
            <img src={logo} alt="Last Moment Logo" />
          </Link>
        </div>

        <div
          className={`burger-menu ${menuOpen ? "close" : ""}`}
          onClick={toggleMenu}
        >
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav
          className={`${
            isMobile ? (menuOpen ? "nav-visible" : "nav-hidden") : ""
          }`}
        >
          <ul>
            <li>
              <Link to="/" onClick={() => setMenuOpen(false)}>
                Home
              </Link>
            </li>
            <li>
              <Link to="/about" onClick={() => setMenuOpen(false)}>
                About Us
              </Link>
            </li>
            <li className="dropdown">
              <Link
                to="/products"
                onClick={() => isMobile && setMenuOpen(false)}
              >
                Our Products
              </Link>
              <ul className="dropdown-content">
                <li>
                  <Link to="/allperfumes" onClick={() => setMenuOpen(false)}>
                    Perfumes
                  </Link>
                </li>
                <li>
                  <Link to="/allcleaning" onClick={() => setMenuOpen(false)}>
                    Cleaning
                  </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/gallery" onClick={() => setMenuOpen(false)}>
                Gallery
              </Link>
            </li>
            <li>
              <Link to="/contact" onClick={() => setMenuOpen(false)}>
                Contact Us
              </Link>
            </li>
            <li>
              <Link to="/login" onClick={() => setMenuOpen(false)}>
                Login
              </Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
