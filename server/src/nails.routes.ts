import * as express from "express";
import * as mongodb from "mongodb";
import { collections } from "./database-conn";
 
export const nailsRouter = express.Router();
nailsRouter.use(express.json());
 
nailsRouter.get("/", async (_req, res) => {
   try {
       const nails = await collections.nails.find({}).toArray();
       res.status(200).send(nails);
   } catch (error) {
       res.status(500).send(error.message);
   }
});


nailsRouter.get("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const nails = await collections.nails.findOne(query);
  
        if (nails) {
            res.status(200).send(nails);
        } else {
            res.status(404).send(`Failed to find an employee: ID ${id}`);
        }
  
    } catch (error) {
        res.status(404).send(`Failed to find an employee: ID ${req?.params?.id}`);
    }
 })

 nailsRouter.post("/", async (req, res) => {
    try {
        const nail = req.body;
        const result = await collections.nails.insertOne(nail);
  
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


 nailsRouter.put("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const nail = req.body;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.nails.updateOne(query, { $set: nail });
  
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




 nailsRouter.delete("/:id", async (req, res) => {
    try {
        const id = req?.params?.id;
        const query = { _id: new mongodb.ObjectId(id) };
        const result = await collections.nails.deleteOne(query);
  
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