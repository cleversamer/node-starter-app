module.exports = class Notificatin {
  constructor(
    titleEN,
    titleAR,
    bodyEN,
    bodyAR,
    photoURL = "",
    screen = "home",
    id = ""
  ) {
    this.title = { en: titleEN || titleAR, ar: titleAR || titleEN };
    this.body = { en: bodyEN || bodyAR, ar: bodyAR || bodyEN };
    this.photoURL = photoURL;
    this.seen = false;
    this.date = new Date().toISOString();
    this.data = {
      screen: screen || "home",
      id: id || "",
    };
  }
};
