const UserModel = require("../models/user");

const getUserExerciseLog = async (userId) => {
  let user;
  try {
    user = await UserModel.findById(userId).populate("exercises");
  } catch (error) {
    console.error(`error occurred when getUser due to: `, error);
    throw error;
  }
  return user;
};

module.exports = getUserExerciseLog;