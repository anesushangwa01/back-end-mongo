import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database-conn";
 
export const hairRouter = express.Router();
hairRouter.use(express.json());
 
hairRouter.get("/", async (_req, res) => {
   try {
       const hairstyle = await collections.hairstyle.find({}).toArray();
       res.status(200).send(hairstyle);
   } catch (error) {
       res.status(500).send(error.message);
   }
});


hairRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const hairstyle = await collections.hairstyle.findOne(query);
  
        if (hairstyle) {
            res.status(200).send(hairstyle);
        } else {
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an employee: ID ${req?.params?.id}`);
    }
 })

 hairRouter.post("/", async (req, res) => {
    try {
        const hairstyle = req.body;
        const result = await collections.nails.insertOne(hairstyle);
  
        if (result.acknowledged) {
            res.status(201).send(`Created a new nail: ID ${result.insertedId}.`);
        } else {
            res.status(500).send("Failed to create a new nail.");
        }
    } catch (error) {
        console.error(error);
        res.status(400).send(error.message);
    }
 });


 hairRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const hairstyles = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.hairstyle.updateOne(query, { $set: hairstyles });
  
        if (result && result.matchedCount) {
            res.status(200).send(`Updated an employee: ID ${id}.`);
        } else if (!result.matchedCount) {
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        } else {
            res.status(304).send(`Failed to update an employee: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }


 });




 hairRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.hairstyle.deleteOne(query);
  
        if (result && result.deletedCount) {
            res.status(202).send(`Removed an employee: ID ${id}`);
        } else if (!result) {
            res.status(400).send(`Failed to remove an employee: ID ${id}`);
        } else if (!result.deletedCount) {
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        }
    } catch (error) {
        console.error(error.message);
        res.status(400).send(error.message);
    }
 });