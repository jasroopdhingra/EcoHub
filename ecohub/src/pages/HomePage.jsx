// HomePage.jsx
import React from 'react';
import HomePageNavbar from '../components/HomePageNavbar.jsx';
import css from '../styles/HomePage.module.css';

function HomePage() {
  return (
    <div className={css.container}>
      <HomePageNavbar />

      <div className={css.heroSection}>
        <div className={css.overlay}></div>
        <div className={css.heroContent}>
          <h1 className={css.heroTitle}>EcoHub</h1>
          <p className={css.heroSubtitle}>Discover Sustainable Choices in Your Community</p>
        </div>
      </div>

      <footer className={css.footer}>
        <p>Empowering students to make sustainable choices</p>
        <p>© 2025 EcoHub</p>
      </footer>
    </div>
  );
}

export default HomePage;
