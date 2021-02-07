const connection = require('../database/connection');

module.exports = {
    async create(user) {
        const result = await connection("users").insert(user);
        return result;
    },

    async listAll() {
        const result = await connection("users").select('*');
        return result;
    },

    async deleteUser(user_id, userDeleted) {
        const [personToBeDeleted] = await connection("users")
            .where({ firstname: userDeleted, user_id: user_id })

        console.log(personToBeDeleted)
        if (personToBeDeleted === undefined) {
            return ("No users found to delete");
        }
        else {
            await connection("users")
                .where({ user_id: user_id, firstname: userDeleted })
                .first()
                .delete()

            return personToBeDeleted;
        }
    },
    async updateUser(user_id, userToBeUpdated, userUpdatedData) {
        const [personToBeUpdated] = await connection("users")
            .where({ firstname: userToBeUpdated, user_id: user_id })
        console.log(personToBeUpdated)
        console.log(userUpdatedData)
        if (personToBeUpdated == undefined) {
            return ("No person found")
        }
        else {
            await connection("users")
                .where({ firstname: userToBeUpdated, user_id: user_id })
                .update(userUpdatedData);

            return userUpdatedData;
        }
    }
}
