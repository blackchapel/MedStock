const calculateTotalNumberOfUnits = (numberOfStrips, numberOfUnitsPerStrip) => {
  return parseInt(numberOfStrips) * parseInt(numberOfUnitsPerStrip);
};

const calculateStockOverDate = (data) => {
  const startDate = new Date(data.startDate);

  if (data.frequency === "DAILY") {
    return new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() +
        Math.floor(data.totalNumberOfUnits / data.numberOfUnitsPerDay)
    );
  } else if (data.frequency === "ALTERNATE") {
    return new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() +
        Math.floor((data.totalNumberOfUnits * 2) / data.numberOfUnitsPerDay)
    );
  } else if (data.frequency === "WEEKLY") {
    return new Date(
      startDate.getFullYear(),
      startDate.getMonth(),
      startDate.getDate() +
        Math.floor((data.totalNumberOfUnits * 7) / data.numberOfUnitsPerDay)
    );
  }
};

const calculateNotificationDateAndTime = (data) => {
  const stockOverDate = new Date(data.stockOverDate);
  return new Date(
    stockOverDate.getFullYear(),
    stockOverDate.getMonth(),
    stockOverDate.getDate() - data.notificationPeriod,
    9,
    0,
    0
  );
};

module.exports = {
  calculateTotalNumberOfUnits,
  calculateStockOverDate,
  calculateNotificationDateAndTime,
};
