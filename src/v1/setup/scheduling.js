const { usersService, scheduleService } = require("../services");

module.exports = () => {
  scheduleService.scheduleDailyEvent(async () => {
    await usersService.notifyUsersWithUnseenNotifications();
  });
};
