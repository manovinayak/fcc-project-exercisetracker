let mongoose = require("mongoose");
const MONGO_URI = process.env["MONGO_URI"];

class Database {
  constructor() {
    this.__connect();
  }
  __connect() {
    console.log(`hello ${MONGO_URI}`)
    mongoose
      .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
      .then(() => {
        console.log(`Database connection successful`);
      })
      .catch((error) => {
        console.error(`Database connection error due to: `, error);
      });
  }
}

module.exports = new Database();
