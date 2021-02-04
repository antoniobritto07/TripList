const { v4: uuidv4 } = require('uuid');
const { select } = require('../database/connection');
const connection = require('../database/connection');

module.exports = {
    async create(request, response) {
        const { firstname, lastname, age, nationality } = request.body;
        const user_id = uuidv4();

        await connection('users').insert({
            user_id,
            firstname,
            lastname,
            age,
            nationality
        })
        return response.send(`Thank you for your subscription, your id is: ${user_id}`);
    },

    async index(request, response) {
        const allUsers = await connection('users').select('*');
        return response.json(allUsers);
    },

    async delete(request, response) {
        try {
            const userToBeDeleted = request.params.name;
            const user_authorization_id = request.headers.authorization;

            const [person] = await connection("users")
                .where( "user_id", user_authorization_id )
                .select("*")

            console.log(person)

            if (user_authorization_id !== [person].user_id) {
                return response.status(401).json("No users found");
            }
            else {
                await connection("users")
                    .where({ "user_id": user_authorization_id, "firstname": userToBeDeleted })
                    .delete();

                return response.send("User deleted successfully!")
            }
        }

        catch (error) {
            return response.status(401).json({ message: "User not found!" })
        }
    }
    //PROBLEMAS AINDA AO DELETAR,ESTÁ SEMPRE CAINDO NO CATCH
    // if (user_authorization_id !== person.user_id) {
    //     return response.status(401).json("Operation is not allowed");
    // }
    // else {
    //     await connection("users")
    //         .where({ "firstname": userToBeDeleted, "user_id": user_authorization_id })
    //     console.log("jabdb")
    //         .delete();
    // }
}