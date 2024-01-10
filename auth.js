const jwt = require("jsonwebtoken");
const jwtSecretKey = "yourSecretKey";
const bcrypt = require("bcrypt");

const generateToken = (employee) => {
  const token = jwt.sign({ emp_id: employee.emp_id }, jwtSecretKey, {
    expiresIn: "2h",
  });
  return token;
};

const hashPassword = async (plainPassword) => {
  try {
    const hashedPassword = await bcrypt.hash(plainPassword, 10);
    console.log("Hashed Password:", hashedPassword);
    return hashedPassword;
  } catch (error) {
    console.error("Error during hashing:", error);
  }
};

const comparePasswords = async (plainPassword, hashedPassword) => {
  try {
    const isMatch = await bcrypt.compare(plainPassword, hashedPassword);
    console.log("Password Match:", isMatch);
    return isMatch;
  } catch (error) {
    console.error("Error during comparison:", error);
  }
};

module.exports = {
  generateToken,
  comparePasswords,
  hashPassword,
};