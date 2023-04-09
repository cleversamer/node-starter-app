const Excel = require("exceljs");
const localStorage = require("./localStorage.service");
const cloudStorage = require("../cloud/cloudStorage.service");
const { APP_NAME_EN } = require("../../config/system/server");

module.exports.exportUsersToExcelFile = async (users = []) => {
  let filePath = "";

  try {
    // Create a new Excel Workbook
    const workbook = new Excel.Workbook();

    // Add new sheet to the Workbook
    const worksheet = workbook.addWorksheet(`${APP_NAME_EN} Accounts`);

    // Specify excel sheet's columns
    worksheet.addRow([
      "الإسم الكامل",
      "البريد الإلكتروني",
      "رقم الهاتف",
      "نوع الحساب",
      "البريد مفعّل",
      "رقم الهاتف مفعّل",
      "عدد الإشعارات",
      "عدد الإشعارات المقروءة",
      "عدد الإشعارات الغير مقروءة",
      "مسجّل بواسطة",
      "يملك كلمة مرور",
      "اللغة المفضّلة",
      "عدد النشاطات داخل التطبيق",
      "آخر دخول",
      "الحساب محذوف",
      "رابط الصورة الشخصيّة",
    ]);

    // Add row for each user in the Database
    users.forEach(function (user) {
      const seenNotifications = user.notifications.filter((n) => n.seen).length;
      const unseenNotifications = user.notifications.length - seenNotifications;

      worksheet.addRow([
        user.name,
        user.email,
        user.phone.full,
        user.role === "user" ? "مستخدم" : "آدمن",
        user.verified.email ? "نعم" : "لا",
        user.verified.phone ? "نعم" : "لا",
        user.notifications.length,
        seenNotifications,
        unseenNotifications,
        user.authType === "email" ? "البريد الإلكتروني" : "حساب جوجل",
        user.password ? "نعم" : "لا",
        user.favLang === "en" ? "الإنجليزية" : "العربية",
        user.noOfRequests,
        user.lastLogin.toLocaleString(),
        user.isDeleted ? "نعم" : "لا",
        user.avatarURL,
      ]);
    }, "i");

    // Decide excel's file
    const fileName =
      filterName(`${APP_NAME_EN.toLowerCase()}_users_${getCurrentDate()}`) +
      ".xlsx";
    filePath = `/${fileName}`;

    // Generate and save excel file
    await workbook.xlsx.writeFile(`./uploads/${fileName}`);

    // Upload excel file to storage bucket
    const cloudFile = await cloudStorage.uploadFile({
      name: fileName,
      path: filePath,
    });

    // Return file's path
    return cloudFile;
  } catch (err) {
    throw err;
  } finally {
    // Delete local excel file
    if (filePath) {
      await localStorage.deleteFile(filePath);
    }
  }
};

module.exports.exportReviewsToExcelFile = async (reviews = []) => {
  let filePath = "";

  try {
    // Create a new Excel Workbook
    const workbook = new Excel.Workbook();

    // Add new sheet to the Workbook
    const worksheet = workbook.addWorksheet(`${APP_NAME_EN} Reviews`);

    // Specify excel sheet's columns
    worksheet.addRow([
      "اسم المؤلف",
      "البريد الإلكتروني للمؤلف",
      "رقم هاتف المؤلف",
      "التاريخ",
      "تم تحديث المحتوى",
      "المحتوى",
    ]);

    // Add row for each user in the Database
    reviews.forEach(function (review) {
      const date = `${review.date.toDateString()} ${review.date.toLocaleTimeString()}`;

      worksheet.addRow([
        review.author.name,
        review.author.email,
        review.author.phone.full,
        date,
        review.isUpdated ? "نعم" : "لا",
        review.content,
      ]);
    }, "i");

    // Decide excel's file
    const fileName =
      filterName(`${APP_NAME_EN.toLowerCase()}_reviews_${getCurrentDate()}`) +
      ".xlsx";
    filePath = `/${fileName}`;

    // Generate and save excel file
    await workbook.xlsx.writeFile(`./uploads/${fileName}`);

    // Upload excel file to storage bucket
    const cloudFile = await cloudStorage.uploadFile({
      name: fileName,
      path: filePath,
    });

    // Return file's path
    return cloudFile;
  } catch (err) {
    throw err;
  } finally {
    // Delete local excel file
    if (filePath) {
      await localStorage.deleteFile(filePath);
    }
  }
};

module.exports.exportLoginActivitiesToExcelFile = async (
  user,
  loginActivities = []
) => {
  let filePath = "";

  try {
    // Create a new Excel Workbook
    const workbook = new Excel.Workbook();

    // Add new sheet to the Workbook
    const worksheet = workbook.addWorksheet(`${user.name}'s Login Activities`);

    // Specify excel sheet's columns
    worksheet.addRow([
      user.favLang === "en" ? "Date" : "التاريخ",
      user.favLang === "en" ? "Location" : "العنوان",
      user.favLang === "en" ? "Device IP" : "عنوان IP",
      user.favLang === "en" ? "Operating System" : "نظام التشغيل",
      user.favLang === "en" ? "Device Model" : "موديل الجهاز",
      user.favLang === "en" ? "Device Type" : "نوع الجهاز",
      user.favLang === "en" ? "Device Vendor" : "اسم بائع الجهاز",
      user.favLang === "en" ? "CPU Architecture" : "معماريّة المعالج",
      user.favLang === "en" ? "Engine" : "محرك البحث",
      user.favLang === "en" ? "Browser" : "المتصفح",
      user.favLang === "en" ? "Agent" : "الوكيل",
    ]);

    // Add row for each user in the Database
    loginActivities.forEach(function (loginActivity) {
      const date = `${loginActivity.date.toDateString()} ${loginActivity.date.toLocaleTimeString()}`;
      const location = `${loginActivity.location.country} ${loginActivity.location.city}`;
      const engine = `${loginActivity.engine.name} ${loginActivity.engine.version}`;
      const browser = `${loginActivity.browser.name} ${loginActivity.browser.version}`;

      worksheet.addRow([
        date,
        location,
        loginActivity.ip,
        loginActivity.os,
        loginActivity.device.model,
        loginActivity.device.type,
        loginActivity.device.vendor,
        loginActivity.cpu.architecture,
        engine,
        browser,
        loginActivity.userAgent,
      ]);
    }, "i");

    // Decide excel's file
    const fileName = filterName(`login_activities_${user._id}`) + ".xlsx";
    filePath = `/${fileName}`;

    // Generate and save excel file
    await workbook.xlsx.writeFile(`./uploads/${fileName}`);

    // Upload excel file to storage bucket
    const cloudFile = await cloudStorage.uploadFile({
      name: fileName,
      path: filePath,
    });

    // Return file's path
    return cloudFile;
  } catch (err) {
    throw err;
  } finally {
    // Delete local excel file
    if (filePath) {
      await localStorage.deleteFile(filePath);
    }
  }
};

//////////////////// HELPER FUNCTIONS ////////////////////
const filterName = (name = "") => {
  return name.split(" ").join("_").split(":").join("_").split("/").join("_");
};

const getCurrentDate = () => {
  let strDate = new Date().toLocaleString();
  strDate = strDate.split(", ");
  let part1 = strDate[0];

  let date = `${part1}`;
  date = date.split("/").join("-");
  return date;
};
