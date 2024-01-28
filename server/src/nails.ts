import * as mongodb from "mongodb";
 
export interface Nails {
    image: string;
    nailtype: string;
    naildiscriptions: string;
    nailprice: mongodb.Double;
    naillocation: string;
   _id?: mongodb.ObjectId;
}

