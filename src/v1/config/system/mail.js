const { APP_NAME_EN, APP_NAME_AR, SUPPORT_EMAIL } = require("./server");

module.exports.auth = {
  user: "thedev.samer@gmail.com",
  password: process.env["EMAIL_PRIVATE_KEY"],
  emailURL: "#",
  siteDomains: {
    verifyEmail: "#",
  },
};

module.exports.types = {
  welcoming: {
    subject: {
      en: `Welcome to ${APP_NAME_EN}`,
      ar: `أهلاً بك في ${APP_NAME_AR}`,
    },
    emailBody: {
      title: {
        en: (name) => `
          <div style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: left; color: #000;">
            <span>Hello <span style="font-weight: 700;">${name}</span>,</span>

            <br />
            <br />
            
            <span>
              We are excited to welcome you to <span style="font-weight: 700;">${APP_NAME_EN}</span>!
              Our team has been hard at work to create an application that is easy to use, helpful and
              enjoyable for our users. We are thrilled that you have decided to join us!
            </span>

            <br />
            <br />

            <span>
              <span style="font-weight: 700;">${APP_NAME_EN}</span> is designed to [briefly describe what
              your app does and how it can help the user]. Our mission is to [describe your mission statement].
            </span>

            <br />
            <br />

            <span>
              To get started, simply [provide instructions for how to use your app or a link to a user guide].
              We suggest exploring our app and all of its features, so you can get the most out of it. Don't
              hesitate to let us know if you have any questions or feedback, we're always here to help.
            </span>

            <br />
            <br />

            <span>
              We would love for you to connect with us on social media to stay updated on the latest news
              and promotions. You can follow us on [list your social media channels with links].
            </span>

            <br />
            <br />

            <span>
              Thank you for choosing <span style="font-weight: 700;">${APP_NAME_EN}</span>. We hope that
              you enjoy using it and that it makes your life easier and more enjoyable. If you have any
              questions, please don't hesitate to contact us at
              <a href="mailto:${SUPPORT_EMAIL}" target="_blank">our support email.</a>
            </span>
            
            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 400; text-align: left; color: #000;">
              Best regards,
            </span>
            
            <br />
            
            <span style="font-size: 15px; font-weight: 700; text-align: left; color: #000;">
              ${APP_NAME_EN} Team
            </span>
          </div>
        `,

        ar: (name) => `
          <div dir="rtl" style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: right; color: #000;">
            <span>مرحبًا بك <span style="font-weight: 700;">${name}</span>،</span>

            <br />
            <br />
            
            <span>
              يسعدنا أن نرحب بك في <span style="font-weight: 700;">${APP_NAME_AR}</span>!
              لقد عمل فريقنا بجد لإنشاء تطبيق سهل الإستخدام ومفيد وممتع لمستخدمينا.
            </span>

            <br />
            <br />

            <span>
              تم تصميم <span style="font-weight: 700;">${APP_NAME_AR}</span> لكي
              [تصف بإيجاز ما يفعله تطبيقك وكيف يمكن أن يساعد المستخدم].
              مهمتنا هي [وصف بيان مهمتك].
            </span>

            <br />
            <br />

            <span>
              للبدء، ما عليك سوى [تقديم إرشادات حول كيفية إستخدام تطبيقك أو رابط إلى دليل المستخدم].
              نقترح إستكشاف تطبيقنا وجميع ميزاته، حتى تتمكن من تحقيق أقصى إستفادة منه.
              لا تتردد في إخبارنا إذا كان لديك أيّ أسئلة أو تعليقات، فنحن دائمًا هنا لمساعدتك.
            </span>

            <br />
            <br />

            <span>
              نود أن تتواصل معنا على وسائل التواصل الاجتماعي لتبقى على إطّلاع بآخر الأخبار والعروض الترويجيّة.
              يمكنك متابعتنا على [سرد قنوات التواصل الاجتماعي الخاصة بك مع الروابط].
            </span>

            <br />
            <br />

            <span>
              شكرًا لإختيارك <span style="font-weight: 700;">${APP_NAME_AR}</span>.
              نأمل أن تستمتع بإستخدامه وأن يجعل حياتك أكثر سهولة ومتعة.
              إذا كانت لديك أيّ أسئلة، فالرجاء عدم التردد في الإتصال بنا على
              <a href="mailto:${SUPPORT_EMAIL}" target="_blank">بريد فريق الدعم.</a>
            </span>
            
            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 500; text-align: right; color: #000;">
              أطيب التحيّات،
            </span>
            
            <br />

            <span style="font-size: 15px; font-weight: 700; text-align: right; color: #000;">
              فريق عمل ${APP_NAME_AR}
            </span>
        </div>
        `,
      },
      greeting: {
        en: "Dear",
        ar: "عزيزي",
      },
    },
  },

  verifyEmail: {
    subject: {
      en: `Please verify your email address for ${APP_NAME_EN}`,
      ar: `يرجى التحقق من عنوان بريدك الإلكتروني لدى ${APP_NAME_AR}`,
    },
    emailBody: {
      title: {
        en: (name, emailCode, verificationLink) => `
          <div style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: left; color: #000;">
            <span>Hello <span style="font-weight: 700;">${name}</span>,</span>
            
            <br />
            <br />

            <span>
              Thank you for registering with <span style="font-weight: 700;">${APP_NAME_EN}!</span>
              To complete your registration, we need you to verify your email address. This helps us
              ensure the security of your account and keep your information safe.
            </span>

            <br />
            <br />
            
            <span style="font-weight: 700;">
              Please use the following verification code to verify your email address:
            </span>
            
            <br />
            <br />

            <span style="font-weight: 700; font-size: 18px; color: #F0D810;">${emailCode}</span>

            <br />
            <br />
            
            <span style="font-weight: 700;">
              Or you can easily click on the following link:
              <a href="${verificationLink}" target="_blank">click here</a>
            </span>
            
            <br />
            <br />

            <span style="font-weight: 700;">To verify your email address, please follow these steps:</span>

            <ol>
              <li>
                Log in to your account on <span style="font-weight: 700;">${APP_NAME_EN}</span>.
              </li>

              <li>
                Click on the verification link or button.
              </li>

              <li>
                Enter the verification code provided above.
              </li>

              <li>
                Click on the <span style="font-weight: 700;">"Verify"</span> button.
              </li>
            </ol>

            <br />
            <br />
            
            <span>
              If you didn't register for <span style="font-weight: 700;">${APP_NAME_EN}</span>,
              please ignore this email.
            </span>

            <br />
            <br />
            
            <span>
              Thank you for choosing <span style="font-weight: 700;">${APP_NAME_EN}</span>.
              If you have any questions or concerns, please contact our
              <a href="mailto:${SUPPORT_EMAIL}" target="_blank">support team.</a>
            </span>

            <br />
            <br />
            
            <span>
              Best regards,
            </span>
            
            <br />

            <span style="font-weight: 700;">
              ${APP_NAME_EN} Team
            </span>
          </div>
         `,

        ar: (name, emailCode, verificationLink) => `
          <div dir="rtl" style="margin: 0; padding: 0; font-size: 15px; font-weight: 500; text-align: right; color: #000;">
            <span>مرحبًا بك <span style="font-weight: 700;">${name}</span>،</span>
            
            <br />
            <br />

            <span>
              شكرًا لك على التسجيل في <span style="font-weight: 700;">${APP_NAME_AR}</span>!
              لإكمال عمليّة تسجيلك، نريد منك التحقق من عنوان بريدك الإلكتروني،
              يساعدنا هذا في ضمان أمان حسابك والحفاظ على أمان معلوماتك وخصوصيّتك.
            </span>

            <br />
            <br />
            
            <span style="font-weight: 700;">الرجاء إستخدام رمز التحقق التالي للتحقق من عنوان بريدك الإلكتروني:</span>

            <br />
            <br />

            <span style="font-weight: 700; font-size: 18px; color: #F0D810;">${emailCode}</span>
            
            <br />
            <br />

            <span>
              أو قم بالنقر على الرابط التالي لتفعيل بريدك الإلكتروني:
              <a href="${verificationLink}" target="_blank">إضغط هنا</a>
            </span>

            <br />
            <br />

            <span style="font-weight: 700;">للتحقق من عنوان بريدك الإلكتروني، يرجى إتّباع الخطوات التالية:</span>
            
            <ol style="list-style: arabic-indic;">
              <li>
                تسجيل الدخول إلى حسابك على <span style="font-weight: 700;">${APP_NAME_AR}</span>.
              </li>
              
              <li>
                قم بالنقر على رابط أو زر التحقق.
              </li>
              
              <li>
                أدخل رمز التحقق المقدم أعلاه.
              </li>
              
              <li>
                قم بالنقر على زر <span style="font-weight: 700;">"تحقق"</span>.
              </li>
            </ol>

            <br />
            
            <span style="font-size: 15px; font-weight: 500; text-align: right; color: #000;">
              إذا لم تسجّل في <span style="font-weight: 700;">${APP_NAME_AR}</span>، فيرجى تجاهل هذا البريد الإلكتروني.
            </span>

            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 500; text-align: right; color: #000;">
              شكرًا لإختيارك <span style="font-weight: 700;">${APP_NAME_AR}!</span>
              إذا كانت لديك أيّ أسئلة أو إستفسارات، فيرجى الإتصال
              <a href="mailto:${SUPPORT_EMAIL}" target="_blank">بفريق الدعم.</a>
            </span>

            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 500; text-align: right; color: #000;">
              أطيب التحيّات،
            </span>
            
            <br />

            <span style="font-size: 15px; font-weight: 700; text-align: right; color: #000;">
              فريق عمل ${APP_NAME_AR}
            </span>
          </div>
        `,
      },
      greeting: {
        en: "Dear",
        ar: "عزيزي",
      },
    },
  },

  emailVerified: {
    subject: {
      en: `Congratulations! Your email has been verified for ${APP_NAME_EN}`,
      ar: `تهانينا! تم التحقق من بريدك الالكتروني لدى ${APP_NAME_AR}`,
    },
    emailBody: {
      title: {
        en: (name) => `
          <div style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: left; color: #000;">
            <span>Hello <span style="font-weight: 700;">${name}</span>,</span>
            
            <br />
            <br />

            <span>
              Congratulations! We are happy to inform you that your email has been successfully verified
              for your <span style="font-weight: 700;">${APP_NAME_AR}</span> account. This means that you
              can now fully access all the features of our app and take advantage of everything it has
              to offer.
            </span>

            <br />
            <br />

            <span>
              Thank you for taking the time to verify your email address. Your security and privacy are
              important to us, and this extra step helps to ensure that your account remains secure.
            </span>

            <br />
            <br />

            <span>
              If you have any questions or concerns about your account, please don't hesitate to contact
              us at <a href="mailto:${SUPPORT_EMAIL}" target="_blank">our support email.</a>
              We're always here to help you.
            </span>

            <br />
            <br />

            <span>
              Thank you again for choosing <span style="font-weight: 700;">${APP_NAME_AR}</span>.
              We're excited to have you as part of our community and look forward to helping you
              reach your goals.
            </span>

            <br />
            <br />
            
            <span>
              Best regards,
            </span>
            
            <br />

            <span style="font-weight: 700;">
              ${APP_NAME_EN} Team
            </span>
          </div>
         `,

        ar: (name) => `
          <div dir="rtl" style="margin: 0; padding: 0; font-size: 15px; font-weight: 500; text-align: right; color: #000;">
            <span>مرحبًا بك <span style="font-weight: 700;">${name}</span>،</span>
            
            <br />
            <br />

            <span>
              تهانينا! يسعدنا إبلاغك بأنه تم التحقق من بريدك الإلكتروني بنجاح لحساب 
              <span style="font-weight: 700;">${APP_NAME_AR}</span> الخاص بك.
              هذا يعني أنه يمكنك الآن الوصول بالكامل إلى جميع ميزات تطبيقنا والاستفادة من كل ما يقدمه.
            </span>

            <br />
            <br />

            <span>
              شكرًا لك على الوقت الذي أمضيته في التحقق من عنوان بريدك الإلكتروني.
              أمانك وخصوصيّتك أمران مهمان بالنسبة لنا، وتساعد هذه الخطوة الإضافيّة في ضمان بقاء حسابك آمنًا.
            </span>

            <br />
            <br />

            <span>
              إذا كانت لديك أيّ أسئلة أو مخاوف بشأن حسابك، فالرجاء عدم التردد في الإتصال بنا على
              <a href="mailto:${SUPPORT_EMAIL}" target="_blank">بريد فريق الدعم.</a>
              نحن دائمًا هنا لمساعدتك.
            </span>

            <br />
            <br />

            <span>
              شكرًا لك مرةًأخرى على اختيار <span style="font-weight: 700;">${APP_NAME_AR}</span>.
              يسعدنا إنضمامك إلينا كجزء من مجتمعنا ونتطلع إلى مساعدتك في الوصول إلى أهدافك.
            </span>

            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 500; text-align: right; color: #000;">
              أطيب التحيّات،
            </span>
            
            <br />

            <span style="font-size: 15px; font-weight: 700; text-align: right; color: #000;">
              فريق عمل ${APP_NAME_AR}
            </span>
          </div>
        `,
      },
      greeting: {
        en: "Dear",
        ar: "عزيزي",
      },
    },
  },

  forgotPassword: {
    subject: {
      en: `Account password reset request for ${APP_NAME_EN}`,
      ar: `طلب إعادة تعيين كلمة مرور حسابك لدى ${APP_NAME_AR}`,
    },
    emailBody: {
      title: {
        en: (name, passwordCode) => `
          <div style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: left; color: #000;">
            <span>Hello <span style="font-weight: 700;">${name}</span>,</span>

            <br />
            <br />

            <span>
              We are sorry to hear that you have forgotten your password. No worries,
              we are here to help! To reset your password, we need to verify your identity.
            </span>

            <br />
            <br />
            
            <span style="font-weight: 700;">
              Please use the following verification code to complete the password reset process:
            </span>

            <br />
            <br />
            
            <span style="font-weight: 700; font-size: 18px; color: #F0D810;">
              ${passwordCode}
            </span>

            <br />
            <br />
            
            <span>
              Please enter this code on our website or mobile app where prompted. This code will only
              be valid for a limited time for security purposes. Once you enter the verification
              code, you will be prompted to create a new password.
            </span>

            <br />
            <br />
            
            <span>
              If you didn't request a password reset, please ignore this email. However,
              if you believe your account has been compromised, please contact our
              <a href="mailto:${SUPPORT_EMAIL}" target="_blank">support team</a>
              immediately.
            </span>

            <br />
            <br />
            
            <span>Thank you for using our service.</span>

            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 400; text-align: left; color: #000;">
              Best regards,
            </span>
            
            <br />

            <span style="font-size: 15px; font-weight: 700; text-align: left; color: #000;">
              ${APP_NAME_EN} Team
            </span>
          </div>
        `,

        ar: (name, passwordCode) => `
          <div dir="rtl" style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: right; color: #000;">
            <span>مرحبًا بك <span style="font-weight: 700;">${name}</span>،</span>

            <br />
            <br />

            <span>
              نأسف لسماع أنك نسيت كلمة المرور الخاصة بك. لا تقلق، نحن هنا للمساعدة!
              لإعادة تعيين كلمة المرور الخاصة بك، نحتاج إلى التحقق من هويتك.
            </span>

            <br />
            <br />
            
            <span style="font-weight: 700;">
              الرجاء إستخدام رمز التحقق التالي لإكمال عمليّة إعادة تعيين كلمة المرور:
            </span>

            <br />
            <br />
            
            <span style="font-weight: 700; font-size: 18px; color: #F0D810;">
              ${passwordCode}
            </span>

            <br />
            <br />
            
            <span>
              يُرجى إدخال هذا الرمز على موقعنا الإلكتروني أو التطبيق 
              عند المطالبة بذلك، سيكون هذا الرمز صالحًا فقط لفترة محدودة
              لأغراض أمنيّة، بمجرد إدخال رمز التحقق، سيُطلب منك إنشاء كلمة مرور جديدة.
            </span>

            <br />
            <br />
            
            <span>
              إذا لم تطلب إعادة تعيين كلمة المرور، فيرجى تجاهل هذا البريد الإلكتروني. ومع ذلك،
              إذا كنت تعتقد أنه تم إختراق حسابك، فيرجى الإتصال
              <a href="mailto:${SUPPORT_EMAIL}" target="_blank">بفريق الدعم</a> على الفور.
            </span>

            <br />
            <br />
            
            <span>
              شكرًا لك على مواصلة إستخدامك <span style="font-weight: 700;">${APP_NAME_AR}</span>!
            </span>

            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 500; text-align: right; color: #000;">
              أطيب التحيّات،
            </span>
            
            <br />

            <span style="font-size: 15px; font-weight: 700; text-align: right; color: #000;">
              فريق عمل ${APP_NAME_AR}
            </span>
          </div>
        `,
      },
      greeting: {
        en: "Dear",
        ar: "عزيزي",
      },
    },
  },

  changeEmail: {
    subject: {
      en: `Verify your new email address for ${APP_NAME_EN}`,
      ar: `تغيير بريدك الإلكتروني لدى ${APP_NAME_AR}`,
    },
    emailBody: {
      title: {
        en: (name, emailCode) => `
          <div style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: left; color: #000;">
            <span>Hello <span style="font-weight: 700;">${name}</span>,</span>

            <br />
            <br />
            
            <span>
              We have received your request to change the email address associated with your account with us,
              and we would like to inform you that you must verify the new email to ensure the security and
              privacy of your <span style="font-weight: 700;">${APP_NAME_EN}</span> account!
            </span>

            <br />
            <br />

            <span style="font-weight: 700;">
              To verify this change, please use the following verification code:
            </span>

            <br />
            <br />
            
            <span style="font-weight: 700; font-size: 18px; color: #F0D810;">${emailCode}</span>

            <br />
            <br />
            
            <span>
              Please enter this code on the verification page to confirm your new
              email address. If you didn't request this change, please contact our
              <a href="mailto:${SUPPORT_EMAIL}" target="_blank">support team</a>
              immediately as your account security may be at risk.
            </span>

            <br />
            <br />
            
            <span>
              Thank you for using <span style="font-weight: 700;">${APP_NAME_EN}</span>!
            </span>

            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 400; text-align: left; color: #000;">
              Best regards,
            </span>
            
            <br />

            <span style="font-size: 15px; font-weight: 700; text-align: left; color: #000;">
              ${APP_NAME_EN} Team
            </span>
          </div>
        `,

        ar: (name, emailCode) => `
          <div dir="rtl" style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: right; color: #000;">
            <span>مرحبًا بك <span style="font-weight: 700;">${name}</span>،</span>

            <br />
            <br />
            
            <span>
              لقد تلقينا طلبك لتغيير عنوان البريد الإلكتروني المرتبط بحسابك لدينا،
              ونود إعلامك أنه يجب عليك تفعيل البريد الإلكتروني الجديد حتى نضمن لك أمان
              وخصوصيّة حسابك لدى <span style="font-weight: 700;">${APP_NAME_AR}</span>!
            </span>

            <br />
            <br />
              
            <span style="font-weight: 700;">
              لإكمال هذه العمليّة، يرجى إستخدام رمز التحقق التالي:
            </span>

            <br />
            <br />
            
            <span style="font-weight: 700; font-size: 18px; color: #F0D810;">
              ${emailCode}
            </span>

            <br />
            <br />
            
            <span>
              الرجاء إدخال هذا الرمز في صفحة التحقق لتأكيد عنوان بريدك الإلكتروني الجديد،
              إذا لم تطلب هذا التغيير، فيرجى الإتصال <a href="mailto:${SUPPORT_EMAIL}" target="_blank">بفريق الدعم</a>
              على الفور حيث قد يكون أمان حسابك في خطر.
            </span>

            <br />
            <br />
            
            <span>
             شكرًا لمواصلة إستخدامك <span style="font-weight: 700;">${APP_NAME_AR}</span>!
            </span>

            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 500; text-align: right; color: #000;">
              أطيب التحيّات،
            </span>
            
            <br />

            <span style="font-size: 15px; font-weight: 700; text-align: right; color: #000;">
              فريق عمل ${APP_NAME_AR}
            </span>
          </div>
        `,
      },
      greeting: {
        en: "Dear",
        ar: "عزيزي",
      },
    },
  },

  deleteAccount: {
    subject: {
      en: `Account deletion confirmation for ${APP_NAME_EN}`,
      ar: `تأكيد حذف الحساب لدى ${APP_NAME_AR}`,
    },
    emailBody: {
      title: {
        en: (name, deletionLink) => `
          <div style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: left; color: #000;">
            <span>Hello <span style="font-weight: 700;">${name}</span>,</span>

            <br />
            <br />
            
            <span>
              We are sorry to hear that you would like to delete your account with us. We understand that
              this decision may have been difficult for you, and we want to make the process as easy as possible.
            </span>

            <br />
            <br />

            <span>
              Please note that deleting your account is an irreversible action, and once completed, your
              data will be permanently removed from our system. If you change your mind and would like
              to use our services again, you will need to log in to your account again.
            </span>

            <br />
            <br />

            <span>
              If you didn't request this action, please contact us immediately at
              <a href="mailto:${SUPPORT_EMAIL}" target="_blank">our support email</a>
              so we can investigate further.
            </span>

            <br />
            <br />

            <span>
              To confirm your account deletion request, please click on the following link:
              <a href="${deletionLink}" target="_blank">Click here to confirm deletion.</a>
            </span>

            <br />
            <br />

            <span>
              Once you have confirmed your request, your account will be deleted within the
              next few minutes. If you don't want to proceed with the account deletion, please
              don't click on the link.
            </span>

            <br />
            <br />

            <span>
              If you have any concerns or questions regarding the account deletion process, please
              let us know by responding to this email. We value your feedback and would appreciate
              hearing from you.
            </span>

            <br />
            <br />

            <span>
              Thank you for choosing our application, and we hope that you will consider using our services
              in the future.
            </span>
            
            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 400; text-align: left; color: #000;">
              Best regards,
            </span>
            
            <br />
            
            <span style="font-size: 15px; font-weight: 700; text-align: left; color: #000;">
              ${APP_NAME_EN} Team
            </span>
          </div>
        `,

        ar: (name, deletionLink) => `
          <div dir="rtl" style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: right; color: #000;">
            <span>مرحبًا بك <span style="font-weight: 700;">${name}</span>،</span>

            <br />
            <br />
            
            <span>
              نأسف لسماع أنك ترغب في حذف حسابك لدينا. نحن نتفهّم أن هذا القرار ربما كان صعبًا بالنسبة لك
             ،ونريد أن نجعل العمليّة سهلة قدر الإمكان.
            </span>

            <br />
            <br />

            <span>
              يرجى ملاحظة أن حذف حسابك هو إجراء لا رجوع فيه، وبمجرد الإنتهاء،
              ستتم إزالة بياناتك نهائيًا من نظامنا.إذا غيرت رأيّك وترغب في
              إستخدام خدماتنا مرةًأخرى، فستحتاج إلى تسجيل الدخول مرةً أخرى.
            </span>

            <br />
            <br />

            <span>
              إذا لم تطلب هذا الإجراء، فيرجى الإتصال
              <a href="mailto:${SUPPORT_EMAIL}" target="_blank">بفريق الدعم</a>
              على الفور حتى نتمكن من إجراء مزيد من التحقيق.
            </span>

            <br />
            <br />

            <span>
              لتأكيد طلب حذف حسابك، يرجى النقر على الرابط التالي:
              <a href="${deletionLink}" target="_blank" style="font-weight: 700">إضغط هنا لتأكيد الحذف</a>
            </span>

            <br />
            <br />

            <span>
              بمجرد تأكيد طلبك، سيتم حذف حسابك خلال الدقائق القليلة القادمة.
              إذا كنت لا تريد متابعة حذف الحساب، فالرجاء عدم النقر على الرابط.
            </span>

            <br />
            <br />

            <span>
              إذا كانت لديك أيّ مخاوف أو أسئلة بخصوص عمليّة حذف الحساب،
              فيرجى إخبارنا من خلال الرد على هذا البريد الإلكتروني.
              نحن نقدّر ملاحظاتك ونقدّر أن نسمع منك.
            </span>

            <br />
            <br />

            <span>
              شكرًا لإختيارك تطبيقنا، ونأمل أن تفكر في إستخدام خدماتنا في المستقبل.
            </span>
            
            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 500; text-align: right; color: #000;">
              أطيب التحيّات،
            </span>
            
            <br />

            <span style="font-size: 15px; font-weight: 700; text-align: right; color: #000;">
              فريق عمل ${APP_NAME_AR}
            </span>
          </div>
        `,
      },
      greeting: {
        en: "Dear",
        ar: "عزيزي",
      },
    },
  },

  accountDeleted: {
    subject: {
      en: `Your account has been deleted successfully for ${APP_NAME_EN}`,
      ar: `تم حذف حسابك بنجاح لدى ${APP_NAME_AR}`,
    },
    emailBody: {
      title: {
        en: (name) => `
          <div style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: left; color: #000;">
            <span>Hello <span style="font-weight: 700;">${name}</span>,</span>

            <br />
            <br />
            
            <span>
              We are sorry to see you go, but we confirm that your account has been
              successfully deleted from <span style="font-weight: 700;">${APP_NAME_EN}</span>.
              We appreciate the time you spent with us and would like to thank you for
              choosing our platform for your needs.
            </span>
            
            <br />
            <br />
            
            <span>
              We hope that you found our platform useful and that we met your expectations.
              Your feedback is important to us, and we would be grateful if you could take
              a moment to share your thoughts on your experience with <span style="font-weight: 700;">${APP_NAME_EN}</span>.
              Your feedback will help us improve our services for our users in the future.
            </span>
            
            <br />
            <br />
            
            <span>
              If you ever decide to come back, we will be more than happy to welcome you again.
              In the meantime, we wish you all the best and hope to stay in touch with you.
            </span>
            
            <br />
            <br />
            
            <span>
              Thank you for choosing <span style="font-weight: 700;">${APP_NAME_EN}.</span>
            </span>
            
            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 400; text-align: left; color: #000;">
              Best regards,
            </span>
            
            <br />
            
            <span style="font-size: 15px; font-weight: 700; text-align: left; color: #000;">
              ${APP_NAME_EN} Team
            </span>
          </div>
        `,

        ar: (name) => `
          <div dir="rtl" style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: right; color: #000;">
            <span>مرحبًا بك <span style="font-weight: 700;">${name}</span>،</span>

            <br />
            <br />
            
            <span>
              نأسف لمغادرتك، لكننا نؤكد أنه تم حذف حسابك بنجاح، ونحن نقدّر الوقت
              الذي قضيته معنا ونود أن نشكرك على إختيارك لمنصتنا لتلبية احتياجاتك.
            </span>
            
            <br />
            <br />
            
            <span>
              نأمل أن تكون قد وجدت منصتنا مفيدة وأن نكون قد حققنا توقعاتك، ملاحظاتك مهمة بالنسبة لنا،
              وسنكون ممتنين لو إستطعت تخصيص بعض الوقت لمشاركة أفكارك حول تجربتك مع تطبيقنا، ستساعدنا
              ملاحظاتك في تحسين خدماتنا لمستخدمينا في المستقبل.
            </span>
            
            <br />
            <br />
            
            <span>
              إذا قرّرت العودة، سنكون أكثر من سعداء للترحيب بك مرةًأخرى، وفي غضون ذلك،
              نتمنى لك كل التوفيق ونأمل أن نبقى على إتصال بك.
            </span>
            
            <br />
            <br />
            
            <span>
              شكرًا لإختيارك <span style="font-weight: 700;">${APP_NAME_AR}</span>!
            </span>
            
            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 500; text-align: right; color: #000;">
              أطيب التحيّات،
            </span>
            
            <br />

            <span style="font-size: 15px; font-weight: 700; text-align: right; color: #000;">
              فريق عمل ${APP_NAME_AR}
            </span>
          </div>
        `,
      },
      greeting: {
        en: "Dear",
        ar: "عزيزي",
      },
    },
  },

  changePassword: {
    subject: {
      en: `Your password has been changed successfully for ${APP_NAME_EN}`,
      ar: `تم تغيير كلمة مرورك بنجاح لدى ${APP_NAME_AR}`,
    },
    emailBody: {
      title: {
        en: (name) => `
          <div style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: left; color: #000;">
            <span>Hello <span style="font-weight: 700;">${name}</span>,</span>

            <br />
            <br />
            
            <span>
              We are writing to confirm that your password has been successfully changed for your
              account on <span style="font-weight: 700;">${APP_NAME_EN}</span>. Your account security
              is important to us, and we recommend that you change your password regularly to
              maintain your security.
            </span>

            <br />
            <br />

            <span>
              If you did not make this change or suspect any unauthorized activity on your account,
              please contact our <a href="mailto:${SUPPORT_EMAIL}" target="_blank">support team</a>
              immediately. We take the security of our users' accounts very seriously, and we will
              investigate any suspicious activity.
            </span>

            <br />
            <br />

            <span>
              If you have any questions or concerns regarding your account or our platform, please don't
              hesitate to reach out to our <a href="mailto:${SUPPORT_EMAIL}" target="_blank">support team.</a>
            </span>

            <br />
            <br />

            <span>
              Thank you for choosing <span style="font-weight: 700;">${APP_NAME_EN}</span>. We hope that you
              continue to enjoy our services and that we meet your expectations.
            </span>
            
            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 400; text-align: left; color: #000;">
              Best regards,
            </span>
            
            <br />
            
            <span style="font-size: 15px; font-weight: 700; text-align: left; color: #000;">
              ${APP_NAME_EN} Team
            </span>
          </div>
        `,

        ar: (name) => `
          <div dir="rtl" style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: right; color: #000;">
            <span>مرحبًا بك <span style="font-weight: 700;">${name}</span>،</span>

            <br />
            <br />
            
            <span>
              نكتب إليك للتأكيد على أنه تم تغيير كلمة
              المرور الخاصة بك بنجاح لحسابك لدينا، أمان حسابك مهم بالنسبة لنا،
              ونحن نوصّي بتغيير كلمة المرور الخاصة بك بإنتظام للحفاظ على أمانك.
            </span>

            <br />
            <br />

            <span>
              إذا لم تقم بإجراء هذا التغيير أو تشك في أيّ نشاط غير مصرّح
              به على حسابك، فيرجى الإتصال <a href="mailto:${SUPPORT_EMAIL}" target="_blank">بفريق الدعم</a>
              على الفور، نحن نتعامل مع أمان حسابات المستخدمين بمنتهى الجديّة، وسوف نحقق في أيّ نشاط مشبوه.
            </span>

            <br />
            <br />

            <span>
              إذا كانت لديك أيّ أسئلة أو مخاوف بشأن حسابك أو نظامنا
              الأساسي، فيرجى عدم التردد في التواصل مع فريق الدعم لدينا.
            </span>

            <br />
            <br />

            <span>
              شكرًا لإختيارك <span style="font-weight: 700;">${APP_NAME_AR}</span>!
              نأمل أن تستمر في الإستمتاع بخدماتنا وأننا نلبي توقعاتك
            </span>
            
            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 500; text-align: right; color: #000;">
              أطيب التحيّات،
            </span>
            
            <br />

            <span style="font-size: 15px; font-weight: 700; text-align: right; color: #000;">
              فريق عمل ${APP_NAME_AR}
            </span>
        </div>
        `,
      },
      greeting: {
        en: "Dear",
        ar: "عزيزي",
      },
    },
  },

  loginActivity: {
    subject: {
      en: `Security Alert: Recent login activity detected on your account for ${APP_NAME_EN}`,
      ar: `تنبيه أمان: تم إكتشاف نشاط تسجيل الدخول الأخير على حسابك لدى ${APP_NAME_AR}`,
    },
    emailBody: {
      title: {
        en: (name, os) => `
          <div style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: left; color: #000;">
            <span>Hello <span style="font-weight: 700;">${name}</span>,</span>

            <br />
            <br />
            
            <span>
              We are writing to inform you of recent login activity on your account
              that we believe you should be aware of. Our system has detected that
              someone has logged in to your account from
              <span style="font-weight: 700;">${os || "Unknown"} device</span>
              at <span id="time" style="font-weight: 700;">${new Date().toDateString()} ${new Date().toLocaleTimeString()}</span>.
            </span>

            <br />
            <br />

            <span>
              As a security precaution, we recommend that you review your recent account
              activity to ensure that all of the logins were made by you. If you don't
              recognize any of the activity, please take immediate action to secure your account.
            </span>

            <br />
            <br />

            <span style="font-weight: 700;">
              Here are some steps that you can take to help protect your account:
            </span>

            <ol>
              <li>
                <span style="font-weight: 700;">Change your password:</span> We recommend that you change your password immediately. Choose a strong and unique password, and don't reuse passwords that you have used for other accounts.
              </li>

              <li>
                <span style="font-weight: 700;">Enable two-factor authentication:</span> Two-factor authentication adds an extra layer of security to your account, and can help prevent unauthorized access.
              </li>

              <li>
                <span style="font-weight: 700;">Review your account activity:</span> Take some time to review your account activity to ensure that all of the logins were made by you.
              </li>
            </ol>

            <br />
            <br />

            <span>
              If you have any concerns or questions about this activity, please don't hesitate to contact us.
              We take the security of your account very seriously, and we will do everything we can to help you
              protect it.
            </span>
            
            <br />
            <br />

            <span>Thank you for your attention to this matter.</span>
            
            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 400; text-align: left; color: #000;">
              Best regards,
            </span>
            
            <br />
            
            <span style="font-size: 15px; font-weight: 700; text-align: left; color: #000;">
              ${APP_NAME_EN} Team
            </span>
          </div>
        `,

        ar: (name, os) => `
          <div dir="rtl" style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: right; color: #000;">
            <span>مرحبًا بك <span style="font-weight: 700;">${name}</span>،</span>

            <br />
            <br />
            
            <span>
              نكتب إليك لإبلاغك بنشاط تسجيل الدخول الأخير على حسابك الذي نعتقد أنه يجب أن تكون على علم به، إكتشف نظامنا أن شخصًا ما قام بتسجيل الدخول إلى حسابك من 
              <span style="font-weight: 700;">جهاز ${os || "غير معروف"}</span>
              بتاريخ <span id="time" style="font-weight: 700;">${new Date().toDateString()} ${new Date().toLocaleTimeString()}</span>.
            </span>

            <br />
            <br />

            <span>
              كإجراء أمني وقائي، نوصّيك بمراجعة نشاط حسابك الأخير للتأكد من أن جميع عمليّات تسجيل الدخول قد تمت بواسطتك، إذا لم تتعرف على أيّ نشاط، فيرجى إتخاذ إجراء فوري لتأمين حسابك.
            </span>

            <br />
            <br />

            <span style="font-weight: 700;">
              فيما يلي بعض الخطوات التي يمكنك إتخاذها للمساعدة في حماية حسابك:
            </span>

            <ol dir="rtl" style="list-style: arabic-indic;">
              <li>
                <span style="font-weight: 700;">غيّر كلمة المرور الخاصة بك:</span> نوصّي بتغيير كلمة المرور الخاصة بك على الفور، إختر كلمة مرور قويّة وفريدة من نوعها، ولا تعيد إستخدام كلمات المرور التي إستخدمتها لحسابات أخرى.
              </li>

              <li>
                <span style="font-weight: 700;">قم بتفعيل المصادقة الثنائيّة:</span> تضيف المصادقة الثنائيّة طبقة إضافيّة من الأمان إلى حسابك ويمكن أن تساعد في منع الوصول غير المصرّح به.
              </li>

              <li>
                <span style="font-weight: 700;">مراجعة نشاط حسابك:</span> خذ بعض الوقت لمراجعة نشاط حسابك للتأكد من أن جميع عمليّات تسجيل الدخول تمت بواسطتك.
              </li>
            </ol>

            <br />
            <br />

            <span>
              إذا كانت لديك أيّ مخاوف أو أسئلة حول هذا النشاط، فالرجاء عدم التردد في الإتصال بنا، نحن نتعامل مع أمان حسابك بجديّة بالغة، وسنبذل قصارى جهدنا لمساعدتك على حمايته.
            </span>
            
            <br />
            <br />

            <span>شكرًا لك على إهتمامك بهذا الأمر.</span>
            
            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 500; text-align: right; color: #000;">
              أطيب التحيّات،
            </span>
            
            <br />

            <span style="font-size: 15px; font-weight: 700; text-align: right; color: #000;">
              فريق عمل ${APP_NAME_AR}
            </span>
        </div>
        `,
      },
      greeting: {
        en: "Dear",
        ar: "عزيزي",
      },
    },
  },

  welcomeBack: {
    subject: {
      en: `Welcome back to ${APP_NAME_EN}`,
      ar: `أهلاً بك من جديد في ${APP_NAME_AR}`,
    },
    emailBody: {
      title: {
        en: (name) => `
          <div style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: left; color: #000;">
            <span>Hello <span style="font-weight: 700;">${name}</span>,</span>

            <br />
            <br />
            
            <span>
              We are excited to see that you have decided to give
              <span style="font-weight: 700;">${APP_NAME_EN}</span>
              another chance! We understand that you recently deleted your account,
              but we are happy to welcome you back to our platform.
            </span>

            <br />
            <br />

            <span>
              We know that sometimes things don't go as planned, and we want you to know
              that we are here to support you. We are constantly working to improve our
              application and provide the best possible experience for our users. We hope
              that you will find the changes we've made to be positive and useful for you.
            </span>

            <br />
            <br />

            <span>
              As a valued user of <span style="font-weight: 700;">${APP_NAME_EN}</span>,
              we want to make sure that you have the best experience possible. If you have
              any questions or feedback, please don't hesitate to reach out to our
              <a href="mailto:${SUPPORT_EMAIL}" target="_blank">support team.</a>
              We are always here to help and are committed to providing you with the best possible
              service.
            </span>

            <br />
            <br />

            <span>
              Thank you for giving us another chance. We are grateful to have you back as
              a member of our community.
            </span>
            
            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 400; text-align: left; color: #000;">
              Best regards,
            </span>
            
            <br />
            
            <span style="font-size: 15px; font-weight: 700; text-align: left; color: #000;">
              ${APP_NAME_EN} Team
            </span>
          </div>
        `,

        ar: (name) => `
          <div dir="rtl" style="margin: 0; padding: 0; font-size: 15px; font-weight: 400; text-align: right; color: #000;">
            <span>مرحبًا بك <span style="font-weight: 700;">${name}</span>،</span>

            <br />
            <br />
            
            <span>
              يسعدنا أنك قرّرت منح 
              <span style="font-weight: 700;">${APP_NAME_AR}</span>
              فرصةً أخرى! نحن نتفهّم أنك حذفت حسابك مؤخرًا،
              ولكن يسعدنا أن نرحب بك مرةً أخرى في منصتنا.
            </span>

            <br />
            <br />

            <span>
              نحن نعلم أنه في بعض الأحيان لا تسير الأمور كما هو مخطط لها
             ،ونريدك أن تعرف أننا هنا لدعمك. نحن نعمل بإستمرار على تحسين تطبيقنا
              وتقديم أفضل تجربة ممكنة لمستخدمينا. نأمل أن تجد التغييرات التي
              أجريناها إيجابيّة ومفيدة لك.
            </span>

            <br />
            <br />

            <span>
              بصفتك مستخدمًا مهمًا لدى 
              <span style="font-weight: 700;">${APP_NAME_AR}</span>
             ،نريد التأكد من حصولك على أفضل تجربة ممكنة.
              إذا كانت لديك أيّ أسئلة أو تعليقات، يُرجى عدم التردد في التواصل مع
              <a href="mailto:${SUPPORT_EMAIL}" target="_blank">فريق الدعم.</a>
              نحن دائمًا هنا للمساعدة وملتزمون بتزويدك بأفضل خدمة ممكنة.
            </span>

            <br />
            <br />

            <span>
              شكرًا لك لمنحنا فرصةً أخرى. نحن ممتنون لعودتك كعضو في مجتمعنا.
            </span>
            
            <br />
            <br />
            
            <span style="font-size: 15px; font-weight: 500; text-align: right; color: #000;">
              أطيب التحيّات،
            </span>
            
            <br />

            <span style="font-size: 15px; font-weight: 700; text-align: right; color: #000;">
              فريق عمل ${APP_NAME_AR}
            </span>
        </div>
        `,
      },
      greeting: {
        en: "Dear",
        ar: "عزيزي",
      },
    },
  },
};

module.exports.getMessage = (lang, email, html, subject) => ({
  from: lang === "en" ? APP_NAME_EN : APP_NAME_AR,
  to: email,
  html,
  subject,
});
