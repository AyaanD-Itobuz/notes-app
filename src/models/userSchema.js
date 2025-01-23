import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    userName : {
        type : String,
        require : true
    },

    email : {
        type : String,
        require : true,
        unique : true
    },

    password : {
        type : String,
        require : true
    },

    verified : {
        type : Boolean
    }

    // token : {
    //     type : String,
    // }
});

export default mongoose.model("userDB" , userSchema)