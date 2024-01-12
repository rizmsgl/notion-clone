import mongoose from "mongoose";

let isConnected : boolean = false;

export const connectToDB = async () : Promise<void> =>{
    mongoose.set("strictQuery", true);
    if (isConnected){
        console.log("MongoDB is already connected.");
        return;
    }
    try{
        await mongoose.connect(process.env.MONGODB_URI!!,{
            dbName:"notion-clone",
        });
        isConnected = true;
        console.log("MongoDB connected");
    }catch(error){
        console.log(error);
    }
}