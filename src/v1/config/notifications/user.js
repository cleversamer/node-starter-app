const Notificatin = require("./Notification");

module.exports = {
  hasUnreadNotifications: () =>
    new Notificatin(
      "You have unread notifications",
      "لديك إشعارات غير مقروءة",
      "You have unread notifications, please check it out",
      "لديك إشعارات غير مقروءة، يرجى تفحّصها",
      "",
      "notifications"
    ),
  newLoginActivity: (date) =>
    new Notificatin(
      "Security Alert: Recent login activity detected on your account",
      "تنبيه أمان: تم إكتشاف نشاط تسجيل الدخول الأخير على حسابك",
      `There was a login to your account from a new device on ${date.toDateString()}. Review it now.`,
      `كان هناك تسجيل دخول إلى حسابك من جهاز جديد في ${date.toDateString()}، راجعه الآن`,
      "",
      "loginActivities"
    ),
};
