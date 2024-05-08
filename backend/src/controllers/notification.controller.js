const Notification = require("../schemas/notification.schema");

const getAllNotifications = async (req, res) => {
  try {
    const notification = await Notification.find({ userId: req.user.id });

    res.status(200).json({
      message: "Notifications found!",
      data: {
        notification,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  getAllNotifications,
};
