const pool = require("../db/db");

const findAllTransactionsByUser = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions WHERE user_id = $1",
      [userId]
    );

    return result.rows;
  } catch (error) {
    console.error(error);
  }
};

module.exports = { findAllTransactionsByUser };
