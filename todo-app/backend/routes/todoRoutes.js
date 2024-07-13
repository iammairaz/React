const express = require("express");
const todoController = require("../controllers/todoController");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/todo", authMiddleware, todoController.createTodo);

router.get('/todos', authMiddleware, todoController.fetchTodos);

router.get('/todo/:id', authMiddleware, todoController.fetchTodo);

router.put('/todo/:id', authMiddleware, todoController.updateTodo);

module.exports = router;