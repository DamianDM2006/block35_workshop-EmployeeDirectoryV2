import express from "express";
import employeeRouter from "./api/employees.js";
const app = express();
export default app;


import employees from "#db/employees";

app.get("/", (req, res) => {
  res.send("Hello employees!");
});

app.use("/employees", employeeRouter);

app.use((err, req, res, next) => {
    res.status(500).send(`Something went wrong`);
  });