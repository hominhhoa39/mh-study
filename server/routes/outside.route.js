module.exports = (app) => {
  const outside = require("../controllers/outside.controller.js");

  var router = require("express").Router();

  router.post("/search", outside.outsideSearch);
  router.post("/suggest", outside.outsideSuggest);
  router.post("/fullSearch", outside.outsideFullSearch);
  router.post("/commentSearch", outside.outsideCommentSearch);

  // ===================================================================
  app.use("/api/outside", router);
};
