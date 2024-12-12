const pool = require("../db/db");

const findAllUsers = async () => {
  try {
    const result = await pool.query("SELECT * FROM users");

    return result.rows;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const findUserById = async (id) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE id = $1", [id]);

    return result.rows[0];
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const findUserByEmail = async (email) => {
  try {
    const result = await pool.query("SELECT * FROM users WHERE email = $1", [
      email,
    ]);

    return result;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const createUser = async (user) => {
  try {
    const { email, name, password, avatar_url, balance } = user;

    const result = await pool.query(
      "INSERT INTO users (email, name, password, avatar_url, balance) VALUES ($1, $2, $3, $4, $5) RETURNING *",
      [email, name, password, avatar_url, balance]
    );
    return result.rows[0];
  } catch (error) {
    throw new Error("Database error occurred while creating the user.");
  }
};

const addUserBalance = async (id, newBalance) => {
  try {
    const result = await pool.query(
      "UPDATE users SET balance = $2 WHERE id = $1 RETURNING *",
      [id, newBalance]
    );

    return result.rows[0];
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  findUserByEmail,
  createUser,
  addUserBalance,
};