const bcrypt = require("bcrypt");

const usersRepository = require("../repositories/users.repository");
const { generateAccessToken } = require("../utils/auth.util");

const findAllUsers = () => {
  return usersRepository.findAllUsers();
};

const findUserById = (id) => {
  return usersRepository.findUserById(id);
};

const createUser = async (userData) => {
  let user = await usersRepository.findUserByEmail(userData.email);

  if (user.rows.length > 0) {
    throw new Error("user already exist");
  }

  const salt = await bcrypt.genSalt();
  const hashedPassword = await bcrypt.hash(userData.password, salt);

  const newUser = { ...userData, password: hashedPassword };

  newUser.balance = 50000;

  return usersRepository.createUser(newUser);
};

const login = async (userData) => {
  const user = await usersRepository.findUserByEmail(userData.email);

  if (user.rows.length === 0) {
    throw new Error(404);
  }

  const isPasswordMatched = await bcrypt.compare(
    userData.password,
    user.rows[0].password
  );

  if (!isPasswordMatched) {
    throw new Error(401);
  }

  return generateAccessToken({ id: user.rows[0].id, email: userData.email });
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  login,
};
