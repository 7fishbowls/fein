import styles from "./page.module.css";
import { BsArrowUpRight } from "react-icons/bs";
import Link from "next/link";

export default function Home() {
  return (
    <main className={styles.main_content}>
      <section className={styles.bottom}>
        <header>
          <h2>SPACE</h2>
        </header>
        <Link href={"/researches"}>
          <BsArrowUpRight />
        </Link>
      </section>
      <section className={styles.stars}></section>
    </main>
  );
}
