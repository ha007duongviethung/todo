const express = require("express");
const router = express.Router();

const TodoApi = require("../controllers/todo.controller");

router.post("", TodoApi.addNewTodo);
router.put("", TodoApi.updateTodo);
router.delete("/:id", TodoApi.deleteTodo);
router.get("/user/:id", TodoApi.fetchTodoById);

module.exports = router;
