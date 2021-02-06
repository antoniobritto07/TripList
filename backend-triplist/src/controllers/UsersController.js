const { v4: uuidv4 } = require('uuid');
const { select, update } = require('../database/connection');
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
                .where({ firstname: userToBeDeleted, user_id: user_authorization_id })

            if (person === undefined) {
                return response.status(404).json("No users found");
            }
            else {
                await connection("users")
                    .where({ firstname: userToBeDeleted, user_id: user_authorization_id })
                    .first()
                    .delete()

                return response.status(200).send("User deleted successfully")
            }
        } catch (error) {
            return response.status(401).json({ message: "Something wrong happen while trying to delete user" })
        }
    },

    async update(request, response) {
        // try {
        const userToBeUpdated = request.params.name;
        const { lastname, age, nationality } = request.body;
        const user_authorization_id = request.headers.authorization;
        const updateData = {
            lastname,
            age,
            nationality
        }

        const [personFound] = await connection("users")
            .where({ firstname: userToBeUpdated, user_id: user_authorization_id })

        if (personFound == undefined) {
            return response.send("No person was found");
        }
        else {
            await connection("users")
                .where({ firstname: userToBeUpdated, user_id: user_authorization_id })
                .update(updateData);

            return response.status(200).json("User updated successfully")
        }
        // } catch (error) {
        //     return response.status(401).json({ message: "Something wrong happen while trying to update user" })
        // }
    }
}