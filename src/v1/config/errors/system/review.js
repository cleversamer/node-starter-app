const { content } = require("../../models/system/review");

module.exports = Object.freeze({
  invalidId: {
    en: "Invalid review ID",
    ar: "معرّف المراجعة غير صالح",
  },
  invalidContent: {
    en: `Review content must be ${content.minLength.toLocaleString()}-${content.maxLength.toLocaleString()} characters`,
    ar: `محتوى المراجعة يجب أن يكون بين ${content.minLength.toLocaleString()}-${content.maxLength.toLocaleString()} حرفًا`,
  },
  noReviews: {
    en: "No reviews found",
    ar: "لم يتم العثور على مراجعات",
  },
  notFound: {
    en: "Review was not found",
    ar: "لم يتم العثور على المراجعة",
  },
  notAuthor: {
    en: "You are not the author of this review",
    ar: "أنت لست صاحب هذه المراجعة",
  },
  matchCurrentContent: {
    en: "This review matches the last review you added",
    ar: "هذه المراجعة تطابق آخر مراجعة أضفتها أنت",
  },
});
