const {
  Schema,
  model,
  Types: { ObjectId },
} = require("mongoose");
const { advertisement: config } = require("../../config/models");

const clientSchema = [
  "_id",
  "author",
  "acceptedBy",
  "photoURL",
  "link",
  "startDate",
  "expiryDate",
  "createdAt",
];

const querySchema = {
  _id: 1,
  author: {
    _id: 1,
    name: 1,
    email: 1,
    phone: 1,
  },
  acceptedBy: {
    _id: 1,
    name: 1,
    email: 1,
    phone: 1,
  },
  author: { $arrayElemAt: ["$author", 0] },
  acceptedBy: { $arrayElemAt: ["$acceptedBy", 0] },
  photoURL: 1,
  link: 1,
  startDate: 1,
  expiryDate: 1,
  createdAt: 1,
};

const advertisementSchema = new Schema(
  {
    // ID of advertisement's author
    author: {
      type: ObjectId,
      ref: "User",
      required: true,
    },
    // [OPTIONAL]: ID of the admin that has accepted advertisement
    acceptedBy: {
      type: ObjectId,
      ref: "User",
      default: null,
    },
    // Status of advertisement
    status: {
      type: String,
      required: true,
      trim: true,
      enum: config.statuses,
      default: config.statuses[0],
    },
    // Photo URL of advertisement
    photoURL: {
      type: String,
      required: true,
      trim: true,
    },
    // [OPTIONAL]: Outer link of advertisement
    link: {
      type: String,
      trim: true,
      default: "",
    },
    // Reason for rejection (in case of it is rejected)
    reasonFor: {
      rejection: {
        type: String,
        trim: true,
        minlength: config.reasonForRejection.minLength,
        maxlength: config.reasonForRejection.maxLength,
      },
    },
    // The beginning date
    startDate: {
      type: Date,
      required: true,
      default: new Date(),
    },
    // How much this ad costs
    cost: {
      type: Number,
      required: true,
    },
    // The end date
    expiryDate: {
      type: Date,
      required: true,
    },
    // The creation date
    createdAt: {
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
advertisementSchema.index({ author: -1 });

// Creating an index on the `status` field to
// fetch advertisements in a specific status fast
advertisementSchema.index({ status: 1 });

const Advertisement = model("Advertisement", advertisementSchema);

module.exports = {
  Advertisement,
  clientSchema,
  querySchema,
};
