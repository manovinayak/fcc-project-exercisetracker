
const UserModel = require("../models/user");

const getAllUsers = async () => {
  let users;
  try {
    users = await UserModel.find({});
  } catch (error) {
    console.error(`error whil fetching users due to : `, error);
    throw error;
  }
  return users;
};

module.exports = getAllUsers;