const Joi = require("joi");
const transactionsService = require("../services/transactions.service");

const topUpSchema = Joi.object({
  amount: Joi.number().required(),
  desc: Joi.string(),
});

const findAllTransactionsByUser = async (req, res) => {
  try {
    const { id } = req.user;

    const result = await transactionsService.findAllTransactionsByUser(id);

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const topUp = async (req, res) => {
  try {
    const { error, value } = topUpSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const user = await transactionsService.topUp(
      parseInt(req.user.id),
      value.amount,
      value.desc
    );

    res.status(200).json({
      data: user,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const transfer = async (req, res) => {
  try {
    const { recipientId, amount, desc } = req.body;
    const senderId = req.user.id;

    let newRecipientId = parseInt(recipientId - 9000);

    const transfer = await transactionsService.transfer(
      senderId,
      newRecipientId,
      amount,
      desc
    );

    res.status(200).json({
      data: transfer,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = { findAllTransactionsByUser, topUp, transfer };
