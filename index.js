const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const users = require("./routers/users");

const app = express();
const port = 8080;

app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(cors());

app.use("/users", users);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
