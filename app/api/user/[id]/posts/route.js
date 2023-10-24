import { dbConnect } from "@utils/Database";
import Prompt from "@models/prompt";
export const GET=async(req,{params})=>{
    try {
       await dbConnect();
       const prompts=await Prompt.find({creator:params.id}).populate('creator');
       //getting the creator with only these id
       return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        console.log(error.message);
        return new Response("Failed",{status:500});
    }
}