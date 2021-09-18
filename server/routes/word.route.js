module.exports = (app) => {
  const words = require("../controllers/word.controller.js");

  var router = require("express").Router();

  // Create a new Tutorial
  router.post("/create", words.create);

  // Retrieve all Tutorials
  router.post("/findAll", words.findAll);

  // Retrieve a single Tutorial with id
  router.post("/findById", words.findById);

  // Update a Tutorial with id
  router.post("/update", words.update);

  // Delete a Tutorial with id
  router.post("/delete", words.delete);

  // Create a new Tutorial
  router.post("/deleteAll", words.deleteAll);

  // ===================================================================
  app.use("/api/words", router);
};
