const bcrypt = require("bcrypt");

const usersRepository = require("../repositories/users.repository");

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

  userData.balance = 50000;
  user = await usersRepository.createUser(newUser);
  return user;
};

const login = async (userData) => {
  const user = await usersRepository.findUserByEmail(userData.email);

  if (user.rows.length === 0) {
    throw new Error("user does not exist");
  }

  const isValid = await bcrypt.compare(
    userData.password,
    user.rows[0].password
  );

  return isValid;
};

const addUserBalance = async (id, amount) => {
  const user = await usersRepository.findUserById(id);

  const newBalance = amount + parseInt(user.balance);

  return usersRepository.addUserBalance(id, newBalance);
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  addUserBalance,
  login,
};
