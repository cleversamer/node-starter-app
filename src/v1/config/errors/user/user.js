const {
  notificationTitle,
  notificationBody,
  link,
} = require("../../models/user/user");

module.exports = Object.freeze({
  invalidId: {
    en: "Invalid user ID",
    ar: "معرّف المستخدم غير صالح",
  },
  noUsers: {
    en: "User were not found",
    ar: "لم يتم العثور على المستخدمين",
  },
  notFound: {
    en: "User was not found",
    ar: "لم يتم العثور على المستخدم",
  },
  emailAlreadyVerified: {
    en: "Your email has already been verified",
    ar: "تم التحقق من بريدك الإلكتروني مسبقًا",
  },
  phoneAlreadyVerified: {
    en: "Your phone number has already been verified",
    ar: "تم التحقق من رقم هاتفك مسبقًا",
  },
  invalidRole: {
    en: "Invalid user role",
    ar: "الصلاحيّة المختارة غير صالحة",
  },
  foundWithInvalidRole: {
    en: "User is registered with another role",
    ar: "المستخدم مسجّل بصلاحيّة أخرى",
  },
  alreadyVerified: {
    en: "User's email and phone number are already verified",
    ar: "تم التحقق من رقم هاتف وبريد المستخدم مسبقًا",
  },
  unsupportedLanguage: {
    en: "Language is not supported",
    ar: "اللغة غير مدعومة",
  },
  noLanguage: {
    en: "Please select your favorite language",
    ar: "الرجاء تحديد لغتك المفضّلة",
  },
  unsupportedReceiverType: {
    en: "Receiver is not supported, we can send the code to your email or phone number",
    ar: "مكان الاستقبال غير مدعوم، يمكننا إرسال الرمز إلى بريدك الإلكتروني أو رقم هاتفك",
  },
  notUpdated: {
    en: "There's no new data to update",
    ar: "لا يوجد بيانات جديدة للتحديث",
  },
  notificationsSeen: {
    en: "There are no new notifications",
    ar: "لا يوجد هناك إشعارات جديدة",
  },
  noNotifications: {
    en: "You have no notifications",
    ar: "ليس لديك إشعارات",
  },
  invalidAuthType: {
    en: "Invalid authentication type",
    ar: "نوع المصادقة غير صالح",
  },
  updateAdminRole: {
    en: "You can't modify admin's role",
    ar: "لا يمكنك تعديل صلاحيّة الآدمن",
  },
  errorSendingNotification: {
    en: "Error sending notification",
    ar: "حصل خطأ عند إرسال الإشعار",
  },
  invalidUserIds: {
    en: "User IDS should be a list",
    ar: "معرّفات المستخدمين يجب أن تكون قائمة",
  },
  invalidNotificationTitle: {
    en: `Notification's title should be ${notificationTitle.min.toLocaleString()}-${notificationTitle.max.toLocaleString()} letters`,
    ar: `عنوان الإشعار يجب أن يكون بين ${notificationTitle.min.toLocaleString()}-${notificationTitle.max.toLocaleString()} حرفًا`,
  },
  invalidNotificationBody: {
    en: `Notification's body should be ${notificationBody.min.toLocaleString()}-${notificationBody.max.toLocaleString()} letters`,
    ar: `محتوى الإشعار يجب أن يكون بين ${notificationBody.min.toLocaleString()}-${notificationBody.max.toLocaleString()} حرفًا`,
  },
  errorDeletingAccount: {
    en: "Error deleting account",
    ar: "حصل خطأ عند حذف الحساب",
  },
  noAvatar: {
    en: "You haven't added an avatar picture",
    ar: "لم تقم بإضافة صورة شخصيّة",
  },
  unrealName: {
    en: "We require everyone to use the name they use in everyday life",
    ar: "نطلب من الجميع استخدام الإسم الذي يستخدمونه في الحياة اليوميّة",
  },
  invalidLinkKey: {
    en: "Link type is not supported",
    ar: "نوع الرابط غير مدعوم",
  },
  invalidLinkValue: {
    en: `Link must be ${link.minLength.toLocaleString()}-${link.maxLength.toLocaleString()} characters`,
    ar: `الرابط يجب أن يكون بين ${link.minLength.toLocaleString()}-${link.maxLength.toLocaleString()} حرفًا`,
  },
});
