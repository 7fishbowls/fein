"use client";

import { useEffect, useState } from "react";

function Content({ styles, elem }) {
  const [data, setData] = useState({});
  useEffect(() => {
    const elem_ = JSON.parse(elem);
    setData(elem_);
  }, []);
  return (
    <div
      className={styles.content}
      onMouseEnter={(e) => (e.currentTarget.style.overflowY = "auto")}
      onMouseLeave={(e) => {
        e.currentTarget.style.overflowY = "hidden";
        e.currentTarget.scrollTop = 0;
      }}
    >
      <header>
        <h2>{data.research_title}</h2>
        <p className={styles.author}>{data.research_author}</p>
      </header>
      <div className={styles.explanation}>
        <p>{data.research_explanation}</p>
        <div className={styles.date}>
          <p>{new Date(data.date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Content;
