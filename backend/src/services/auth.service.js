const Auth = require("../schemas/auth.schema");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const hashPassword = (password) => {
  password = bcrypt.hashSync(password, 8);
  return password;
};

const validatePassword = (password, hashPassword) => {
  const verify = bcrypt.compareSync(password, hashPassword);
  return verify;
};

const generateBearerToken = async (user) => {
  const token = jwt.sign(
    {
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
  );

  await new Auth({
    token: token,
    user: {
      id: user._id,
      name: user.name,
      username: user.username,
      role: user.role,
    },
    tokenType: "BEARER",
    lastAccess: new Date(),
  }).save();

  return token;
};

module.exports = {
  hashPassword,
  validatePassword,
  generateBearerToken,
};
