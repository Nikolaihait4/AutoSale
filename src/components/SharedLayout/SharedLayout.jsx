import React from 'react';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import styles from './SharedLayout.module.css';

const SharedLayout = () => {
  const location = useLocation();

  return (
    <div>
      <header className={styles.navbar}>
        <NavLink
          to="/"
          className={location.pathname === '/' ? styles.active : styles.navLink}
        >
          Home
        </NavLink>
        <NavLink
          to="/catalog"
          className={
            location.pathname === '/catalog' ? styles.active : styles.navLink
          }
        >
          Catalog
        </NavLink>
        <NavLink
          to="/favorites"
          className={
            location.pathname === '/favorites' ? styles.active : styles.navLink
          }
        >
          Favorites
        </NavLink>
      </header>
      <Outlet />
    </div>
  );
};

export default SharedLayout;
