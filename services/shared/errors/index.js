"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UNAUTHORIZED = exports.SERVER_ERR = exports.INVALID_CREDENTIALS = exports.INVALID_TOKEN = exports.USER_NO_EXISTS = exports.NOTMATCH_PASS = exports.EMAIL_EXISTS = exports.INVALID_PASS = exports.NO_USER_EMAIL = exports.TITLE_EXISTS = exports.PERMISSION = exports.INVALID_ID = void 0;
exports.INVALID_ID = {
  en: {
    title: "INVALID",
    sentence: "Sorry, We cant't find anything",
  },
  ar: {
    title: "INVALID",
    sentence: "عذرا, لم نتمكن من العثور على أي شيئ",
  },
};
exports.PERMISSION = {
  en: {
    field: "Permission",
    msg: "You cannot update what you don't own...",
  },
  ar: {
    field: "Permission",
    msg: "لا تستطيع تحديث ما لا تملك ...",
  },
};
exports.TITLE_EXISTS = {
  en: { field: "Title", msg: "Title Already Exists" },
  ar: { field: "الاسم", msg: "سبق استعمال هذا الاسم" },
};
exports.NO_USER_EMAIL = {
  en: {
    field: "email",
    msg: "There is no user who has this email",
  },
  ar: {
    field: "البريد الالكتروني",
    msg: "لا يوجد أس مستعمل لديه هذا البريد الالكتروني",
  },
};
exports.INVALID_PASS = {
  en: { msg: "Invalid password", field: "password" },
  ar: { msg: "كلمة سر خاطئة", field: "password" },
};
exports.EMAIL_EXISTS = {
  en: { msg: "Email already exists", field: "email" },
  ar: { msg: "تم استعمال هذا البريد من قبل", field: "email" },
};
exports.NOTMATCH_PASS = {
  en: {
    msg: "Passwords not mathched",
    field: "password",
  },
  ar: {
    msg: "كلمتي السر غير متطابقتين",
    field: "password",
  },
};
exports.USER_NO_EXISTS = {
  en: {
    title: "Change password",
    sentence: "user no longer exist",
  },
  ar: {
    title: "تغيير كلمة السر",
    sentence: "لم يعد هذا المستعمل موجودا",
  },
};
exports.INVALID_TOKEN = {
  en: {
    title: "token",
    sentence: "invalid token , retry from the first step",
  },
  ar: {
    title: "الرمز",
    sentence: " أعد المحاولة من الخطوة الأولى , رمز غير صالح للاستعمال",
  },
};
exports.INVALID_CREDENTIALS = {
  en: {
    title: "Invalid Credentials",
    sentence: "Sory you don't have valid Credentials",
  },
  ar: {
    title: "رخصة مرفوضة",
    sentence: "نعتذر ليس لديك رخصة صالحة",
  },
};
exports.SERVER_ERR = {
  en: {
    title: "server error",
    sentence: "the problem will be solved soon , retry or reload the page",
  },
  ar: {
    title: "مشكل في السيرفر",
    sentence:
      "سنعمل على حل المشكلة في أقرب وقت  , أعد المحاولة أو تحميل الصفحة",
  },
};
exports.UNAUTHORIZED = {
  en: {
    sentence: "Unauthorized access",
    title: "UNAUTHORIZED",
  },
  ar: {
    sentence: "عملية مرفوضة",
    title: "UNAUTHORIZED",
  },
};
//# sourceMappingURL=index.js.map
