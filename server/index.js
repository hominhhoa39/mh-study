const express = require("express");
const cors = require("cors");
const path = require("path");
const favicon = require("serve-favicon");

const app = express();

if (process.env.NODE_ENV !== "production") {
  require("dotenv").config();
}

app.use(
  cors({
    origin: ["https://mh-study.herokuapp.com/"],
  })
);

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(favicon(path.join(__dirname, "../dist/mh-study", "favicon.ico")));
app.use(express.static(path.join(__dirname, "../dist/mh-study")));
app.get("/*", function (req, res) {
  res.sendFile("index.html", {
    root: path.join(__dirname, "../dist/mh-study"),
  });
});

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

require("./routes/tutorial.route.js")(app);
require("./routes/word.route.js")(app);
require("./routes/outside.route.js")(app);

const db = require("./models");
db.mongoose
  .connect(db.url, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to the database!");
  })
  .catch((err) => {
    console.log("Cannot connect to the database!", err);
    process.exit();
  });
