import React from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import styles from './SharedLayout.module.css';

const SharedLayout = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const handleCatalogClick = () => {
    navigate('/catalog', { replace: true });
  };

  return (
    <div className={styles.navContainer}>
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
          onClick={handleCatalogClick}
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
