import express from "express";
import transactionRouter from "./routes/transactions.js";
import accountRouter from "./routes/accounts.js";
import { errorHandler } from "./middleware/errors.js";

const app = express();

app.use(express.json());

app.get("/", (req, res) => {
  res.sendStatus(200);
});

app.use("/api/transactions", transactionRouter);
app.use("/api/accounts", accountRouter);

app.use(errorHandler);

app.listen(3000, () =>  {
  console.log("Listening on port 3000...")
});
