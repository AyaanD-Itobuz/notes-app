import { faker } from "@faker-js/faker";
import notesSchema from "../models/notesSchema.js";
import userSchema from "../models/userSchema.js";

export const noteSeed = async(number) => {
    try {
        let fakeNotes =[]
        const user = await userSchema.find();

        for(let i=1 ; i<=number ; i++)
        {
            let newNote = {
                title : faker.word.noun(),
                content : faker.lorem.sentences(1),
                userId : user,
                createdAt : faker.date.anytime()
            }

            fakeNotes.push(newNote);
        }

        fakeNotes.forEach(async(e) => {
            await notesSchema.create(e);
        })
    }
    catch(error) {
        console.log("Error Occured: " + error)
    }
}