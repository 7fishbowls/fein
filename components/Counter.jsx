import styles from "@/styles/counter.module.css";
import { Roboto_Mono } from "next/font/google";

const roboto = Roboto_Mono({
  weight: "400",
  subsets: ["latin"],
});

function Counter({ max, current_index, research = false }) {
  const elements = Array.from({ length: max }, (_, index) => index + 1);
  return (
    <section
      className={`${styles.counter} ${research ? styles.animate_counter : ""}`}
    >
      {elements.map((element, index) => (
        <section
          className={styles.counter_}
          key={index}
          style={{ transform: `translateY(-${current_index * 100}px)` }}
        >
          <h2 className={roboto.className}>
            {element < 10 ? `0${element}` : element}
          </h2>
        </section>
      ))}
    </section>
  );
}

export default Counter;
