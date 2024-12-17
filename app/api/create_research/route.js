import { ConnectToDb } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const data = await request.json();
    const db = await ConnectToDb();
    const collection = db.collection("researches");

    const unique_ = `${Date.now()}${data.research_img_link}`;
    const unique = await bcrypt.hash(unique_, 10);
    const date = new Date();
    const finalData = { ...data, date };

    const constructing = {
      successful: true,
      unique_key: unique,
    };
    await collection.insertOne({
      ...finalData,
    });
    return new Response(JSON.stringify(constructing), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}

export async function GET() {
  const db = await ConnectToDb();
  const researches = await db
    .collection("researches")
    .find({})
    .limit(10)
    .toArray();
  return new Response(JSON.stringify(researches), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
    },
  });
}
