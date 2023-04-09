const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");

const clientSchema = [
  "_id",
  "userId",
  "requestURL",
  "message",
  "stackTrace",
  "date",
];

const errorSchema = new Schema(
  {
    userId: {
      type: ObjectId,
      ref: "User",
      default: null,
    },
    requestURL: {
      type: String,
      required: true,
      trim: true,
    },
    message: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
    stackTrace: {
      type: String,
      required: true,
      trim: true,
      default: "",
    },
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

// Create an index on the `userId` field
// to query user's errors fast
errorSchema.index({ userId: -1 });

const ErrorModel = model("Error", errorSchema);

module.exports = {
  ErrorModel,
  clientSchema,
};
