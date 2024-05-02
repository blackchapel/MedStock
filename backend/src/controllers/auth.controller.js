const User = require("../schemas/user.schema");
const {
  hashPassword,
  generateBearerToken,
  validatePassword,
} = require("../services/auth.service");

const signUp = async (req, res) => {
  try {
    const hashedPassword = hashPassword(req.body.password);

    const newUser = new User({
      name: req.body.name,
      username: req.body.username,
      password: hashedPassword,
      role: "USER",
    });

    await newUser.save();

    const token = await generateBearerToken(newUser);

    res.status(201).json({
      message: "User registered",
      data: {
        user: newUser,
        token,
      },
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const user = await User.findOne({
      email: req.body.username,
    });

    if (!user) {
      res.status(404).json({
        message: "Invalid email or password",
      });
    } else {
      if (!validatePassword(req.body.password, user.password)) {
        res.status(404).json({
          message: "Invalid email or password",
        });
      } else {
        const token = await generateBearerToken(user);

        res.status(200).json({
          message: "Login successful!",
          data: {
            user,
            token,
          },
        });
      }
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({
      message: error.message,
    });
  }
};

module.exports = {
  signUp,
  login,
};
