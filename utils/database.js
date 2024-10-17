import mongoose from 'mongoose';

let isConnnected = false;

export const connectDB = async()=>{

    mongoose.set('strictQuery', true)

    if(isConnnected){
        console.log('MONGO DB is connected');
        
        return;
    }

    try {

        await mongoose.connect(process.env.MONGODB_URI,{
            dbName:'Share_Prompt',
            useNewUrlParser:true,
            useUnifiedTopology:true

        })

        isConnnected = true;
        console.log('MongoDB Connected');
        
    } catch (error) {
        console.log(error);
    }
}