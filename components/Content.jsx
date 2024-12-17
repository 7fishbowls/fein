"use client";
function Content({ styles, elem }) {
  const elem_ = JSON.parse(elem);
  return (
    <div
      className={styles.content}
      onMouseEnter={(e) => (e.currentTarget.style.overflowY = "auto")}
      onMouseLeave={(e) => {
        e.currentTarget.style.overflowY = "hidden";
        e.currentTarget.scrollTop = 0; // Reset scroll position
      }}
    >
      <header>
        <h2>{elem_.research_title}</h2>
        <p className={styles.author}>{elem_.research_author}</p>
      </header>
      <div className={styles.explanation}>
        <p>{elem_.research_explanation}</p>
        <div className={styles.date}>
          <p>{new Date(elem_.date).toLocaleDateString()}</p>
        </div>
      </div>
    </div>
  );
}

export default Content;
