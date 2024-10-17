import Prompt from "@models/prompt";
import { connectDB } from "@utils/database";

//GET

export const GET = async (request,{params})=>{

    try{

        await connectDB();

        const prompts = await Prompt.findById(params.id).populate('creator')

        if(!prompts) return new Response("Prompt not found",{status:404})

        return new Response(JSON.stringify(prompts),{status:200})


    }catch(error){
        return new Response(JSON.stringify("failed to fetch"),{status:500})
    }
}

//PATCH

export const PATCH = async(request,{params})=>{

    const {prompt , tag} = await request.json();

    try{

        await connectDB();

        const existingPrompt = await Prompt.findById(params.id);

        if(!existingPrompt) return new Response('Prompt not found',{status:404});

        existingPrompt.prompt = prompt;
        existingPrompt.tag = tag;

        await existingPrompt.save();

        return new Response(JSON.stringify(existingPrompt),{status:200})

    }catch(error){
        console.log(error)
        return new Response('failed to update prompt',{status:500})
    }
}

//DELETE

export const DELETE = async(request,{params})=>{

    try{

        await connectDB();
        await Prompt.findByIdAndDelete(params.id);

        return new Response('Prompt deleted succcessfully',{status:200})

    }catch(error){
        console.log(error);
        return new Response('dailed to delete prompt',{status:500})
    }
}


