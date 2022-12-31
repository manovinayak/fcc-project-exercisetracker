const UserModel = require("../models/user");

const updateUser = async (userId, exerciseId) => {
  let user;
  console.log(`userId ${userId} - exerciseId ${exerciseId}`);
  try {
    user = await UserModel.findById(userId);
    user.exercises.push(exerciseId);
    await user.save();
  } catch (error) {
    console.error(`Error occurred while update user with exercise: `, error);
    throw error;
  }
  return user;
};

module.exports = updateUser;
