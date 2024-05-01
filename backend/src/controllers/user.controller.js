const User = require("../schemas/user.schema");

const getUser = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);

    if (user) {
      res.status(200).json({
        message: "User found!",
        data: {
          user,
        },
      });
    } else {
      res.status(404).json({
        message: "User not found!",
      });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const updateUser = async (req, res) => {
  try {
    const user = await User.findByIdAndUpdate(req.user.id, req.body, {
      new: true,
    });

    if (user) {
      res.status(201).json({
        message: "User updated!",
        data: {
          user,
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

const deleteUser = async (req, res) => {
  try {
    const user = await User.findOneAndDelete(req.user.id);

    if (user) {
      res.status(200).json({
        message: "User deleted!",
      });
    } else {
      res.status(404).json({
        message: "User not found!",
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
  getUser,
  updateUser,
  deleteUser,
};
