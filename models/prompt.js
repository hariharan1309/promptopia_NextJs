// How the Prompt Should be on DB
import {Schema, model, models } from "mongoose";

const promptSchema = new Schema({
    // the prompt has to be stored on public 
    creator :{
        type:Schema.Types.ObjectId,
        ref:'User'
    },
    prompt:{
        type:String,
        required:[true,"Where is the Prompt?"]
    },
    tag:{
        type:String,
        required:[true,"Where is the Tag?"]
    },
})

const Prompt= models.Prompt || model("Prompt",promptSchema);
export default Prompt;