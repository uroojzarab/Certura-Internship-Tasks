import Task from "../models/task.js";

//create task
export const createTask = async (req, res) => {
  try {
    const newTask = new Task(req.body);
    const result = await newTask.save();
    res.status(201).json(result);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//geta  all tasks

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
};

//update
export const updateTask = async (req, res) => {
  try {
    const id = req.params.id;
    const updatedTask = req.body;
    const result = await Task.findByIdAndUpdate(id, updatedTask, { new: true });
    res.json(result);
  } catch (eoor) {
    res.status(400).json({ message: error.message });
  }
};
//delete task

export const deleteTask = async (req, res) => {
  try {
    const id = req.params.id;
    const result = await Task.findByIdAndDelete(id);
    if (!result) return res.status(404).json({ message: "Task not found" });
    res.json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
