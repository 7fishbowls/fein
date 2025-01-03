import { useState, useEffect } from "react";

function Loaderv2({ hide, setHide }) {
  const quotes = [
    "Space isn't a place to visit, it's a place to belong.",
    "The universe doesn't care about time, but we do so we spend our lives chasing it.",
    "You don't need a spaceship to get lost in space, you just need your mind.",
    "Space doesn't play by the rules. Neither should we.",
    "Space isn't waiting for us to catch up.",
    "The universe is big. Really big. And we're just getting started.",
    "Space is like an endless ocean, except you can’t swim, and it’s full of mysteries.",
    "Stars might be far, but the dreams they inspire are right next to us.",
    "Space is where the questions get bigger, but the answers are even bigger.",
    "Space is like the ultimate road trip—no maps, just endless discovery.",
    "Every corner of space is a chance for something new to blow our minds.",
    "In space, even the silence is full of stories.",
  ];

  const [randomQuote, setRandomQuote] = useState(null);

  useEffect(() => {
    const selectedQuote = quotes[Math.floor(Math.random() * quotes.length)];
    setRandomQuote(selectedQuote);
  }, []);

  if (!randomQuote) return null;

  return (
    <section className="loader_">
      <h2 className={`tt ${hide ? "text_active" : ""}`}>
        {randomQuote.split("").map((elem, index) => {
          return (
            <span
              key={index}
              style={{
                animation: "animate_each_letter 3s ease-in-out forwards",
                animationDelay: `${index * 0.08}s`,
                opacity: 0,
              }}
              onAnimationEnd={() =>
                index === randomQuote.length - 1 ? setHide(true) : null
              }
            >
              {elem}
            </span>
          );
        })}
      </h2>
    </section>
  );
}

export default Loaderv2;
