import express from "express";
import employees from "../db/employees.js";
import { addNewEmployee } from "../db/employees.js";

const employeeRouter = express.Router();
export default employeeRouter;

employeeRouter.get("/", (req, res) => {
  res.send(employees);
});

employeeRouter.get("/random", (req, res) => {
  const randomIndex = Math.floor(Math.random() * employees.length);
  res.send(employees[randomIndex]);
});

employeeRouter.get("/:id", (req, res) => {
  const { id } = req.params;
  const employee = employees.find((e) => e.id === +id);
  if (!employee) {
    return res.status(404).send(`Employee not found`);
  }

  res.send(employee);
});

employeeRouter.post("/", (req, res, next) => {
  if (!req.body) return res.status(400).send(`body in request is undefined`);

  const { name } = req.body;
  if (!name) return res.status(400).send(`empty string in name`);

  const employee = addNewEmployee(name);
  res.status(201).send(`${employee} has been added succesfully.`);
});
