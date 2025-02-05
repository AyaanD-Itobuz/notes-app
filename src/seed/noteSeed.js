import { faker } from "@faker-js/faker";
import notesSchema from "../models/notesSchema.js";
import userSchema from "../models/userSchema.js";

export const noteSeed = async(number) => {
    try {
        let fakeNotes =[]
        const userData = await userSchema.find();
        // console.log("user: " , userData)
        
        for(let i=1 ; i<=number ; i++)
        {
            const user = userData[Math.floor(Math.random() * userData.length)]
            let newNote = {
                title : faker.word.noun(),
                content : faker.lorem.sentences(1),
                userId : user,
                createdAt : faker.date.anytime()
            }

            fakeNotes.push(newNote);
        }  

        try {
            await notesSchema.insertMany(fakeNotes);
        }
        catch(error){
            console.log("Error Occured: " , error)
        }
        console.log(`${number} Fake Notes Created`)     
    }
    catch(error) {
        console.log("Error Occured: " + error)
    }
}