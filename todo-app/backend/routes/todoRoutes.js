const express = require("express");
const todoController = require("../controllers/todoController")

const router = express.Router();

router.post("/todo",todoController.createTodo);

router.get('/todos',todoController.fetchTodos);

router.get('/todo/:id', todoController.fetchTodo);

router.put('/todo/:id',todoController.updateTodo);

module.exports = router;