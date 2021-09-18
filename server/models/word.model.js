module.exports = (mongoose) => {
  var schema = mongoose.Schema(
    {
      word: String,
      phonetic: String,
      meaning: String,
      example: String,
      addDate: String,
      mobileId: Number
    },
    { timestamps: true }
  );

  schema.method("toJSON", function () {
    const { __v, _id, ...object } = this.toObject();
    object.id = _id;
    return object;
  });

  const Word = mongoose.model("words", schema);
  return Word;
};
