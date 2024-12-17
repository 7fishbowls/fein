import { ConnectToDb } from "@/lib/db";

export async function POST(request) {
  try {
    const data = await request.json();
    const db = await ConnectToDb();

    const user = await db
      .collection("users")
      .findOne({ username: data.username.toLowerCase() });

    return new Response(JSON.stringify({ available: user ? false : true }), {
      headers: {
        "Content-Type": "application/json",
      },
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: "Internal Server Error" }), {
      status: 500,
      headers: { "Content-Type": "application/json" },
    });
  }
}
