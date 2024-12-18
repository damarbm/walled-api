const transactionsRepository = require("../repositories/transactions.repository");
const usersRepository = require("../repositories/users.repository");

const findAllTransactionsByUser = async (userId) => {
  return transactionsRepository.findAllTransactionsByUser(userId);
};

const topUp = async (id, amount, desc) => {
  return transactionsRepository.topUp(id, amount, desc);
};

const transfer = async (senderId, recipientId, amount, desc) => {
  const sender = await usersRepository.findUserById(senderId);
  const recipient = await usersRepository.findUserById(recipientId);

  if (!recipient) {
    throw new Error("Recipient not found");
  }

  if (parseInt(sender.balance) < parseInt(amount)) {
    throw new Error("Insufficient balance");
  }

  const transfer = await transactionsRepository.transfer(
    senderId,
    recipientId,
    amount,
    desc
  );

  return transfer;
};

module.exports = { findAllTransactionsByUser, topUp, transfer };
