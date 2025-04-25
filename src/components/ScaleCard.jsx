import React, { useState } from 'react';
import css from "../styles/ScaleCard.module.css";

export default function ScaleCard({ title, items }) {
  const [expandedIndex, setExpandedIndex] = useState(null);

  const handleToggle = (index) => {
    setExpandedIndex(prev => (prev === index ? null : index));
  };

  return (
    <div className={css.column}>
      <h2 className={css.columnTitle}>{title}</h2>
      {items.map((item, index) => (
        <div
          key={index}
          className={`${css.card} ${css[`shade${(index % 5) + 1}`]}`}
          onClick={() => handleToggle(index)}
        >
          <h3 className={css.cardTitle}>{item.name}</h3>
          {expandedIndex === index && (
            <p className={css.cardBlurb}>{item.blurb}</p>
          )}
        </div>
      ))}
    </div>
  );
}
