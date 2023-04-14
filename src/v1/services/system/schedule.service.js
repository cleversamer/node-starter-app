const defualtCallback = () => {};

module.exports.scheduleDailyEvent = (callback = defualtCallback) => {
  try {
    const durationInMs = 1000 * 60 * 60 * 24; // 1 Day
    setInterval(callback, durationInMs);
  } catch (err) {
    throw err;
  }
};

module.exports.scheduleHourlyEvent = (callback = defualtCallback) => {
  try {
    const durationInMs = 1000 * 60 * 60; // 1 Hour
    setInterval(callback, durationInMs);
  } catch (err) {
    throw err;
  }
};
