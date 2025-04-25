import React from "react";
import css from "../styles/Scale.module.css";
import Navbar from "../components/Navbar.jsx"; 
import CategoryCard from "../components/ScaleCard.jsx";
import initialStore from "../assets/initialStore.json";

function Scale() {
  const { categories } = initialStore.scale;

  return (
    <main className={css.main}>
      <Navbar />
      <h1 className={css.heading}>What Can You Do?</h1>
      <div className={css.grid}>
        {categories.map((cat, index) => (
          <CategoryCard key={index} title={cat.title} items={cat.items} />
        ))}
      </div>
    </main>
  );
}

export default Scale;