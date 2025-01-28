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
        // select : false
    },

    verified : {
        type : Boolean,
        default : false 
    },

    isLoggedIn : {
        type : Boolean,
        default : false
    },

    token : {
        type : String,
    }
});

export default mongoose.model("userDB" , userSchema)