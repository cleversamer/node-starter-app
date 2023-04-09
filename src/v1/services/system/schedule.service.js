const defualtCallback = () => {};

module.exports.scheduleDailyEvent = (callback = defualtCallback) => {
  try {
    // setInterval(callback, 1000 * 60 * 60 * 24);
    setInterval(callback, 1000 * 5);
  } catch (err) {
    return;
  }
};
