const Joi = require("joi");
const userService = require("../services/users.service");
const UserResponseDto = require("../dto/user.dto");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  avatar_url: Joi.string().optional(),
  name: Joi.string().required(),
  balance: Joi.number().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const topUpSchema = Joi.object({
  amount: Joi.number().required(),
});

const findAllUsers = async (_, res) => {
  try {
    const result = await userService.findAllUsers();

    result.map((item) => (item.account_number = 9000 + item.id));

    res.status(200).json({ data: result });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const result = await userService.findUserById(req.params.id);

    result.account_number = 9000 + result.id;

    res.status(200).json({ data: result });
  } catch (error) {
    if (error.message === "user not found") {
      return res.status(404).json({ error: error.message });
    }

    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const createUser = async (req, res) => {
  try {
    const { error, value } = registerSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }
    const user = await userService.createUser(value);

    res.status(201).json({
      data: new UserResponseDto(user),
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const login = async (req, res) => {
  try {
    const { error, value } = loginSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const isValid = await userService.login(value);

    res.status(200).json({
      data: isValid,
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const addUserBalance = async (req, res) => {
  try {
    const { error, value } = topUpSchema.validate(req.body);

    if (error) {
      return res.status(400).json({ error: error.message });
    }

    const user = await userService.addUserBalance(req.params.id, value.amount);

    res.status(201).json({
      data: new UserResponseDto(user),
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  login,
  addUserBalance,
};
