const transactionsService = require("../services/transactions.service");

const findAllTransactionsByUser = async (req, res) => {
  try {
    const { id } = req.user;

    const result = await transactionsService.findAllTransactionsByUser(id);

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = { findAllTransactionsByUser };
