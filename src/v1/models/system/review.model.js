const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const { review: config } = require("../../config/models");

const clientSchema = ["_id", "author", "content", "isUpdated", "date"];

const querySchema = {
  _id: 1,
  author: {
    _id: 1,
    name: 1,
    email: 1,
    phone: 1,
  },
  author: { $arrayElemAt: ["$author", 0] },
  content: 1,
  isUpdated: 1,
  date: 1,
};

const reviewSchema = new Schema(
  {
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    content: {
      type: String,
      required: true,
      trim: true,
      minLength: config.content.minLength,
      maxLength: config.content.maxLength,
    },
    isUpdated: {
      type: Boolean,
      required: true,
      default: false,
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

// Create an index on the `author` field
// to query user's errors fast
reviewSchema.index({ author: -1 });

reviewSchema.methods.updateContent = function (content) {
  this.content = content;
  this.isUpdated = true;
};

const Review = model("Review", reviewSchema);

module.exports = {
  Review,
  clientSchema,
  querySchema,
};
