import { faker } from "@faker-js/faker";
import userSchema from "../models/userSchema.js";
import bcrypt from "bcrypt"

export const userSeed = async(number) => {
    try {
        let fakeUsers = [];

        for(let i = 1 ; i<=number ; i++)
        {
            let newUser = {

                userName : faker.person.fullName(),
                email : faker.internet.email(faker.person.fullName()).toLowerCase(),
                password : await bcrypt.hash(faker.internet.password() , 10),
                verified : true
            }

            fakeUsers.push(newUser);
        }

        //Creating entries in Schema
        fakeUsers.forEach( async(e) => {
            await userSchema.create(e);
        })

    }
    catch(error)
    {
        console.log("Error Occured: " + error)
    }
}