const socketIo = require("socket.io");
const { Notification } = require("../config/notifications");
const { isValidObjectId } = require("mongoose");

module.exports = (server) => {
  const options = {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  };

  const io = socketIo(server, options);

  io.on("connection", (socket) => {
    socket.on("join", (userId) => {
      try {
        if (!isValidObjectId(userId)) {
          return;
        }

        // Join this user to their own room
        socket.join(userId);
      } catch (err) {}
    });

    socket.on("send notification", (notification) => {
      try {
        // Check if `notification` param is an instance of the
        // the Notification class
        if (!(notification instanceof Notification)) {
          return;
        }

        // Send notification to all connected sockets
        io.emit("notification received", notification);
      } catch (err) {}
    });

    socket.on("send notification to user", (userId, notification) => {
      try {
        // Check if `userId` param is a valid MongoDB ObjectId
        if (!isValidObjectId(userId)) {
          return;
        }

        // Check if `notification` param is an instance of the
        // the Notification class
        if (!(notification instanceof Notification)) {
          return;
        }

        // Send notification to the given user
        socket.to(userId).emit("notification received", notification);
      } catch (err) {}
    });
  });
};
