import { Db, MongoClient } from "mongodb";
import { client } from "./mongodb";

export async function mongoConnect(): Promise<{
  client: MongoClient;
  db: Db;
}> {
  const dbName = process.env.MONGO_DB_NAME || "nexgear";
  const db = client.db(dbName);
  return { client, db };
}
