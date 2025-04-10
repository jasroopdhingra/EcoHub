import React from 'react';
import css from "../styles/ScaleCard.module.css";

export default function ScaleCard({ title, items }) {
  return (
    <div className={css.column}>
      <h2 className={css.columnTitle}>{title}</h2>
      {items.map((item, index) => (
        <div key={index} className={`${css.card} ${css[`shade${index + 1}`]}`}>
          {item}
        </div>
      ))}
    </div>
  );
}
