import React from 'react';
import css from "../styles/Scale.module.css";
import Navbar from "../components/Navbar.jsx"; 
import CategoryCard from "../components/ScaleCard.jsx";
import initialStore from "../assets/initialStore.json";

function Scale() {
  const { categories } = initialStore.scale;

  return (
    <main className={css.main}>
      <Navbar />
      <h1 className={css.heading}>Scale</h1>
      <div className={css.grid}>
        {categories.map((cat) => (
          <CategoryCard key={cat.title} title={cat.title} items={cat.items} />
        ))}
      </div>
    </main>
  );
}

export default Scale;
