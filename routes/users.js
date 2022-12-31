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
  const from = req.query.from;
  const to = req.query.to;
  const limit = parseInt(req.query.limit) || 0;
  const validateFromToDates = (from, to) => {
    return Dates.isValidDate(from) && Dates.isValidDate(to);
  };
  const getFromAndToDates = (from, to) => {
    if (validateFromToDates(from, to)) {
      let fromDate = new Date(Date.parse(from));
      fromDate.setDate(fromDate.getDate() + 1);
      fromDate.setUTCHours(0, 0, 0, 0);

      let toDate = new Date(Date.parse(to));
      toDate.setUTCHours(23, 59, 59, 59);
      toDate.setDate(toDate.getDate() + 1);

      return { fromDate, toDate };
    } else {
      return { fromDate: undefined, toDate: undefined };
    }
  };

  const { fromDate, toDate } = getFromAndToDates(from, to);

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
    let user = await getUserExerciseLog(id, fromDate, toDate, limit);
    res.json({
      _id: user._id,
      username: user.username,
      ...(from && { from: fromDate.toDateString() }),
      ...(to && { to: toDate.toDateString() }),
      count: user.exercises.length,
      log: getExercisesAttributes(user.exercises),
    });
  } catch (error) {
    console.error(`error while fetching user's exercise logs due to: `, error);
  }
});

module.exports = router;
