const {
  deviceToken,
  email,
  name,
  verificationCode,
  password,
} = require("../../../config/models/user/user");

module.exports = Object.freeze({
  invalidCode: {
    en: `Verification code must be ${verificationCode.exactLength.toLocaleString()} characters`,
    ar: `كود التحقق يجب أن يكون ${verificationCode.exactLength.toLocaleString()} حرفًا`,
  },
  incorrectCode: {
    en: "Incorrect verification code",
    ar: "كود التحقق غير صحيح",
  },
  expiredCode: {
    en: "The verification code is expired",
    ar: "انتهت صلاحيّة رمز التحقق",
  },
  invalidToken: {
    en: "You have to login in order to perform this action",
    ar: "يجب عليك تسجيل الدخول من أجل تنفيذ هذا الإجراء",
  },
  hasNoRights: {
    en: "You don't have sufficient permissions",
    ar: "ليس لديك الصلاحيّات الكافية",
  },
  phoneNotVerified: {
    en: "You must verify your phone number to be able to use the application",
    ar: "يجب عليك تفعيل رقم هاتفك لتتمكن من استخدام التطبيق",
  },
  emailNotUsed: {
    en: "Email is not in use",
    ar: "البريد الإلكتروني غير مستخدم",
  },
  emailOrPhoneUsed: {
    en: "Email or phone number already used",
    ar: "البريد الإلكتروني أو رقم الهاتف مستخدم مسبقًا",
  },
  emailOrPhoneNotUsed: {
    en: "Email or phone number is not in use",
    ar: "البريد الإلكتروني أو رقم الهاتف غير مستخدم",
  },
  emailUsed: {
    en: "Email already used",
    ar: "البريد الإلكتروني مستخدم مسبقًا",
  },
  phoneUsed: {
    en: "Phone number is already in use",
    ar: "رقم الهاتف مستخدم مسبقًا",
  },
  incorrectCredentials: {
    en: "Incorrect login credentials",
    ar: "بيانات الدخول غير صحيحة",
  },
  incorrectOldPassword: {
    en: "Old password is incorrect",
    ar: "كلمة المرور القديمة غير صحيحة",
  },
  oldPasswordMatchNew: {
    en: "New password matches old password",
    ar: "كلمة المرور الجديدة تطابق كلمة المرور القديمة",
  },
  invalidName: {
    en: `Name must be ${name.minLength.toLocaleString()}-${name.maxLength.toLocaleString()} characters`,
    ar: `الإسم يجب أن يكون بين ${name.minLength.toLocaleString()}-${name.maxLength.toLocaleString()} حرفًا`,
  },
  invalidEmail: {
    en: `Email must be a valid email and between ${email.minLength.toLocaleString()}-${email.maxLength.toLocaleString()} characters`,
    ar: `البريد الإلكتروني يجب أن يكون بريد صالح وطوله بين ${email.minLength.toLocaleString()}-${email.maxLength.toLocaleString()} حرفًا`,
  },
  invalidEmailOrPhone: {
    en: "Invalid email or phone number",
    ar: "البريد الإلكتروني أو رقم الهاتف غير صالح",
  },
  invalidPhone: {
    en: "Invalid phone number",
    ar: "رقم الهاتف غير صالح",
  },
  invalidICC: {
    en: "Invalid country code",
    ar: "رمز مقدمة الدولة غير صالح",
  },
  phoneNotOnlyNumbers: {
    en: "Phone number must contain numbers only",
    ar: "رقم الهاتف يجب أن يحتوي على أرقام فقط",
  },
  invalidPassword: {
    en: `Password must be ${password.minLength.toLocaleString()}-${password.maxLength.toLocaleString()} characters`,
    ar: `كلمة المرور يجب أن تكون بين ${password.minLength.toLocaleString()}-${password.maxLength.toLocaleString()} حرفًا`,
  },
  invalidOldPassword: {
    en: `Old password must be ${password.minLength.toLocaleString()}-${password.maxLength.toLocaleString()} characters`,
    ar: `كلمة المرور القديمة يجب أن تكون بين ${password.minLength.toLocaleString()}-${password.maxLength.toLocaleString()} حرفًا`,
  },
  invalidNewPassword: {
    en: `New password must be ${password.minLength.toLocaleString()}-${password.maxLength.toLocaleString()} characters`,
    ar: `كلمة المرور الجديدة يجب أن تكون بين ${password.minLength.toLocaleString()}-${password.maxLength.toLocaleString()} حرفًا`,
  },
  invalidDeviceToken: {
    en: `Device token must be ${deviceToken.minLength.toLocaleString()}-${deviceToken.maxLength.toLocaleString()} characters`,
    ar: `معرّف الجهاز يجب أن يكون بين ${deviceToken.minLength.toLocaleString()}-${deviceToken.maxLength.toLocaleString()} حرفًا`,
  },
  invalidGoogleToken: {
    en: "We're unable to access your Google account information",
    ar: "لم نتمكن من الوصول إلى معلومات حسابك في جوجل",
  },
  googleAuthError: {
    en: "We're unable to access your Google account information",
    ar: "لم نتمكن من الوصول إلى معلومات حسابك في جوجل",
  },
  invalidAuthType: {
    en: "Authentication type must be either via email or gmail",
    ar: "نوع المصادقة يجب أن يكون إما عبر البريد الإلكتروني أو جوجل",
  },
  hasNoPassword: {
    en: "You need to set your own password because you joined using Google",
    ar: "تحتاج إلى تعيين كلمة المرور الخاصة بك لأنك انضممت باستخدام جوجل",
  },
});
