const UserModel = require("../models/user");

const getPopulatePath = (from, to, limit) => {
  if (from && to) {
    return {
      path: "exercises",
      match: { date: { $gte: from, $lte: to } },
      perDocumentLimit: limit,
    };
  } else {
    return {
      path: "exercises",
      match: { date: { $gte: new Date('1970-01-01'), $lte: new Date() } },
      perDocumentLimit: limit,
    };
  }
};

const getUserExerciseLog = async (userId, from, to, limit) => {
  let user;
  let populatePath = getPopulatePath(from, to, limit);
  console.log(populatePath)

  try {
    user = await UserModel.findById(userId).populate(populatePath);
  } catch (error) {
    console.error(`error occurred when getUser due to: `, error);
    throw error;
  }
  return user;
};

module.exports = getUserExerciseLog;
