const { usersService, scheduleService } = require("../services");

module.exports = () => {
  scheduleService.scheduleDailyEvent(async () => {
    await usersService.notifyUsersWithUnseenNotifications();
  });

  scheduleService.scheduleHourlyEvent(async () => {
    await usersService.notifyAdminsWithServerErrors();
  });
};
