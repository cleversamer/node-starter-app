module.exports = {
  // First status should be always pending
  statuses: ["pending", "approved", "paid", "rejected"],
  reasonForRejection: { minLength: 1, maxLength: 512 },
};
