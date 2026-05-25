import mongoose from "mongoose";

const MongoDb_Url = "mongodb://127.0.0.1:27017/logistics";

if (!MongoDb_Url) {
  throw new Error("wrong mongo db url");
}
declare global {
  var mongoose: {
    conn: mongoose.Connection | null;
    promise: Promise<mongoose.Connection> | null;
  };
}

let cached = global.mongoose;

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function connnectToMongodb() {
  if (cached.conn) {
    return cached.conn;
  }
  if (!cached.promise) {
    cached.promise = mongoose.connect(MongoDb_Url).then((m) => m.connection);
  }
  cached.conn = await cached.promise;
  return cached.conn;
}
export default connnectToMongodb;
