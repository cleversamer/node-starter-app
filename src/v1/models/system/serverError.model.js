const { Schema, model } = require("mongoose");

const clientSchema = [
  "_id",
  "requestURL",
  "name",
  "message",
  "stackTrace",
  "occurs",
  "date",
];

const serverErrorSchema = new Schema(
  {
    // The request URL where the error happened
    requestURL: {
      type: String,
      required: true,
      trim: true,
    },
    // The name of the error
    name: {
      type: String,
      required: true,
      trim: true,
    },
    // The message of the error
    message: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // The stack of the error
    stackTrace: {
      type: String,
      required: true,
      trim: true,
      unique: true,
    },
    // How many times this error occurs
    occurs: {
      type: Number,
      default: 1,
    },
    // The date of the error
    date: {
      type: Date,
      required: true,
    },
  },
  {
    // To not avoid empty object when creating the document
    minimize: false,
  }
);

//////////////////// METHODS ////////////////////
serverErrorSchema.methods.addOccur = function () {
  this.occurs = this.occurs + 1;
};

const ServerError = model("Error", serverErrorSchema);

module.exports = {
  ServerError,
  clientSchema,
};
