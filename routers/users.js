const express = require("express");
const router = express.Router();
const Joi = require("joi");
const Pool = require("pg").Pool;

const pool = new Pool({
  user: "postgres",
  host: "localhost",
  database: "walled_db",
  password: "superuser",
  port: 5432,
});

const registerSchema = Joi.object({
  name: Joi.string(),
  email: Joi.string().email({
    minDomainSegments: 2,
    tlds: { allow: ["com", "net"] },
  }),
  password: Joi.string(),
  avatar_url: Joi.string(),
});

const getUsers = (_, res) => {
  pool.query("SELECT * FROM users", (error, results) => {
    if (error) {
      throw error;
    }

    res.status(200).json(results.rows);
  });
};

const createUser = async (req, res) => {
  const { error, value } = registerSchema.validate(req.body);

  if (error) {
    return res.status(400).send({ message: error.details[0].message });
  }

  const { name, email, password, avatar_url } = value;

  try {
    const result = await pool.query(
      "INSERT INTO users (name, email, password, avatar_url) VALUES ($1, $2, $3, $4) RETURNING *",
      [name, email, password, avatar_url]
    );

    res.status(201).send(result.rows[0]);
  } catch (error) {
    throw res.status(500).send({ message: error.message });
  }
};

router.get("/", getUsers);
router.post("/", createUser);

module.exports = router;
