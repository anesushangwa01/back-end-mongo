import * as mongodb  from "mongodb"

export interface Hair {
    hairimage: string;
    hairsytle: string;
    hairdiscriptions: string;
    hairprice: mongodb.Double;
    hairlocation: string;
   _id?: mongodb.ObjectId;
}