const express = require('express');
const router = express.Router();
const { Sequelize } = require('sequelize');
const authController = require('../controllers/authController');

const sequelize = new Sequelize('todoApp', 'root', 'root', {
  host: 'localhost',
  port: 3306,
  dialect: 'mysql'
});

sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err));

router.post('/register', async (req, res) => {
  try {
    const { email, password, confirmPassword } = req.body;
    if (password !== confirmPassword) {
      return res.status(400).json({ message: 'Passwords do not match' });
    }
    const user = await authController.registerUser({ email, password });
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error registering user', error: error.message });
  }
});

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await authController.loginUser({ email, password });
    if (!user) {
      return res.status(401).json({ message: 'Incorrect email or password' });
    }
    res.status(200).json(user);
  } catch (error) {
    res.status(500).json({ message: 'Error logging in', error: error.message });
  }
});

module.exports = router;
