const { v4: uuidv4 } = require('uuid');
const connection = require('../database/connection');

const UsersModel = require('../models/UsersModel')

module.exports = {
    async create(request, response) {
        try {
            const { firstname, lastname, age, nationality } = request.body;
            const user_id = uuidv4();
            console.log(firstname)

            const result = await UsersModel.create({ user_id, firstname, lastname, age, nationality })

            return response.status(200).json({ message: `User created successfully! Your id is ${user_id}` });
        } catch (error) {
            console.log(error);
            return response.send("Something got wrong when trying to create a new user")
        }
    },

    async index(request, response) {
        try {
            const allUsers = await UsersModel.listAll();
            return response.json(allUsers);
        } catch (error) {
            console.log(error);
            return response.send("Something got wrong when trying to list all users")
        }
    },

    async delete(request, response) {
        try {
            const { name } = request.params;
            const user_authorization_id = request.headers.authorization;

            const result = await UsersModel.deleteUser(user_authorization_id, name)

            return response.status(200).json({ message: "User deleted successfully" })

        } catch (error) {
            console.log(error);
            return response.status(401).json({ message: "Something wrong happen while trying to delete user" })
        }
    },
    async update(request, response) {
        try {
            const { lastname, age, nationality } = request.body;
            const { name } = request.params;
            const user_authorization_id = request.headers.authorization;
            console.log(lastname, age, nationality, name, user_authorization_id)
            const updateData = {
                user_id: user_authorization_id,
                firstname: name,
                lastname,
                age,
                nationality
            }
            const result = await UsersModel.updateUser(user_authorization_id, name, updateData)

            return response.status(200).json("message: User updated successfully")
        } catch (error) {
            console.log(error)
            return response.status(401).json({ message: "Something wrong happen while trying to update user" })
        }
    }
}