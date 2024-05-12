const axios = require("axios");
const Inventory = require("../schemas/inventory.schema");
const Notification = require("../schemas/notification.schema");

const notification = async () => {
  try {
    const now = new Date();
    const tenMinutesAgo = new Date(
      now.getFullYear(),
      now.getMonth(),
      now.getDate(),
      now.getHours(),
      now.getMinutes() - 10
    );

    const inventory = await Inventory.find({
      notificationDateAndTime: { $gte: tenMinutesAgo, $lte: now },
    });

    if (inventory.length !== 0) {
      for (const iterator of inventory) {
        const newNotification = new Notification({
          userId: iterator.userId,
          title: "Refill Reminder",
          description: `${
            iterator.name
          } is going to get over on ${iterator.stockOverDate.getDate()} ${iterator.stockOverDate.toLocaleDateString(
            "en-us",
            { month: "long" }
          )}!`,
          type: "LOW STOCK",
        });

        await newNotification.save();

        await axios.post(
          `https://ntfy.sh/medstock-${iterator.username}`,
          newNotification.description,
          {
            headers: {
              Title: newNotification.title,
              Tags: "pill",
            },
          }
        );
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = { notification };
