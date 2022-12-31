const ExerciseModel = require("../models/exercise");
const updateUser = require("../services/updateUser");

const createExercise = async (userId, description, duration, date) => {
  const exerciseModel = new ExerciseModel({
    description: description,
    duration: duration,
    date: date,
  });

  let exercise, user;
  try {
    exercise = await exerciseModel.save();
    user = await updateUser(userId, exercise._id);
  } catch (error) {
    console.error(`Error while saving exercise due to : `, error);
    throw error;
  }
  return { exercise, user };
};

module.exports = createExercise;
