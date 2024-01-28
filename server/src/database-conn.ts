import * as mongodb from "mongodb";
import { Nails } from "./nails";
import { Hair } from "./hairstyle";
import { applyNailsSchemaValidation, applyHairSchemaValidation } from "./validation";

export const collections: {
   nails?: mongodb.Collection<Nails>;
   hairstyle?: mongodb.Collection<Hair>
} = {};

export async function connectToDatabase(uri: string) {
   const client = new mongodb.MongoClient(uri);
   await client.connect();
 
   const db = client.db("meanStackExample");
   await applyNailsSchemaValidation(db);
   await applyHairSchemaValidation(db);

   const nailsCollection = db.collection<Nails>("nails");
   collections.nails = nailsCollection;
   
   const hairstyleCollection = db.collection<Hair>("hairstyle");
   collections.hairstyle = hairstyleCollection;
}
