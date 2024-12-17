import { MongoClient } from "mongodb";

global._mongoClient = global._mongoClient || null;
global._db = global._db || null;

export async function ConnectToDb() {
  if (global._db) return global._db;

  global._mongoClient = new MongoClient(process.env.MONGO_URI);
  await global._mongoClient.connect();
  global._db = global._mongoClient.db("celesphos");

  return global._db;
}

export async function CloseConnection() {
  if (global._mongoClient) {
    await global._mongoClient.close();
    global._db = null;
    global._mongoClient = null;
  }
}
