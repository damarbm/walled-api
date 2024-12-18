const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const usersRouter = require("./routers/users.router");
const transactionsRouter = require("./routers/transactions.router");
const globalErrorHandler = require("./middlewares/error.middleware");

const app = express();
const port = 8080;

app.use(cors());
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

app.use(usersRouter);
app.use(transactionsRouter);

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
