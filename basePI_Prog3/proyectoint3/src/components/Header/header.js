import React from "react";
import './navbar.css'
import { Link } from "react-router-dom/cjs/react-router-dom.min";
function Navbar({ nombre, menuItems }) {
    return (
      <nav>
        <img src='/assets/img/momo.png' className="logo" alt=""/>
        <ul className="main-nav">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/peliculas">Peliculas</Link></li>
            <li><Link to="/series">Series</Link></li>
            <li><Link to="/favoritos">Favoritos</Link></li>
        </ul>
        <ul className="user">
        </ul>
      </nav>
    );
  }

export default Navbar;