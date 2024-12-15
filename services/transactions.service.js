const transactionsRepository = require("../repositories/transactions.repository");

const findAllTransactionsByUser = async (userId) => {
  return transactionsRepository.findAllTransactionsByUser(userId);
};

module.exports = { findAllTransactionsByUser };
