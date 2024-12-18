const Joi = require("joi");
const userService = require("../services/users.service");
const UserResponseDto = require("../dto/user.dto");

const registerSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
  avatar_url: Joi.string().optional(),
  name: Joi.string().required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required(),
});

const findAllUsers = async (_, res) => {
  try {
    const result = await userService.findAllUsers();

    result.map((item) => (item.account_number = 9000 + item.id));

    res.status(200).json({ data: new UserResponseDto(result) });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

const findUserById = async (req, res) => {
  try {
    const result = await userService.findUserById(parseInt(req.user.id));

    result.account_number = 9000 + parseInt(result.id);

    res.status(200).json({ data: new UserResponseDto(result) });
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

    const token = await userService.login(value);

    res.status(200).json({
      data: { token },
    });
  } catch (error) {
    if (error.message === "404") {
      return res.status(404).json({ message: "user does not exist" });
    }

    if (error.message === "401") {
      res.status(401).json({ error: "invalid email or password" });
    }

    res.status(error.statusCode || 500).json({ error: error.message });
  }
};

module.exports = {
  findAllUsers,
  findUserById,
  createUser,
  login,
};
