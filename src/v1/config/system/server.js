module.exports.APP_NAME_EN = "Taxilen";

module.exports.APP_NAME_AR = "Taxilen";

module.exports.APP_EMAIL = "thedev.samer@gmail.com";

module.exports.SUPPORT_EMAIL = "thedev.samer@gmail.com";

module.exports.PORT = process.env["PORT"] || 4000;

module.exports.DATABASE_NAME = "demo";

module.exports.DATABASE_URI =
  process.env["MONGODB_URI"] ||
  `mongodb://127.0.0.1:27017/${this.DATABASE_NAME}`;

module.exports.PROJECT_ID = "monkey-road";

module.exports.BUCKET_NAME = "monkey-road-bucket-1";

module.exports.MAX_FILE_UPLOAD_SIZE = 5; // In MegaBytes

module.exports.MAX_REQ_BODY_SIZE = 8; // In KiloBytes

module.exports.SUPPORTED_LANGUAGES = ["en", "ar"];

module.exports.MAX_REQUESTS = {
  PER_MILLISECONDS: 1 * 60 * 1000, //  => 1 minute
  NUMBER: 60 * 256, // allowed number of requests
};

module.exports.PASSWORD_SALT = process.env["PASSWORD_SALT"];
