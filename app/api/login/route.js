import { ConnectToDb } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const data = await request.json();
    const db = await ConnectToDb();

    const user = await db
      .collection("users")
      .findOne({ username: data.username.toLowerCase() });

    if (!user) return new Response(JSON.stringify({ error: true }));

    const result = await bcrypt.compare(data.password, user.password);
    const constructing = {
      error: !result,
      unique_key: user.unique,
    };

    return new Response(JSON.stringify(constructing), {
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
