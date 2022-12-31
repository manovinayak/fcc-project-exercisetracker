const express = require("express");
const createUser = require("../services/createUser");
const getAllUsers = require("../services/getAllUsers");
const createExercise = require("../services/createExercise");
const getUserExerciseLog = require("../services/getUserExerciseLog");
const Dates = require("../utils/Dates");

const router = express.Router();

router
  .route("/")
  .post(async (req, res) => {
    const name = req.body.username;
    const user = await createUser(name);
    res.json({ username: user.username, _id: user._id });
  })
  .get(async (req, res) => {
    const getUsersWithAttributes = (users) => {
      return users?.map((user) => {
        return { _id: user._id, username: user.username };
      });
    };
    const users = await getAllUsers();
    res.json(getUsersWithAttributes(users));
  });

router.route("/:_id/exercises").post(async (req, res) => {
  const id = req.params._id;
  const description = req.body.description;
  const duration = parseInt(req.body.duration);
  const date = Dates.isValidDate(req.body.date)
    ? Date.parse(req.body.date)
    : new Date();
  console.log(`${id} ${description} ${duration} ${date}`);
  try {
    const { user, exercise } = await createExercise(
      id,
      description,
      duration,
      date
    );

    res.json({
      _id: user._id,
      username: user.username,
      date: Dates.convertTimestampToDateString(exercise.date),
      duration: exercise.duration,
      description: exercise.description,
    });
  } catch (error) {
    console.error(`Error while creating exercise due to : `, error);
    throw error;
  }
});

router.route("/:id/logs").get(async (req, res) => {
  const id = req.params.id;
  const getExercisesAttributes = (exercises) => {
    return exercises?.map((exercise) => {
      return {
        description: exercise.description,
        duration: exercise.duration,
        date: Dates.convertTimestampToDateString(exercise.date),
      };
    });
  };

  try {
    let user = await getUserExerciseLog(id);
    console.log(getExercisesAttributes(user.exercises));
    res.json({
      _id: user._id,
      username: user.username,
      count: user.exercises.length,
      log: getExercisesAttributes(user.exercises),
    });
  } catch (error) {
    console.error(`error while fetching user's exercise logs due to: `, error);
  }
});

module.exports = router;
