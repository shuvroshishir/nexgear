import { MongoClient } from "mongodb";

const uri = process.env.MONGO_DB_URI!;

if (!uri) {
  throw new Error("Please define MONGO_DB_URI in .env");
}

let client: MongoClient;
let clientPromise: Promise<MongoClient>;

declare global {
  var _mongoClientPromise: Promise<MongoClient> | undefined;
  var _mongoClient: MongoClient | undefined;
}

if (process.env.NODE_ENV === "development") {
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClient = client;
    global._mongoClientPromise = client.connect();
  } else {
    client = global._mongoClient!;
  }
  clientPromise = global._mongoClientPromise;
} else {
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

export { client };
export default clientPromise;
