module.exports.authService = require("./user/auth.service");
module.exports.usersService = require("./user/users.service");
module.exports.googleService = require("./user/google.service");
module.exports.loginActivitiesService = require("./user/loginActivities.service");

module.exports.excelService = require("./storage/excel.service");
module.exports.localStorage = require("./storage/localStorage.service");

module.exports.notificationsService = require("./cloud/notifications.service");
module.exports.emailService = require("./cloud/email.service");
module.exports.cloudStorage = require("./cloud/cloudStorage.service");

module.exports.scheduleService = require("./system/schedule.service");
module.exports.errorsService = require("./system/errors.service");
module.exports.reviewsService = require("./system/reviews.service");
