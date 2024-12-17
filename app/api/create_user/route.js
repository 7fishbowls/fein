import { ConnectToDb } from "@/lib/db";
import bcrypt from "bcrypt";

export async function POST(request) {
  try {
    const data = await request.json();
    const db = await ConnectToDb();
    const collection = db.collection("users");

    const hash_password = await bcrypt.hash(data.password, 10);
    const unique_ = `${Date.now()}${data}`;
    const unique = await bcrypt.hash(unique_, 10);

    const user_data = { ...data, password: hash_password, unique: unique };
    const constructing = {
      successful: true,
      unique_key: unique,
    };
    await collection.insertOne({
      ...user_data,
      username: data.username.toLowerCase(),
    });

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
