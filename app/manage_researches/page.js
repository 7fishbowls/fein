import AResearch from "@/components/AResearch";
import { ConnectToDb } from "@/lib/db";
import styles from "@/styles/manage.module.css";

export const dynamic = "force-dynamic";

async function ManageResearches() {
  const db = await ConnectToDb();
  const researches = await db
    .collection("researches")
    .find()
    .sort({ date: -1 })
    .toArray();
  const r = JSON.stringify(researches);
  return <AResearch researches={r} styles={styles}></AResearch>;
}

export default ManageResearches;
