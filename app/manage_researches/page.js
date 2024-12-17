import AResearch from "@/components/AResearch";
import { ConnectToDb } from "@/lib/db";
import styles from "@/styles/manage.module.css";

async function ManageResearches() {
  const db = await ConnectToDb();
  const researches = await db.collection("researches").find().toArray();
  const r = JSON.stringify(researches);
  return <AResearch researches={r} styles={styles}></AResearch>;
}

export default ManageResearches;
