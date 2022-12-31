const UserModel = require("../models/user");

const createUser = async (name) => {
  let userModel = new UserModel({
    username: name,
  });
  let user;
  try {
    user = await userModel.save();
  } catch (error) {
    console.error("user creation failed due to : ", error);
  }
  return user;
};

module.exports = createUser;
