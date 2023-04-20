const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const { review: config } = require("../../config/models");

const clientSchema = ["_id", "author", "content", "date"];

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
  date: 1,
};

const reviewSchema = new Schema(
  {
    // Author of the review
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    // Text content of the review
    content: {
      type: String,
      required: true,
      trim: true,
      minlength: config.content.minLength,
      maxlength: config.content.maxLength,
    },
    //
    updates: [
      {
        type: String,
        required: true,
        trim: true,
        minlength: config.content.minLength,
        maxlength: config.content.maxLength,
      },
    ],
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

reviewSchema.pre("save", function (next) {
  this.date = new Date();
  next();
});

//////////////////// METHODS ////////////////////
reviewSchema.methods.updateContent = function (content) {
  // Add previous content to the history
  this.updates.unshift(this.content);

  // Update last content
  this.content = content;
};

reviewSchema.methods.matchCurrentContent = function (update) {
  return this.content === update;
};

const Review = model("Review", reviewSchema);

module.exports = {
  Review,
  clientSchema,
  querySchema,
};
