import mongoose from "mongoose";
import { StrictMode } from "react";

let isConnected=false;// track the connection

export const dbConnect= async() =>{
    mongoose.set('strictQuery',true)
    if(isConnected){
        console.log("Connected");
        return;
    }
    else{
        try {
            await mongoose.connect(process.env.MONGODB_URI,{
                dbName:"share_prompt",
                useNewUrlParser:true,
                useUnifiedTopology:true
            })
            isConnected=true;
            // console.log("Mongodb Connected...")
        } catch (error) {
            console.log(error.message);
            console.log("Db Error")
        }
    }
}