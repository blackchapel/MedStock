const Inventory = require("../schemas/inventory.schema");
const {
  calculateTotalNumberOfUnits,
  calculateStockOverDate,
  calculateNotificationDateAndTime,
} = require("../services/inventory.service");

const addInventory = async (req, res) => {
  try {
    req.body["totalNumberOfUnits"] = calculateTotalNumberOfUnits(
      req.body.numberOfStrips,
      req.body.numberOfUnitsPerStrip
    );
    req.body["stockOverDate"] = calculateStockOverDate(req.body);
    req.body["notificationDateAndTime"] = calculateNotificationDateAndTime(
      req.body
    );

    const newInventory = new Inventory({
      userId: req.user.id,
      username: req.user.username,
      name: req.body.name,
      numberOfStrips: parseInt(req.body.numberOfStrips),
      numberOfUnitsPerStrip: parseInt(req.body.numberOfUnitsPerStrip),
      totalNumberOfUnits: parseInt(req.body.totalNumberOfUnits),
      frequency: req.body.frequency,
      numberOfUnitsPerDay: parseInt(req.body.numberOfUnitsPerDay),
      startDate: req.body.startDate,
      notificationPeriod: parseInt(req.body.notificationPeriod),
      stockOverDate: req.body.stockOverDate,
      notificationDateAndTime: req.body.notificationDateAndTime,
    });

    await newInventory.save();

    res.status(201).json({
      message: "Inventory created!",
      data: {
        inventory: newInventory,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findById(req.params.id);

    if (inventory) {
      res.status(200).json({
        message: "Inventory found!",
        data: {
          inventory,
        },
      });
    } else {
      res.status(404).json({
        message: "Inventory not found!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const getAllInventory = async (req, res) => {
  try {
    const inventory = await Inventory.find({ userId: req.user.id });

    res.status(200).json({
      message: "Inventory found!",
      data: {
        inventory,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateInventory = async (req, res) => {
  try {
    req.body["totalNumberOfUnits"] = calculateTotalNumberOfUnits(
      req.body.numberOfStrips,
      req.body.numberOfUnitsPerStrip
    );
    req.body["stockOverDate"] = calculateStockOverDate(req.body);
    req.body["notificationDateAndTime"] = calculateNotificationDateAndTime(
      req.body
    );

    const inventory = await Inventory.findByIdAndUpdate(
      req.params.id,
      {
        userId: req.user.id,
        username: req.user.username,
        name: req.body.name,
        numberOfStrips: parseInt(req.body.numberOfStrips),
        numberOfUnitsPerStrip: parseInt(req.body.numberOfUnitsPerStrip),
        totalNumberOfUnits: req.body.totalNumberOfUnits,
        frequency: req.body.frequency,
        numberOfUnitsPerDay: req.body.numberOfUnitsPerDay,
        startDate: req.body.startDate,
        notificationPeriod: req.body.notificationPeriod,
        stockOverDate: req.body.stockOverDate,
        notificationDateAndTime: req.body.notificationDateAndTime,
      },
      { new: true }
    );

    if (inventory) {
      res.status(201).json({
        message: "Inventory updated!",
        data: {
          inventory,
        },
      });
    } else {
      res.status(400).json({
        message: "Something went wrong!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const deleteInventory = async (req, res) => {
  try {
    const inventory = await Inventory.findByIdAndDelete(req.params.id);

    if (inventory) {
      res.status(200).json({
        message: "Inventory deleted!",
      });
    } else {
      res.status(404).json({
        message: "Inventory not found!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  addInventory,
  getInventory,
  getAllInventory,
  updateInventory,
  deleteInventory,
};
