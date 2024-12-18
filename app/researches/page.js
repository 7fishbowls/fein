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
  const researches = await db.collection("researches").find({}).toArray();
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

            {/* <div className={styles.content}>
              <header>
                <h2>{elem.research_title}</h2>
                <p className={styles.author}>{elem.research_author}</p>
              </header>
              <div className={styles.explanation}>
                <p>{elem.research_explanation}</p>
                <div className={styles.date}>
                  <p>{new Date(elem.date).toLocaleDateString()}</p>
                </div>
              </div>
            </div> */}

            <Content styles={styles} elem={JSON.stringify(elem)}></Content>
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
