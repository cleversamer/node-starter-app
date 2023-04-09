const { server } = require("../config/system");
const mongoose = require("mongoose");

module.exports = () => {
  const mongoURI = server.DATABASE_URI;

  mongoose.set("strictQuery", false);

  mongoose
    .connect(mongoURI)
    .then((value) => {
      console.log(`Connected to MongoDB Server: ${mongoURI}`);
    })
    .catch((err) => {
      console.log(`Failed to connect to MongoDB Server: ${err.message}`);
    });
};
