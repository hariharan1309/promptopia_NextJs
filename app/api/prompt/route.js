import Prompt from "@models/prompt";
import { dbConnect } from "@utils/Database";

export const GET=async(req)=>{
    try {
       await dbConnect();
       const prompts=await Prompt.find({}).populate('creator');
       
       return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        console.log(error.message);
        return new Response("Failed",{status:500});
    }
}