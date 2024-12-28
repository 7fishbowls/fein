import styles from "@/styles/researches.module.css";
import Image from "next/image";
import Menu from "@/components/Menu";
import { ConnectToDb } from "@/lib/db";
import Content from "@/components/Content";

export const metadata = {
  title: "Celesphos | Space Researches.",
  description: "Create your own researches. Explore other's researches.",
};

export const dynamic = "force-dynamic";

export default async function Researches() {
  const db = await ConnectToDb();
  const researches = await db
    .collection("researches")
    .find({})
    .sort({ date: -1 })
    .toArray();
  return (
    <main className={styles.researches}>
      {researches.length === 0 && (
        <p className={styles.error_no_res}>No researches found.</p>
      )}

      {researches.map((elem, index) => (
        <section key={index} className={styles.researches_}>
          <section className={styles.research}>
            <Image
              src={elem.research_img_link}
              width={450}
              height={550}
              alt={elem.research_keyword}
            />

            <Content styles={styles} elem={JSON.stringify(elem)}></Content>
          </section>
        </section>
      ))}
      <Menu />
    </main>
  );
}
