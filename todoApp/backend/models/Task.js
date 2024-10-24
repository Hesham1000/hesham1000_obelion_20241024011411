**File: todoApp/backend/models/Task.js**

const { Model, DataTypes } = require('sequelize');
const sequelize = require('../config/database');

class Task extends Model {
  static init(sequelize) {
    super.init({
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notEmpty: true,
        },
      },
      dueDate: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      completed: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
      },
    }, {
      sequelize,
      modelName: 'Task',
      tableName: 'tasks',
      timestamps: false,
    });
  }
}

Task.init(sequelize);

module.exports = Task;

**File: todoApp/backend/routes/taskRoutes.js**

const express = require('express');
const taskController = require('../controllers/taskController');
const router = express.Router();

router.get('/tasks', taskController.getAllTasks);
router.post('/tasks', taskController.createTask);
router.put('/tasks/:taskId', taskController.updateTask);
router.delete('/tasks/:taskId', taskController.deleteTask);

module.exports = router;

**File: todoApp/backend/controllers/taskController.js**

const Task = require('../models/Task');

exports.getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.findAll();
    res.status(200).json(tasks);
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while fetching tasks.' });
  }
};

exports.createTask = async (req, res) => {
  try {
    const { title, dueDate } = req.body;
    const newTask = await Task.create({ title, dueDate });
    res.status(201).json(newTask);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data provided for creating a task.' });
  }
};

exports.updateTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const { title, dueDate, completed } = req.body;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    task.title = title;
    task.dueDate = dueDate;
    task.completed = completed;
    await task.save();
    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: 'Invalid data provided for updating the task.' });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { taskId } = req.params;
    const task = await Task.findByPk(taskId);
    if (!task) {
      return res.status(404).json({ error: 'Task not found.' });
    }
    await task.destroy();
    res.status(200).json({ message: 'Task deleted successfully.' });
  } catch (error) {
    res.status(500).json({ error: 'An error occurred while deleting the task.' });
  }
};
