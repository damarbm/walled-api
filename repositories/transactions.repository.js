const pool = require("../db/db");

const findAllTransactionsByUser = async (userId) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions WHERE sender_id = $1 OR recipient_id = $1 ORDER BY date DESC",
      [userId]
    );

    return result.rows;
  } catch (error) {
    console.error(error);
  }
};

const topUp = async (id, amount, desc) => {
  try {
    await pool.query(
      "UPDATE users SET balance = balance + $2 WHERE id = $1 RETURNING *",
      [id, amount]
    );

    const result = await pool.query(
      `INSERT INTO transactions (type, description, amount, sender_id) 
       VALUES ($1, $2, $3, $4) 
       RETURNING *`,
      ["TOP UP", desc, amount, id]
    );

    const updatedRow = { ...result.rows[0], amount: amount };

    return updatedRow;
  } catch (error) {
    throw new Error("Something went wrong");
  }
};

const transfer = async (senderId, recipientId, amount, desc) => {
  try {
    await pool.query(
      "UPDATE users SET balance = balance - $1 WHERE id = $2 RETURNING *",
      [amount, senderId]
    );

    await pool.query(
      "UPDATE users SET balance = balance + $1 WHERE id = $2 RETURNING *",
      [amount, recipientId]
    );

    const result = await pool.query(
      `INSERT INTO transactions (type, description, amount, sender_id, recipient_id) 
       VALUES ($1, $2, $3, $4, $5) 
       RETURNING *`,
      ["TRANSFER", desc, amount, senderId, recipientId]
    );

    return result.rows[0];
  } catch (error) {
    console.error(error);
  }
};

module.exports = { findAllTransactionsByUser, topUp, transfer };
