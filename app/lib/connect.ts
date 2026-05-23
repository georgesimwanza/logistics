import mongoose from "mongoose";

const MongoDb_Url= ""

if(!MongoDb_Url){
  throw new Error("wrong mongo db url");
}

async function connnectToMongodb(){
  if(cached.conn){
    return cached.conn;
  }
  if(!cached.promise){
    cached.promise= mongoose.connect(MongoDb_Url as string);

  }
  cached.conn= await cached.promise;
  return cached.conn'
}
export default connnectToMongodb;
