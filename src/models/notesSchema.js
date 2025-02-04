import mongoose from "mongoose";

const notesSchema = new mongoose.Schema({
    title : {
        type : String,
        required : true
        // timestamps: true
    },

    content : {
        type : String,
        required : true
    },

    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
        required: true
    },

    file : {
        type : String
    },

    createdAt: {
        type : Date,
        default : Date.now()
    }
    
})

export default mongoose.model("notesDB" , notesSchema);