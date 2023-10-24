import { dbConnect } from "@utils/Database";
import Prompt from "@models/prompt";

export const POST= async (req)=>{
    const {userId,prompt,tag}=await req.json();
    try{
        await dbConnect();
        const newPrompt = new Prompt({
            creator:userId,
            prompt,
            tag
        });
        await newPrompt.save();
        console.log("Saved Prompt");
        return new Response(JSON.stringify(newPrompt),{status:201})
    }
    catch(e){
        console.log(e.message);
        return new Response("Failed",{status:500})
    }
}