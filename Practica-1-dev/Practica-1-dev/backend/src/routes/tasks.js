const router = require("express").Router();
const Task = require("../models/Task");

// Obtener tareas
router.get("/", async (req, res) => {
  const tasks = await Task.find();
  res.json(tasks);
});

// Crear tarea
router.post("/", async (req, res) => {
  const task = new Task(req.body);
  await task.save();
  res.json(task);
});

module.exports = router;