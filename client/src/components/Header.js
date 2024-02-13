import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../styles/Header.scss";
import logo from "../assets/images/logo.png";

function Header() {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

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

        <nav style={{ display: menuOpen ? "block" : "none" }}>
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
            <li>
              <Link to="/products" onClick={() => setMenuOpen(false)}>
                Our Products
              </Link>
              <ul>
                <li>
                  <Link to="/perfumes" onClick={() => setMenuOpen(false)}>
                    - Perfumes
                  </Link>
                </li>
                <li>
                  <Link to="/allcleaning" onClick={() => setMenuOpen(false)}>
                    - Cleaning
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
