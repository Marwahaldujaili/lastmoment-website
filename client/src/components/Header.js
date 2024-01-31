import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <div>
      <header>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/about">About Us</Link>
            </li>
            <li>
              <Link to="/products">Our Products</Link>
              <ul>
                <li>
                  <Link to="/products/perfumes">Perfumes</Link>
                </li>
                <li>
                  <Link to="/products/cleaning">Cleaning </Link>
                </li>
              </ul>
            </li>
            <li>
              <Link to="/gallery">Gallery</Link>
            </li>
            <li>
              <Link to="/contact">Contact Us</Link>
            </li>
          </ul>
        </nav>
      </header>
    </div>
  );
}

export default Header;
