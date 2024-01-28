import * as mongodb from "mongodb";

export async function applyNailsSchemaValidation(db: mongodb.Db) {
   // Nails collection validation schema
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["nailimage", "nailtype", "naildiscriptions", "nailprice", "naillocation"],
           additionalProperties: false,
           properties: {
               _id: {},
               nailimage: {
                   bsonType: "string",
                   description: "'image ' is required and should be less than 300kb",
               },
               nailtype: {
                   bsonType: "string",
                   description: "'nailtype' is required and is a string",
                   minLength: 5
               },
               naildiscriptions: {
                   bsonType: "string",
                   description: "'discription' is required '",
               },
               nailprice: {
                   bsonType: "Decimal128",
                   description: "'nailprice' is required '",
               },
               naillocation: {
                   bsonType: "string",
                   description: "'location' is required '",
               }
           },
       },
   };

   // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
       collMod: "nails",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("nails", { validator: jsonSchema });
       }
   });
}

export async function applyHairSchemaValidation(db: mongodb.Db) {
   // Hairstyle collection validation schema
   const jsonSchema = {
       $jsonSchema: {
           bsonType: "object",
           required: ["hairimage", "hairsytle", "hairdiscriptions", "hairprice", "hairlocation"],
           additionalProperties: false,
           properties: {
               _id: {},
               hairimage: {
                   bsonType: "string",
                   description: "'hairimage ' is required and should be less than 300kb",
               },
               hairsytle: {
                   bsonType: "string",
                   description: "'hairsytle' is required and is a string",
                   minLength: 5
               },
               hairdiscriptions: {
                   bsonType: "string",
                   description: "'hairdiscriptions' is required '",
               },
               hairprice: {
                   bsonType: "Decimal128",
                   description: "'hairprice' is required '",
               },
               hairlocation: {
                   bsonType: "string",
                   description: "'location' is required '",
               }
           },
       },
   };

   // Try applying the modification to the collection, if the collection doesn't exist, create it
   await db.command({
       collMod: "hairstyle",
       validator: jsonSchema
   }).catch(async (error: mongodb.MongoServerError) => {
       if (error.codeName === 'NamespaceNotFound') {
           await db.createCollection("hairstyle", { validator: jsonSchema });
       }
   });
}
