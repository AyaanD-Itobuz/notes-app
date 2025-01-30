import mongoose from "mongoose";

const sessionSchema = new mongoose.Schema({
    userId : {
        type : mongoose.Schema.ObjectId,
        ref : "User"
    },

    createdAt : {
        type : Date,
        default : Date.now() 
    }
})

export default mongoose.model("sessionDB" , sessionSchema);