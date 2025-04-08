import React from 'react';
import {Link, useLocation } from 'react-router-dom';
import css from '../styles/Navbar.module.css';


export default function Navbar() {
    const location = useLocation();
    const getPageTitle = () => {
        switch (location.pathname) {
          case '/':
            return 'Home';
          case '/scale':
            return 'Scale';
          case '/map':
            return 'Map';
          case '/forum':
            return 'Forum';
          default:
            return 'Page';
        }
      };
  return (
    <nav className={css.navbar}>
        <span className={css.title}>{getPageTitle()}</span>
      <ul className={css.navLinks}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/scale">Scale</Link></li>
        <li><Link to="/map">Map</Link></li>
        <li><Link to="/forum">Forum</Link></li>
      </ul>
    </nav>
  );
}