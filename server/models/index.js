const dbConfig = require("../config/db.config.js");

const mongoose = require("mongoose");
mongoose.Promise = global.Promise;

module.exports = {
  mongoose: mongoose,
  url: dbConfig.url,
  tutorials: require("./tutorial.model.js")(mongoose),
  words: require("./word.model.js")(mongoose)
}
