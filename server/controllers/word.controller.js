const db = require("../models");
const Word = db.words;

//--------------------------------------------------
exports.create = (req, res) => {
  // Validate request
  if (!req.body.word) {
    res.status(400).send({ message: "Word can not be empty!" });
    return;
  }

  // Create a Word
  const word = new Word({
    ...req.body
  });

  // Save Word in the database
  word
    .save(word)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Word.",
      });
    });
};

//--------------------------------------------------
exports.findAll = (req, res) => {
  const addDate = req.body.addDate;
  var condition = addDate ? { addDate: addDate } : {};
  Word.find(condition).sort({ createdAt: 'desc'}).exec().then((data) => {
      res.send(data);
    }).catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while retrieving words.",
      });
    });
};

//--------------------------------------------------
exports.findById = (req, res) => {
  // const id = req.params.id;
  const id = req.body.id;
  Word.findById(id)
    .then((data) => {
      if (!data)
        res.status(404).send({ message: "Not found Word with id " + id });
      else res.send(data);
    })
    .catch((err) => {
      res
        .status(500)
        .send({ message: "Error retrieving Word with id=" + id });
    });
};

//--------------------------------------------------
exports.update = (req, res) => {
  if (!req.body) {
    return res.status(400).send({
      message: "Data to update can not be empty!",
    });
  }

  // const id = req.params.id;
  const id = req.body.id;

  Word.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot update Word with id=${id}. Maybe Word was not found!`,
        });
      } else res.send({ message: "Word was updated successfully." });
    })
    .catch((err) => {
      res.status(500).send({
        message: "Error updating Word with id=" + id,
      });
    });
};

//--------------------------------------------------
exports.delete = (req, res) => {
  // const id = req.params.id;
  const id = req.body.id;

  Word.findByIdAndRemove(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({
          message: `Cannot delete Word with id=${id}. Maybe Word was not found!`,
        });
      } else {
        res.send({
          message: "Word was deleted successfully!",
        });
      }
    })
    .catch((err) => {
      res.status(500).send({
        message: "Could not delete Word with id=" + id,
      });
    });
};

//--------------------------------------------------
exports.deleteAll = (req, res) => {
  Word.deleteMany({})
    .then((data) => {
      res.send({
        message: `${data.deletedCount} Words were deleted successfully!`,
      });
    })
    .catch((err) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while removing all words.",
      });
    });
};
