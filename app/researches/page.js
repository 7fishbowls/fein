import styles from "@/styles/researches.module.css";
import Image from "next/image";
import Menu from "@/components/Menu";
import { ConnectToDb } from "@/lib/db";

export const metadata = {
  title: "Celesphos | Space Researches.",
  description: "Create your own researches. Explore other's researches.",
};

export const dynamic = "force-dynamic";

export default async function Researches() {
  const db = await ConnectToDb();
  const researches = await db.collection("researches").find().toArray();
  console.log(researches);
  return (
    <main className={styles.researches}>
      {researches.map((elem, index) => (
        <section key={index} className={styles.researches_}>
          <section className={styles.research}>
            <Image
              src={elem.research_img_link}
              fill
              alt={elem.research_keyword}
              priority
            />

            <div className={styles.content}>
              <header>
                <h2>{elem.research_title}</h2>
                <p className={styles.author}>{elem.research_author}</p>
              </header>
              <div className={styles.explanation}>
                <p>{elem.research_explanation}</p>
                <div className={styles.date}>
                  <p>01-05-2023</p>
                </div>
              </div>
            </div>
          </section>
        </section>
      ))}
      <Menu />
    </main>
  );
}
// {
//   "_id": {
//     "$oid": "676133178a11204d938e70b0"
//   },
//   "research_title": "The Nasa Agent",
//   "research_keyword": "mars_mission",
//   "research_explanation": "NASA’s SpaceX Crew-10 Pilot Nichole Ayers pictured at Launch Complex 39A at NASA's Kennedy Space Center in Florida. Credit: SpaceX NASA’s SpaceX Crew-10 Pilot Nichole Ayers pictured at Launch Complex 39A at NASA's Kennedy Space Center in Florida. Credit: SpaceX NASA’s SpaceX Crew-10 Pilot Nichole Ayers pictured at Launch Complex 39A at NASA's Kennedy Space Center in Florida. Credit: SpaceX NASA’s SpaceX Crew-10 Pilot Nichole Ayers pictured at Launch Complex 39A at NASA's Kennedy Space Center in Florida. Credit: SpaceX NASA’s SpaceX Crew-10 Pilot Nichole Ayers pictured at Launch Complex 39A at NASA's Kennedy Space Center in Florida. Credit: SpaceX ",
//   "research_img_link": "https://images-assets.nasa.gov/image/jsc2024e080754/jsc2024e080754~small.jpg",
//   "research_author": "Shaik Ali",
//   "posted_by": "$2b$10$syGbQHqfpadFSrittZd/BekOBks/lYkUEgvYLq6TPG1Wr7vxtfnqe",
//   "date": {
//     "$date": "2024-12-17T08:15:19.460Z"
//   }
// }
