import { ConnectToDb } from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();
    const db = await ConnectToDb();
    const collection = db.collection("researches");

    const date = new Date(data);

    await collection.deleteOne({ date: date });
    const u = await collection.findOne({ date: date });

    return new Response(JSON.stringify(u), {
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
