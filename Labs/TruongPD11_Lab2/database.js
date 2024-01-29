import mongoose from "mongoose";

const connectDB = ()=>{
    try{
       const connection =  mongoose.connect(process.env.URI_MONGO);
       console.log("Connect to database success");
       return connection;
    }catch(err){
        throw new Error(err.toString());
    }
}
export default connectDB;