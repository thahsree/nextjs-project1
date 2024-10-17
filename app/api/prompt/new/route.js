import Prompt from '@models/prompt';
import { connectDB } from "@utils/database";


export const POST = async(req,res)=>{

    const {userId , prompt , tag } = await req.json();

    try {
        await connectDB();  // because this is a lambda function , we use when we need
        const newPrompt = new Prompt({
            creator: userId,
            prompt,
            tag
        })

        await newPrompt.save();

        return new Response(JSON.stringify(newPrompt),{status:201})
    } catch (error) {
        return new Response("Failed to create new Prompt",{status:500});
    }
}