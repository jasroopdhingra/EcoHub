import React from 'react';
import css from "../styles/Scale.module.css";
import Navbar from "../components/Navbar.jsx"; 

function Scale() {
    const categories = [
        {
          title: "Habits",
          items: [
            "Reusable Bottles",
            "Buy secondhand",
            "Reduce Meat Consumption",
            "Aim for a zero-waste lifestyle"
          ]
        },
        {
          title: "School",
          items: [
            "Paperless Notes",
            "Recycle used notebooks",
            "Encourage professors to use e-books",
            "Work with administration to reduce campus waste"
          ]
        },
        {
          title: "Transportation",
          items: [
            "Walk or bike",
            "Carpool with friends",
            "Invest in a reusable transit pass",
            "Support electric vehicle initiatives on campus"
          ]
        },
        {
          title: "Community",
          items: [
            "Join eco-initiatives",
            "Attend farmers markets",
            "Start a community garden",
            "Launch a local sustainability campaign"
          ]
        }
      ];
    return (
        
    <main className={css.main}>
        <Navbar />
        <h1 className={css.heading}>Scale</h1>
        <div className={css.grid}>
          {categories.map((cat) => (
            <div key={cat.title} className={css.column}>
              <h2 className={css.columnTitle}>{cat.title}</h2>
              {cat.items.map((item, index) => (
                <div key={index} className={`${css.card} ${css[`shade${index + 1}`]}`}>
                  {item}
                </div>
              ))}
            </div>
          ))}
        </div>
      </main>
    );
}

export default Scale;