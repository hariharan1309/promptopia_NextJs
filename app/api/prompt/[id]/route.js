// It will have three GET,PATCH,DELETE methods

import Prompt from "@models/prompt";
import { dbConnect } from "@utils/Database";

// GET
export const GET=async(req,{params})=>{
    try {
       await dbConnect();
       const prompts=await Prompt.findById(params.id).populate('creator');
       if(!prompts){
        return new Response("Prompt not found ",{status:404})
       }
       return new Response(JSON.stringify(prompts),{status:200})
    } catch (error) {
        console.log(error.message);
        return new Response("Failed to Fetch",{status:500});
    }
}
// PATCH
export const PATCH=async(req,{params})=>{
    const {prompt,tag}= await req.json();

    try {
        await dbConnect();
        const existPrompt=await Prompt.findById(params.id);

        if(!existPrompt){
            return new Response("Not Found",{status:404})
        }
        existPrompt.prompt=prompt;
        existPrompt.tag=tag;
        await existPrompt.save();
        return new Response(JSON.stringify(existPrompt),{status:200});

    } catch (error) {
        return new Response("Failed to Update",{status:500});
    }
}

// DELETE
export const DELETE = async(req,{params})=>{
     try {
        await dbConnect();
        await Prompt.findByIdAndRemove(params.id);
        return new Response("Deleted",{status:200});
     } catch (error) {
        return new Response("Failed to Deleted",{status:500});
     }
}